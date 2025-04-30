import express from "express"

const router = express.Router()

// Récupérer les statistiques globales pour le tableau de bord
router.get("/stats", async (req, res) => {
  try {
    const pool = req.app.locals.pool

    // Récupérer le nombre total d'analyses par type
    const countQuery = `
      SELECT 
        (SELECT COUNT(*) FROM text_analysis) AS text_count,
        (SELECT COUNT(*) FROM voice_analysis) AS voice_count,
        (SELECT COUNT(*) FROM face_analysis) AS face_count,
        (SELECT COUNT(*) FROM social_analysis) AS social_count,
        (SELECT COUNT(*) FROM chat_analysis) AS chat_count
    `

    // Récupérer les émotions moyennes globales
    const emotionsQuery = `
      WITH all_emotions AS (
        SELECT emotions FROM text_analysis
        UNION ALL
        SELECT emotions FROM voice_analysis
        UNION ALL
        SELECT emotions FROM face_analysis
        UNION ALL
        SELECT emotions FROM social_analysis
        UNION ALL
        SELECT emotions FROM chat_analysis
      )
      SELECT 
        AVG((emotions->>'joy')::float) AS avg_joy,
        AVG((emotions->>'sadness')::float) AS avg_sadness,
        AVG((emotions->>'anger')::float) AS avg_anger,
        AVG((emotions->>'fear')::float) AS avg_fear,
        AVG((emotions->>'surprise')::float) AS avg_surprise
      FROM all_emotions
    `

    // Récupérer les tendances récentes (dernières 24h)
    const trendsQuery = `
      WITH recent_emotions AS (
        SELECT emotions, timestamp FROM text_analysis WHERE timestamp > NOW() - INTERVAL '24 hours'
        UNION ALL
        SELECT emotions, timestamp FROM voice_analysis WHERE timestamp > NOW() - INTERVAL '24 hours'
        UNION ALL
        SELECT emotions, timestamp FROM face_analysis WHERE timestamp > NOW() - INTERVAL '24 hours'
        UNION ALL
        SELECT emotions, timestamp FROM social_analysis WHERE timestamp > NOW() - INTERVAL '24 hours'
        UNION ALL
        SELECT emotions, timestamp FROM chat_analysis WHERE timestamp > NOW() - INTERVAL '24 hours'
      )
      SELECT 
        date_trunc('hour', timestamp) AS hour,
        AVG((emotions->>'joy')::float) AS joy,
        AVG((emotions->>'sadness')::float) AS sadness,
        AVG((emotions->>'anger')::float) AS anger,
        AVG((emotions->>'fear')::float) AS fear,
        AVG((emotions->>'surprise')::float) AS surprise
      FROM recent_emotions
      GROUP BY hour
      ORDER BY hour
    `

    // Exécuter les requêtes
    const countResult = await pool.query(countQuery)
    const emotionsResult = await pool.query(emotionsQuery)
    const trendsResult = await pool.query(trendsQuery)

    // Renvoyer les résultats
    res.json({
      counts: countResult.rows[0],
      averageEmotions: emotionsResult.rows[0],
      trends: trendsResult.rows,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" })
  }
})

// Récupérer les données pour un type d'analyse spécifique
router.get("/stats/:type", async (req, res) => {
  try {
    const { type } = req.params
    const pool = req.app.locals.pool

    // Vérifier que le type est valide
    const validTypes = ["text", "voice", "face", "social", "chat"]
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Type d'analyse invalide" })
    }

    const tableName = `${type}_analysis`

    // Récupérer les statistiques pour ce type d'analyse
    const query = `
      SELECT 
        COUNT(*) AS total_count,
        AVG((emotions->>'joy')::float) AS avg_joy,
        AVG((emotions->>'sadness')::float) AS avg_sadness,
        AVG((emotions->>'anger')::float) AS avg_anger,
        AVG((emotions->>'fear')::float) AS avg_fear,
        AVG((emotions->>'surprise')::float) AS avg_surprise
      FROM ${tableName}
    `

    // Récupérer les tendances récentes pour ce type
    const trendsQuery = `
      SELECT 
        date_trunc('day', timestamp) AS day,
        COUNT(*) AS count,
        AVG((emotions->>'joy')::float) AS joy,
        AVG((emotions->>'sadness')::float) AS sadness,
        AVG((emotions->>'anger')::float) AS anger,
        AVG((emotions->>'fear')::float) AS fear,
        AVG((emotions->>'surprise')::float) AS surprise
      FROM ${tableName}
      WHERE timestamp > NOW() - INTERVAL '30 days'
      GROUP BY day
      ORDER BY day
    `

    // Exécuter les requêtes
    const statsResult = await pool.query(query)
    const trendsResult = await pool.query(trendsQuery)

    // Renvoyer les résultats
    res.json({
      stats: statsResult.rows[0],
      trends: trendsResult.rows,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" })
  }
})

export default router
