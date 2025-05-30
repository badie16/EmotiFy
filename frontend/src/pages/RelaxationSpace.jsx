import { useState, useEffect } from 'react'

function RelaxationSpace() {
    const [isBreathing, setIsBreathing] = useState(false)
    const [breathPhase, setBreathPhase] = useState('inhale')
    const [breathCount, setBreathCount] = useState(0)
    const [selectedMusic, setSelectedMusic] = useState(null)

    const musicTracks = [
        { id: 1, title: "Pluie douce", duration: "10:00", type: "nature" },
        { id: 2, title: "Méditation guidée", duration: "15:00", type: "guided" },
        { id: 3, title: "Sons de l'océan", duration: "20:00", type: "nature" },
        { id: 4, title: "Musique zen", duration: "12:00", type: "music" }
    ]

    const BreathingExercise = () => {
        useEffect(() => {
            if (!isBreathing) return

            const interval = setInterval(() => {
                setBreathPhase(prev => {
                    if (prev === 'inhale') return 'hold'
                    if (prev === 'hold') return 'exhale'
                    if (prev === 'exhale') {
                        setBreathCount(c => c + 1)
                        return 'inhale'
                    }
                })
            }, 4000)

            return () => clearInterval(interval)
        }, [isBreathing])

        const startBreathing = () => {
            setIsBreathing(true)
            setBreathCount(0)
            setBreathPhase('inhale')
        }

        const stopBreathing = () => {
            setIsBreathing(false)
            setBreathPhase('inhale')
        }

        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">🧘 Exercice de respiration</h3>

                <div className="mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-4000 ${isBreathing
                            ? breathPhase === 'inhale'
                                ? 'border-blue-400 scale-110'
                                : breathPhase === 'hold'
                                    ? 'border-purple-400 scale-110'
                                    : 'border-green-400 scale-90'
                            : 'border-gray-300'
                        }`}>
                        <div className={`w-full h-full rounded-full transition-all duration-4000 ${isBreathing
                                ? breathPhase === 'inhale'
                                    ? 'bg-blue-100 scale-110'
                                    : breathPhase === 'hold'
                                        ? 'bg-purple-100 scale-110'
                                        : 'bg-green-100 scale-75'
                                : 'bg-gray-100'
                            } flex items-center justify-center`}>
                            <span className="text-2xl">
                                {breathPhase === 'inhale' ? '↑' : breathPhase === 'hold' ? '⏸' : '↓'}
                            </span>
                        </div>
                    </div>
                </div>

                {isBreathing && (
                    <div className="mb-4">
                        <p className="text-lg font-medium mb-2">
                            {breathPhase === 'inhale' && 'Inspirez...'}
                            {breathPhase === 'hold' && 'Retenez...'}
                            {breathPhase === 'exhale' && 'Expirez...'}
                        </p>
                        <p className="text-sm text-gray-600">Cycle {breathCount + 1}</p>
                    </div>
                )}

                <div className="space-y-3">
                    {!isBreathing ? (
                        <button
                            onClick={startBreathing}
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Commencer l'exercice
                        </button>
                    ) : (
                        <button
                            onClick={stopBreathing}
                            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Arrêter
                        </button>
                    )}

                    {breathCount >= 5 && (
                        <div className="bg-green-50 p-3 rounded-lg text-green-800 text-sm">
                            ✅ Excellent ! Vous avez terminé 5 cycles de respiration.
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const MusicPlayer = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">🎧 Musiques relaxantes</h3>

            <div className="space-y-3 mb-6">
                {musicTracks.map(track => (
                    <div
                        key={track.id}
                        onClick={() => setSelectedMusic(track)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedMusic?.id === track.id
                                ? 'border-rose-500 bg-rose-50'
                                : 'border-gray-200 hover:border-rose-300'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">{track.title}</h4>
                                <p className="text-sm text-gray-500">{track.duration}</p>
                            </div>
                            <div className="text-xl">
                                {track.type === 'nature' && '🌿'}
                                {track.type === 'guided' && '🧘'}
                                {track.type === 'music' && '🎵'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMusic && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h4 className="font-medium">{selectedMusic.title}</h4>
                            <p className="text-sm text-gray-500">En cours de lecture...</p>
                        </div>
                        <button className="text-2xl">⏸️</button>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-rose-500 h-2 rounded-full w-1/3"></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                        <span>3:20</span>
                        <span>{selectedMusic.duration}</span>
                    </div>
                </div>
            )}
        </div>
    )

    const RelaxationSuggestion = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">💡 Suggestions du jour</h3>

            <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Pause détente</h4>
                    <p className="text-sm text-blue-700">
                        Prenez 5 minutes pour regarder par la fenêtre et observer la nature.
                    </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Étirement</h4>
                    <p className="text-sm text-green-700">
                        Levez-vous et faites quelques étirements pour détendre vos muscles.
                    </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Gratitude</h4>
                    <p className="text-sm text-purple-700">
                        Pensez à trois choses pour lesquelles vous êtes reconnaissant aujourd'hui.
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">🧘 Espace Relaxation</h1>
                <p className="text-gray-600">Prenez un moment pour vous détendre et vous ressourcer</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <BreathingExercise />
                    <RelaxationSuggestion />
                </div>

                <div>
                    <MusicPlayer />
                </div>
            </div>
        </div>
    )
}

export default RelaxationSpace
