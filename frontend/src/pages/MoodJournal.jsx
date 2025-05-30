import { useState } from 'react'

function MoodJournal() {
    const [selectedMood, setSelectedMood] = useState('')
    const [moodNote, setMoodNote] = useState('')
    const [comment, setComment] = useState('')
    const [photo, setPhoto] = useState(null)
    const [entries, setEntries] = useState([
        { date: '2024-01-15', mood: '😊', note: 8, comment: 'Excellente journée au travail!' },
        { date: '2024-01-14', mood: '😐', note: 6, comment: 'Journée normale, un peu fatiguée' },
        { date: '2024-01-13', mood: '😞', note: 4, comment: 'Stress avec le projet en cours' }
    ])

    const moods = [
        { emoji: '😊', label: 'Joyeux', value: 'happy' },
        { emoji: '😐', label: 'Neutre', value: 'neutral' },
        { emoji: '😞', label: 'Triste', value: 'sad' },
        { emoji: '😴', label: 'Fatigué', value: 'tired' },
        { emoji: '😰', label: 'Stressé', value: 'stressed' },
        { emoji: '🥰', label: 'Amoureux', value: 'loved' }
    ]

    const MoodEntryForm = () => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">📝 Nouvelle entrée</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comment vous sentez-vous aujourd'hui ?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {moods.map((mood) => (
                            <button
                                key={mood.value}
                                onClick={() => setSelectedMood(mood.value)}
                                className={`p-3 rounded-lg border-2 transition-colors ${selectedMood === mood.value
                                        ? 'border-rose-500 bg-rose-50'
                                        : 'border-gray-200 hover:border-rose-300'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{mood.emoji}</div>
                                <div className="text-xs text-gray-600">{mood.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note sur 10
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span className="font-medium">{moodNote || 5}</span>
                        <span>10</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commentaire (optionnel)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Décrivez votre journée, vos sentiments..."
                        className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo/Selfie (optionnel)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                            <div className="text-2xl mb-2">📸</div>
                            <p className="text-sm text-gray-600">
                                {photo ? photo.name : 'Ajouter une photo pour analyse faciale'}
                            </p>
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSaveEntry}
                    disabled={!selectedMood}
                    className="w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Enregistrer l'entrée
                </button>
            </div>
        </div>
    )

    const DailyMoodCard = ({ entry }) => (
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-rose-400">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <div className="text-2xl">{entry.mood}</div>
                    <div>
                        <div className="font-medium">{new Date(entry.date).toLocaleDateString('fr-FR')}</div>
                        <div className="text-sm text-gray-500">Note: {entry.note}/10</div>
                    </div>
                </div>
            </div>
            {entry.comment && (
                <p className="text-sm text-gray-600 mt-2">{entry.comment}</p>
            )}
        </div>
    )

    const MoodCalendar = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">📅 Calendrier des humeurs</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500 mb-4">
                <div>Dim</div><div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                    const dayMood = Math.random() > 0.7 ? ['😊', '😐', '😞'][Math.floor(Math.random() * 3)] : ''
                    return (
                        <div key={i} className="aspect-square border border-gray-200 rounded flex items-center justify-center text-sm hover:bg-gray-50">
                            {dayMood && <span className="text-lg">{dayMood}</span>}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const handleSaveEntry = () => {
        if (!selectedMood) return

        const newEntry = {
            date: new Date().toISOString().split('T')[0],
            mood: moods.find(m => m.value === selectedMood)?.emoji || '😊',
            note: parseInt(moodNote) || 5,
            comment: comment.trim()
        }

        setEntries([newEntry, ...entries])
        setSelectedMood('')
        setMoodNote('')
        setComment('')
        setPhoto(null)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">🧘 Journal d'Humeur</h1>
                <p className="text-gray-600">Suivez votre bien-être émotionnel au quotidien</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <MoodEntryForm />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Entrées récentes</h3>
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
    )
}

export default MoodJournal
