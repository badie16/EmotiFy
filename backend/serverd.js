import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Pool } from "pg"
import OpenAI from "openai" // ✅ Ajout ici

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.connect((err, client, release) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err)
  } else {
    console.log("Connexion à la base de données établie")
    release()
  }
})

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
    `)
    console.log("Table emotion_analysis initialisée")
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error)
  }
}

// ✅ Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

initDatabase()

// ✅ Nouvelle route avec OpenAI
app.post("/api/analyze", async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: "Le texte est requis" })
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Tu es un analyseur d'émotions. Donne les scores (de 0 à 100) pour chaque émotion suivante dans le texte donné : amour, tristesse, joie, colère, peur, surprise, neutralité. Retourne uniquement un objet JSON avec les émotions comme clés.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    })

    const raw = response.choices[0].message.content

    let emotions
    try {
      emotions = JSON.parse(raw) // ✅ Essayons de parser si possible
    } catch (e) {
      return res.status(500).json({ error: "La réponse n'est pas un JSON valide", raw })
    }

    res.json({
      text,
      emotions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erreur OpenAI:", error)
    res.status(500).json({ error: "Erreur lors de l'analyse OpenAI" })
  }
})
