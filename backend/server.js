import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Routes
import textRoutes from "./routes/text-analysis.js";
import voiceRoutes from "./routes/voice-analysis.js";
import faceRoutes from "./routes/face-analysis.js";
import socialRoutes from "./routes/social-analysis.js";
import chatRoutes from "./routes/chat-analysis.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/users.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration du stockage pour les fichiers uploadés
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "uploads");

// Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Variables pour les services AI et DB
let genAI = null;
let pool = null;

// Configuration conditionnelle de Gemini AI
try {
	if (process.env.GEMINI_API_KEY) {
		const { GoogleGenerativeAI } = await import("@google/generative-ai");
		genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
		console.log("Service Gemini AI configuré avec succès");
	} else {
		console.log(
			"Clé API Gemini non configurée. Le service d'analyse émotionnelle sera limité."
		);
	}
} catch (error) {
	console.error("Erreur lors de la configuration de Gemini AI:", error);
}

// Configuration conditionnelle de la base de données
try {
	if (process.env.SUPABASE_CONNECTION_STRING) {
		const { Pool } = await import("pg");
		pool = new Pool({
			connectionString: process.env.SUPABASE_CONNECTION_STRING,
			ssl: {
				rejectUnauthorized: false,
			},
		});

		// Vérifier la connexion à la base de données
		pool.connect((err, client, release) => {
			if (err) {
				console.error("Erreur de connexion à la base de données:", err);
				console.log(
					"L'application fonctionnera en mode local sans persistance des données."
				);
			} else {
				console.log("Connexion à la base de données établie");
				release();

				// Initialiser la base de données
				initDatabase().catch((error) => {
					console.error(
						"Erreur lors de l'initialisation de la base de données:",
						error
					);
				});
			}
		});
	} else {
		console.log(
			"Chaîne de connexion Supabase non configurée. L'application fonctionnera en mode local sans persistance des données."
		);
	}
} catch (error) {
	console.error(
		"Erreur lors de la configuration de la base de données:",
		error
	);
	console.log(
		"L'application fonctionnera en mode local sans persistance des données."
	);
}

// Initialiser la base de données
async function initDatabase() {
	if (!pool) return;

	try {
		// Table pour l'analyse de texte
		await pool.query(`
      CREATE TABLE IF NOT EXISTS text_analysis (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        emotions JSONB NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);

		// Table pour l'analyse vocale
		await pool.query(`
      CREATE TABLE IF NOT EXISTS voice_analysis (
        id SERIAL PRIMARY KEY,
        file_path TEXT NOT NULL,
        emotions JSONB NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);

		// Table pour l'analyse faciale
		await pool.query(`
      CREATE TABLE IF NOT EXISTS face_analysis (
        id SERIAL PRIMARY KEY,
        file_path TEXT NOT NULL,
        emotions JSONB NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);

		// Table pour l'analyse des réseaux sociaux
		await pool.query(`
      CREATE TABLE IF NOT EXISTS social_analysis (
        id SERIAL PRIMARY KEY,
        platform TEXT NOT NULL,
        content TEXT NOT NULL,
        emotions JSONB NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);

		// Table pour l'analyse des chats
		await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_analysis (
        id SERIAL PRIMARY KEY,
        conversation TEXT NOT NULL,
        emotions JSONB NOT NULL,
        flags JSONB,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id TEXT
      )
    `);

		// Table pour les utilisateurs
		await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        auth_id TEXT UNIQUE,
        username TEXT,
        email TEXT UNIQUE,
        profile_data JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

		console.log("Base de données initialisée avec succès");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
	}
}

// Partager les ressources avec les routes
app.locals.pool = pool;
app.locals.genAI = genAI;
app.locals.upload = upload;
app.locals.uploadsDir = uploadsDir;

// Route temporaire pour la compatibilité avec le frontend
// Cette route redirige vers la route correcte /api/text/analyze
app.post("/api/analyze", (req, res) => {
	console.log("Redirection de /api/analyze vers /api/text/analyze");
	// Transférer la requête à la route correcte
	req.url = "/api/text/analyze";
	app._router.handle(req, res);
});

// Routes API
app.use("/api/text", textRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/face", faceRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// Route de test
app.get("/api/health", (req, res) => {
	res.json({
		status: "ok",
		message: "EmotiFy API is running",
		database: pool ? "connected" : "disconnected",
		ai: genAI ? "configured" : "not configured",
	});
});

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
	console.log(`API de test disponible sur http://localhost:${PORT}/api/health`);
	console.log(
		`Mode de fonctionnement: ${!pool || !genAI ? "dégradé" : "complet"}`
	);
});
