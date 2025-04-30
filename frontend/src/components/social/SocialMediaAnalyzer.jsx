"use client"

import { useState } from "react"
import axios from "axios"

function SocialMediaAnalyzer({ onAnalysisComplete }) {
  const [platform, setPlatform] = useState("twitter")
  const [content, setContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      setError("Veuillez entrer du contenu à analyser")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      const response = await axios.post("/api/social/analyze", {
        platform,
        content,
      })

      if (onAnalysisComplete) {
        onAnalysisComplete(response.data)
      }
    } catch (err) {
      console.error("Erreur lors de l'analyse des réseaux sociaux:", err)
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleClear = () => {
    setContent("")
    setError("")
  }

  // Exemples de contenu par plateforme
  const getPlaceholderByPlatform = () => {
    switch (platform) {
      case "twitter":
        return "Entrez un tweet ou une série de tweets..."
      case "facebook":
        return "Entrez une publication Facebook ou des commentaires..."
      case "instagram":
        return "Entrez une légende Instagram ou des commentaires..."
      case "linkedin":
        return "Entrez une publication LinkedIn ou des commentaires..."
      case "youtube":
        return "Entrez des commentaires YouTube..."
      default:
        return "Entrez le contenu à analyser..."
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Analysez les contenus des réseaux sociaux</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="platform" className="block text-gray-700 font-medium mb-2">
            Plateforme
          </label>
          <select
            id="platform"
            value={platform}
            onChange={handlePlatformChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isAnalyzing}
          >
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="reddit">Reddit</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Contenu à analyser
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder={getPlaceholderByPlatform()}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isAnalyzing}
          ></textarea>

          <div className="mt-2 text-sm text-gray-500">
            Pour une analyse plus précise, incluez plusieurs commentaires ou publications.
          </div>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyse en cours..." : "Analyser"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isAnalyzing}
          >
            Effacer
          </button>
        </div>
      </form>

      <div className="mt-8 bg-amber-50 p-4 rounded-md">
        <h3 className="font-medium text-amber-800 mb-2">Exemples de cas d'utilisation</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Modération de communauté</span> - Identifiez les contenus toxiques ou haineux
            qui nécessitent une intervention.
          </li>
          <li>
            <span className="font-medium">Analyse de marque</span> - Comprenez le sentiment des utilisateurs envers
            votre marque ou produit.
          </li>
          <li>
            <span className="font-medium">Recherche sociale</span> - Analysez les tendances émotionnelles autour d'un
            sujet ou d'un événement.
          </li>
          <li>
            <span className="font-medium">Prévention du cyberharcèlement</span> - Détectez les signes précoces de
            harcèlement en ligne.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SocialMediaAnalyzer
