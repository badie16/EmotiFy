import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Conv2D, BatchNormalization, MaxPooling2D, Dropout, Flatten, Dense, Activation
import librosa
import numpy as np
import os
import logging
from typing import Optional, Tuple, Dict, List
from flask import Blueprint, request, jsonify
import tempfile # Pour sauvegarder temporairement le fichier uploadé

# --- Configuration Globale pour le Modèle 2D ---
MODEL_WEIGHTS_PATH = './voice/best_model2.h5' 

# Paramètres d'extraction des features 
TARGET_SAMPLE_RATE = 22050 * 2 # 44100 Hz
AUDIO_DURATION = 2.5  # secondes
AUDIO_OFFSET = 0.5    # secondes
N_MFCC = 39           # Nombre de coefficients MFCC
TARGET_TIME_FRAMES = 216 # Nombre de pas de temps attendus pour les MFCCs

INPUT_SHAPE_2D: Tuple[int, int, int] = (N_MFCC, TARGET_TIME_FRAMES, 1)

# Étiquettes d'émotion 
EMOTIONS_MAP: Dict[int, str] = {
    0: 'Angry',
    1: 'Fear', 
    2: 'Disgust', 
    3: 'Happy', 
    4: 'Sad',
    5: 'Surprised', 
    6: 'Neutral'   
}
NUM_LABELS = len(EMOTIONS_MAP)

# Configuration du logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Initialisation du Blueprint Flask ---
audio_emotion_bp = Blueprint('audio_emotion_api', __name__)

# --- Variables Globales pour le Modèle ---
loaded_model_global: Optional[Sequential] = None
# scaler_global n'est plus utilisé

# --- 1. Construction du Modèle CNN 2D (adapté du script Gradio) ---
def build_2d_cnn_model(input_shape: Tuple[int, int, int] = INPUT_SHAPE_2D, num_labels: int = NUM_LABELS) -> Sequential:
    model = Sequential(name='sequential_2d_emotion_classifier')
    model.add(Conv2D(8, (13, 13), input_shape=input_shape)) # input_shape ici
    model.add(BatchNormalization(axis=-1))
    model.add(Activation('relu'))
    model.add(Conv2D(8, (13, 13)))
    model.add(BatchNormalization(axis=-1))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 1))) # Attention à la dimension du pooling
    model.add(Conv2D(8, (3, 3)))
    model.add(BatchNormalization(axis=-1))
    model.add(Activation('relu'))
    model.add(Conv2D(8, (1, 1))) # Note: Kernel (1,1) est parfois utilisé pour réduire la dimensionnalité des canaux
    model.add(BatchNormalization(axis=-1))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 1))) # Attention à la dimension du pooling
    model.add(Flatten())
    model.add(Dense(64))
    model.add(BatchNormalization())
    model.add(Activation('relu'))
    model.add(Dropout(0.2))
    model.add(Dense(num_labels, activation='softmax'))
    
    # Compiler le modèle (comme dans le script Gradio)
    # Note: binary_crossentropy est inhabituel pour une classification multi-classe mutuellement exclusive.
    # categorical_crossentropy est généralement préféré avec softmax.
    # Cependant, nous le gardons pour correspondre au modèle d'origine.
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    logger.info("Modèle CNN 2D construit.")
    return model

# --- 2. Chargement des Artefacts (appelé une fois) ---
def load_artifacts_globally():
    global loaded_model_global
    logger.info("Tentative de chargement des artefacts (modèle 2D)...")

    if not os.path.exists(MODEL_WEIGHTS_PATH):
        logger.error(f"Fichier des poids du modèle introuvable : {MODEL_WEIGHTS_PATH}")
    else:
        try:
            loaded_model_global = build_2d_cnn_model() # Construire la structure du modèle 2D
            loaded_model_global.load_weights(MODEL_WEIGHTS_PATH)
            logger.info("Modèle 2D construit et poids chargés avec succès.")
        except Exception as e:
            logger.error(f"Erreur lors de la construction ou du chargement des poids du modèle 2D : {e}", exc_info=True)
            loaded_model_global = None

# Appel pour charger les artefacts au moment de l'importation du module Blueprint
load_artifacts_globally()

# --- 3. Fonction d'Extraction de Features MFCC 2D ---
def extract_and_preprocess_mfcc_2d(audio_path: str) -> Optional[np.ndarray]:
    """Charge l'audio, extrait les MFCCs, et les prépare pour le modèle 2D."""
    try:
        # Charger l'audio avec les paramètres du script Gradio
        y, sr = librosa.load(
            audio_path, 
            sr=TARGET_SAMPLE_RATE, 
            duration=AUDIO_DURATION, 
            offset=AUDIO_OFFSET,
            res_type='kaiser_best' # Ajouté du script Gradio
        )

        # Extraire les MFCCs
        # Note: le script Gradio ne spécifiait pas n_fft ou hop_length pour mfcc,
        # librosa utilise des valeurs par défaut (n_fft=2048, hop_length=n_fft//4=512)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=N_MFCC) # n_mfcc=39

        # Assurer la bonne dimension temporelle (TARGET_TIME_FRAMES = 216)
        current_time_frames = mfccs.shape[1]
        if current_time_frames > TARGET_TIME_FRAMES:
            mfccs = mfccs[:, :TARGET_TIME_FRAMES]
            logger.debug(f"MFCCs tronqués de {current_time_frames} à {TARGET_TIME_FRAMES} frames.")
        elif current_time_frames < TARGET_TIME_FRAMES:
            padding_width = TARGET_TIME_FRAMES - current_time_frames
            mfccs = np.pad(mfccs, pad_width=((0, 0), (0, padding_width)), mode='constant')
            logger.debug(f"MFCCs paddés de {current_time_frames} à {TARGET_TIME_FRAMES} frames.")
        
        # Reshape pour le modèle CNN 2D : (batch_size, N_MFCC, TARGET_TIME_FRAMES, canaux)
        # Le modèle Gradio faisait feature.reshape(39, 216, 1) puis np.array([feature])
        # ce qui donne (1, 39, 216, 1)
        processed_features = mfccs.reshape(1, N_MFCC, TARGET_TIME_FRAMES, 1)
        
        return processed_features

    except Exception as e:
        logger.error(f"Erreur lors de l'extraction des features MFCC 2D pour {audio_path} : {e}", exc_info=True)
        return None

