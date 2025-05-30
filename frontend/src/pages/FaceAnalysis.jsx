"use client"

import { useState, useRef, useEffect } from "react"
import FaceAnalyzer from "../components/face/FaceAnalyzer"
import EmotionChart from "../components/EmotionChart"

function FaceAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [detectionBox, setDetectionBox] = useState(null)
  const [originalImageSize, setOriginalImageSize] = useState(null)
  const resultCanvasRef = useRef(null)

  // Dessiner le rectangle de détection sur l'image des résultats
  const drawDetectionBox = (imageElement, faces, imageSize) => {
    if (!imageElement || !faces || !resultCanvasRef.current || !imageSize) return

    const canvas = resultCanvasRef.current
    const ctx = canvas.getContext("2d")

    const { width: originalWidth, height: originalHeight } = imageSize

    const maxHeight = 470
    const minHeight = 400
    const scale = Math.max(minHeight / originalHeight, maxHeight / originalHeight)
    const scaledWidth = originalWidth * scale
    const scaledHeight = originalHeight * scale

    canvas.width = scaledWidth
    canvas.height = scaledHeight
    canvas.style.width = `${scaledWidth}px`
    canvas.style.height = `${scaledHeight}px`

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(imageElement, 0, 0, scaledWidth, scaledHeight)
    ctx.strokeStyle = "#00ff00"
    ctx.lineWidth = 2
    for (const face of faces) {
      const [x, y, w, h] = face.box
      ctx.strokeRect(x * scale, y * scale, w * scale, h * scale)
    }
  }

  const handleAnalysisComplete = (result) => {
    console.log(result)
    // Si plusieurs visages sont détectés, calculer la moyenne des émotions
    let rawEmotions = {}
    if (result?.emotions?.faces?.length > 1) {
      // Initialiser les compteurs pour chaque émotion
      const emotionSums = {
        happy: 0,
        sad: 0,
        angry: 0,
        fear: 0,
        surprise: 0,
        neutral: 0,
        disgust: 0,
      }

      // Additionner les scores pour chaque émotion
      result.emotions.faces.forEach((face) => {
        Object.entries(face.emotions).forEach(([emotion, score]) => {
          emotionSums[emotion] += score
        })
      })

      // Calculer la moyenne pour chaque émotion
      const faceCount = result.emotions.faces.length
      rawEmotions = Object.fromEntries(Object.entries(emotionSums).map(([emotion, sum]) => [emotion, sum / faceCount]))
    } else {
      // S'il n'y a qu'un seul visage, utiliser directement ses émotions
      rawEmotions = result?.emotions?.faces?.[0]?.emotions || {}
    }
    console.log(rawEmotions)
    const remapped = {
      joy: rawEmotions.happy || 0,
      sadness: rawEmotions.sad || 0,
      anger: rawEmotions.angry || 0,
      fear: rawEmotions.fear || 0,
      surprise: rawEmotions.surprise || 0,
      disgust: rawEmotions.disgust || 0,
      neutral: rawEmotions.neutral || 0,
    }
    setAnalysisResult(remapped)
    setImagePreview(result.imagePreview)
    setDetectionBox(result.emotions?.faces || null)
    setOriginalImageSize(result.emotions?.imageSize)
  }

  // Effet pour dessiner la boîte de détection quand elle change
  useEffect(() => {
    if (imagePreview && detectionBox) {
      const img = new Image()
      img.onload = () => {
        drawDetectionBox(img, detectionBox, originalImageSize)
      }
      img.src = imagePreview
    }
  }, [imagePreview, detectionBox, originalImageSize])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
              Analyse <span className="text-cyan-300">Faciale</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Analysez les expressions faciales pour mieux comprendre les émotions et faciliter l'inclusion des
              personnes ayant des difficultés à interpréter les émotions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Détection précise
              </div>
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Vision par ordinateur
              </div>
              <div className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Respect de la vie privée
              </div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi analyser les expressions faciales ?</h2>
              <p className="text-gray-600 mb-6">L'analyse des expressions faciales peut :</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Aider les personnes neurodivergentes à mieux comprendre les émotions des autres
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Servir d'outil pédagogique pour développer l'intelligence émotionnelle
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Permettre aux professionnels de l'éducation et de la santé d'évaluer les réactions émotionnelles
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Faciliter la communication pour les personnes ayant des difficultés d'expression verbale
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vision Artificielle</h3>
                <p className="text-gray-600 text-sm">
                  Notre technologie de vision par ordinateur détecte et analyse les micro-expressions faciales avec une
                  précision remarquable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analyzer Component */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Analysez une image</h2>
            <p className="text-blue-100">
              Téléchargez une photo ou prenez une photo pour analyser les expressions faciales
            </p>
          </div>
          <div className="p-8">
            <FaceAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          </div>
        </div>

        {/* Results */}
        {analysisResult && (
          <div className="mt-12 space-y-8">
            {/* Results Overview */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Résultats de l'analyse</h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {imagePreview && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-4">Image analysée :</h3>
                    <div className="flex justify-center items-center">
                      <canvas ref={resultCanvasRef} className="rounded-xl shadow-lg border border-gray-200" />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Émotions détectées :</h3>
                  <EmotionChart emotions={analysisResult} />
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interprétation des expressions</h2>
              <div className="space-y-6">
                {analysisResult.joy > 0.3 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Expression de joie</h3>
                        <p className="text-yellow-700">
                          Les signes de joie sont visibles sur le visage, généralement caractérisés par un sourire, des
                          yeux plissés et des pommettes relevées. Cette expression communique du plaisir et de la
                          satisfaction.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.sadness > 0.3 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Expression de tristesse</h3>
                        <p className="text-blue-700">
                          Les coins de la bouche sont abaissés, les sourcils peuvent être relevés au centre, et les
                          paupières supérieures tombantes. Cette expression communique de la peine ou du chagrin.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.anger > 0.3 && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Expression de colère</h3>
                        <p className="text-red-700">
                          Les sourcils sont abaissés et rapprochés, les lèvres peuvent être serrées ou retroussées, et
                          le regard est souvent intense. Cette expression communique de la frustration ou de
                          l'hostilité.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.fear > 0.3 && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-800 mb-2">Expression de peur</h3>
                        <p className="text-purple-700">
                          Les yeux sont écarquillés, les sourcils relevés et rapprochés, et la bouche peut être ouverte.
                          Cette expression communique de l'appréhension ou de l'anxiété.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisResult.surprise > 0.3 && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Expression de surprise</h3>
                        <p className="text-teal-700">
                          Les sourcils sont relevés, les yeux grands ouverts et la bouche souvent ouverte en forme de O.
                          Cette expression communique de l'étonnement face à quelque chose d'inattendu.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {Object.values(analysisResult).every((val) => val < 0.3) && (
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Expression neutre</h3>
                        <p className="text-gray-700">
                          Le visage présente peu de signes émotionnels marqués, avec une expression relativement neutre
                          ou au repos.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications pratiques</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Pour l'éducation inclusive</h3>
                  <p className="text-blue-700">
                    Cet outil peut aider les enfants autistes ou ayant des difficultés à reconnaître les émotions à
                    s'entraîner et à développer leurs compétences sociales dans un environnement sécurisé.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-pink-800 mb-2">Pour la thérapie</h3>
                  <p className="text-pink-700">
                    Les thérapeutes peuvent utiliser cette analyse pour aider leurs patients à prendre conscience de
                    leurs expressions faciales et à mieux communiquer leurs émotions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FaceAnalysis
