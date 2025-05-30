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
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">📈</span>
                    Évolution de votre humeur
                </h3>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-pink-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                </select>
            </div>

            <div className="h-64 flex items-end justify-between space-x-2">
                {moodData[timeRange].map((score, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                            className={`w-full rounded-t transition-all duration-500 ${score >= 7 ? "bg-pink-400" : score >= 5 ? "bg-rose-400" : "bg-red-400"
                                }`}
                            style={{ height: `${(score / 10) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">
                            {timeRange === "week" ? ["L", "M", "M", "J", "V", "S", "D"][index] : `S${index + 1}`}
                        </div>
                        <div className="text-xs font-medium">{score}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex justify-center space-x-4 text-xs">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-400 rounded mr-1"></div>
                    <span>Bien (7-10)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-rose-400 rounded mr-1"></div>
                    <span>Moyen (5-6)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                    <span>Difficile (1-4)</span>
                </div>
            </div>
        </div>
    )

    const HealthTipsCard = () => (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/50 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mr-3">💡</span>
                Conseils bien-être
            </h3>

            <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <span className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2 text-xs">💧</span>
                        Hydratation
                    </h4>
                    <p className="text-sm text-blue-700">Buvez un verre d'eau toutes les heures pour maintenir votre énergie.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <span className="w-5 h-5 bg-green-100 rounded flex items-center justify-center mr-2 text-xs">🚶</span>
                        Mouvement
                    </h4>
                    <p className="text-sm text-green-700">
                        Faites une courte promenade de 10 minutes pour stimuler votre humeur.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-400">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <span className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2 text-xs">😴</span>
                        Sommeil
                    </h4>
                    <p className="text-sm text-purple-700">Essayez de vous coucher 30 minutes plus tôt ce soir.</p>
                </div>
            </div>
        </div>
    )

    const AlertBanner = () => {
        const averageMood = moodData[timeRange].reduce((a, b) => a + b, 0) / moodData[timeRange].length

        if (averageMood >= 7) {
            return (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 text-2xl">✅</div>
                        <div>
                            <h3 className="font-bold text-green-800 text-lg">Excellent moral !</h3>
                            <p className="text-green-700">Votre humeur est stable et positive. Continuez sur cette lancée !</p>
                        </div>
                    </div>
                </div>
            )
        } else if (averageMood >= 5) {
            return (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4 text-2xl">⚠️</div>
                        <div>
                            <h3 className="font-bold text-yellow-800 text-lg">Attention à votre bien-être</h3>
                            <p className="text-yellow-700">Votre humeur semble en baisse. Prenez du temps pour vous.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 text-2xl">🚨</div>
                        <div>
                            <h3 className="font-bold text-red-800 text-lg">Prenez soin de vous</h3>
                            <p className="text-red-700">Votre moral semble difficile. N'hésitez pas à demander de l'aide.</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
                            EmotiFy Healthy - Bien-être Personnel
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                            🧘 Tableau de Bord Healthy
                        </h1>
                        <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Suivez votre bien-être émotionnel et mental au quotidien
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50 to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <AlertBanner />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/50 p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">😊</span>
                        </div>
                        <div className="text-3xl font-bold text-pink-600 mb-1">7.2</div>
                        <div className="text-sm text-gray-600">Humeur moyenne</div>
                        <div className="mt-2 text-xs text-green-600 font-medium">+0.3 cette semaine</div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-200/50 p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📅</span>
                        </div>
                        <div className="text-3xl font-bold text-rose-600 mb-1">12</div>
                        <div className="text-sm text-gray-600">Jours de suivi</div>
                        <div className="mt-2 text-xs text-blue-600 font-medium">Régularité excellente</div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200/50 p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎯</span>
                        </div>
                        <div className="text-3xl font-bold text-purple-600 mb-1">85%</div>
                        <div className="text-sm text-gray-600">Objectifs atteints</div>
                        <div className="mt-2 text-xs text-green-600 font-medium">+15% ce mois</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <MoodTrendGraph />
                    <HealthTipsCard />
                </div>

                {/* Quick Actions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/50 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">🚀</span>
                        Actions rapides
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            to="/healthy/mood-journal"
                            className="group bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Journal d'humeur</h4>
                                    <p className="text-sm text-gray-600">Enregistrez votre état émotionnel</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/healthy/relaxation"
                            className="group bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">🧘</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Espace relaxation</h4>
                                    <p className="text-sm text-gray-600">Exercices de détente et méditation</p>
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
