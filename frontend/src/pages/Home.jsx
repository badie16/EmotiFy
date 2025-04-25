import { useState } from 'react'
import TextAnalyzer from '../components/TextAnalyzer'
import EmotionChart from '../components/EmotionChart'
import { saveAnalysis } from '../api/emotionService'
import { exportToPdf } from '../utils/exportPdf'

function Home() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [originalText, setOriginalText] = useState('')
  
  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result.emotions)
    setOriginalText(result.text)
    
    // Sauvegarder l'analyse dans l'historique
    saveAnalysis({
      text: result.text,
      emotions: result.emotions,
      timestamp: new Date().toISOString()
    })
  }
  
  const handleExportPdf = () => {
    if (analysisResult) {
      exportToPdf({
        text: originalText,
        emotions: analysisResult,
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return (
    <div>
      <section className="mb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">EmotiFy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les émotions cachées dans vos textes grâce à notre analyse avancée basée sur l'intelligence artificielle.
          </p>
        </div>
        
        <TextAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        
        {analysisResult && (
          <div className="space-y-6">
            <EmotionChart emotions={analysisResult} />
            
            <div className="flex justify-center">
              <button
                onClick={handleExportPdf}
                className="bg-white border border-indigo-500 text-indigo-500 py-2 px-6 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exporter en PDF
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home