"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function CoreLanding() {
    const [activeModule, setActiveModule] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const modules = [
        {
            id: "face",
            title: "Analyse Faciale",
            icon: "😊",
            description: "Détectez et analysez les émotions à partir des expressions faciales en temps réel",
            features: [
                "Reconnaissance en temps réel",
                "7 émotions principales",
                "Analyse multi-visages",
                "Export des résultats",
            ],
            color: "from-blue-500 to-cyan-500",
            bgColor: "from-blue-900/20 to-cyan-900/20",
            link: "/face",
        },
        {
            id: "voice",
            title: "Analyse Vocale",
            icon: "🎤",
            description: "Analysez les émotions dans la voix et les intonations pour une communication optimale",
            features: ["Analyse audio avancée", "Détection du stress", "Qualité vocale", "Recommandations"],
            color: "from-purple-500 to-pink-500",
            bgColor: "from-purple-900/20 to-pink-900/20",
            link: "/voice",
        },
        {
            id: "text",
            title: "Analyse de Texte",
            icon: "📝",
            description: "Découvrez les émotions cachées dans vos écrits et améliorez votre communication",
            features: ["IA avancée", "Analyse sémantique", "Rapport détaillé", "Export PDF"],
            color: "from-emerald-500 to-teal-500",
            bgColor: "from-emerald-900/20 to-teal-900/20",
            link: "/text",
        },
        {
            id: "chat",
            title: "Analyse de Chat",
            icon: "💬",
            description: "Surveillez les conversations pour détecter les signaux de détresse ou de harcèlement",
            features: ["Détection de risques", "Analyse de sentiment", "Alertes automatiques", "Modération intelligente"],
            color: "from-orange-500 to-red-500",
            bgColor: "from-orange-900/20 to-red-900/20",
            link: "/chat",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Hero Section */}
            <div
                className={`relative overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-6">
                            <span className="text-6xl animate-pulse">🧠</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                EmotiFy Core
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Le cœur de l'intelligence émotionnelle. Analysez, comprenez et maîtrisez les émotions grâce à nos
                            technologies d'IA de pointe.
                        </p>
                    </div>

                    {/* Interactive Module Selector */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                onMouseEnter={() => setActiveModule(index)}
                                className={`group relative cursor-pointer transition-all duration-500 ${activeModule === index ? "scale-105" : "hover:scale-102"
                                    }`}
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${module.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`}
                                ></div>
                                <div
                                    className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500`}
                                >
                                    <div className="text-center">
                                        <div className="text-4xl mb-4 animate-bounce-slow">{module.icon}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                                        <p className="text-gray-300 text-sm">{module.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Module Details */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-5xl mr-4">{modules[activeModule].icon}</span>
                                    <h2 className="text-3xl font-bold text-white">{modules[activeModule].title}</h2>
                                </div>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">{modules[activeModule].description}</p>

                                <div className="space-y-4 mb-8">
                                    {modules[activeModule].features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <div
                                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${modules[activeModule].color} mr-3`}
                                            ></div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to={modules[activeModule].link}
                                    className={`inline-block px-8 py-4 bg-gradient-to-r ${modules[activeModule].color} rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                >
                                    Essayer maintenant
                                </Link>
                            </div>

                            <div className="relative">
                                <div
                                    className={`w-full h-80 bg-gradient-to-br ${modules[activeModule].bgColor} rounded-2xl flex items-center justify-center`}
                                >
                                    <div className="text-8xl opacity-50">{modules[activeModule].icon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-white mb-16">Pourquoi choisir EmotiFy Core ?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "⚡",
                                title: "Analyse en temps réel",
                                description: "Résultats instantanés avec une précision de 95%",
                            },
                            {
                                icon: "🔒",
                                title: "Sécurité garantie",
                                description: "Vos données restent privées et sécurisées",
                            },
                            {
                                icon: "🎯",
                                title: "IA de pointe",
                                description: "Algorithmes d'apprentissage automatique avancés",
                            },
                        ].map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoreLanding
