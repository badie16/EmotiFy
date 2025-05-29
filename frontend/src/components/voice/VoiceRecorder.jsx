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
  const [showExamples, setShowExamples] = useState(false)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  // Liste des exemples d'enregistrements
  const path = window.location.origin
  const exampleRecordings = [
    {
      id: 1,
      name: "Exemple Surprised",
      url: path + "/src/public/example/voice/happy.wav",
      description: "Une voix exprimant de la surprise"
    },
    {
      id: 2,
      name: "Exemple Triste",
      url: path + "/src/public/example/voice/sad.wav",
      description: "Une voix exprimant de la tristesse"
    },
    {
      id: 3,
      name: "Exemple Neutre",
      url: path + "/src/public/example/voice/neutral.wav",
      description: "Une voix neutre"
    },
    {
      id: 4,
      name: "Exemple Angry",
      url: path + "/src/public/example/voice/angry1.wav",
      description: "Une voix exprimant de l'agressivité"
    }


  ]

  const loadExample = async (exampleUrl) => {
    try {
      setError("")
      const response = await fetch(exampleUrl)
      const blob = await response.blob()
      setAudioBlob(blob)
      setAudioURL(URL.createObjectURL(blob))
      setShowExamples(false) // Ferme la modale après le chargement
    } catch (err) {
      console.error("Erreur lors du chargement de l'exemple:", err)
      setError("Impossible de charger l'exemple. Veuillez réessayer.")
    }
  }

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
          joy: rawEmotions.Happy || 0,
          sadness: rawEmotions.Sad || 0,
          anger: rawEmotions.Angry || 0,
          disgust: rawEmotions.Disgust || 0,
          fear: rawEmotions.Fear || 0,
          surprise: rawEmotions.Surprised || 0,
          neutral: rawEmotions.Neutral || 0,
        }
      
        /**
        data: {
    "id": 1,
    "filePath": "1748533565953.wav",
    "emotions": {
        "emotion_scores": {
            "Angry": 0.00012397313548717648,
            "Disgust": 0.00024080263392534107,
            "Fear": 1.6695355498086428e-7,
            "Happy": 0.0000024777646103757434,
            "Neutral": 1.317548452561823e-7,
            "Sad": 1.8135800416985148e-8,
            "Surprised": 0.9996324777603149
        },
        "predicted_emotion": "Surprised",
        "predicted_index": 5,
        "raw_prediction_vector": [
            0.00012397313548717648,
            1.6695355498086428e-7,
            0.00024080263392534107,
            0.0000024777646103757434,
            1.8135800416985148e-8,
            0.9996324777603149,
            1.317548452561823e-7
        ]
    },
    "timestamp": "2025-05-29T15:46:14.756Z"
          }
      */
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
          <div className="w-full max-w-lg bg-gray-100 rounded-lg p-6 flex flex-col items-center">
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

            <div className="space-x-4 flex flex-row">
              {!isRecording && !audioURL && (
                <>
                  <button
                    onClick={startRecording}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={isAnalyzing}
                  >
                    Commencer l'enregistrement
                  </button>
                  <button
                    onClick={() => setShowExamples(true)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Voir les exemples
                  </button>
                </>
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

      {/* Modal des exemples */}
      {showExamples && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Exemples d'enregistrements</h3>
              <button
                onClick={() => setShowExamples(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exampleRecordings.map((example) => (
                <div key={example.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">{example.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                  <button
                    onClick={() => loadExample(example.url)}
                    className="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    Charger cet exemple
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceRecorder
