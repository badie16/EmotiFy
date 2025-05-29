import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, BatchNormalization, MaxPooling1D, Dropout, Flatten, Dense
import pickle
import librosa
import numpy as np
import os

# --- 1. Reconstruire le Modèle Manuellement ---

def build_model_manually(input_shape=(2376, 1)):
    model = Sequential(name='sequential_2')
    # ... (Le code de build_model_manually reste EXACTEMENT le même) ...
    model.add(Conv1D(512, kernel_size=5, padding='same', activation='relu', input_shape=input_shape, name='conv1d_10'))
    model.add(BatchNormalization(name='batch_normalization_12'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pooling1d_10'))
    model.add(Conv1D(512, kernel_size=5, padding='same', activation='relu', name='conv1d_11'))
    model.add(BatchNormalization(name='batch_normalization_13'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pooling1d_11'))
    model.add(Dropout(0.2, name='dropout_6'))
    model.add(Conv1D(256, kernel_size=5, padding='same', activation='relu', name='conv1d_12'))
    model.add(BatchNormalization(name='batch_normalization_14'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pooling1d_12'))
    model.add(Conv1D(256, kernel_size=3, padding='same', activation='relu', name='conv1d_13'))
    model.add(BatchNormalization(name='batch_normalization_15'))
    model.add(MaxPooling1D(pool_size=5, strides=2, padding='same', name='max_pooling1d_13'))
    model.add(Dropout(0.2, name='dropout_7'))
    model.add(Conv1D(128, kernel_size=3, padding='same', activation='relu', name='conv1d_14'))
    model.add(BatchNormalization(name='batch_normalization_16'))
    model.add(MaxPooling1D(pool_size=3, strides=2, padding='same', name='max_pooling1d_14'))
    model.add(Dropout(0.2, name='dropout_8'))
    model.add(Flatten(name='flatten_2'))
    model.add(Dense(512, activation='relu', name='dense_4'))
    model.add(BatchNormalization(name='batch_normalization_17'))
    model.add(Dense(5, activation='softmax', name='dense_5'))
    return model

# --- 2. Charger Poids et Scaler (PLUS BESOIN DE L'ENCODEUR !) ---

if not os.path.exists('best_model1_weights.h5'):
    print("Error: Weights file (best_model1_weights.h5) not found.")
    exit()

try:
    loaded_model = build_model_manually()
    loaded_model.load_weights("best_model1_weights.h5")
    print("Model built manually and weights loaded successfully.")
except Exception as e:
    print(f"Error building model or loading weights: {e}")
    exit()

if not os.path.exists('scaler2.pickle'):
    print("Error: Pickle file (scaler2.pickle) not found.")
    exit()

try:
    with open('scaler2.pickle', 'rb') as f:
        scaler2 = pickle.load(f)
    print("Loaded Scaler")
    # On ne charge PLUS l'encodeur !
except Exception as e:
    print(f"Error loading pickle files: {e}")
    exit()

# --- 3. Définir les Fonctions d'Extraction de Features ---
# (Ces fonctions restent les mêmes)

def zcr(data, frame_length=2048, hop_length=512):
    zcr_feature = librosa.feature.zero_crossing_rate(y=data, frame_length=frame_length, hop_length=hop_length)
    return np.squeeze(zcr_feature)

def rmse(data, frame_length=2048, hop_length=512):
    rmse_feature = librosa.feature.rms(y=data, frame_length=frame_length, hop_length=hop_length)
    return np.squeeze(rmse_feature)

def mfcc(data, sr, frame_length=2048, hop_length=512, flatten: bool = True):
    mfcc_feature = librosa.feature.mfcc(y=data, sr=sr, n_mfcc=13, n_fft=frame_length, hop_length=hop_length)
    return np.squeeze(mfcc_feature.T) if not flatten else np.ravel(mfcc_feature.T)

def extract_features(data, sr=22050, frame_length=2048, hop_length=512):
    result = np.array([])
    result = np.hstack((result,
                        zcr(data, frame_length, hop_length),
                        rmse(data, frame_length, hop_length),
                        mfcc(data, sr, frame_length, hop_length)
                       ))
    return result

# --- 4. Définir les Fonctions de Prédiction (MODIFIÉES) ---

def get_predict_feat(path):
    # ... (Cette fonction reste la même, mais attention au problème 1620 vs 2376 !) ...
    if not os.path.exists(path):
        print(f"Error: Audio file not found at {path}")
        return None
    try:
        d, s_rate = librosa.load(path, duration=2.5, offset=0.6)
        res = extract_features(d, sr=s_rate)
        result = np.array(res)
        expected_shape = 2376 # <-- Ce nombre est PROBABLEMENT la source du problème 1620 vs 2376
        if result.shape[0] < expected_shape:
            print(f"Warning: Features ({result.shape[0]}) less than expected ({expected_shape}). Padding with zeros.")
            result = np.pad(result, (0, expected_shape - result.shape[0]), 'constant')
        elif result.shape[0] > expected_shape:
            print(f"Warning: Features ({result.shape[0]}) more than expected ({expected_shape}). Truncating.")
            result = result[:expected_shape]
        result = np.reshape(result, newshape=(1, expected_shape))
        i_result = scaler2.transform(result)
        final_result = np.expand_dims(i_result, axis=2)
        return final_result
    except Exception as e:
        print(f"Error processing audio file {path}: {e}")
        return None

# NOUVEAU: Mapping direct Index -> Emotion
# IMPORTANT: L'ordre DOIT correspondre à l'entraînement !
# Est-ce le bon ordre ? Vous seul pouvez le confirmer.
emotions_map = {
    0: 'happy',
    1: 'fear',
    2: 'angry',
    3: 'neutral',
    4: 'sad'
}
def prediction(path1):
    """Fait une prédiction en utilisant np.argmax (sans encodeur)."""
    features = get_predict_feat(path1)
    if features is None:
        return "Error in feature extraction"

    # Prédiction brute
    predictions_raw = loaded_model.predict(features)
    print(f"Raw prediction (shape {predictions_raw.shape}): {predictions_raw}")

    # Trouver l'index de la plus haute probabilité
    predicted_index = np.argmax(predictions_raw[0])
    print(f"Predicted index: {predicted_index}")

    # Mapper l'index à l'émotion
    if predicted_index in emotions_map:
        return emotions_map[predicted_index]
    else:
        return f"Prediction OK, but index {predicted_index} not found in emotions_map."

# --- 5. Exécuter la Prédiction ---

audio_file = "angry1.wav" # Assurez-vous que sad.wav existe

features_to_predict = get_predict_feat(audio_file)
if features_to_predict is not None:
    print(f"Shape of features for prediction: {features_to_predict.shape}")
    predicted_emotion = prediction(audio_file)
    print(f"The predicted emotion for {audio_file} is: {predicted_emotion}")
else:
    print(f"Could not make a prediction for {audio_file}.")