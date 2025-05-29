
import axios from 'axios'; // Pour effectuer des requêtes HTTP
import FormData from 'form-data'; // Pour envoyer des fichiers en multipart/form-data
import fs from 'fs'; // Pour lire le fichier audio depuis le système de fichiers
import path from 'path'; // Pour manipuler les chemins de fichiers

// URL de votre API Flask (assurez-vous qu'elle est correcte et accessible)
const FLASK_API_URL = 'https://emotify-production.up.railway.app/api/audio/predict_audio_emotion'; // Ajustez le port si nécessaire

/**
 * Analyse les émotions dans un fichier audio en appelant l'API Flask.
 * @param {string} filePath - Chemin absolu vers le fichier audio sur le serveur.
 * @returns {Promise<Object>} - Objet contenant les émotions détectées et leurs scores, ou un objet d'erreur.
 * Exemple de retour réussi :
 * {
 * predicted_emotion: "happy",
 * predicted_index: 2,
 * emotion_scores: { angry: 0.1, fear: 0.05, happy: 0.6, neutral: 0.15, sad: 0.1 },
 * raw_prediction_vector: [...]
 * }
 */
export async function analyzeVoiceEmotions(filePath) {
  try {
    console.log(`Début de l'analyse du fichier audio : ${filePath}`);

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.error(`Erreur: Le fichier audio n'existe pas à l'emplacement : ${filePath}`);
      throw new Error(`Le fichier audio n'existe pas : ${filePath}`);
    }

    // Créer un objet FormData pour envoyer le fichier
    const formData = new FormData();
    // 'audio_file' est le nom du champ attendu par l'API Flask
    formData.append('audio_file', fs.createReadStream(filePath), path.basename(filePath));

    console.log(`Envoi du fichier à l'API Flask : ${FLASK_API_URL}`);

    // Effectuer la requête POST vers l'API Flask
    const response = await axios.post(FLASK_API_URL, formData, {
      headers: {
        ...formData.getHeaders(), // Important pour définir Content-Type: multipart/form-data avec la bonne boundary
      },
      // Optionnel : définir un timeout pour la requête
      // timeout: 30000, // 30 secondes
    });

    console.log('Réponse reçue de l\'API Flask:', response.status, response.data);

    // Vérifier si la requête a réussi (status 2xx)
    if (response.status >= 200 && response.status < 300) {
      // L'API Flask devrait retourner directement l'objet JSON avec les émotions
      return response.data;
    } else {
      // Gérer les réponses d'erreur de l'API
      console.error(`L'API Flask a retourné un statut d'erreur ${response.status}:`, response.data);
      throw new Error(`L'API Flask a retourné une erreur ${response.status} - ${response.data.error || 'Erreur inconnue'}`);
    }

  } catch (error) {
    console.error("Erreur détaillée lors de l'analyse vocale via l'API Flask:", error.message);
    if (error.response) {
      // Erreur venant de la réponse de l'API (status non 2xx)
      console.error('Données de l\'erreur API:', error.response.data);
      console.error('Statut de l\'erreur API:', error.response.status);
      console.error('Headers de l\'erreur API:', error.response.headers);
      // Renvoyer une erreur plus structurée si possible
      const apiErrorMsg = error.response.data?.error || error.message;
      throw new Error(`Erreur de l'API Flask (${error.response.status}): ${apiErrorMsg}`);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Aucune réponse reçue de l\'API Flask. Le serveur est-il accessible ? URL:', FLASK_API_URL);
      console.error('Détails de la requête (erreur):', error.request);
      throw new Error('Impossible de contacter le service d\'analyse vocale. Vérifiez que le serveur Flask est en cours d\'exécution et accessible.');
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error('Erreur lors de la configuration de la requête vers l\'API Flask:', error.message);
    }
    // Renvoyer l'erreur originale ou une nouvelle erreur plus descriptive
    throw error; // Ou throw new Error("Échec de l'analyse vocale.") pour masquer les détails
  }
}

