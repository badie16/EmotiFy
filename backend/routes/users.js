import express from "express"

const router = express.Router()

// Créer ou mettre à jour un utilisateur
router.post("/", async (req, res) => {
  try {
    const { authId, username, email, profileData } = req.body
    const pool = req.app.locals.pool

    if (!authId) {
      return res.status(400).json({ error: "ID d'authentification requis" })
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await pool.query("SELECT * FROM users WHERE auth_id = $1", [authId])

    if (existingUser.rows.length > 0) {
      // Mettre à jour l'utilisateur existant
      const result = await pool.query(
        "UPDATE users SET username = $1, email = $2, profile_data = $3 WHERE auth_id = $4 RETURNING *",
        [username, email, profileData || {}, authId],
      )

      return res.json(result.rows[0])
    } else {
      // Créer un nouvel utilisateur
      const result = await pool.query(
        "INSERT INTO users (auth_id, username, email, profile_data) VALUES ($1, $2, $3, $4) RETURNING *",
        [authId, username, email, profileData || {}],
      )

      return res.status(201).json(result.rows[0])
    }
  } catch (error) {
    console.error("Erreur lors de la création/mise à jour de l'utilisateur:", error)
    res.status(500).json({ error: "Erreur lors de la création/mise à jour de l'utilisateur" })
  }
})

// Récupérer un utilisateur par son ID d'authentification
router.get("/:authId", async (req, res) => {
  try {
    const { authId } = req.params
    const pool = req.app.locals.pool

    const result = await pool.query("SELECT * FROM users WHERE auth_id = $1", [authId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" })
  }
})

// Récupérer les statistiques d'un utilisateur
router.get("/:authId/stats", async (req, res) => {
  try {
    const { authId } = req.params
    const pool = req.app.locals.pool

    // Vérifier que l'utilisateur existe
    const userResult = await pool.query("SELECT id FROM users WHERE auth_id = $1", [authId])

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" })
    }

    // Récupérer les statistiques de l'utilisateur
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM text_analysis WHERE user_id = $1) AS text_count,
        (SELECT COUNT(*) FROM voice_analysis WHERE user_id = $1) AS voice_count,
        (SELECT COUNT(*) FROM face_analysis WHERE user_id = $1) AS face_count,
        (SELECT COUNT(*) FROM social_analysis WHERE user_id = $1) AS social_count,
        (SELECT COUNT(*) FROM chat_analysis WHERE user_id = $1) AS chat_count
    `

    const statsResult = await pool.query(statsQuery, [authId])

    res.json(statsResult.rows[0])
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" })
  }
})

export default router
