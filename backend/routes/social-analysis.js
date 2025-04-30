import express from "express"
import { analyzeSocialMediaEmotions } from "../services/social-service.js"

const router = express.Router()

// Analyser les émotions dans les commentaires des réseaux sociaux
router.post("/analyze", async (req, res) => {
  try {
    const { platform, content, userId } = req.body
    const pool = req.app.locals.pool
    const genAI = req.app.locals.genAI

    if (!platform || !content) {
      return res.status(400).json({ error: "Plateforme et contenu requis" })
    }

    // Analyser les émotions dans les commentaires
    const emotions = await analyzeSocialMediaEmotions(genAI, platform, content)

    // Sauvegarder l'analyse dans la base de données
    const result = await pool.query(
      "INSERT INTO social_analysis (platform, content, emotions, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
      [platform, content, emotions, userId || null],
    )

    // Renvoyer les résultats
    res.json({
      id: result.rows[0].id,
      platform,
      content,
      emotions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erreur lors de l'analyse des réseaux sociaux:", error)
    res.status(500).json({ error: "Erreur lors de l'analyse des réseaux sociaux" })
  }
})

// Récupérer l'historique des analyses de réseaux sociaux
router.get("/history", async (req, res) => {
  try {
    const { userId, platform } = req.query
    const pool = req.app.locals.pool

    let query = "SELECT * FROM social_analysis"
    const params = []
    const conditions = []

    if (userId) {
      conditions.push("user_id = $" + (params.length + 1))
      params.push(userId)
    }

    if (platform) {
      conditions.push("platform = $" + (params.length + 1))
      params.push(platform)
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }

    query += " ORDER BY timestamp DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error)
    res.status(500).json({ error: "Erreur lors de la récupération de l'historique" })
  }
})

// Supprimer une analyse de réseaux sociaux
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const pool = req.app.locals.pool

    const result = await pool.query("DELETE FROM social_analysis WHERE id = $1 RETURNING id", [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Analyse non trouvée" })
    }

    res.json({ message: "Analyse supprimée avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'analyse:", error)
    res.status(500).json({ error: "Erreur lors de la suppression de l'analyse" })
  }
})

export default router
