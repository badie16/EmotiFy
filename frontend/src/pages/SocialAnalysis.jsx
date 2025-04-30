"use client"

import { useState } from "react"
import SocialMediaAnalyzer from "../components/social/SocialMediaAnalyzer"
import EmotionChart from "../components/EmotionChart"

function SocialAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [platform, setPlatform] = useState("")
  const [content, setContent] = useState("")

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result.emotions)
    setPlatform(result.platform)
    setContent(result.content)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse des réseaux sociaux</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Détectez les tendances émotionnelles et les contenus toxiques dans les commentaires des réseaux sociaux pour
          créer des espaces en ligne plus sains.
        </p>
      </div>

      <div className="bg-amber-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Pourquoi analyser les réseaux sociaux ?</h2>
        <p className="text-gray-700 mb-4">L'analyse émotionnelle des contenus sur les réseaux sociaux permet de :</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
          <li>Détecter les discours haineux et les contenus toxiques</li>
          <li>Comprendre le climat émotionnel autour d'un sujet ou d'une marque</li>
          <li>Identifier les tendances émotionnelles collectives</li>
          <li>Améliorer la modération des communautés en ligne</li>
        </ul>
        <p className="text-gray-700 italic">
          Particulièrement utile pour les gestionnaires de communauté, les marques, les chercheurs en sciences sociales
          et les organisations luttant contre la cyberhaine.
        </p>
      </div>

      <SocialMediaAnalyzer onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Résultats de l'analyse</h2>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Contenu analysé :</h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Plateforme : {platform}</p>
                <p className="text-gray-700 whitespace-pre-line">{content}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Émotions détectées :</h3>
                <EmotionChart emotions={analysisResult} />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Niveau de toxicité :</h3>
                {analysisResult.toxic !== undefined && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          analysisResult.toxic < 0.3
                            ? "bg-green-500"
                            : analysisResult.toxic < 0.7
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${analysisResult.toxic * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Sain</span>
                      <span>Modéré</span>
                      <span>Toxique</span>
                    </div>
                    <p className="mt-4 text-gray-700">
                      {analysisResult.toxic < 0.3
                        ? "Le contenu analysé présente un faible niveau de toxicité."
                        : analysisResult.toxic < 0.7
                          ? "Le contenu analysé présente un niveau modéré de toxicité qui pourrait nécessiter une attention."
                          : "Le contenu analysé présente un niveau élevé de toxicité qui nécessite une intervention."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Interprétation et recommandations</h2>

            {analysisResult.toxic > 0.7 && (
              <div className="p-4 bg-red-50 rounded-md mb-4">
                <h3 className="font-medium text-red-800 mb-1">Alerte de contenu toxique</h3>
                <p className="text-gray-700 mb-2">
                  Le contenu analysé présente un niveau élevé de toxicité qui pourrait nuire à la santé de votre
                  communauté en ligne.
                </p>
                <h4 className="font-medium text-gray-700 mb-1">Actions recommandées :</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Modérer ou supprimer le contenu problématique</li>
                  <li>Contacter l'auteur pour clarifier les règles de la communauté</li>
                  <li>Renforcer les directives de communication bienveillante</li>
                </ul>
              </div>
            )}

            {analysisResult.anger > 0.4 && (
              <div className="p-4 bg-orange-50 rounded-md mb-4">
                <h3 className="font-medium text-orange-800 mb-1">Climat émotionnel tendu</h3>
                <p className="text-gray-700">
                  Le niveau élevé de colère détecté suggère un climat émotionnel tendu qui pourrait s'intensifier. Une
                  médiation ou une intervention préventive pourrait être nécessaire.
                </p>
              </div>
            )}

            {analysisResult.joy > 0.5 && analysisResult.toxic < 0.3 && (
              <div className="p-4 bg-green-50 rounded-md mb-4">
                <h3 className="font-medium text-green-800 mb-1">Engagement positif</h3>
                <p className="text-gray-700">
                  Le contenu génère des émotions majoritairement positives, ce qui est favorable à un engagement sain et
                  constructif dans votre communauté.
                </p>
              </div>
            )}

            <div className="p-4 bg-indigo-50 rounded-md">
              <h3 className="font-medium text-indigo-800 mb-2">Stratégies pour un espace en ligne plus sain</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">Établir des règles claires</span> - Définissez et communiquez des
                  directives précises sur les comportements acceptables.
                </li>
                <li>
                  <span className="font-medium">Modération proactive</span> - Utilisez des outils d'analyse comme
                  celui-ci pour identifier les problèmes avant qu'ils ne s'aggravent.
                </li>
                <li>
                  <span className="font-medium">Encourager la positivité</span> - Valorisez et mettez en avant les
                  contributions constructives et bienveillantes.
                </li>
                <li>
                  <span className="font-medium">Éduquer votre communauté</span> - Sensibilisez vos membres à l'impact
                  des mots et à l'importance du respect mutuel.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialAnalysis
