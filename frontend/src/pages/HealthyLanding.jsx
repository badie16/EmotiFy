"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function HealthyLanding() {
    const [currentQuote, setCurrentQuote] = useState(0)
    const [moodScore, setMoodScore] = useState(0)

    const quotes = [
        "Prendre soin de soi n'est pas un luxe, c'est une nécessité",
        "Votre bien-être mental est aussi important que votre santé physique",
        "Chaque jour est une nouvelle opportunité de cultiver la joie",
        "L'équilibre émotionnel est la clé d'une vie épanouie"
    ]

    useEffect(() => {
        const quoteTimer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length)
        }, 4000)

        const moodTimer = setTimeout(() => {
            setMoodScore(8.2)
        }, 1000)

        return () => {
            clearInterval(quoteTimer)
            clearTimeout(moodTimer)
        }
    }, [])

    const modules = [
        {
            id: "mood-journal",
            title: "Journal d'Humeur",
            icon: "📔",
            description: "Suivez votre état émotionnel au quotidien avec des entrées personnalisées",
            features: [
                "Entrées quotidiennes",
                "Analyse des tendances",
                "Rappels personnalisés",
                "Export des données"
            ],
            color: "from-pink-500 to-rose-500",
            link: "/healthy/mood-journal"
        },
        {
            id: "exercises",
            title: "Exercices de Bien-être",
            icon: "🧘",
            description: "Pratiquez la méditation, la respiration et d'autres exercices relaxants",
            features: [
                "Méditation guidée",
                "Exercices de respiration",
                "Yoga mental",
                "Programmes personnalisés"
            ],
            color: "from-purple-500 to-indigo-500",
            link: "/healthy/relaxation"
        },
        {
            id: "music",
            title: "Musiques Relaxantes",
            icon: "🎵",
            description: "Écoutez des playlists spécialement conçues pour la détente et la concentration",
            features: [
                "Sons de la nature",
                "Musique zen",
                "Méditation guidée",
                "Playlists personnalisées"
            ],
            color: "from-cyan-500 to-blue-500",
            link: "/healthy/relaxation"
        },
        {
            id: "tracking",
            title: "Suivi Graphique",
            icon: "📈",
            description: "Visualisez votre évolution émotionnelle avec des graphiques détaillés",
            features: [
                "Graphiques interactifs",
                "Analyses prédictives",
                "Recommandations IA",
                "Rapports mensuels"
            ],
            color: "from-emerald-500 to-teal-500",
            link: "/healthy/dashboard"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-rose-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-rose-600/20 to-purple-600/20"></div>

                {/* Floating Elements */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-4 h-4 bg-white/10 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${4 + Math.random() * 3}s`,
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-6">
                            <span className="text-6xl animate-bounce-slow">🧘</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                                EmotiFy Healthy
                            </span>
                        </h1>

                        {/* Animated Quote */}
                        <div className="h-16 flex items-center justify-center mb-8">
                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto transition-all duration-1000 opacity-100">
                                "{quotes[currentQuote]}"
                            </p>
                        </div>

                        {/* Mood Score Display */}
                        <div className="inline-block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
                            <div className="text-center">
                                <div className="text-sm text-gray-300 mb-2">Votre humeur aujourd'hui</div>
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="text-4xl">😊</div>
                                    <div className="text-3xl font-bold text-pink-400">{moodScore.toFixed(1)}/10</div>
                                </div>
                                <div className="w-32 bg-gray-700 rounded-full h-2 mt-3">
                                    <div
                                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-2000"
                                        style={{ width: `${(moodScore / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/healthy/mood-journal"
                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
                        >
                            Commencer mon journal
                        </Link>
                        <Link
                            to="/healthy/relaxation"
                            className="px-8 py-4 border-2 border-pink-400 rounded-full font-semibold text-pink-400 hover:bg-pink-400 hover:text-white transition-all duration-300 text-center"
                        >
                            Exercices de relaxation
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="relative py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-white mb-16">
                        Votre Parcours Bien-être
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="group relative"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${module.color.replace('500', '500/20')} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:scale-105">
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                                {module.icon}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-3">{module.title}</h3>
                                            <p className="text-gray-300 mb-6 leading-relaxed">{module.description}</p>

                                            <div className="space-y-2 mb-6">
                                                {module.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center">
                                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color} mr-3`}></div>
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to={module.link}
                                                className={`inline-block px-6 py-3 bg-gradient-to-r ${module.color} rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                                            >
                                                Découvrir
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="relative py-20 bg-gradient-to-r from-pink-900/50 to-rose-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-white mb-16">
                        Les Bienfaits du Bien-être Émotionnel
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "💪",
                                title: "Résilience Mentale",
                                description: "Développez votre capacité à surmonter les défis et le stress quotidien"
                            },
                            {
                                icon: "❤️",
                                title: "Relations Harmonieuses",
                                description: "Améliorez vos relations grâce à une meilleure compréhension émotionnelle"
                            },
                            {
                                icon: "🌟",
                                title: "Épanouissement Personnel",
                                description: "Atteignez vos objectifs avec plus de clarté et de motivation"
                            },
                            {
                                icon: "😴",
                                title: "Sommeil de Qualité",
                                description: "Réduisez l'anxiété et améliorez la qualité de votre repos"
                            },
                            {
                                icon: "🧠",
                                title: "Clarté Mentale",
                                description: "Prenez de meilleures décisions avec un esprit apaisé"
                            },
                            {
                                icon: "⚡",
                                title: "Énergie Positive",
                                description: "Cultivez un état d'esprit optimiste et énergisant"
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Daily Tips */}
            <div className="relative py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Conseil Bien-être du Jour
                    </h2>

                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                        <div className="text-6xl mb-6">🌸</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Pratique de Gratitude</h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Prenez 5 minutes chaque matin pour noter trois choses pour lesquelles vous êtes reconnaissant.
                            Cette simple pratique peut transformer votre perspective et améliorer votre humeur pour toute la journée.
                        </p>

                        <Link
                            to="/healthy/mood-journal"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            Commencer maintenant
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthyLanding
