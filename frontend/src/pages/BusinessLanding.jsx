"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function BusinessLanding() {
    const [activeTab, setActiveTab] = useState(0)
    const [stats, setStats] = useState({ satisfaction: 0, productivity: 0, retention: 0 })

    useEffect(() => {
        // Animate stats
        const timer = setTimeout(() => {
            setStats({ satisfaction: 87, productivity: 34, retention: 23 })
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const modules = [
        {
            id: "client-analysis",
            title: "Analyse Client",
            icon: "🎯",
            description: "Analysez les émotions de vos clients en temps réel pour améliorer leur expérience",
            features: [
                "Analyse des appels clients",
                "Détection de satisfaction",
                "Recommandations automatiques",
                "Rapports détaillés"
            ],
            benefits: "Augmentez la satisfaction client de 40%",
            color: "from-blue-500 to-cyan-500",
            link: "/business/client-analysis"
        },
        {
            id: "employee-tracking",
            title: "Suivi Émotionnel Employés",
            icon: "👥",
            description: "Surveillez le bien-être de vos équipes et prévenez le burnout",
            features: [
                "Tableau de bord équipe",
                "Alertes bien-être",
                "Analyse des tendances",
                "Recommandations RH"
            ],
            benefits: "Réduisez le turnover de 25%",
            color: "from-emerald-500 to-green-500",
            link: "/business/employees"
        },
        {
            id: "dashboard",
            title: "Dashboard Émotionnel",
            icon: "📊",
            description: "Visualisez les données émotionnelles de votre organisation",
            features: [
                "Métriques en temps réel",
                "Analyses prédictives",
                "Rapports personnalisés",
                "Intégrations API"
            ],
            benefits: "Optimisez la performance de 30%",
            color: "from-purple-500 to-pink-500",
            link: "/business/dashboard"
        },
        {
            id: "ai-feedback",
            title: "Feedback IA",
            icon: "🤖",
            description: "Recevez des recommandations intelligentes basées sur l'analyse émotionnelle",
            features: [
                "Conseils personnalisés",
                "Prédictions comportementales",
                "Optimisation continue",
                "Alertes proactives"
            ],
            benefits: "Anticipez les problèmes avant qu'ils surviennent",
            color: "from-orange-500 to-red-500",
            link: "#"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-6">
                                <span className="text-6xl animate-pulse">💼</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                    EmotiFy Business
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Transformez votre entreprise grâce à l'intelligence émotionnelle.
                                Optimisez la satisfaction client, le bien-être des employés et la performance globale.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    to="/business/dashboard"
                                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
                                >
                                    Voir le Dashboard
                                </Link>
                                <Link
                                    to="/business/client-analysis"
                                    className="px-8 py-4 border-2 border-emerald-400 rounded-full font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 text-center"
                                >
                                    Analyser un client
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Satisfaction Client</h3>
                                        <p className="text-gray-300">Amélioration moyenne</p>
                                    </div>
                                    <div className="text-4xl font-bold text-emerald-400">+{stats.satisfaction}%</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Productivité</h3>
                                        <p className="text-gray-300">Augmentation équipe</p>
                                    </div>
                                    <div className="text-4xl font-bold text-green-400">+{stats.productivity}%</div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Rétention</h3>
                                        <p className="text-gray-300">Réduction turnover</p>
                                    </div>
                                    <div className="text-4xl font-bold text-teal-400">-{stats.retention}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            <div className="relative py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-white mb-16">
                        Nos Solutions Business
                    </h2>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {modules.map((module, index) => (
                            <button
                                key={module.id}
                                onClick={() => setActiveTab(index)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === index
                                        ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                                    }`}
                            >
                                <span className="mr-2">{module.icon}</span>
                                {module.title}
                            </button>
                        ))}
                    </div>

                    {/* Active Module Content */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-5xl mr-4">{modules[activeTab].icon}</span>
                                    <h3 className="text-3xl font-bold text-white">{modules[activeTab].title}</h3>
                                </div>

                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    {modules[activeTab].description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    {modules[activeTab].features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${modules[activeTab].color} mr-3`}></div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-4 mb-8">
                                    <p className="text-emerald-300 font-semibold">💡 {modules[activeTab].benefits}</p>
                                </div>

                                <Link
                                    to={modules[activeTab].link}
                                    className={`inline-block px-8 py-4 bg-gradient-to-r ${modules[activeTab].color} rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                >
                                    Découvrir
                                </Link>
                            </div>

                            <div className="relative">
                                <div className={`w-full h-80 bg-gradient-to-br ${modules[activeTab].color.replace('to-', 'to-').replace('from-', 'from-').replace('500', '900/20')} rounded-2xl flex items-center justify-center`}>
                                    <div className="text-8xl opacity-50">{modules[activeTab].icon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROI Section */}
            <div className="relative py-20 bg-gradient-to-r from-emerald-900/50 to-green-900/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Retour sur Investissement Prouvé
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Nos clients constatent des améliorations mesurables dès les premières semaines d'utilisation
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { metric: "ROI", value: "300%", period: "en 6 mois" },
                            { metric: "Économies", value: "€50K", period: "par an" },
                            { metric: "Temps gagné", value: "40h", period: "par semaine" }
                        ].map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <div className="text-4xl font-bold text-emerald-400 mb-2">{item.value}</div>
                                <div className="text-xl font-semibold text-white mb-1">{item.metric}</div>
                                <div className="text-gray-300">{item.period}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessLanding
