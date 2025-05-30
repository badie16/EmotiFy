import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BusinessDashboard() {
    const [selectedDepartment, setSelectedDepartment] = useState('all')
    const [selectedDate, setSelectedDate] = useState('today')
    const [teamData, setTeamData] = useState([])

    // Mock data for demonstration
    const mockTeamData = [
        { department: 'Marketing', positive: 65, neutral: 25, negative: 10, totalMembers: 12 },
        { department: 'Développement', positive: 70, neutral: 20, negative: 10, totalMembers: 15 },
        { department: 'Commercial', positive: 55, neutral: 30, negative: 15, totalMembers: 8 },
        { department: 'Support', positive: 60, neutral: 25, negative: 15, totalMembers: 10 }
    ]

    useEffect(() => {
        setTeamData(mockTeamData)
    }, [])

    const EmotionStatsCard = ({ title, value, percentage, color, icon }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{percentage}% vs hier</p>
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    )

    const TeamSentimentGraph = ({ data }) => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sentiment par équipe</h3>
            <div className="space-y-4">
                {data.map((team, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{team.department}</span>
                            <span className="text-sm text-gray-500">{team.totalMembers} membres</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                            <div
                                className="bg-green-500 h-full"
                                style={{ width: `${team.positive}%` }}
                                title={`Positif: ${team.positive}%`}
                            ></div>
                            <div
                                className="bg-yellow-500 h-full"
                                style={{ width: `${team.neutral}%` }}
                                title={`Neutre: ${team.neutral}%`}
                            ></div>
                            <div
                                className="bg-red-500 h-full"
                                style={{ width: `${team.negative}%` }}
                                title={`Négatif: ${team.negative}%`}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Positif {team.positive}%</span>
                            <span>Neutre {team.neutral}%</span>
                            <span>Négatif {team.negative}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const BusinessFilterBar = () => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">Tous les départements</option>
                        <option value="marketing">Marketing</option>
                        <option value="dev">Développement</option>
                        <option value="sales">Commercial</option>
                        <option value="support">Support</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="quarter">Ce trimestre</option>
                    </select>
                </div>
                <div className="flex-1"></div>
                <Link
                    to="/business/client-analysis"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                    Analyser conversation client
                </Link>
            </div>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 Dashboard Business</h1>
                <p className="text-gray-600">Analysez le climat émotionnel de vos équipes et clients</p>
            </div>

            <BusinessFilterBar />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <EmotionStatsCard
                    title="Sentiment Positif"
                    value="62%"
                    percentage="+5"
                    color="#10B981"
                    icon="😊"
                />
                <EmotionStatsCard
                    title="Engagement Équipe"
                    value="78%"
                    percentage="+2"
                    color="#3B82F6"
                    icon="🚀"
                />
                <EmotionStatsCard
                    title="Satisfaction Client"
                    value="85%"
                    percentage="+8"
                    color="#8B5CF6"
                    icon="⭐"
                />
                <EmotionStatsCard
                    title="Alertes Stress"
                    value="3"
                    percentage="-2"
                    color="#EF4444"
                    icon="⚠️"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TeamSentimentGraph data={teamData} />

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                    <div className="space-y-3">
                        <Link
                            to="/business/client-analysis"
                            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                                    🎤
                                </div>
                                <div>
                                    <h4 className="font-medium">Analyser conversation client</h4>
                                    <p className="text-sm text-gray-500">Upload audio ou transcription</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/business/employees"
                            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    👥
                                </div>
                                <div>
                                    <h4 className="font-medium">Tableau des employés</h4>
                                    <p className="text-sm text-gray-500">Météo émotionnelle équipe</p>
                                </div>
                            </div>
                        </Link>

                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                    📊
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-500">Rapports avancés</h4>
                                    <p className="text-sm text-gray-400">Bientôt disponible</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessDashboard
