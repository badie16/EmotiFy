"use client"

import { useState } from "react"
import ChatAnalyzer from "../components/chat/ChatAnalyzer"
import EmotionChart from "../components/EmotionChart"

function ChatAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [conversation, setConversation] = useState("")

  const handleAnalysisComplete = (result) => {
    setAnalysisResult({
      emotions: result.emotions,
      flags: result.flags,
    })
    setConversation(result.conversation)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
      {/* Hero Section */}
      
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              EmotiFy Core
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Analyse <span className="text-cyan-300">de Conversations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Détectez les signaux de détresse, harcèlement et risques dans les conversations pour protéger et prévenir

            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Détection de détresse

              </div>
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Prévention du harcèlement
              </div>
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Analyse émotionnelle              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-cyan-300/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Info Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">🎯</span>
                Pourquoi analyser les conversations ?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm">
                    🔍
                  </span>
                  Détecter les signaux précoces de détresse psychologique
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm">
                    ⚠️
                  </span>
                  Identifier les situations de harcèlement ou d'intimidation
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm">
                    🚨
                  </span>
                  Repérer les comportements à risque comme les idées suicidaires
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 text-sm">
                    🛡️
                  </span>
                  Améliorer la modération des espaces de discussion
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🏢 Cas d'usage</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Plateformes de chat et forums
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                  Établissements scolaires
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Services d'assistance psychologique
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Organisations de prévention
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analyzer Component */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-8 mb-8">
          <ChatAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">📊</span>
                Résultats de l'analyse
              </h2>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center mr-2 text-sm">
                    💬
                  </span>
                  Conversation analysée
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50 max-h-60 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{conversation}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2 text-sm">
                      😊
                    </span>
                    Émotions détectées
                  </h3>
                  <EmotionChart emotions={analysisResult.emotions} />
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-2 text-sm">
                      🚨
                    </span>
                    Signaux d'alerte
                  </h3>
                  {analysisResult.flags && (
                    <div className="space-y-4">
                      {Object.entries(analysisResult.flags).map(([key, value]) => (
                        <div key={key} className="bg-white/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium capitalize text-gray-800">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className={`font-bold ${value > 0.5 ? "text-red-600" : "text-gray-600"}`}>
                              {Math.round(value * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${value < 0.3 ? "bg-green-500" : value < 0.7 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">💡</span>
                Interprétation et recommandations
              </h2>

              {analysisResult.flags && analysisResult.flags.suicidal > 0.5 && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-red-800 mb-2 flex items-center">
                    <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-sm">
                      ⚠️
                    </span>
                    ALERTE : Risque suicidaire détecté
                  </h3>
                  <p className="text-red-700 mb-4">
                    Cette conversation contient des signaux qui pourraient indiquer des idées suicidaires. Une
                    intervention immédiate est recommandée.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Actions recommandées :</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>
                        Contacter immédiatement les services d'urgence si vous connaissez l'identité de la personne
                      </li>
                      <li>Fournir les ressources d'aide comme les numéros de prévention du suicide</li>
                      <li>Ne pas laisser la personne seule et maintenir un dialogue bienveillant</li>
                    </ul>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">
                        📞 Numéro national de prévention du suicide : 3114 (France) - 988 (USA)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult.flags && analysisResult.flags.harassment > 0.7 && (
                <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-orange-800 mb-2 flex items-center">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2 text-sm">
                      🛡️
                    </span>
                    Signes de harcèlement détectés
                  </h3>
                  <p className="text-orange-700 mb-3">
                    La conversation présente des caractéristiques de harcèlement ou d'intimidation qui nécessitent une
                    attention.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Actions recommandées :</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Intervenir pour mettre fin aux comportements inappropriés</li>
                      <li>Soutenir la personne ciblée et lui offrir des ressources d'aide</li>
                      <li>Appliquer les mesures de modération prévues dans vos règles de communauté</li>
                    </ul>
                  </div>
                </div>
              )}

              {analysisResult.flags && analysisResult.flags.distress > 0.6 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2 text-sm">
                      😟
                    </span>
                    Signes de détresse émotionnelle
                  </h3>
                  <p className="text-yellow-700">
                    La conversation révèle un niveau significatif de détresse émotionnelle qui pourrait nécessiter un
                    soutien ou une intervention.
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-sm">
                    ✨
                  </span>
                  Bonnes pratiques pour la prévention
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🎓 Formation des modérateurs</h4>
                    <p className="text-sm text-gray-700">
                      Formez votre équipe à reconnaître les signaux de détresse et à intervenir de manière appropriée.
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🆘 Ressources d'aide accessibles</h4>
                    <p className="text-sm text-gray-700">
                      Mettez en évidence les ressources d'aide et de soutien sur votre plateforme.
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">📋 Protocoles d'intervention</h4>
                    <p className="text-sm text-gray-700">
                      Établissez des procédures claires pour les situations d'urgence.
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">📊 Suivi régulier</h4>
                    <p className="text-sm text-gray-700">
                      Utilisez des outils d'analyse comme celui-ci pour surveiller régulièrement les conversations à
                      risque.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatAnalysis
