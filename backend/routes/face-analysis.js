import express from "express";
import { analyzeFaceBuffer, analyzeFaceWebcam, upload } from "../services/face-service.js"; 

const router = express.Router();

//  Analyser les émotions dans une image faciale (upload formulaire)
router.post("/analyze", upload.single("imageFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image requise" });
    }

    const { buffer, originalname, mimetype } = req.file;
    const userId = req.body.userId || null;

    try {
      // Analyse de l'image depuis le buffer mémoire
      const result = await analyzeFaceBuffer(buffer, originalname, mimetype);

      //  Enregistrement en base si besoin :
      // const dbResult = await pool.query(
      //   "INSERT INTO face_analysis (file_path, emotions, user_id) VALUES ($1, $2, $3) RETURNING id",
      //   [result.fileName, result.emotions, userId]
      // );

      res.json({
        id: 1, // ou dbResult.rows[0].id
        fileName: result.fileName,
        emotions: result.emotions,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erreur analyse faciale:", error);
      res.status(500).json({ error: "Erreur lors de l'analyse faciale" });
    }
  } catch (error) {
    console.error("Erreur dans le routeur:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
});

// Analyse d'une image Base64 (webcam)
router.post("/analyze-webcam", async (req, res) => {
  try {
    const { imageData } = req.body;
    const pool = req.app.locals.pool;

    if (!imageData) {
      return res.status(400).json({ error: "Données d'image requises" });
    }

    const result = await analyzeFaceWebcam(imageData);

    res.json({
      id: 1,
      fileName: result.fileName,
      emotions: result.emotions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur analyse webcam:", error);
    res.status(500).json({ error: "Erreur lors de l'analyse webcam" });
  }
});

// Récupérer l'historique des analyses
router.get("/history", async (req, res) => {
  try {
    const { userId } = req.query;
    const pool = req.app.locals.pool;

    let query = "SELECT * FROM face_analysis";
    const params = [];

    if (userId) {
      query += " WHERE user_id = $1";
      params.push(userId);
    }

    query += " ORDER BY timestamp DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur historique:", error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'historique" });
  }
});

// Supprimer une analyse faciale
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = req.app.locals.pool;

    const result = await pool.query("DELETE FROM face_analysis WHERE id = $1 RETURNING id", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Analyse non trouvée" });
    }

    res.json({ message: "Analyse supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'analyse" });
  }
});

export default router;