# --- 4. Fonctions de Prédiction (adaptées pour l'API) ---
# La fonction preprocess_features_for_api est remplacée par extract_and_preprocess_mfcc_2d
# La fonction predict_emotion_api reste conceptuellement similaire

def predict_emotion_api(features: np.ndarray) -> Dict:
    """Fait une prédiction d'émotion et retourne un dictionnaire."""
    if loaded_model_global is None:
        logger.error("Modèle non chargé. Impossible de faire une prédiction.")
        return {"error": "Modèle non prêt."}
    if features is None or features.size == 0:
        return {"error": "Features vides ou non fournies pour la prédiction."}
    
    try:
        predictions_raw = loaded_model_global.predict(features)
        predicted_index = np.argmax(predictions_raw[0])
        emotion_label = EMOTIONS_MAP.get(predicted_index, "inconnu")
        
        emotion_scores = {EMOTIONS_MAP.get(i, f"classe_{i}"): float(score) for i, score in enumerate(predictions_raw[0])}
        
        return {
            "predicted_emotion": emotion_label,
            "predicted_index": int(predicted_index),
            "emotion_scores": emotion_scores,
            "raw_prediction_vector": predictions_raw[0].tolist() # Optionnel
        }
    except Exception as e:
        logger.error(f"Erreur durant la prédiction avec le modèle 2D : {e}", exc_info=True)
        return {"error": "Erreur interne du serveur durant la prédiction."}

# --- 5. Route Flask ---
@audio_emotion_bp.route('/predict_audio_emotion', methods=['POST'])
def predict_audio_emotion_route():
    logger.info("Requête reçue sur /predict_audio_emotion (modèle 2D)")
    if loaded_model_global is None: # Plus besoin de vérifier scaler_global
        logger.error("Tentative d'appel à l'API alors que le modèle 2D n'est pas chargé.")
        return jsonify({"error": "Le service de prédiction n'est pas prêt. Vérifiez les logs du serveur."}), 503

    if 'audio_file' not in request.files:
        logger.warning("Aucun fichier 'audio_file' trouvé dans la requête.")
        return jsonify({"error": "Aucun fichier 'audio_file' trouvé."}), 400

    file = request.files['audio_file']
    if file.filename == '':
        logger.warning("Nom de fichier vide soumis.")
        return jsonify({"error": "Nom de fichier vide."}), 400

    if file:
        temp_dir = "" # Initialiser pour le bloc finally
        temp_audio_path = "" # Initialiser pour le bloc finally
        try:
            temp_dir = tempfile.mkdtemp()
            temp_audio_path = os.path.join(temp_dir, file.filename)
            file.save(temp_audio_path)
            logger.info(f"Fichier audio '{file.filename}' sauvegardé temporairement dans '{temp_audio_path}'")

            # Utiliser la nouvelle fonction d'extraction de features
            features = extract_and_preprocess_mfcc_2d(temp_audio_path)
            
            if features is not None:
                result = predict_emotion_api(features)
                if "error" in result:
                    return jsonify(result), 500
                return jsonify(result), 200
            else:
                logger.error(f"Échec du prétraitement des features MFCC 2D pour {file.filename}")
                return jsonify({"error": "Échec du prétraitement du fichier audio (MFCC 2D)."}), 500
        
        except Exception as e:
            logger.error(f"Erreur majeure lors du traitement du fichier '{file.filename}': {e}", exc_info=True)
            return jsonify({"error": "Erreur interne du serveur lors du traitement du fichier."}), 500
        
        finally: # Assurer le nettoyage des fichiers temporaires
            if os.path.exists(temp_audio_path):
                try:
                    os.remove(temp_audio_path)
                    logger.info(f"Fichier temporaire '{temp_audio_path}' supprimé.")
                except Exception as e_clean:
                    logger.warning(f"Impossible de supprimer le fichier temporaire {temp_audio_path}: {e_clean}")
            if os.path.exists(temp_dir):
                try:
                    os.rmdir(temp_dir)
                    logger.info(f"Répertoire temporaire '{temp_dir}' supprimé.")
                except Exception as e_clean_dir:
                    logger.warning(f"Impossible de supprimer le répertoire temporaire {temp_dir}: {e_clean_dir}")
    
    logger.warning("Type de fichier non autorisé ou autre problème avec le fichier.") 
    return jsonify({"error": "Type de fichier non autorisé ou fichier invalide."}), 400

# Si vous enregistrez ce blueprint dans votre application Flask principale:
# from flask import Flask
# app = Flask(__name__)
# app.register_blueprint(audio_emotion_bp, url_prefix='/api/audio') # Exemple de préfixe d'URL
# if __name__ == '__main__':
#     app.run(debug=True, port=5000) # Lancer pour test