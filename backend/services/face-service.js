import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const PYTHON_VISION_API_URL = process.env.PYTHON_VISION_API_URL || 'https://emotify-production.up.railway.app/api/face/detect';

// Configuration de multer pour générer des noms de fichiers uniques
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, 'face-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ---  Upload d'une image ---
export async function analyzeFace(imagePath) {
  console.log(`[Vision] Fichier reçu (upload): ${imagePath}`);
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    const response = await axios.post(PYTHON_VISION_API_URL, formData, {
      headers: { ...formData.getHeaders() },
    });

    // Supprimer l'image après l'analyse
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return {
      emotions: response.data,
      filePath: path.basename(imagePath)
    };
  } catch (error) {
    console.error("[Vision] Erreur (upload):", error.response ? error.response.data : error.message);
    // En cas d'erreur, on supprime l'image
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    throw new Error(error);
  }
}

// --- Image depuis la Webcam (Base64) ---
export async function analyzeFaceWebcam(imageBase64) {
  if (!imageBase64) {
    throw new Error('Aucune image Base64 reçue.');
  }
  console.log("[Vision] Image Base64 reçue (webcam).");
  try {
    const base64Data = imageBase64.replace(/^data:image\/jpeg;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Sauvegarder l'image de la webcam avec un nom unique
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    const webcamPath = path.join('uploads', `webcam-${uniqueSuffix}.jpg`);
    fs.writeFileSync(webcamPath, imageBuffer);

    const formData = new FormData();
    formData.append('image', imageBuffer, { filename: 'webcam.jpg', contentType: 'image/jpeg' });
    const response = await axios.post(PYTHON_VISION_API_URL, formData, {
      headers: { ...formData.getHeaders() },
    });

    // Supprimer l'image après l'analyse
    if (fs.existsSync(webcamPath)) {
      fs.unlinkSync(webcamPath);
    }

    return {
      emotions: response.data,
      filePath: path.basename(webcamPath)
    };
  } catch (error) {
    console.error("[Vision] Erreur (webcam):", error.response ? error.response.data : error.message);
    // En cas d'erreur, supprimer l'image si elle existe
    if (fs.existsSync(webcamPath)) {
      fs.unlinkSync(webcamPath);
    }
    throw new Error("Erreur lors de la détection via webcam.");
  }
}

export { upload };
