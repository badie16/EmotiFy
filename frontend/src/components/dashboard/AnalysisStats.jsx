"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { getEmotionColor } from "../../utils/colors"

function AnalysisStats() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await axios.get("/api/dashboard/stats")

        if (response.data) {
          setStats(response.data)
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques:", err)
        setError("Impossible de charger les statistiques")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques d'analyse</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques d'analyse</h2>
        <div className="text-red-600 text-center py-8">{error}</div>
      </div>
    )
  }

  // Préparer les données pour le graphique des types d'analyse
  const analysisTypeData = stats
    ? [
        { name: "Texte", value: Number.parseInt(stats.counts.text_count) || 0 },
        { name: "Voix", value: Number.parseInt(stats.counts.voice_count) || 0 },
        { name: "Visage", value: Number.parseInt(stats.counts.face_count) || 0 },
        { name: "Réseaux sociaux", value: Number.parseInt(stats.counts.social_count) || 0 },
        { name: "Chat", value: Number.parseInt(stats.counts.chat_count) || 0 },
      ].filter((item) => item.value > 0)
    : []

  // Préparer les données pour le graphique des émotions moyennes
  const averageEmotionsData =
    stats && stats.averageEmotions
      ? [
          { name: "Joie", value: Number.parseFloat(stats.averageEmotions.avg_joy) || 0 },
          { name: "Tristesse", value: Number.parseFloat(stats.averageEmotions.avg_sadness) || 0 },
          { name: "Colère", value: Number.parseFloat(stats.averageEmotions.avg_anger) || 0 },
          { name: "Peur", value: Number.parseFloat(stats.averageEmotions.avg_fear) || 0 },
          { name: "Surprise", value: Number.parseFloat(stats.averageEmotions.avg_surprise) || 0 },
        ].filter((item) => item.value > 0)
      : []

  // Couleurs pour le graphique des types d'analyse
  const ANALYSIS_COLORS = ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981"]

  // Fonction pour formater les valeurs dans le tooltip
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value.toFixed(2)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Statistiques d'analyse</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Graphique des types d'analyse */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Répartition des analyses</h3>
          {analysisTypeData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Aucune donnée disponible</div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysisTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analysisTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ANALYSIS_COLORS[index % ANALYSIS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Graphique des émotions moyennes */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Émotions moyennes</h3>
          {averageEmotionsData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Aucune donnée disponible</div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={averageEmotionsData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {averageEmotionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getEmotionColor(entry.name.toLowerCase())} />
                    ))}
                  </Pie>
                  <Tooltip content={renderCustomTooltip} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-5 gap-4">
        <div className="bg-indigo-50 p-4 rounded-md text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {stats ? Number.parseInt(stats.counts.text_count) || 0 : 0}
          </div>
          <div className="text-sm text-gray-600">Analyses de texte</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-md text-center">
          <div className="text-3xl font-bold text-purple-600">
            {stats ? Number.parseInt(stats.counts.voice_count) || 0 : 0}
          </div>
          <div className="text-sm text-gray-600">Analyses vocales</div>
        </div>

        <div className="bg-pink-50 p-4 rounded-md text-center">
          <div className="text-3xl font-bold text-pink-600">
            {stats ? Number.parseInt(stats.counts.face_count) || 0 : 0}
          </div>
          <div className="text-sm text-gray-600">Analyses faciales</div>
        </div>

        <div className="bg-amber-50 p-4 rounded-md text-center">
          <div className="text-3xl font-bold text-amber-600">
            {stats ? Number.parseInt(stats.counts.social_count) || 0 : 0}
          </div>
          <div className="text-sm text-gray-600">Analyses sociales</div>
        </div>

        <div className="bg-green-50 p-4 rounded-md text-center">
          <div className="text-3xl font-bold text-green-600">
            {stats ? Number.parseInt(stats.counts.chat_count) || 0 : 0}
          </div>
          <div className="text-sm text-gray-600">Analyses de chat</div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisStats
