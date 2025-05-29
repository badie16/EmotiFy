"use client"

import { useState, useRef } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

function VoiceRecorder({ onAnalysisComplete }) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioURL, setAudioURL] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        setAudioBlob(audioBlob)
        setAudioURL(audioUrl)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Erreur lors de l'accès au microphone:", err)
      setError("Impossible d'accéder au microphone. Veuillez vérifier les permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Arrêter toutes les pistes audio
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const analyzeAudio = async () => {
    if (!audioBlob) {
      setError("Veuillez d'abord enregistrer un audio")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("audioFile", audioBlob, "recording.wav")
      const response = await axios.post(API_URL + "/api/voice/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("response", response)
      const rawEmotions = response.data.emotions.emotion_scores;
      if (onAnalysisComplete) {
        const remapped = {
          joy: rawEmotions.happy || 0,
          sadness: rawEmotions.sad || 0,
          anger: rawEmotions.angry || 0,
          fear: rawEmotions.fear || 0,
          // surprise: rawEmotions.surprise || 0,
          neutral: rawEmotions.neutral || 0,
        }

        //   object : {
        //   "id": 1,
        //     "filePath": "1748523845372.wav",
        //       "emotions": {
        //     "emotion_scores": {
        //       "angry": 0.9999998807907104,
        //         "fear": 2.222892182823788e-11,
        //           "happy": 4.649990809069138e-11,
        //             "neutral": 6.97009880368249e-11,
        //               "sad": 7.439525262498137e-8
        //     },
        //     "predicted_emotion": "angry",
        //       "predicted_index": 0,
        //         "raw_prediction_vector": [
        //           0.9999998807907104,
        //           2.222892182823788e-11,
        //           4.649990809069138e-11,
        //           6.97009880368249e-11,
        //           7.439525262498137e-8
        //         ]
        //   },
        //   "timestamp": "2025-05-29T13:04:05.961Z"
        // }
        console.log("emotionSums", remapped)
        onAnalysisComplete(remapped)
      }
    } catch (err) {
      console.error("Erreur lors de l'analyse audio:", err)
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetRecording = () => {
    setAudioBlob(null)
    setAudioURL("")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Enregistrez votre voix</h2>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Parlez clairement pendant quelques secondes pour permettre une analyse précise de vos émotions vocales.
        </p>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 flex flex-col items-center">
            <div className="mb-4">
              {isRecording ? (
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs">REC</span>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">PRÊT</span>
                </div>
              )}
            </div>

            <div className="space-x-4">
              {!isRecording && !audioURL && (
                <button
                  onClick={startRecording}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={isAnalyzing}
                >
                  Commencer l'enregistrement
                </button>
              )}

              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Arrêter l'enregistrement
                </button>
              )}

              {audioURL && !isRecording && (
                <>
                  <button
                    onClick={resetRecording}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    disabled={isAnalyzing}
                  >
                    Nouvel enregistrement
                  </button>

                  <button
                    onClick={analyzeAudio}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyse en cours..." : "Analyser"}
                  </button>
                </>
              )}
            </div>
          </div>

          {audioURL && (
            <div className="mt-6 w-full max-w-md">
              <h3 className="font-medium text-gray-700 mb-2">Écouter l'enregistrement :</h3>
              <audio controls src={audioURL} className="w-full" />
            </div>
          )}

          {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-md">
        <h3 className="font-medium text-indigo-800 mb-2">Conseils pour un meilleur enregistrement</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Enregistrez dans un environnement calme avec peu de bruit de fond</li>
          <li>Parlez à une distance d'environ 15-20 cm du microphone</li>
          <li>Parlez naturellement, comme vous le feriez dans une conversation</li>
          <li>Essayez d'enregistrer au moins 10-15 secondes de parole</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceRecorder
