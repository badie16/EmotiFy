"use client"

import { useState } from "react"
import VoiceRecorder from "../components/voice/VoiceRecorder"
import EmotionChart from "../components/EmotionChart"

function VoiceAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalysisComplete = (result) => {    
    setAnalysisResult(result)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse vocale</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Identifiez les émotions dans votre voix pour améliorer votre communication et détecter les signes de stress ou
          d'anxiété.
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Pourquoi analyser votre voix ?</h2>
        <p className="text-gray-700 mb-4">L'analyse émotionnelle vocale peut vous aider à :</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
          <li>Détecter les émotions que vous exprimez inconsciemment</li>
          <li>Améliorer votre communication orale et votre impact</li>
          <li>Identifier les signes de stress, d'anxiété ou de dépression</li>
          <li>Suivre votre état émotionnel au fil du temps</li>
        </ul>
        <p className="text-gray-700 italic">
          Particulièrement utile pour les professionnels de la communication, les personnes en télétravail, ou ceux qui
          souhaitent améliorer leur intelligence émotionnelle.
        </p>
      </div>

      <VoiceRecorder onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Résultats de l'analyse</h2>
            <EmotionChart emotions={analysisResult} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Interprétation vocale</h2>
            <div className="space-y-4">
              {analysisResult.joy > 0.3 && (
                <div className="p-4 bg-yellow-50 rounded-md">
                  <h3 className="font-medium text-yellow-800 mb-1">Tonalité joyeuse</h3>
                  <p className="text-gray-700">
                    Votre voix exprime un niveau significatif de joie et d'enthousiasme. Votre ton est probablement
                    énergique, avec des variations de hauteur et un rythme dynamique.
                  </p>
                </div>
              )}

              {analysisResult.sadness > 0.3 && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-800 mb-1">Tonalité mélancolique</h3>
                  <p className="text-gray-700">
                    Votre voix présente des caractéristiques de tristesse ou de mélancolie. Cela se manifeste souvent
                    par un ton plus bas, un débit plus lent et moins de variations.
                  </p>
                </div>
              )}

              {analysisResult.anger > 0.3 && (
                <div className="p-4 bg-red-50 rounded-md">
                  <h3 className="font-medium text-red-800 mb-1">Tension vocale</h3>
                  <p className="text-gray-700">
                    Votre voix révèle des signes de tension ou de colère. Cela peut se manifester par une intensité
                    accrue, un ton plus aigu ou des accents d'emphase marqués.
                  </p>
                </div>
              )}

              {analysisResult.fear > 0.3 && (
                <div className="p-4 bg-purple-50 rounded-md">
                  <h3 className="font-medium text-purple-800 mb-1">Anxiété vocale</h3>
                  <p className="text-gray-700">
                    Des marqueurs d'anxiété ou de nervosité sont détectés dans votre voix, comme des tremblements
                    subtils, des hésitations ou un rythme irrégulier.
                  </p>
                </div>
              )}

              {analysisResult.neutral > 0.5 && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-1">Voix neutre</h3>
                  <p className="text-gray-700">
                    Votre voix présente principalement des caractéristiques neutres, avec peu de variations
                    émotionnelles marquées. Cela peut être approprié dans un contexte professionnel.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Conseils pour améliorer votre communication vocale</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <span className="font-medium">Variez votre ton</span> - Une voix monotone peut sembler désintéressée,
                même si ce n'est pas le cas.
              </li>
              <li>
                <span className="font-medium">Contrôlez votre débit</span> - Parler trop vite peut indiquer de la
                nervosité, trop lentement peut perdre l'attention.
              </li>
              <li>
                <span className="font-medium">Faites des pauses</span> - Elles donnent du poids à vos propos et
                permettent à l'auditeur d'assimiler l'information.
              </li>
              <li>
                <span className="font-medium">Respirez profondément</span> - Une bonne respiration améliore la qualité
                de la voix et réduit les signes de stress.
              </li>
              <li>
                <span className="font-medium">Pratiquez régulièrement</span> - Enregistrez-vous et analysez votre voix
                pour progresser constamment.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceAnalysis
