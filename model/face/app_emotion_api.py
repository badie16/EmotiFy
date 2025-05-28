from flask import Blueprint, request, jsonify
import tensorflow as tf
import cv2
import numpy as np
print("app_emotion_api.py est importé et exécuté !")
# --- PARAMÈTRES ---
MODEL_PATH = './face/mon_modele_emotions.h5'
IMG_SIZE = (48, 48)
COLOR_MODE = 'grayscale'
EMOTION_LABELS = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']
HAAR_CASCADE_PATH = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

# --- Initialisation ---
emotion_api = Blueprint('emotion_api', __name__)

# Charger le modèle et le classificateur
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    face_cascade = cv2.CascadeClassifier(HAAR_CASCADE_PATH)
    print("Modèle et classificateur chargés.")
except Exception as e:
    print(f"Erreur au chargement: {e}")
    model = None
    face_cascade = None

def preprocess_face(face_img):
    if COLOR_MODE == 'grayscale':
        target_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2GRAY)
        target_img = cv2.resize(target_img, IMG_SIZE)
        target_img = np.expand_dims(target_img, axis=-1)
    else:
        target_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2RGB)
        target_img = cv2.resize(target_img, IMG_SIZE)
    target_img = target_img / 255.0
    target_img = np.expand_dims(target_img, axis=0)
    return target_img

def detect_emotions(image_bytes):
    print("detect_emotions")
    if not model or face_cascade.empty():
        return {"error": "Modèle ou classificateur non prêt."}

    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "Image invalide."}

    original_height, original_width = img.shape[:2]

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray_img, 1.1, 4)
    results = []
    for (x, y, w, h) in faces:
        face_roi = img[y:y+h, x:x+w]
        processed_face = preprocess_face(face_roi)
        predictions = model.predict(processed_face)[0]
        emotion_scores = {label: float(score) for label, score in zip(EMOTION_LABELS, predictions)}
        results.append({
            "box": [int(x), int(y), int(w), int(h)],
            "emotions": emotion_scores
        })

    return {
        "imageSize": {"width": original_width, "height": original_height},
        "faces": results
    }

@emotion_api.route('/detect', methods=['POST'])
def detect_route():
    if 'image' not in request.files:
        return jsonify({"error": "Aucun fichier 'image' trouvé."}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Nom de fichier vide."}), 400
    try:
        image_bytes = file.read()
        detections = detect_emotions(image_bytes)
        return jsonify(detections)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
