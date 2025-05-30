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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-600 opacity-30"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-700 bg-opacity-50 backdrop-blur-sm text-sm font-medium mb-4">
              <span className="mr-2">💼</span>
              <span>EmotiFy Business</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Analyse des réseaux sociaux</h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Détectez les tendances émotionnelles et les contenus toxiques dans les commentaires des réseaux sociaux
              pour créer des espaces en ligne plus sains.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-emerald-100">
          <div className="flex items-start">
            <div className="hidden md:block mr-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                📱
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-emerald-800">Pourquoi analyser les réseaux sociaux ?</h2>
              <p className="text-gray-700 mb-4">
                L'analyse émotionnelle des contenus sur les réseaux sociaux permet de :
              </p>
              <ul className="grid md:grid-cols-2 gap-3 mb-4">
                {[
                  "Détecter les discours haineux et les contenus toxiques",
                  "Comprendre le climat émotionnel autour d'un sujet ou d'une marque",
                  "Identifier les tendances émotionnelles collectives",
                  "Améliorer la modération des communautés en ligne",
                ].map((item, index) => (
                  <li key={index} className="flex items-center bg-white/70 p-3 rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 italic bg-white/50 p-3 rounded-lg">
                Particulièrement utile pour les gestionnaires de communauté, les marques, les chercheurs en sciences
                sociales et les organisations luttant contre la cyberhaine.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <SocialMediaAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </div>

        {analysisResult && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-emerald-800 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white mr-3">
                  📊
                </span>
                Résultats de l'analyse
              </h2>

              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-2 text-sm">
                    📱
                  </span>
                  Contenu analysé :
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-emerald-50 p-5 rounded-xl border border-emerald-100">
                  <p className="text-sm text-emerald-600 font-medium mb-2">Plateforme : {platform}</p>
                  <p className="text-gray-700 whitespace-pre-line">{content}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-100">
                  <h3 className="font-medium text-emerald-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-2 text-sm">
                      📈
                    </span>
                    Émotions détectées :
                  </h3>
                  <EmotionChart emotions={analysisResult} />
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-100">
                  <h3 className="font-medium text-emerald-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-2 text-sm">
                      🚨
                    </span>
                    Niveau de toxicité :
                  </h3>
                  {analysisResult.toxic !== undefined && (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div
                          className={`h-4 rounded-full ${analysisResult.toxic < 0.3
                              ? "bg-green-500"
                              : analysisResult.toxic < 0.7
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          style={{ width: `${analysisResult.toxic * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1 mb-4">
                        <span className="font-medium text-green-600">Sain</span>
                        <span className="font-medium text-yellow-600">Modéré</span>
                        <span className="font-medium text-red-600">Toxique</span>
                      </div>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {analysisResult.toxic < 0.3 ? (
                          <span className="flex items-center">
                            <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                              ✓
                            </span>
                            Le contenu analysé présente un faible niveau de toxicité.
                          </span>
                        ) : analysisResult.toxic < 0.7 ? (
                          <span className="flex items-center">
                            <span className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-2">
                              !
                            </span>
                            Le contenu analysé présente un niveau modéré de toxicité qui pourrait nécessiter une
                            attention.
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-2">
                              !!
                            </span>
                            Le contenu analysé présente un niveau élevé de toxicité qui nécessite une intervention.
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-emerald-800 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white mr-3">
                  💡
                </span>
                Interprétation et recommandations
              </h2>

              {analysisResult.toxic > 0.7 && (
                <div className="p-6 bg-red-50 rounded-xl mb-6 border-l-4 border-red-500">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl mr-4 flex-shrink-0">
                      🛑
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 mb-2 text-lg">Alerte de contenu toxique</h3>
                      <p className="text-gray-700 mb-4">
                        Le contenu analysé présente un niveau élevé de toxicité qui pourrait nuire à la santé de votre
                        communauté en ligne.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-2 text-xs">
                            !
                          </span>
                          Actions recommandées :
                        </h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Modérer ou supprimer le contenu problématique</li>
                          <li>Contacter l'auteur pour clarifier les règles de la communauté</li>
                          <li>Renforcer les directives de communication bienveillante</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult.anger > 0.4 && (
                <div className="p-6 bg-orange-50 rounded-xl mb-6 border-l-4 border-orange-400">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-2xl mr-4 flex-shrink-0">
                      ⚠️
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-800 mb-2 text-lg">Climat émotionnel tendu</h3>
                      <p className="text-gray-700">
                        Le niveau élevé de colère détecté suggère un climat émotionnel tendu qui pourrait s'intensifier.
                        Une médiation ou une intervention préventive pourrait être nécessaire.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult.joy > 0.5 && analysisResult.toxic < 0.3 && (
                <div className="p-6 bg-green-50 rounded-xl mb-6 border-l-4 border-green-400">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mr-4 flex-shrink-0">
                      ✅
                    </div>
                    <div>
                      <h3 className="font-bold text-green-800 mb-2 text-lg">Engagement positif</h3>
                      <p className="text-gray-700">
                        Le contenu génère des émotions majoritairement positives, ce qui est favorable à un engagement
                        sain et constructif dans votre communauté.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl mr-4 flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-4 text-lg">
                      Stratégies pour un espace en ligne plus sain
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Établir des règles claires",
                          desc: "Définissez et communiquez des directives précises sur les comportements acceptables.",
                          icon: "📝",
                        },
                        {
                          title: "Modération proactive",
                          desc: "Utilisez des outils d'analyse comme celui-ci pour identifier les problèmes avant qu'ils ne s'aggravent.",
                          icon: "🔍",
                        },
                        {
                          title: "Encourager la positivité",
                          desc: "Valorisez et mettez en avant les contributions constructives et bienveillantes.",
                          icon: "🌟",
                        },
                        {
                          title: "Éduquer votre communauté",
                          desc: "Sensibilisez vos membres à l'impact des mots et à l'importance du respect mutuel.",
                          icon: "🎓",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-3">
                              {item.icon}
                            </div>
                            <h4 className="font-medium text-emerald-800">{item.title}</h4>
                          </div>
                          <p className="text-gray-700 pl-11">{item.desc}</p>
                        </div>
                      ))}
                    </div>
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

export default SocialAnalysis
