import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pool } from "pg";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configuration de la base de données Supabase
const pool = new Pool({
	connectionString: process.env.SUPABASE_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false,
	},
});

// Vérifier la connexion à la base de données
// pool.connect((err, client, release) => {
// 	if (err) {
// 		console.error("Erreur de connexion à la base de données:", err);
// 	} else {
// 		console.log("Connexion à la base de données établie");
// 		release();
// 	}
// });

// Créer la table pour l'historique si elle n'existe pas
async function initDatabase() {
	try {
		await pool.query(`
      CREATE TABLE IF NOT EXISTS emotion_analysis (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        emotions JSONB NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);
		console.log("Table emotion_analysis initialisée");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
	}
}

// initDatabase();

// Fonction pour analyser les émotions avec Gemini AI
async function analyzeEmotionsWithGemini(textInput) {
	console.log("zdef");
	try {
		// Utiliser le modèle Gemini Pro
		const model = genAI.getGenerativeModel({
			model: "models/gemini-1.5-flash",
		});

		// Prompt pour l'analyse des émotions
		const prompt =
			`
    Analyse le texte suivant et identifie les émotions présentes avec leur intensité sur une échelle de 0 à 1.
    Texte: ` +
			textInput +
			`
    
    Réponds uniquement avec un objet JSON contenant les émotions détectées et leur score, comme cet exemple:
    {
      "joy": 0.8,
      "sadness": 0.1,
      "anger": 0.05,
      "fear": 0.02,
      "surprise": 0.03
    }
    
    Inclus uniquement les émotions suivantes si elles sont présentes: joy, sadness, anger, fear, surprise, disgust, neutral, love, admiration, approval, caring, confusion, curiosity, desire, disappointment, disapproval, embarrassment, excitement, gratitude, grief, nervousness, optimism, pride, realization, relief, remorse, annoyance, amusement.
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Extraire l'objet JSON de la réponse
		console.log("Réponse brute de Gemini:", text);

		const jsonMatch = text.match(/{[\s\S]*}/);

		if (jsonMatch) {
			return JSON.parse(jsonMatch[0]);
		} else {
			throw new Error("Format de réponse invalide");
		}
	} catch (error) {
		console.error("Erreur lors de l'analyse avec Gemini:", error);
		throw error;
	}
}

// Route pour analyser les émotions
app.post("/api/analyze", async (req, res) => {
	try {
		const { text } = req.body;

		if (!text) {
			return res.status(400).json({ error: "Le texte est requis" });
		}

		// Analyser les émotions avec Gemini AI
		const emotions = await analyzeEmotionsWithGemini(text);

		// Renvoyer les résultats
		res.json({
			text,
			emotions,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de l'analyse des émotions:", error);
		res.status(500).json({ error: "Erreur lors de l'analyse des émotions" });
	}
});

// Route pour sauvegarder une analyse dans l'historique
// app.post("/api/history", async (req, res) => {
// 	try {
// 		const { text, emotions, timestamp, userId } = req.body;

// 		const result = await pool.query(
// 			"INSERT INTO emotion_analysis (text, emotions, timestamp, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
// 			[text, emotions, timestamp, userId || null]
// 		);

// 		res.status(201).json({
// 			id: result.rows[0].id,
// 			message: "Analyse sauvegardée avec succès",
// 		});
// 	} catch (error) {
// 		console.error("Erreur lors de la sauvegarde de l'analyse:", error);
// 		res
// 			.status(500)
// 			.json({ error: "Erreur lors de la sauvegarde de l'analyse" });
// 	}
// });

// // Route pour récupérer l'historique des analyses
// app.get("/api/history", async (req, res) => {
// 	try {
// 		const { userId } = req.query;

// 		let query = "SELECT * FROM emotion_analysis";
// 		let params = [];

// 		if (userId) {
// 			query += " WHERE user_id = $1";
// 			params.push(userId);
// 		}

// 		query += " ORDER BY timestamp DESC";

// 		const result = await pool.query(query, params);

// 		res.json(result.rows);
// 	} catch (error) {
// 		console.error("Erreur lors de la récupération de l'historique:", error);
// 		res
// 			.status(500)
// 			.json({ error: "Erreur lors de la récupération de l'historique" });
// 	}
// });

// // Route pour supprimer une analyse de l'historique
// app.delete("/api/history/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const result = await pool.query(
// 			"DELETE FROM emotion_analysis WHERE id = $1 RETURNING id",
// 			[id]
// 		);

// 		if (result.rowCount === 0) {
// 			return res.status(404).json({ error: "Analyse non trouvée" });
// 		}

// 		res.json({ message: "Analyse supprimée avec succès" });
// 	} catch (error) {
// 		console.error("Erreur lors de la suppression de l'analyse:", error);
// 		res
// 			.status(500)
// 			.json({ error: "Erreur lors de la suppression de l'analyse" });
// 	}
// });

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
