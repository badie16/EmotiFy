import axios from "axios";

// URL de l'API backend
const API_URL = import.meta.env.VITE_API_URL || "/api";

// Analyser les émotions dans un texte
export async function analyzeEmotion(text) {
	try {
		console.log("Envoi de la requête à:", `${API_URL}/text/analyze`);
		console.log("Texte à analyser:", text);

		const response = await axios.post(`${API_URL}/text/analyze`, { text });

		console.log("Réponse reçue:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error analyzing emotion:", error);
		throw error;
	}
}

// Sauvegarder une analyse dans l'historique
export async function saveAnalysis(analysisData) {
	try {
		const response = await axios.post(`${API_URL}/text/history`, analysisData);
		return response.data;
	} catch (error) {
		console.error("Error saving analysis:", error);
		// Ne pas propager l'erreur pour ne pas bloquer l'interface utilisateur
		return null;
	}
}

// Récupérer l'historique des analyses
export async function getAnalysisHistory() {
	try {
		const response = await axios.get(`${API_URL}/text/history`);
		return response.data;
	} catch (error) {
		console.error("Error fetching analysis history:", error);
		throw error;
	}
}

// Supprimer une analyse de l'historique
export async function deleteAnalysis(id) {
	try {
		const response = await axios.delete(`${API_URL}/text/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting analysis:", error);
		throw error;
	}
}
