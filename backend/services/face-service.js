import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';

const PYTHON_VISION_API_URL = process.env.PYTHON_VISION_API_URL || 'https://emotify-production.up.railway.app/api/face/detect';

// 📦 Configuration de multer en mémoire
const upload = multer({ storage: multer.memoryStorage() });

// 📷 Analyse d’une image reçue (upload via formulaire)
export async function analyzeFaceBuffer(fileBuffer, originalname, mimetype) {
  console.log(`[Vision] Image reçue: ${originalname}`);
  try {
    const formData = new FormData();
    formData.append('image', fileBuffer, {
      filename: originalname,
      contentType: mimetype,
    });

    const response = await axios.post(PYTHON_VISION_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    return {
      emotions: response.data,
      fileName: originalname,
    };
  } catch (error) {
    console.error("[Vision] Erreur (upload):", error.response?.data || error.message);
    throw new Error("Erreur lors de l'analyse de l'image.");
  }
}

// 🎥 Analyse d’une image Base64 (webcam)
export async function analyzeFaceWebcam(imageBase64) {
  if (!imageBase64) throw new Error('Aucune image Base64 reçue.');

  console.log("[Vision] Image Base64 reçue (webcam).");

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const uniqueName = 'webcam-' + Date.now() + '-' + uuidv4() + '.jpg';

    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: uniqueName,
      contentType: 'image/jpeg',
    });

    const response = await axios.post(PYTHON_VISION_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    return {
      emotions: response.data,
      fileName: uniqueName,
    };
  } catch (error) {
    console.error("[Vision] Erreur (webcam):", error.response?.data || error.message);
    throw new Error("Erreur lors de la détection via webcam.");
  }
}

export { upload };
