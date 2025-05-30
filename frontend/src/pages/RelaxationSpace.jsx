"use client"

import { useState, useRef } from "react"

function RelaxationSpace() {
    const [currentExercise, setCurrentExercise] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef(null)

    const exercises = [
        {
            id: 1,
            title: "Respiration 4-7-8",
            description: "Technique de respiration pour réduire le stress et favoriser la relaxation",
            duration: "5 min",
            type: "breathing",
            icon: "🫁",
            color: "from-blue-500 to-cyan-500",
            instructions: [
                "Inspirez par le nez pendant 4 secondes",
                "Retenez votre souffle pendant 7 secondes",
                "Expirez par la bouche pendant 8 secondes",
                "Répétez le cycle 4 fois",
            ],
        },
        {
            id: 2,
            title: "Méditation Guidée",
            description: "Séance de méditation pour calmer l'esprit et se recentrer",
            duration: "10 min",
            type: "meditation",
            icon: "🧘",
            color: "from-purple-500 to-indigo-500",
            audioUrl: "/audio/meditation.mp3",
            instructions: [
                "Asseyez-vous confortablement",
                "Fermez les yeux doucement",
                "Concentrez-vous sur votre respiration",
                "Laissez passer les pensées sans jugement",
            ],
        },
        {
            id: 3,
            title: "Sons de la Nature",
            description: "Ambiance naturelle apaisante pour la détente",
            duration: "15 min",
            type: "nature",
            icon: "🌿",
            color: "from-green-500 to-emerald-500",
            audioUrl: "/audio/nature.mp3",
            instructions: [
                "Installez-vous dans un endroit calme",
                "Fermez les yeux et écoutez",
                "Imaginez-vous dans la nature",
                "Laissez-vous porter par les sons",
            ],
        },
        {
            id: 4,
            title: "Relaxation Progressive",
            description: "Détente musculaire progressive de tout le corps",
            duration: "12 min",
            type: "progressive",
            icon: "💆",
            color: "from-pink-500 to-rose-500",
            instructions: [
                "Allongez-vous confortablement",
                "Contractez puis relâchez chaque muscle",
                "Commencez par les pieds",
                "Remontez progressivement vers la tête",
            ],
        },
        {
            id: 5,
            title: "Musique Zen",
            description: "Mélodies douces pour la méditation et la concentration",
            duration: "20 min",
            type: "music",
            icon: "🎵",
            color: "from-indigo-500 to-purple-500",
            audioUrl: "/audio/zen.mp3",
            instructions: [
                "Choisissez une position confortable",
                "Réglez le volume à votre convenance",
                "Laissez la musique vous envelopper",
                "Respirez en rythme avec la mélodie",
            ],
        },
        {
            id: 6,
            title: "Visualisation Positive",
            description: "Exercice de visualisation pour cultiver la positivité",
            duration: "8 min",
            type: "visualization",
            icon: "✨",
            color: "from-yellow-500 to-orange-500",
            instructions: [
                "Fermez les yeux et respirez profondément",
                "Visualisez un lieu qui vous apaise",
                "Imaginez-vous dans ce lieu idéal",
                "Ressentez les émotions positives",
            ],
        },
    ]

    const ExerciseCard = ({ exercise }) => (
        <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 hover:border-pink-300/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-start space-x-6">
                <div
                    className={`w-16 h-16 bg-gradient-to-br ${exercise.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                    {exercise.icon}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors">
                            {exercise.title}
                        </h3>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-lg px-3 py-1">
                            {exercise.duration}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{exercise.description}</p>

                    <div className="space-y-2 mb-6">
                        {exercise.instructions.map((instruction, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exercise.color} mr-3 shadow-sm`}></div>
                                <span className="text-gray-600 text-sm">{instruction}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentExercise(exercise)}
                        className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${exercise.color} rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-xl`}
                    >
                        Commencer
                        <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )

    const ExercisePlayer = () => {
        if (!currentExercise) return null

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${currentExercise.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
                            >
                                <span className="text-2xl">{currentExercise.icon}</span>
                            </div>
                            {currentExercise.title}
                        </h2>
                        <button
                            onClick={() => setCurrentExercise(null)}
                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{currentExercise.description}</p>

                        {currentExercise.audioUrl && (
                            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
                                <audio
                                    ref={audioRef}
                                    src={currentExercise.audioUrl}
                                    onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                                    onEnded={() => setIsPlaying(false)}
                                />

                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <button
                                        onClick={() => {
                                            if (isPlaying) {
                                                audioRef.current?.pause()
                                            } else {
                                                audioRef.current?.play()
                                            }
                                            setIsPlaying(!isPlaying)
                                        }}
                                        className={`w-16 h-16 bg-gradient-to-br ${currentExercise.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
                                    >
                                        {isPlaying ? (
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className={`bg-gradient-to-r ${currentExercise.color} h-2 rounded-full transition-all duration-300`}
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>
                                        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
                                    </span>
                                    <span>
                                        {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions :</h3>
                        {currentExercise.instructions.map((instruction, index) => (
                            <div key={index} className="flex items-start space-x-4 bg-white/60 rounded-xl p-4 border border-pink-200">
                                <div
                                    className={`w-8 h-8 bg-gradient-to-br ${currentExercise.color} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}
                                >
                                    {index + 1}
                                </div>
                                <p className="text-gray-700 leading-relaxed">{instruction}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
            {/* Hero Section - Style exact de l'image */}
            <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white min-h-[500px]">
                {/* Background Circles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/8 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-56 h-56 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/3 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center">
                        {/* Badge EmotiFy Healthy */}
                        <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-12 border border-white/30">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            EmotiFy Healthy
                        </div>

                        {/* Main Title */}
                        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                            Espace{" "}
                            <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                                Relaxation
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Découvrez nos exercices de bien-être pour retrouver votre sérénité intérieure et cultiver la paix mentale.
                        </p>

                        {/* Features List */}
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Exercices guidés personnalisés</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Techniques de relaxation avancées</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Ambiances sonores apaisantes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exercises Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Exercices de{" "}
                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Relaxation</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Choisissez l'exercice qui correspond à vos besoins du moment
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {exercises.map((exercise, index) => (
                        <div key={exercise.id} style={{ animationDelay: `${index * 0.1}s` }}>
                            <ExerciseCard exercise={exercise} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="relative py-20 bg-gradient-to-r from-pink-100/50 to-rose-100/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Bienfaits de la{" "}
                            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                Relaxation
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez comment ces pratiques peuvent améliorer votre quotidien
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🧠",
                                title: "Clarté Mentale",
                                description: "Améliore la concentration et réduit le stress mental",
                            },
                            {
                                icon: "💤",
                                title: "Sommeil Réparateur",
                                description: "Favorise un endormissement plus rapide et un sommeil de qualité",
                            },
                            {
                                icon: "❤️",
                                title: "Équilibre Émotionnel",
                                description: "Aide à gérer les émotions et cultive la paix intérieure",
                            },
                            {
                                icon: "⚡",
                                title: "Énergie Renouvelée",
                                description: "Recharge vos batteries et booste votre vitalité",
                            },
                            {
                                icon: "🎯",
                                title: "Focus Amélioré",
                                description: "Développe votre capacité de concentration et d'attention",
                            },
                            {
                                icon: "🌟",
                                title: "Bien-être Global",
                                description: "Contribue à un sentiment général de paix et d'harmonie",
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="group text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 hover:border-pink-300/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-700 transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ExercisePlayer />
        </div>
    )
}

export default RelaxationSpace
