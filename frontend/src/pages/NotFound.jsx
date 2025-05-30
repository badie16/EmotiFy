"use client"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center py-20 px-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="relative">
                        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-pulse">
                            404
                        </h1>
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-blob"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Oups, page non trouvée !</h2>
                    <p className="text-lg text-gray-600 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl">
                            🔍
                        </div>
                    </div>
                    <p className="text-gray-700 mb-8">
                        Vous pouvez retourner à la page d'accueil ou explorer les différentes fonctionnalités d'EmotiFy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                            Retour à l'accueil
                        </button>
                        <button
                            onClick={() => (window.location.href = "/core")}
                            className="bg-white border border-blue-500 text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-all"
                        >
                            Découvrir EmotiFy
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Besoin d'aide ?{" "}
                        <a href="/contact" className="text-blue-600 hover:underline">
                            Contactez-nous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
