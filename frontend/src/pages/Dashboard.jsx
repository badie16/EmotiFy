"use client"

import { useState } from "react"
import EmotionTrends from "../components/dashboard/EmotionTrends"
import AnalysisStats from "../components/dashboard/AnalysisStats"

function Dashboard() {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord émotionnel</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visualisez les tendances émotionnelles globales pour mieux comprendre l'état émotionnel collectif et anticiper
          les besoins sociaux.
        </p>
      </div>

      <div className="bg-violet-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Pourquoi un tableau de bord émotionnel ?</h2>
        <p className="text-gray-700 mb-4">Ce tableau de bord agrège les données émotionnelles anonymisées pour :</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
          <li>Visualiser les tendances émotionnelles collectives</li>
          <li>Identifier les changements significatifs dans le climat émotionnel</li>
          <li>Fournir des insights pour les chercheurs et les décideurs</li>
          <li>Anticiper les besoins en matière de santé mentale et de soutien social</li>
        </ul>
        <p className="text-gray-700 italic">
          Toutes les données sont anonymisées et agrégées pour garantir la confidentialité des utilisateurs.
        </p>
      </div>

      <div className="mb-6 flex justify-end">
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

      <div className="space-y-8">
        <AnalysisStats />

        <EmotionTrends />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Alertes et insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
                <h3 className="font-medium text-yellow-800 mb-1">Hausse de l'anxiété détectée</h3>
                <p className="text-gray-700">
                  Une augmentation de 15% des marqueurs d'anxiété a été observée au cours des dernières 24 heures.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-md border-l-4 border-green-400">
                <h3 className="font-medium text-green-800 mb-1">Tendance positive</h3>
                <p className="text-gray-700">
                  Les émotions positives sont en hausse de 8% par rapport à la semaine dernière.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-400">
                <h3 className="font-medium text-blue-800 mb-1">Insight</h3>
                <p className="text-gray-700">
                  Les analyses faciales montrent une plus grande variabilité émotionnelle que les analyses textuelles,
                  suggérant une expression émotionnelle plus riche visuellement.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommandations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-md">
                <h3 className="font-medium text-indigo-800 mb-1">Campagne de sensibilisation</h3>
                <p className="text-gray-700">
                  Considérant la hausse des marqueurs d'anxiété, une campagne de sensibilisation sur la gestion du
                  stress pourrait être bénéfique.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-md">
                <h3 className="font-medium text-purple-800 mb-1">Ressources supplémentaires</h3>
                <p className="text-gray-700">
                  Envisagez d'augmenter les ressources disponibles pour l'analyse faciale, qui montre une adoption
                  croissante.
                </p>
              </div>

              <div className="p-4 bg-pink-50 rounded-md">
                <h3 className="font-medium text-pink-800 mb-1">Recherche collaborative</h3>
                <p className="text-gray-700">
                  Les données suggèrent une opportunité de collaboration avec des chercheurs en psychologie pour
                  approfondir l'analyse des tendances émotionnelles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Impact social</h2>
          <p className="text-gray-700 mb-6">
            Les données émotionnelles agrégées peuvent contribuer à des initiatives sociales importantes :
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Santé publique</h3>
              <p className="text-gray-700">
                Anticiper les besoins en santé mentale et adapter les ressources disponibles en fonction des tendances
                émotionnelles.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Éducation</h3>
              <p className="text-gray-700">
                Développer des programmes d'intelligence émotionnelle basés sur les données réelles des interactions
                sociales.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-md">
              <h3 className="font-medium text-purple-800 mb-2">Inclusion</h3>
              <p className="text-gray-700">
                Identifier les groupes qui pourraient bénéficier d'un soutien supplémentaire en matière de communication
                émotionnelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
