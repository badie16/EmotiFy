import { useState } from 'react'
import { analyzeEmotion } from '../api/emotionService'

function TextAnalyzer({ onAnalysisComplete }) {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('Veuillez entrer un texte à analyser')
      return
    }
    
    setError('')
    setIsAnalyzing(true)
    
    try {
      const result = await analyzeEmotion(text)
      onAnalysisComplete(result)
    } catch (err) {
      setError('Une erreur est survenue lors de l\'analyse. Veuillez réessayer.')
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
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="5"
            placeholder="Entrez votre texte ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyse en cours...
            </>
          ) : (
            'Analyser'
          )}
        </button>
      </form>
    </div>
  )
}

export default TextAnalyzer