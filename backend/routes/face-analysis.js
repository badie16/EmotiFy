import express from "express"
import path from "path"
import fs from "fs"
import { analyzeFace, analyzeFaceWebcam, upload } from "../services/face-service.js"

const router = express.Router()
// Analyser les émotions dans une image faciale
router.post("/analyze", upload.single("imageFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image requise" })
    }
    const filePath = req.file.path
    const userId = req.body.userId || null
    try {
      // Analyser les émotions faciales
      const result = await analyzeFace(filePath)
      // Sauvegarder l'analyse dans la base de données si nécessaire
      // const dbResult = await pool.query(
      //   "INSERT INTO face_analysis (file_path, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
      //   [result.filePath, result.emotions, userId],
      // )

      // Renvoyer les résultats avec le chemin de l'image
      res.json({
        id: 1, // ou dbResult.rows[0].id si on utilise la base de données
        filePath: result.filePath,
        emotions: result.emotions,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Erreur lors de l'analyse faciale:", error)
      // En cas d'erreur, supprimer le fichier
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      res.status(500).json({ error: "Erreur lors de l'analyse faciale" })
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse faciale:", error)
    res.status(500).json({ error: "Erreur lors de l'analyse faciale" })
  }
})

// Analyser les émotions à partir d'une webcam (base64 image)
router.post("/analyze-webcam", async (req, res) => {
  try {
    const { imageData } = req.body
    const pool = req.app.locals.pool

    if (!imageData) {
      return res.status(400).json({ error: "Données d'image requises" })
    }

    // Analyser les émotions faciales
    const result = await analyzeFaceWebcam(imageData)

    // Renvoyer les résultats
    res.json({
      id: 1,
      filePath: result.filePath,
      emotions: result.emotions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erreur lors de l'analyse faciale:", error)
    res.status(500).json({ error: "Erreur lors de l'analyse faciale" })
  }
})

// Récupérer l'historique des analyses faciales
router.get("/history", async (req, res) => {
  try {
    const { userId } = req.query
    const pool = req.app.locals.pool

    let query = "SELECT * FROM face_analysis"
    const params = []

    if (userId) {
      query += " WHERE user_id = $1"
      params.push(userId)
    }

    query += " ORDER BY timestamp DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error)
    res.status(500).json({ error: "Erreur lors de la récupération de l'historique" })
  }
})

// Supprimer une analyse faciale
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const pool = req.app.locals.pool

    const result = await pool.query("DELETE FROM face_analysis WHERE id = $1 RETURNING id", [id])

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
