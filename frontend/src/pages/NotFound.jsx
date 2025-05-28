export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-4">
            <h1 className="text-9xl font-extrabold mb-4 animate-pulse">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Oups, page non trouvée !</h2>
            <p className="text-lg mb-8 max-w-md text-center">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <button
                onClick={() => window.location.href = "/"}
                className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-100 transition"
            >
                Retour à Emotify
            </button>
            <footer className="mt-12 text-sm opacity-70">© 2025 Emotify</footer>
        </div>
    )
}

