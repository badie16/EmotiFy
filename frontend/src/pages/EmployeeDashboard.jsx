import { useState } from 'react'

function EmployeeDashboard() {
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const employees = [
        { id: 1, name: "Marie Dubois", department: "Marketing", mood: "😊", moodScore: 8, status: "En ligne" },
        { id: 2, name: "Pierre Martin", department: "Développement", mood: "😐", moodScore: 6, status: "Occupé" },
        { id: 3, name: "Sophie Chen", department: "Commercial", mood: "😞", moodScore: 4, status: "En ligne" },
        { id: 4, name: "Lucas Bernard", department: "Support", mood: "😊", moodScore: 9, status: "Absent" }
    ]

    const EmployeeMoodCard = ({ employee, onClick }) => (
        <div
            onClick={() => onClick(employee)}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4"
            style={{ borderLeftColor: employee.moodScore >= 7 ? '#10B981' : employee.moodScore >= 5 ? '#F59E0B' : '#EF4444' }}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        👤
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.department}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl mb-1">{employee.mood}</div>
                    <div className="text-xs text-gray-500">{employee.status}</div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${employee.moodScore >= 7 ? 'bg-green-500' :
                                    employee.moodScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${employee.moodScore * 10}%` }}
                        ></div>
                    </div>
                </div>
                <span className="text-sm font-medium">{employee.moodScore}/10</span>
            </div>
        </div>
    )

    const MoodHistoryChart = ({ employee }) => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">📈 Historique émotionnel - {employee.name}</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500 mb-2">
                    <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
                </div>

                {/* Semaine actuelle */}
                <div className="grid grid-cols-7 gap-2">
                    {[8, 7, 6, 8, 9, 7, 8].map((score, index) => (
                        <div key={index} className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${score >= 7 ? 'bg-green-100 text-green-800' :
                                    score >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {score}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Tendances récentes :</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Amélioration constante depuis lundi</li>
                        <li>• Pic de stress mercredi (réunion importante)</li>
                        <li>• Retour à la normale en fin de semaine</li>
                    </ul>
                </div>
            </div>
        </div>
    )

    const EmployeeProfileModal = ({ employee, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Profil - {employee.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                            👤
                        </div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.department}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">État émotionnel actuel</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl">{employee.mood}</span>
                            <span className="font-bold">{employee.moodScore}/10</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Actions suggérées :</h4>
                        <div className="space-y-2 text-sm">
                            {employee.moodScore < 5 && (
                                <div className="bg-red-50 p-2 rounded text-red-800">
                                    ⚠️ Envisager un entretien individuel
                                </div>
                            )}
                            {employee.moodScore >= 5 && employee.moodScore < 7 && (
                                <div className="bg-yellow-50 p-2 rounded text-yellow-800">
                                    💡 Proposer une pause ou du soutien
                                </div>
                            )}
                            {employee.moodScore >= 7 && (
                                <div className="bg-green-50 p-2 rounded text-green-800">
                                    ✅ Continuer le bon travail !
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 Tableau des Employés</h1>
                <p className="text-gray-600">Météo émotionnelle de votre équipe</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {employees.map(employee => (
                    <EmployeeMoodCard
                        key={employee.id}
                        employee={employee}
                        onClick={setSelectedEmployee}
                    />
                ))}
            </div>

            {selectedEmployee && (
                <>
                    <MoodHistoryChart employee={selectedEmployee} />
                    <EmployeeProfileModal
                        employee={selectedEmployee}
                        onClose={() => setSelectedEmployee(null)}
                    />
                </>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h3 className="text-lg font-semibold mb-4">📊 Résumé équipe</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">75%</div>
                        <div className="text-sm text-gray-600">Moral positif</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">20%</div>
                        <div className="text-sm text-gray-600">Moral neutre</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">5%</div>
                        <div className="text-sm text-gray-600">Attention requise</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard
