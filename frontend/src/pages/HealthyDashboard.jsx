"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function HealthyDashboard() {
    const [timeRange, setTimeRange] = useState("week")

    const moodData = {
        week: [7, 6, 8, 5, 7, 8, 9],
        month: [6.5, 7.2, 6.8, 7.5, 8.1, 7.9, 8.3, 7.6],
    }

    const MoodTrendGraph = () => (
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 hover:border-pink-300/50 transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-xl">📈</span>
                    </div>
                    Évolution de votre humeur
                </h3>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-pink-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/80 backdrop-blur-sm"
                >
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                </select>
            </div>

            <div className="h-80 flex items-end justify-between space-x-3 bg-gradient-to-t from-pink-50/50 to-transparent rounded-2xl p-6">
                {moodData[timeRange].map((score, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                        <div
                            className={`w-full rounded-t-lg transition-all duration-700 hover:scale-105 shadow-lg ${score >= 7
                                    ? "bg-gradient-to-t from-pink-400 to-pink-500"
                                    : score >= 5
                                        ? "bg-gradient-to-t from-rose-400 to-rose-500"
                                        : "bg-gradient-to-t from-red-400 to-red-500"
                                }`}
                            style={{ height: `${(score / 10) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-3 font-medium">
                            {timeRange === "week" ? ["L", "M", "M", "J", "V", "S", "D"][index] : `S${index + 1}`}
                        </div>
                        <div className="text-sm font-bold text-gray-700 bg-white/80 rounded-lg px-2 py-1 mt-1">{score}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center space-x-6 text-sm">
                <div className="flex items-center bg-white/60 rounded-lg px-3 py-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded mr-2"></div>
                    <span className="font-medium">Bien (7-10)</span>
                </div>
                <div className="flex items-center bg-white/60 rounded-lg px-3 py-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-rose-500 rounded mr-2"></div>
                    <span className="font-medium">Moyen (5-6)</span>
                </div>
                <div className="flex items-center bg-white/60 rounded-lg px-3 py-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded mr-2"></div>
                    <span className="font-medium">Difficile (1-4)</span>
                </div>
            </div>
        </div>
    )

    const HealthTipsCard = () => (
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 hover:border-pink-300/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-xl">💡</span>
                </div>
                Conseils bien-être
            </h3>

            <div className="space-y-6">
                <div className="group bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-400 hover:scale-105 transition-all duration-300 shadow-lg">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-sm">💧</span>
                        </div>
                        Hydratation
                    </h4>
                    <p className="text-blue-700 leading-relaxed">
                        Buvez un verre d'eau toutes les heures pour maintenir votre énergie et votre concentration.
                    </p>
                </div>

                <div className="group bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-l-4 border-green-400 hover:scale-105 transition-all duration-300 shadow-lg">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center text-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-sm">🚶</span>
                        </div>
                        Mouvement
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                        Faites une courte promenade de 10 minutes pour stimuler votre humeur et votre créativité.
                    </p>
                </div>

                <div className="group bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-400 hover:scale-105 transition-all duration-300 shadow-lg">
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center text-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-sm">😴</span>
                        </div>
                        Sommeil
                    </h4>
                    <p className="text-purple-700 leading-relaxed">
                        Essayez de vous coucher 30 minutes plus tôt ce soir pour un repos optimal.
                    </p>
                </div>
            </div>
        </div>
    )

    const AlertBanner = () => {
        const averageMood = moodData[timeRange].reduce((a, b) => a + b, 0) / moodData[timeRange].length

        if (averageMood >= 7) {
            return (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                            <span className="text-3xl">✅</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-green-800 text-2xl mb-2">Excellent moral !</h3>
                            <p className="text-green-700 text-lg">
                                Votre humeur est stable et positive. Continuez sur cette lancée !
                            </p>
                        </div>
                    </div>
                </div>
            )
        } else if (averageMood >= 5) {
            return (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-yellow-800 text-2xl mb-2">Attention à votre bien-être</h3>
                            <p className="text-yellow-700 text-lg">Votre humeur semble en baisse. Prenez du temps pour vous.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                            <span className="text-3xl">🚨</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-red-800 text-2xl mb-2">Prenez soin de vous</h3>
                            <p className="text-red-700 text-lg">Votre moral semble difficile. N'hésitez pas à demander de l'aide.</p>
                        </div>
                    </div>
                </div>
            )
        }
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
                            Tableau de{" "}
                            <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                                Bord
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Suivez votre bien-être émotionnel et mental au quotidien avec des insights personnalisés et des recommandations adaptées.
                        </p>

                        {/* Features List */}
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Analyses en temps réel</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Recommandations personnalisées</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Données sécurisées</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <AlertBanner />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 text-center hover:border-pink-300/50 transition-all duration-300 hover:scale-105">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                            <span className="text-4xl">😊</span>
                        </div>
                        <div className="text-4xl font-bold text-pink-600 mb-2">7.2</div>
                        <div className="text-gray-600 font-medium mb-2">Humeur moyenne</div>
                        <div className="text-sm text-green-600 font-semibold bg-green-50 rounded-lg px-3 py-1 inline-block">
                            +0.3 cette semaine
                        </div>
                    </div>

                    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-200/50 p-8 text-center hover:border-rose-300/50 transition-all duration-300 hover:scale-105">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                            <span className="text-4xl">📅</span>
                        </div>
                        <div className="text-4xl font-bold text-rose-600 mb-2">12</div>
                        <div className="text-gray-600 font-medium mb-2">Jours de suivi</div>
                        <div className="text-sm text-blue-600 font-semibold bg-blue-50 rounded-lg px-3 py-1 inline-block">
                            Régularité excellente
                        </div>
                    </div>

                    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200/50 p-8 text-center hover:border-purple-300/50 transition-all duration-300 hover:scale-105">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                            <span className="text-4xl">🎯</span>
                        </div>
                        <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
                        <div className="text-gray-600 font-medium mb-2">Objectifs atteints</div>
                        <div className="text-sm text-green-600 font-semibold bg-green-50 rounded-lg px-3 py-1 inline-block">
                            +15% ce mois
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <MoodTrendGraph />
                    <HealthTipsCard />
                </div>

                {/* Quick Actions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-10 hover:border-pink-300/50 transition-all duration-300">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                            <span className="text-2xl">🚀</span>
                        </div>
                        Actions rapides
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link
                            to="/healthy/mood-journal"
                            className="group bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-200 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <span className="text-3xl">📝</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl mb-2">Journal d'humeur</h4>
                                    <p className="text-gray-600">Enregistrez votre état émotionnel quotidien</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/healthy/relaxation"
                            className="group bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <span className="text-3xl">🧘</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl mb-2">Espace relaxation</h4>
                                    <p className="text-gray-600">Exercices de détente et méditation guidée</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthyDashboard
