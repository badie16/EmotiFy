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
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse de dialogues en chat</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Identifiez les signaux de détresse ou de harcèlement dans les conversations pour prévenir les risques et
          protéger les personnes vulnérables.
        </p>
      </div>

      <div className="bg-orange-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Pourquoi analyser les conversations ?</h2>
        <p className="text-gray-700 mb-4">L'analyse des dialogues en chat permet de :</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
          <li>Détecter les signaux précoces de détresse psychologique</li>
          <li>Identifier les situations de harcèlement ou d'intimidation</li>
          <li>Repérer les comportements à risque comme les idées suicidaires</li>
          <li>Améliorer la modération des espaces de discussion</li>
        </ul>
        <p className="text-gray-700 italic">
          Particulièrement utile pour les plateformes de chat, les écoles, les services d'assistance et les
          organisations de prévention.
        </p>
      </div>

      <ChatAnalyzer onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Résultats de l'analyse</h2>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Conversation analysée :</h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-line">{conversation}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Émotions détectées :</h3>
                <EmotionChart emotions={analysisResult.emotions} />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Signaux d'alerte :</h3>
                {analysisResult.flags && (
                  <div className="space-y-3 mt-4">
                    {Object.entries(analysisResult.flags).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          <span className={value > 0.5 ? "text-red-600 font-medium" : "text-gray-600"}>
                            {Math.round(value * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              value < 0.3 ? "bg-green-500" : value < 0.7 ? "bg-yellow-500" : "bg-red-500"
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Interprétation et recommandations</h2>

            {analysisResult.flags && analysisResult.flags.suicidal > 0.5 && (
              <div className="p-4 bg-red-50 rounded-md mb-4 border-l-4 border-red-500">
                <h3 className="font-bold text-red-800 mb-1">⚠️ ALERTE : Risque suicidaire détecté</h3>
                <p className="text-gray-700 mb-2">
                  Cette conversation contient des signaux qui pourraient indiquer des idées suicidaires. Une
                  intervention immédiate est recommandée.
                </p>
                <div className="bg-white p-3 rounded-md">
                  <h4 className="font-medium text-gray-800 mb-1">Actions recommandées :</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Contacter immédiatement les services d'urgence si vous connaissez l'identité de la personne</li>
                    <li>Fournir les ressources d'aide comme les numéros de prévention du suicide</li>
                    <li>Ne pas laisser la personne seule et maintenir un dialogue bienveillant</li>
                  </ul>
                  <p className="mt-2 text-sm font-medium">
                    Numéro national de prévention du suicide : 3114 (France) - 988 (USA)
                  </p>
                </div>
              </div>
            )}

            {analysisResult.flags && analysisResult.flags.harassment > 0.7 && (
              <div className="p-4 bg-orange-50 rounded-md mb-4">
                <h3 className="font-medium text-orange-800 mb-1">Signes de harcèlement détectés</h3>
                <p className="text-gray-700 mb-2">
                  La conversation présente des caractéristiques de harcèlement ou d'intimidation qui nécessitent une
                  attention.
                </p>
                <h4 className="font-medium text-gray-700 mb-1">Actions recommandées :</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Intervenir pour mettre fin aux comportements inappropriés</li>
                  <li>Soutenir la personne ciblée et lui offrir des ressources d'aide</li>
                  <li>Appliquer les mesures de modération prévues dans vos règles de communauté</li>
                </ul>
              </div>
            )}

            {analysisResult.flags && analysisResult.flags.distress > 0.6 && (
              <div className="p-4 bg-yellow-50 rounded-md mb-4">
                <h3 className="font-medium text-yellow-800 mb-1">Signes de détresse émotionnelle</h3>
                <p className="text-gray-700">
                  La conversation révèle un niveau significatif de détresse émotionnelle qui pourrait nécessiter un
                  soutien ou une intervention.
                </p>
              </div>
            )}

            <div className="p-4 bg-indigo-50 rounded-md">
              <h3 className="font-medium text-indigo-800 mb-2">Bonnes pratiques pour la prévention</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">Formation des modérateurs</span> - Formez votre équipe à reconnaître les
                  signaux de détresse et à intervenir de manière appropriée.
                </li>
                <li>
                  <span className="font-medium">Ressources d'aide accessibles</span> - Mettez en évidence les ressources
                  d'aide et de soutien sur votre plateforme.
                </li>
                <li>
                  <span className="font-medium">Protocoles d'intervention</span> - Établissez des procédures claires
                  pour les situations d'urgence.
                </li>
                <li>
                  <span className="font-medium">Suivi régulier</span> - Utilisez des outils d'analyse comme celui-ci
                  pour surveiller régulièrement les conversations à risque.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatAnalysis
