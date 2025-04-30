import express from "express";
import { analyzeChatEmotions } from "../services/chat-service.js";

const router = express.Router();

// Analyser les émotions dans une conversation de chat
router.post("/analyze", async (req, res) => {
	try {
		const { conversation, userId } = req.body;
		const pool = req.app.locals.pool;
		const genAI = req.app.locals.genAI;

		if (!conversation) {
			return res.status(400).json({ error: "Conversation requise" });
		}

		console.log(
			"Requête d'analyse de chat reçue:",
			conversation.substring(0, 50) + "..."
		);

		// Analyser les émotions et les signaux de détresse dans la conversation
		const analysis = await analyzeChatEmotions(genAI, conversation);

		// Sauvegarder l'analyse dans la base de données si disponible
		let id = Date.now().toString();
		if (pool) {
			try {
				const result = await pool.query(
					"INSERT INTO chat_analysis (conversation, emotions, flags, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
					[conversation, analysis.emotions, analysis.flags, userId || null]
				);
				id = result.rows[0].id;
				console.log(
					"Analyse de chat sauvegardée dans la base de données, ID:",
					id
				);
			} catch (dbError) {
				console.error(
					"Erreur lors de la sauvegarde de l'analyse de chat:",
					dbError
				);
			}
		}

		// Renvoyer les résultats
		res.json({
			id,
			conversation,
			emotions: analysis.emotions,
			flags: analysis.flags,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de l'analyse du chat:", error);
		res.status(500).json({
			error: "Erreur lors de l'analyse du chat",
			details: error.message,
		});
	}
});

// Récupérer l'historique des analyses de chat
router.get("/history", async (req, res) => {
	try {
		const { userId } = req.query;
		const pool = req.app.locals.pool;

		if (!pool) {
			return res.json([]);
		}

		let query = "SELECT * FROM chat_analysis";
		const params = [];

		if (userId) {
			query += " WHERE user_id = $1";
			params.push(userId);
		}

		query += " ORDER BY timestamp DESC";

		const result = await pool.query(query, params);

		res.json(result.rows);
	} catch (error) {
		console.error("Erreur lors de la récupération de l'historique:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération de l'historique" });
	}
});

// Supprimer une analyse de chat
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const pool = req.app.locals.pool;

		if (!pool) {
			return res.status(404).json({ error: "Base de données non disponible" });
		}

		const result = await pool.query(
			"DELETE FROM chat_analysis WHERE id = $1 RETURNING id",
			[id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Analyse non trouvée" });
		}

		res.json({ message: "Analyse supprimée avec succès" });
	} catch (error) {
		console.error("Erreur lors de la suppression de l'analyse:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la suppression de l'analyse" });
	}
});

export default router;
