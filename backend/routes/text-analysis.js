import express from "express";

const router = express.Router();

// Fonction pour analyser les émotions avec Gemini AI
async function analyzeEmotionsWithGemini(genAI, textInput) {
	if (!genAI) {
		console.log("Gemini AI n'est pas configuré, utilisation du mode simulé");
		return generateMockEmotionAnalysis(textInput);
	}

	try {
		console.log("Analyse de texte avec Gemini AI:", textInput);

		// Utiliser le modèle Gemini Pro
		const model = genAI.getGenerativeModel({
			model: "models/gemini-1.5-flash",
		});

		// Prompt pour l'analyse des émotions
		const prompt = `
    Analyse le texte suivant et identifie les émotions présentes avec leur intensité sur une échelle de 0 à 1.
    Texte: ${textInput}
    
    Réponds uniquement avec un objet JSON contenant les émotions détectées et leur score, comme cet exemple:
    {
      "joy": 0.8,
      "sadness": 0.1,
      "anger": 0.05,
      "fear": 0.02,
      "surprise": 0.03
    }
    Inclus uniquement les émotions suivantes si elles sont présentes: joy, sadness, anger, fear, surprise, disgust, neutral, love, admiration, approval, caring, confusion, curiosity, desire, disappointment, disapproval, embarrassment, excitement, gratitude, grief, nervousness, optimism, pride, realization, relief, remorse, annoyance, amusement.
    La somme des valeurs doit être 1, chaque valeur représente une probabilité.
    `;

		console.log("Envoi du prompt à Gemini");
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Extraire l'objet JSON de la réponse
		console.log("Réponse brute de Gemini:", text);

		const jsonMatch = text.match(/{[\s\S]*}/);

		if (jsonMatch) {
			const emotions = JSON.parse(jsonMatch[0]);
			console.log("Emotions extraites:", emotions);
			return emotions;
		} else {
			console.error("Format de réponse invalide de Gemini");
			throw new Error("Format de réponse invalide");
		}
	} catch (error) {
		console.error("Erreur lors de l'analyse avec Gemini:", error);
		console.log("Utilisation du mode simulé en raison d'une erreur");
		return generateMockEmotionAnalysis(textInput);
	}
}

// Fonction pour créer une réponse d'analyse émotionnelle simulée
function generateMockEmotionAnalysis(text) {
	console.log("Utilisation de l'analyse simulée pour:", text);
	const emotions = {
		joy: Math.random() * 0.4,
		sadness: Math.random() * 0.2,
		anger: Math.random() * 0.1,
		fear: Math.random() * 0.1,
		surprise: Math.random() * 0.1,
		disgust: Math.random() * 0.05,
		neutral: Math.random() * 0.2,
	};

	// Normaliser pour que la somme soit 1
	const total = Object.values(emotions).reduce((sum, val) => sum + val, 0);
	for (const key in emotions) {
		emotions[key] = emotions[key] / total;
	}

	return emotions;
}

// Analyser les émotions dans un texte
router.post("/analyze", async (req, res) => {
	try {
		const { text } = req.body;
		const pool = req.app.locals.pool;
		const genAI = req.app.locals.genAI;

		if (!text) {
			return res.status(400).json({ error: "Le texte est requis" });
		}

		console.log("Requête d'analyse reçue pour le texte:", text);

		// Analyser les émotions avec Gemini AI
		const emotions = await analyzeEmotionsWithGemini(genAI, text);

		// Sauvegarder l'analyse dans la base de données si possible
		let id = Date.now().toString();
		if (pool) {
			try {
				const result = await pool.query(
					"INSERT INTO text_analysis (text, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
					[text, emotions, req.body.userId || null]
				);
				id = result.rows[0].id;
				console.log("Analyse sauvegardée dans la base de données avec ID:", id);
			} catch (dbError) {
				console.error("Erreur lors de la sauvegarde de l'analyse:", dbError);
			}
		}
		// Renvoyer les résultats
		res.json({
			id,
			text,
			emotions,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de l'analyse des émotions:", error);
		res.status(500).json({
			error: "Erreur lors de l'analyse des émotions",
			details: error.message,
			text: req.body.text,
		});
	}
});

// Récupérer l'historique des analyses de texte
router.get("/history", async (req, res) => {
	try {
		const { userId } = req.query;
		const pool = req.app.locals.pool;

		if (!pool) {
			return res.json([]);
		}

		let query = "SELECT * FROM text_analysis";
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

// Supprimer une analyse de texte
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const pool = req.app.locals.pool;

		if (!pool) {
			return res.status(404).json({ error: "Base de données non disponible" });
		}

		const result = await pool.query(
			"DELETE FROM text_analysis WHERE id = $1 RETURNING id",
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
