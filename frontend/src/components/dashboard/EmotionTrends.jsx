"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getEmotionColor } from "../../utils/colors"

function EmotionTrends() {
  const [trendsData, setTrendsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [timeRange, setTimeRange] = useState("24h")

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await axios.get("/api/dashboard/stats")

        if (response.data && response.data.trends) {
          // Formater les données pour le graphique
          const formattedData = response.data.trends.map((item) => ({
            time: new Date(item.hour).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            joy: Number.parseFloat(item.joy || 0).toFixed(2),
            sadness: Number.parseFloat(item.sadness || 0).toFixed(2),
            anger: Number.parseFloat(item.anger || 0).toFixed(2),
            fear: Number.parseFloat(item.fear || 0).toFixed(2),
            surprise: Number.parseFloat(item.surprise || 0).toFixed(2),
          }))

          setTrendsData(formattedData)
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des tendances:", err)
        setError("Impossible de charger les tendances émotionnelles")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrends()

    // Rafraîchir les données toutes les 5 minutes
    const interval = setInterval(fetchTrends, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [timeRange])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tendances émotionnelles</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tendances émotionnelles</h2>
        <div className="text-red-600 text-center py-8">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tendances émotionnelles</h2>

        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setTimeRange("24h")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === "24h" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            24h
          </button>
          <button
            type="button"
            onClick={() => setTimeRange("7d")}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === "7d" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            7 jours
          </button>
          <button
            type="button"
            onClick={() => setTimeRange("30d")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === "30d" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            30 jours
          </button>
        </div>
      </div>

      {trendsData.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Aucune donnée disponible pour cette période</div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="joy" stroke={getEmotionColor("joy")} name="Joie" />
              <Line type="monotone" dataKey="sadness" stroke={getEmotionColor("sadness")} name="Tristesse" />
              <Line type="monotone" dataKey="anger" stroke={getEmotionColor("anger")} name="Colère" />
              <Line type="monotone" dataKey="fear" stroke={getEmotionColor("fear")} name="Peur" />
              <Line type="monotone" dataKey="surprise" stroke={getEmotionColor("surprise")} name="Surprise" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Ces tendances représentent l'évolution des émotions détectées au cours du temps, toutes analyses confondues.
      </div>
    </div>
  )
}

export default EmotionTrends
