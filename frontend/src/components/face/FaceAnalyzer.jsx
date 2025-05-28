"use client"

import { useState, useRef } from "react"
import axios from "axios"
const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

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

  function resizeImage(file, maxSize = 224) {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = function (e) {
        img.onload = function () {
          const scale = maxSize / Math.max(img.width, img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          }, "image/jpeg", 0.8); // Compression à 80%
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

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
        // Capturer l'image de la webcam en format carré
        const video = videoRef.current;
        const size = Math.min(video.videoWidth, video.videoHeight);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        // Calculer les coordonnées pour centrer l'image
        const x = (video.videoWidth - size) / 2;
        const y = (video.videoHeight - size) / 2;

        // Dessiner l'image carrée centrée
        ctx.drawImage(video, x, y, size, size, 0, 0, size, size);

        // Convertir en base64
        const imageData = canvas.toDataURL("image/jpeg");
        // Envoyer pour analyse
        response = await axios.post(backendUrl + "/api/face/analyze-webcam", {
          imageData,
        });

        // Ajouter l'URL de l'image locale à la réponse
        response.data.imagePreview = imageData;
      } else {
        // Envoyer le fichier image pour analyse
        const resizedFile = await resizeImage(selectedFile);
        const formData = new FormData();
        formData.append("imageFile", resizedFile);  
        
        response = await axios.post(backendUrl + "/api/face/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Ajouter l'URL de l'image locale à la réponse
        response.data.imagePreview = previewURL;
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(response.data);
      }
    } catch (err) {
      console.error("Erreur lors de l'analyse faciale:", err);
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Activer la webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 300 },
          height: { ideal: 300 },
          aspectRatio: 1
        }
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsWebcamActive(true);
      setError("");
    } catch (err) {
      console.error("Erreur lors de l'accès à la webcam:", err);
      setError("Impossible d'accéder à la webcam. Veuillez vérifier les permissions.");
    }
  };

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
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${!isWebcamMode ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              Télécharger une image
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isWebcamMode) toggleWebcamMode()
              }}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${isWebcamMode ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
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

              <div className="space-x-4 flex  mt-3 justify-center flex-wrap gap-y-[15px]">
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
              <div className="mb-4 max-w-sm aspect-square">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover rounded-md"
                  style={{ display: isWebcamActive ? "block" : "none" }}
                />

                {!isWebcamActive && (
                  <div className=" w-64 h-64 mb-4 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                    <span className="text-gray-500">Webcam inactive</span>
                  </div>
                )}
              </div>

              <div className="space-x-4 ">
                {!isWebcamActive ? (
                  <button
                    onClick={startWebcam}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={isAnalyzing}
                  >
                    Activer webcam
                  </button>
                ) : (
                  <>
                    <button
                      onClick={stopWebcam}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      disabled={isAnalyzing}
                    >
                      Désactiver webcam
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
