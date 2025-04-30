"use client"

import { useState } from "react"
import FaceAnalyzer from "../components/face/FaceAnalyzer"
import EmotionChart from "../components/EmotionChart"

function FaceAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [imagePath, setImagePath] = useState(null)

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result.emotions)
    setImagePath(result.filePath)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse faciale</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analysez les expressions faciales pour mieux comprendre les émotions et faciliter l'inclusion des personnes
          ayant des difficultés à interpréter les émotions.
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Pourquoi analyser les expressions faciales ?</h2>
        <p className="text-gray-700 mb-4">L'analyse des expressions faciales peut :</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
          <li>Aider les personnes neurodivergentes à mieux comprendre les émotions des autres</li>
          <li>Servir d'outil pédagogique pour développer l'intelligence émotionnelle</li>
          <li>Permettre aux professionnels de l'éducation et de la santé d'évaluer les réactions émotionnelles</li>
          <li>Faciliter la communication pour les personnes ayant des difficultés d'expression verbale</li>
        </ul>
        <p className="text-gray-700 italic">
          Particulièrement utile dans les contextes éducatifs, thérapeutiques ou pour l'inclusion des personnes
          autistes.
        </p>
      </div>

      <FaceAnalyzer onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Résultats de l'analyse</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {imagePath && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Image analysée :</h3>
                  <img src={`/uploads/${imagePath}`} alt="Image analysée" className="w-full rounded-lg shadow-md" />
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Émotions détectées :</h3>
                <EmotionChart emotions={analysisResult} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Interprétation des expressions</h2>
            <div className="space-y-4">
              {analysisResult.joy > 0.3 && (
                <div className="p-4 bg-yellow-50 rounded-md">
                  <h3 className="font-medium text-yellow-800 mb-1">Expression de joie</h3>
                  <p className="text-gray-700">
                    Les signes de joie sont visibles sur le visage, généralement caractérisés par un sourire, des yeux
                    plissés et des pommettes relevées. Cette expression communique du plaisir et de la satisfaction.
                  </p>
                </div>
              )}

              {analysisResult.sadness > 0.3 && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-800 mb-1">Expression de tristesse</h3>
                  <p className="text-gray-700">
                    Les coins de la bouche sont abaissés, les sourcils peuvent être relevés au centre, et les paupières
                    supérieures tombantes. Cette expression communique de la peine ou du chagrin.
                  </p>
                </div>
              )}

              {analysisResult.anger > 0.3 && (
                <div className="p-4 bg-red-50 rounded-md">
                  <h3 className="font-medium text-red-800 mb-1">Expression de colère</h3>
                  <p className="text-gray-700">
                    Les sourcils sont abaissés et rapprochés, les lèvres peuvent être serrées ou retroussées, et le
                    regard est souvent intense. Cette expression communique de la frustration ou de l'hostilité.
                  </p>
                </div>
              )}

              {analysisResult.fear > 0.3 && (
                <div className="p-4 bg-purple-50 rounded-md">
                  <h3 className="font-medium text-purple-800 mb-1">Expression de peur</h3>
                  <p className="text-gray-700">
                    Les yeux sont écarquillés, les sourcils relevés et rapprochés, et la bouche peut être ouverte. Cette
                    expression communique de l'appréhension ou de l'anxiété.
                  </p>
                </div>
              )}

              {analysisResult.surprise > 0.3 && (
                <div className="p-4 bg-teal-50 rounded-md">
                  <h3 className="font-medium text-teal-800 mb-1">Expression de surprise</h3>
                  <p className="text-gray-700">
                    Les sourcils sont relevés, les yeux grands ouverts et la bouche souvent ouverte en forme de O. Cette
                    expression communique de l'étonnement face à quelque chose d'inattendu.
                  </p>
                </div>
              )}

              {Object.values(analysisResult).every((val) => val < 0.3) && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-1">Expression neutre</h3>
                  <p className="text-gray-700">
                    Le visage présente peu de signes émotionnels marqués, avec une expression relativement neutre ou au
                    repos.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Applications pratiques</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-indigo-50 rounded-md">
                <h3 className="font-medium text-indigo-800 mb-2">Pour l'éducation inclusive</h3>
                <p className="text-gray-700">
                  Cet outil peut aider les enfants autistes ou ayant des difficultés à reconnaître les émotions à
                  s'entraîner et à développer leurs compétences sociales dans un environnement sécurisé.
                </p>
              </div>

              <div className="p-4 bg-pink-50 rounded-md">
                <h3 className="font-medium text-pink-800 mb-2">Pour la thérapie</h3>
                <p className="text-gray-700">
                  Les thérapeutes peuvent utiliser cette analyse pour aider leurs patients à prendre conscience de leurs
                  expressions faciales et à mieux communiquer leurs émotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FaceAnalysis
