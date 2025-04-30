"use client"

import { useState, useRef } from "react"
import axios from "axios"

function FaceAnalyzer({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [isWebcamMode, setIsWebcamMode] = useState(false)
  const [isWebcamActive, setIsWebcamActive] = useState(false)

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Gérer la sélection de fichier
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.match("image.*")) {
        setError("Veuillez sélectionner une image")
        return
      }

      setSelectedFile(file)
      setPreviewURL(URL.createObjectURL(file))
      setError("")
    }
  }

  // Analyser l'image sélectionnée
  const analyzeImage = async () => {
    if (!selectedFile && !isWebcamMode) {
      setError("Veuillez d'abord sélectionner une image")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      let response

      if (isWebcamMode) {
        // Capturer l'image de la webcam
        const canvas = document.createElement("canvas")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const ctx = canvas.getContext("2d")
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

        // Convertir en base64
        const imageData = canvas.toDataURL("image/jpeg")

        // Envoyer pour analyse
        response = await axios.post("/api/face/analyze-webcam", {
          imageData,
        })
      } else {
        // Envoyer le fichier image pour analyse
        const formData = new FormData()
        formData.append("imageFile", selectedFile)

        response = await axios.post("/api/face/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(response.data)
      }
    } catch (err) {
      console.error("Erreur lors de l'analyse faciale:", err)
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Activer la webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      streamRef.current = stream
      setIsWebcamActive(true)
      setError("")
    } catch (err) {
      console.error("Erreur lors de l'accès à la webcam:", err)
      setError("Impossible d'accéder à la webcam. Veuillez vérifier les permissions.")
    }
  }

  // Arrêter la webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      videoRef.current.srcObject = null
      setIsWebcamActive(false)
    }
  }

  // Basculer entre le mode webcam et le mode upload
  const toggleWebcamMode = () => {
    if (isWebcamMode) {
      stopWebcam()
    }

    setIsWebcamMode(!isWebcamMode)
    setSelectedFile(null)
    setPreviewURL("")
  }

  // Nettoyer lors du démontage du composant
  const resetImage = () => {
    setSelectedFile(null)
    setPreviewURL("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Analysez les expressions faciales</h2>

      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => {
                if (isWebcamMode) toggleWebcamMode()
              }}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                !isWebcamMode ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Télécharger une image
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isWebcamMode) toggleWebcamMode()
              }}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                isWebcamMode ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Utiliser la webcam
            </button>
          </div>
        </div>

        {!isWebcamMode ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              {previewURL ? (
                <div className="mb-4">
                  <img
                    src={previewURL || "/placeholder.svg"}
                    alt="Aperçu"
                    className="max-w-full h-auto max-h-64 rounded-md"
                  />
                </div>
              ) : (
                <div className="mb-4 w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                  <span className="text-gray-500">Aucune image sélectionnée</span>
                </div>
              )}

              <div className="space-x-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={isAnalyzing}
                >
                  Sélectionner une image
                </button>

                {previewURL && (
                  <>
                    <button
                      onClick={resetImage}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      disabled={isAnalyzing}
                    >
                      Réinitialiser
                    </button>

                    <button
                      onClick={analyzeImage}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyse en cours..." : "Analyser"}
                    </button>
                  </>
                )}

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 flex flex-col items-center">
              <div className="mb-4 w-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto rounded-md"
                  style={{ display: isWebcamActive ? "block" : "none" }}
                />

                {!isWebcamActive && (
                  <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                    <span className="text-gray-500">Webcam inactive</span>
                  </div>
                )}
              </div>

              <div className="space-x-4">
                {!isWebcamActive ? (
                  <button
                    onClick={startWebcam}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={isAnalyzing}
                  >
                    Activer la webcam
                  </button>
                ) : (
                  <>
                    <button
                      onClick={stopWebcam}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      disabled={isAnalyzing}
                    >
                      Désactiver la webcam
                    </button>

                    <button
                      onClick={analyzeImage}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyse en cours..." : "Capturer et analyser"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      </div>

      <div className="bg-green-50 p-4 rounded-md">
        <h3 className="font-medium text-green-800 mb-2">Conseils pour une meilleure analyse</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Assurez-vous que le visage est bien éclairé et clairement visible</li>
          <li>Évitez les images floues ou de trop faible résolution</li>
          <li>Pour des résultats optimaux, le visage devrait être face à la caméra</li>
          <li>Évitez les accessoires qui cachent partiellement le visage (lunettes de soleil, masques, etc.)</li>
        </ul>
      </div>
    </div>
  )
}

export default FaceAnalyzer
