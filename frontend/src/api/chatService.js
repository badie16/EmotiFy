import axios from "axios";

// URL de l'API backend
const API_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Analyser les émotions dans une conversation de chat
 * @param {string} conversation - La conversation à analyser
 * @returns {Promise<Object>} - Les résultats de l'analyse
 */
export async function analyzeChat(conversation) {
	try {
		console.log(
			"Envoi de la requête d'analyse de chat à:",
			`${API_URL}/chat/analyze`
		);
		console.log(
			"Conversation à analyser:",
			conversation.substring(0, 50) + "..."
		);

		const response = await axios.post(`${API_URL}/chat/analyze`, {
			conversation,
		});

		console.log("Réponse d'analyse de chat reçue:", response.data);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'analyse du chat:", error);
		throw error;
	}
}

/**
 * Récupérer l'historique des analyses de chat
 * @param {string} userId - ID de l'utilisateur (optionnel)
 * @returns {Promise<Array>} - Liste des analyses
 */
export async function getChatHistory(userId = null) {
	try {
		let url = `${API_URL}/chat/history`;
		if (userId) {
			url += `?userId=${userId}`;
		}

		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de l'historique des chats:",
			error
		);
		throw error;
	}
}

/**
 * Supprimer une analyse de chat
 * @param {string} id - ID de l'analyse à supprimer
 * @returns {Promise<Object>} - Confirmation de suppression
 */
export async function deleteChatAnalysis(id) {
	try {
		const response = await axios.delete(`${API_URL}/chat/${id}`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la suppression de l'analyse de chat:", error);
		throw error;
	}
}
