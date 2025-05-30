import { useState } from 'react'

function ClientAnalysis() {
    const [audioFile, setAudioFile] = useState(null)
    const [transcription, setTranscription] = useState('')
    const [analysis, setAnalysis] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const AudioUpload = () => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">📁 Upload conversation client</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fichier audio (MP3, WAV, M4A)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setAudioFile(e.target.files[0])}
                            className="hidden"
                            id="audio-upload"
                        />
                        <label htmlFor="audio-upload" className="cursor-pointer">
                            <div className="text-4xl mb-2">🎤</div>
                            <p className="text-gray-600">Cliquez pour sélectionner un fichier audio</p>
                            {audioFile && (
                                <p className="text-emerald-600 mt-2 font-medium">{audioFile.name}</p>
                            )}
                        </label>
                    </div>
                </div>

                <div className="text-center text-gray-500">ou</div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transcription manuelle
                    </label>
                    <textarea
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        placeholder="Collez ici la transcription de votre conversation client..."
                        className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!audioFile && !transcription.trim()}
                    className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isAnalyzing ? 'Analyse en cours...' : 'Analyser la conversation'}
                </button>
            </div>
        </div>
    )

    const ClientEmotionSummary = ({ data }) => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">📊 Résumé émotionnel</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">😊</div>
                    <div className="text-lg font-bold text-green-600">{data.positive}%</div>
                    <div className="text-sm text-gray-600">Positif</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mb-2">😐</div>
                    <div className="text-lg font-bold text-yellow-600">{data.neutral}%</div>
                    <div className="text-sm text-gray-600">Neutre</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl mb-2">😞</div>
                    <div className="text-lg font-bold text-red-600">{data.negative}%</div>
                    <div className="text-sm text-gray-600">Négatif</div>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <h4 className="font-medium mb-2">Points clés détectés :</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                        {data.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-emerald-500 mr-2">•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Recommandations :</h4>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                        {data.recommendation}
                    </div>
                </div>
            </div>
        </div>
    )

    const SentimentTimeline = ({ timeline }) => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">⏱️ Timeline émotionnelle</h3>
            <div className="space-y-4">
                {timeline.map((moment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100">
                            {moment.time}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg">{moment.emotion}</span>
                                <span className="text-sm font-medium">{moment.sentiment}</span>
                            </div>
                            <p className="text-sm text-gray-600">{moment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const handleAnalyze = async () => {
        setIsAnalyzing(true)

        // Simulate API call
        setTimeout(() => {
            setAnalysis({
                positive: 65,
                neutral: 25,
                negative: 10,
                keyPoints: [
                    "Client satisfait du service global",
                    "Frustration concernant les délais de livraison",
                    "Appréciation de la qualité du support",
                    "Demande d'amélioration sur la communication"
                ],
                recommendation: "Le client montre une satisfaction globale mais exprime des préoccupations sur les délais. Recommandation : améliorer la communication proactive sur les statuts de commande.",
                timeline: [
                    { time: "0:30", emotion: "😊", sentiment: "Positif", text: "Bonjour, merci de me rappeler rapidement" },
                    { time: "2:15", emotion: "😐", sentiment: "Neutre", text: "Je voulais avoir des nouvelles de ma commande" },
                    { time: "4:20", emotion: "😞", sentiment: "Négatif", text: "C'est vraiment long, j'attendais ça pour hier" },
                    { time: "6:45", emotion: "😊", sentiment: "Positif", text: "D'accord, merci pour l'explication et le geste commercial" }
                ]
            })
            setIsAnalyzing(false)
        }, 2000)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">🎤 Analyse Client</h1>
                <p className="text-gray-600">Analysez les émotions dans vos conversations clients</p>
            </div>

            <AudioUpload />

            {analysis && (
                <div className="space-y-6">
                    <ClientEmotionSummary data={analysis} />
                    <SentimentTimeline timeline={analysis.timeline} />
                </div>
            )}
        </div>
    )
}

export default ClientAnalysis
