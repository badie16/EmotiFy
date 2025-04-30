import express from "express"
import path from "path"
import { analyzeVoiceEmotions } from "../services/voice-service.js"

const router = express.Router()

// Analyser les émotions dans un fichier audio
router.post("/analyze", async (req, res) => {
  try {
    const upload = req.app.locals.upload
    const pool = req.app.locals.pool

    // Utiliser multer pour gérer l'upload du fichier audio
    upload.single("audioFile")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Erreur lors de l'upload du fichier audio" })
      }

      if (!req.file) {
        return res.status(400).json({ error: "Fichier audio requis" })
      }

      const filePath = req.file.path
      const userId = req.body.userId || null

      try {
        // Analyser les émotions dans la voix
        const emotions = await analyzeVoiceEmotions(filePath)

        // Sauvegarder l'analyse dans la base de données
        const result = await pool.query(
          "INSERT INTO voice_analysis (file_path, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
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
        console.error("Erreur lors de l'analyse vocale:", error)
        res.status(500).json({ error: "Erreur lors de l'analyse vocale" })
      }
    })
  } catch (error) {
    console.error("Erreur lors de l'analyse vocale:", error)
    res.status(500).json({ error: "Erreur lors de l'analyse vocale" })
  }
})

// Récupérer l'historique des analyses vocales
router.get("/history", async (req, res) => {
  try {
    const { userId } = req.query
    const pool = req.app.locals.pool

    let query = "SELECT * FROM voice_analysis"
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

// Supprimer une analyse vocale
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const pool = req.app.locals.pool

    const result = await pool.query("DELETE FROM voice_analysis WHERE id = $1 RETURNING id, file_path", [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Analyse non trouvée" })
    }

    // Supprimer le fichier audio associé
    // Note: Dans une application de production, vous voudriez peut-être vérifier si d'autres enregistrements utilisent ce fichier
    // const filePath = result.rows[0].file_path
    // fs.unlinkSync(filePath)

    res.json({ message: "Analyse supprimée avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'analyse:", error)
    res.status(500).json({ error: "Erreur lors de la suppression de l'analyse" })
  }
})

export default router
