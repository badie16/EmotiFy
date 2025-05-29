"use client"

import { useState } from "react"
import { analyzeEmotion } from "../../api/emotionService"

function TextAnalyzer({ onAnalysisComplete }) {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [showExamples, setShowExamples] = useState(false)

  const exampleTexts = [
    {
      id: 1,
      name: "Texte Joyeux",
      text: "Je suis vraiment heureux aujourd'hui ! Cette journée est magnifique, le soleil brille et tout semble parfait. J'ai reçu une excellente nouvelle ce matin qui m'a mis de bonne humeur pour toute la journée.",
      description: "Un texte exprimant de la joie et du bonheur"
    },
    {
      id: 2,
      name: "Texte Triste",
      text: "Je me sens vraiment déprimé aujourd'hui. Tout semble gris et sans espoir. J'ai perdu quelque chose d'important et je ne sais pas comment m'en remettre. La pluie qui tombe dehors reflète bien mon état d'esprit.",
      description: "Un texte exprimant de la tristesse et de la mélancolie"
    },
    {
      id: 3,
      name: "Texte En Colère",
      text: "Je suis furieux ! Comment ont-ils pu faire une chose pareille ? C'est inacceptable et je ne peux pas croire qu'ils aient pris une telle décision. Je suis vraiment en colère contre cette situation.",
      description: "Un texte exprimant de la colère et de la frustration"
    },
    {
      id: 4,
      name: "Texte Anxieux",
      text: "Je suis très inquiet pour l'avenir. Tant de choses sont incertaines et je ne sais pas comment les choses vont se passer. J'ai peur de ce qui pourrait arriver et je me sens anxieux à l'idée de l'inconnu.",
      description: "Un texte exprimant de l'anxiété et de la peur"
    },
    {
      id: 5,
      name: "Texte Neutre",
      text: "Aujourd'hui est un jour comme les autres. Je vais au travail, je fais mes tâches habituelles. Rien de spécial ne s'est passé, c'est une journée normale dans l'ensemble.",
      description: "Un texte neutre sans émotion particulière"
    }
  ]

  const loadExample = (exampleText) => {
    setText(exampleText)
    setShowExamples(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setError("Veuillez entrer un texte à analyser")
      return
    }

    setError("")
    setIsAnalyzing(true)

    try {
      const result = await analyzeEmotion(text)
      onAnalysisComplete(result)
    } catch (err) {
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Analysez vos émotions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="5"
            placeholder="Entrez votre texte ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyse en cours...
              </>
            ) : (
              "Analyser"
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowExamples(true)}
            className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
          >
            Voir les exemples
          </button>
        </div>
      </form>

      {/* Modal des exemples */}
      {showExamples && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Exemples de textes</h3>
              <button
                onClick={() => setShowExamples(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {exampleTexts.map((example) => (
                <div key={example.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">{example.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                  <div className="bg-white p-3 rounded-md mb-3 text-sm text-gray-700 border border-gray-200">
                    {example.text}
                  </div>
                  <button
                    onClick={() => loadExample(example.text)}
                    className="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    Utiliser cet exemple
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

export default TextAnalyzer
