import express from "express"
import path from "path"
import fs from "fs"
import { analyzeFaceEmotions } from "../services/face-service.js"

const router = express.Router()

// Analyser les émotions dans une image faciale
router.post("/analyze", async (req, res) => {
  try {
    const upload = req.app.locals.upload
    const pool = req.app.locals.pool

    // Utiliser multer pour gérer l'upload de l'image
    upload.single("imageFile")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Erreur lors de l'upload de l'image" })
      }

      if (!req.file) {
        return res.status(400).json({ error: "Image requise" })
      }

      const filePath = req.file.path
      const userId = req.body.userId || null

      try {
        // Analyser les émotions faciales
        const emotions = await analyzeFaceEmotions(filePath)

        // Sauvegarder l'analyse dans la base de données
        const result = await pool.query(
          "INSERT INTO face_analysis (file_path, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
          [filePath, emotions, userId],
        )

        // Renvoyer les résultats
        res.json({
          id: result.rows[0].id,
          filePath: path.basename(filePath),
          emotions,
          timestamp: new Date().toISOString(),
        })
      } catch (error) {
        console.error("Erreur lors de l'analyse faciale:", error)
        res.status(500).json({ error: "Erreur lors de l'analyse faciale" })
      }
    })
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
    const uploadsDir = req.app.locals.uploadsDir

    if (!imageData) {
      return res.status(400).json({ error: "Données d'image requises" })
    }

    // Convertir l'image base64 en buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Sauvegarder temporairement l'image
    const fileName = `webcam-${Date.now()}.jpg`
    const filePath = path.join(uploadsDir, fileName)

    // Écrire le fichier
    fs.writeFileSync(filePath, buffer)

    // Analyser les émotions faciales
    const emotions = await analyzeFaceEmotions(filePath)

    // Sauvegarder l'analyse dans la base de données
    const result = await pool.query(
      "INSERT INTO face_analysis (file_path, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
      [filePath, emotions, req.body.userId || null],
    )

    // Renvoyer les résultats
    res.json({
      id: result.rows[0].id,
      filePath: fileName,
      emotions,
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
