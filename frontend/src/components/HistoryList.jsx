import { useState, useEffect } from 'react'
import { getAnalysisHistory, deleteAnalysis } from '../api/emotionService'
import { Link } from 'react-router-dom'

function HistoryList() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    fetchHistory()
  }, [])
  
  const fetchHistory = async () => {
    try {
      setLoading(true)
      const data = await getAnalysisHistory()
      setHistory(data)
      setError('')
    } catch (err) {
      setError('Impossible de charger l\'historique. Veuillez réessayer.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette analyse ?')) {
      try {
        await deleteAnalysis(id)
        setHistory(history.filter(item => item.id !== id))
      } catch (err) {
        setError('Erreur lors de la suppression. Veuillez réessayer.')
        console.error(err)
      }
    }
  }
  
  // Fonction pour obtenir l'émotion dominante
  const getDominantEmotion = (emotions) => {
    if (!emotions) return { name: 'inconnu', score: 0 }
    
    const entries = Object.entries(emotions)
    if (entries.length === 0) return { name: 'inconnu', score: 0 }
    
    const sorted = entries.sort((a, b) => b[1] - a[1])
    return { name: sorted[0][0], score: sorted[0][1] }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
        <button 
          onClick={fetchHistory}
          className="ml-4 text-red-600 underline"
        >
          Réessayer
        </button>
      </div>
    )
  }
  
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600 mb-4">Aucune analyse dans l'historique</h3>
        <p className="text-gray-500 mb-6">Commencez par analyser un texte pour voir votre historique ici.</p>
        <Link 
          to="/" 
          className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Faire une analyse
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Historique des analyses</h2>
      
      <div className="grid gap-6">
        {history.map((item) => {
          const dominant = getDominantEmotion(item.emotions)
          
          return (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <p className="text-gray-700 line-clamp-2">
                      {item.text}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Supprimer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium">Émotion dominante:</span>
                <span 
                  className={`ml-2 px-2 py-1 text-sm rounded-full emotion-${dominant.name.toLowerCase()}`}
                  style={{ backgroundColor: `rgba(${dominant.name === 'joy' ? '16, 185, 129' : dominant.name === 'sadness' ? '59, 130, 246' : '239, 68, 68'}, 0.1)` }}
                >
                  {dominant.name} ({Math.round(dominant.score * 100)}%)
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryList