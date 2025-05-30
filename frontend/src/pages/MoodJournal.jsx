"use client"

import { useState } from "react"

function MoodJournal() {
    const [selectedMood, setSelectedMood] = useState("")
    const [moodNote, setMoodNote] = useState("")
    const [comment, setComment] = useState("")
    const [photo, setPhoto] = useState(null)
    const [entries, setEntries] = useState([
        { date: "2024-01-15", mood: "😊", note: 8, comment: "Excellente journée au travail!" },
        { date: "2024-01-14", mood: "😐", note: 6, comment: "Journée normale, un peu fatiguée" },
        { date: "2024-01-13", mood: "😞", note: 4, comment: "Stress avec le projet en cours" },
    ])

    const moods = [
        { emoji: "😊", label: "Joyeux", value: "happy" },
        { emoji: "😐", label: "Neutre", value: "neutral" },
        { emoji: "😞", label: "Triste", value: "sad" },
        { emoji: "😴", label: "Fatigué", value: "tired" },
        { emoji: "😰", label: "Stressé", value: "stressed" },
        { emoji: "🥰", label: "Amoureux", value: "loved" },
    ]

    const MoodEntryForm = () => (
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 mb-8 hover:border-pink-300/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-900">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl">📝</span>
                </div>
                Nouvelle entrée
            </h3>

            <div className="space-y-8">
                <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                        Comment vous sentez-vous aujourd'hui ?
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {moods.map((mood) => (
                            <button
                                key={mood.value}
                                onClick={() => setSelectedMood(mood.value)}
                                className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${selectedMood === mood.value
                                        ? "border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-xl"
                                        : "border-gray-200 hover:border-pink-300 bg-white/50"
                                    }`}
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{mood.emoji}</div>
                                <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">Note sur 10</label>
                    <div className="bg-white/60 rounded-2xl p-6 border border-pink-200">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={moodNote}
                            onChange={(e) => setMoodNote(e.target.value)}
                            className="w-full h-3 bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-3 font-medium">
                            <span>1</span>
                            <span className="text-2xl font-bold text-pink-600">{moodNote || 5}</span>
                            <span>10</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">Commentaire (optionnel)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Décrivez votre journée, vos sentiments, vos expériences..."
                        className="w-full h-32 border border-pink-300 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/80 backdrop-blur-sm resize-none"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">Photo/Selfie (optionnel)</label>
                    <div className="border-2 border-dashed border-pink-300 rounded-2xl p-8 text-center bg-gradient-to-br from-pink-50/50 to-rose-50/50 hover:border-pink-400 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                            <div className="text-4xl mb-4">📸</div>
                            <p className="text-gray-600 font-medium">
                                {photo ? photo.name : "Ajouter une photo pour analyse faciale"}
                            </p>
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSaveEntry}
                    disabled={!selectedMood}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
                >
                    <span className="mr-2">✨</span>
                    Enregistrer l'entrée
                </button>
            </div>
        </div>
    )

    const DailyMoodCard = ({ entry }) => (
        <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 border-pink-400 hover:border-pink-500 transition-all duration-300 hover:scale-105 border border-pink-200/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{entry.mood}</div>
                    <div>
                        <div className="font-bold text-gray-900 text-lg">{new Date(entry.date).toLocaleDateString("fr-FR")}</div>
                        <div className="text-pink-600 font-semibold">Note: {entry.note}/10</div>
                    </div>
                </div>
                <div
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${entry.note >= 7
                            ? "bg-green-100 text-green-700"
                            : entry.note >= 5
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {entry.note >= 7 ? "Bien" : entry.note >= 5 ? "Moyen" : "Difficile"}
                </div>
            </div>
            {entry.comment && (
                <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-200">
                    {entry.comment}
                </p>
            )}
        </div>
    )

    const MoodCalendar = () => (
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200/50 p-8 hover:border-pink-300/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-900">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl">📅</span>
                </div>
                Calendrier des humeurs
            </h3>

            <div className="grid grid-cols-7 gap-3 text-center text-sm text-gray-600 mb-6 font-semibold">
                <div>Dim</div>
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div>Sam</div>
            </div>

            <div className="grid grid-cols-7 gap-3">
                {Array.from({ length: 35 }, (_, i) => {
                    const dayMood = Math.random() > 0.7 ? ["😊", "😐", "😞"][Math.floor(Math.random() * 3)] : ""
                    return (
                        <div
                            key={i}
                            className="aspect-square border border-pink-200 rounded-xl flex items-center justify-center hover:bg-pink-50 transition-colors cursor-pointer hover:scale-105 duration-200 bg-white/50"
                        >
                            {dayMood && <span className="text-2xl hover:scale-110 transition-transform">{dayMood}</span>}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const handleSaveEntry = () => {
        if (!selectedMood) return

        const newEntry = {
            date: new Date().toISOString().split("T")[0],
            mood: moods.find((m) => m.value === selectedMood)?.emoji || "😊",
            note: Number.parseInt(moodNote) || 5,
            comment: comment.trim(),
        }

        setEntries([newEntry, ...entries])
        setSelectedMood("")
        setMoodNote("")
        setComment("")
        setPhoto(null)
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
                            Journal d'{" "}
                            <span className="bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                                Humeur
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Suivez votre bien-être émotionnel au quotidien et découvrez vos patterns pour mieux vous comprendre.
                        </p>

                        {/* Features List */}
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Suivi quotidien personnalisé</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Analyse des tendances</span>
                            </div>
                            <div className="flex items-center text-pink-100">
                                <svg className="w-5 h-5 mr-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">Données privées et sécurisées</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <MoodEntryForm />

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-lg">📖</span>
                                </div>
                                Entrées récentes
                            </h3>
                            {entries.map((entry, index) => (
                                <DailyMoodCard key={index} entry={entry} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <MoodCalendar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoodJournal
