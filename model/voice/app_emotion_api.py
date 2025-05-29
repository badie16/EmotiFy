import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Conv1D, BatchNormalization, MaxPooling1D, Dropout, Flatten, Dense
import pickle
import librosa
import numpy as np
import os
import logging
from typing import Optional, Tuple, Dict, List
from flask import Blueprint, request, jsonify
import tempfile # Pour sauvegarder temporairement le fichier uploadé

# --- Configuration Globale ---
# doit etre par rapport au fichier app.py
MODEL_WEIGHTS_PATH = './voice/best_model1_weights.h5'
SCALER_PATH = './voice/scaler2.pickle' 

TARGET_SAMPLE_RATE = 22050
AUDIO_DURATION = 2.5
AUDIO_OFFSET = 0.6
FRAME_LENGTH = 2048
HOP_LENGTH = 512
N_MFCC = 13

EXPECTED_FEATURE_SHAPE = 2376 # !!! PROBLÈME CRITIQUE À RÉSOUDRE !!!

EMOTIONS_MAP: Dict[int, str] = {
    0: 'angry',
    1: 'fear',
    2: 'happy',
    3: 'neutral',
    4: 'sad'
}

# Configuration du logging (Flask a son propre logger, mais on peut l'utiliser aussi)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__) # Logger spécifique pour ce module

# --- Initialisation du Blueprint Flask ---
audio_emotion_bp = Blueprint('audio_emotion_api', __name__)

# --- Variables Globales pour le Modèle et le Scaler ---
# Ceux-ci seront chargés une seule fois au démarrage du module/blueprint
loaded_model_global: Optional[Sequential] = None
scaler_global: Optional[object] = None

# --- 1. Construction du Modèle (identique à votre script) ---
def build_model_manually(input_shape: Tuple[int, int] = (EXPECTED_FEATURE_SHAPE, 1)) -> Sequential:
    model = Sequential(name='sequential_emotion_classifier')
    model.add(Input(shape=input_shape, name='input_layer'))
    model.add(Conv1D(512, kernel_size=5, padding='same', activation='relu', name='conv1d_1'))
    model.add(BatchNormalization(name='batch_norm_1'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pool_1'))
    model.add(Conv1D(512, kernel_size=5, padding='same', activation='relu', name='conv1d_2'))
    model.add(BatchNormalization(name='batch_norm_2'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pool_2'))
    model.add(Dropout(0.2, name='dropout_1'))
    model.add(Conv1D(256, kernel_size=5, padding='same', activation='relu', name='conv1d_3'))
    model.add(BatchNormalization(name='batch_norm_3'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pool_3'))
    model.add(Conv1D(256, kernel_size=3, padding='same', activation='relu', name='conv1d_4'))
    model.add(BatchNormalization(name='batch_norm_4'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pool_4'))
    model.add(Dropout(0.2, name='dropout_2'))
    model.add(Conv1D(128, kernel_size=3, padding='same', activation='relu', name='conv1d_5'))
    model.add(BatchNormalization(name='batch_norm_5'))
    model.add(MaxPooling1D(pool_size=3, strides=2, padding='same', name='max_pool_5'))
    model.add(Dropout(0.2, name='dropout_3'))
    model.add(Flatten(name='flatten_layer'))
    model.add(Dense(512, activation='relu', name='dense_1'))
    model.add(BatchNormalization(name='batch_norm_output_dense'))
    model.add(Dense(len(EMOTIONS_MAP), activation='softmax', name='output_softmax'))
    return model

# --- 2. Chargement des Artefacts (appelé une fois) ---
def load_artifacts_globally():
    global loaded_model_global, scaler_global
    logger.info("Tentative de chargement des artefacts (modèle et scaler)...")

    if not os.path.exists(MODEL_WEIGHTS_PATH):
        logger.error(f"Fichier des poids du modèle introuvable : {MODEL_WEIGHTS_PATH}")
    else:
        try:
            loaded_model_global = build_model_manually()
            loaded_model_global.load_weights(MODEL_WEIGHTS_PATH)
            logger.info("Modèle construit manuellement et poids chargés avec succès.")
        except Exception as e:
            logger.error(f"Erreur lors de la construction ou du chargement des poids du modèle : {e}", exc_info=True)
            loaded_model_global = None # Assurer que c'est None en cas d'erreur

    if not os.path.exists(SCALER_PATH):
        logger.error(f"Fichier du scaler introuvable : {SCALER_PATH}")
    else:
        try:
            with open(SCALER_PATH, 'rb') as f:
                scaler_global = pickle.load(f)
            logger.info("Scaler chargé avec succès.")
        except Exception as e:
            logger.error(f"Erreur lors du chargement du fichier du scaler : {e}", exc_info=True)
            scaler_global = None # Assurer que c'est None en cas d'erreur

# Appel pour charger les artefacts au moment de l'importation du module Blueprint
load_artifacts_globally()

# --- 3. Fonctions d'Extraction de Features (identiques) ---
def zcr(data: np.ndarray, frame_length: int = FRAME_LENGTH, hop_length: int = HOP_LENGTH) -> np.ndarray:
    return np.squeeze(librosa.feature.zero_crossing_rate(y=data, frame_length=frame_length, hop_length=hop_length))

def rmse(data: np.ndarray, frame_length: int = FRAME_LENGTH, hop_length: int = HOP_LENGTH) -> np.ndarray:
    return np.squeeze(librosa.feature.rms(y=data, frame_length=frame_length, hop_length=hop_length))

def mfcc_features(data: np.ndarray, sr: int, n_mfcc: int = N_MFCC, frame_length: int = FRAME_LENGTH, hop_length: int = HOP_LENGTH) -> np.ndarray:
    mfccs = librosa.feature.mfcc(y=data, sr=sr, n_mfcc=n_mfcc, n_fft=frame_length, hop_length=hop_length)
    return np.ravel(mfccs.T)

def extract_audio_features(data: np.ndarray, sr: int) -> np.ndarray:
    features_list: List[np.ndarray] = [zcr(data), rmse(data), mfcc_features(data, sr)]
    return np.hstack(features_list)

# --- 4. Fonctions de Prédiction (adaptées pour l'API) ---
def preprocess_features_for_api(audio_path: str) -> Optional[np.ndarray]:
    """Charge l'audio, extrait, et prépare les features pour la prédiction. Utilise scaler_global."""
    if scaler_global is None:
        logger.error("Scaler non chargé. Impossible de prétraiter les features.")
        return None
    try:
        audio_data, sample_rate = librosa.load(
            audio_path, sr=TARGET_SAMPLE_RATE, duration=AUDIO_DURATION, offset=AUDIO_OFFSET
        )
        raw_features = extract_audio_features(audio_data, sample_rate)
        num_extracted_features = raw_features.shape[0]

        if num_extracted_features != EXPECTED_FEATURE_SHAPE:
            logger.warning(
                f"Nombre de features extraites ({num_extracted_features}) "
                f"différent de celui attendu ({EXPECTED_FEATURE_SHAPE}) pour {os.path.basename(audio_path)}. "
                "Cela indique un problème avec les paramètres d'extraction ou la durée de l'audio. "
                "Les résultats de la prédiction seront probablement incorrects."
            )
            if num_extracted_features < EXPECTED_FEATURE_SHAPE:
                processed_features = np.pad(raw_features, (0, EXPECTED_FEATURE_SHAPE - num_extracted_features), 'constant')
            else:
                processed_features = raw_features[:EXPECTED_FEATURE_SHAPE]
        else:
            processed_features = raw_features

        processed_features = np.reshape(processed_features, newshape=(1, EXPECTED_FEATURE_SHAPE))
        scaled_features = scaler_global.transform(processed_features)
        final_features = np.expand_dims(scaled_features, axis=2)
        return final_features
    except Exception as e:
        logger.error(f"Erreur lors du traitement du fichier audio {audio_path} : {e}", exc_info=True)
        return None

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
        
        # Scores pour chaque émotion (comme dans l'exemple visage)
        emotion_scores = {label: float(score) for label, score in zip(EMOTIONS_MAP.values(), predictions_raw[0])}
        
        return {
            "predicted_emotion": emotion_label,
            "predicted_index": int(predicted_index),
            "emotion_scores": emotion_scores,
            "raw_prediction_vector": predictions_raw[0].tolist() # Optionnel
        }
    except Exception as e:
        logger.error(f"Erreur durant la prédiction avec le modèle : {e}", exc_info=True)
        return {"error": "Erreur interne du serveur durant la prédiction."}

# --- 5. Route Flask ---
@audio_emotion_bp.route('/predict_audio_emotion', methods=['POST'])
def predict_audio_emotion_route():
    logger.info("Requête reçue sur /predict_audio_emotion")
    if loaded_model_global is None or scaler_global is None:
        logger.error("Tentative d'appel à l'API alors que le modèle ou le scaler n'est pas chargé.")
        return jsonify({"error": "Le service de prédiction n'est pas prêt. Vérifiez les logs du serveur."}), 503 # Service Unavailable

    if 'audio_file' not in request.files:
        logger.warning("Aucun fichier 'audio_file' trouvé dans la requête.")
        return jsonify({"error": "Aucun fichier 'audio_file' trouvé."}), 400

    file = request.files['audio_file']
    if file.filename == '':
        logger.warning("Nom de fichier vide soumis.")
        return jsonify({"error": "Nom de fichier vide."}), 400

    if file: #  and allowed_file(file.filename) # Vous pourriez ajouter une vérification d'extension ici
        try:
            # Sauvegarder temporairement le fichier pour que librosa puisse le lire
            # C'est plus sûr que de lire directement depuis file.stream pour certaines bibliothèques
            temp_dir = tempfile.mkdtemp()
            temp_audio_path = os.path.join(temp_dir, file.filename)
            file.save(temp_audio_path)
            logger.info(f"Fichier audio '{file.filename}' sauvegardé temporairement dans '{temp_audio_path}'")

            features = preprocess_features_for_api(temp_audio_path)
            
            # Nettoyer le fichier temporaire
            try:
                os.remove(temp_audio_path)
                os.rmdir(temp_dir)
                logger.info(f"Fichier temporaire '{temp_audio_path}' supprimé.")
            except Exception as e_clean:
                logger.warning(f"Impossible de supprimer le fichier temporaire {temp_audio_path}: {e_clean}")


            if features is not None:
                result = predict_emotion_api(features)
                if "error" in result:
                     return jsonify(result), 500 # Erreur interne si la prédiction elle-même échoue
                return jsonify(result), 200
            else:
                logger.error(f"Échec du prétraitement des features pour {file.filename}")
                return jsonify({"error": "Échec du prétraitement du fichier audio."}), 500
        except Exception as e:
            logger.error(f"Erreur majeure lors du traitement du fichier '{file.filename}': {e}", exc_info=True)
            # Nettoyer en cas d'erreur majeure aussi, si le chemin existe
            if 'temp_audio_path' in locals() and os.path.exists(temp_audio_path):
                try:
                    os.remove(temp_audio_path)
                    os.rmdir(temp_dir)
                except Exception as e_clean_fatal:
                     logger.warning(f"Impossible de supprimer le fichier temporaire {temp_audio_path} après erreur fatale: {e_clean_fatal}")
            return jsonify({"error": "Erreur interne du serveur lors du traitement du fichier."}), 500
    
    logger.warning("Type de fichier non autorisé ou autre problème avec le fichier.")
    return jsonify({"error": "Type de fichier non autorisé ou fichier invalide."}), 400

# Vous pourriez ajouter une fonction allowed_file ici si nécessaire :
# ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'} # etc.
# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

