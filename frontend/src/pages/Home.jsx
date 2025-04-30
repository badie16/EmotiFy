import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">EmotiFy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          La plateforme d'intelligence émotionnelle au service de la société
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 mb-12 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Comprendre les émotions pour un monde meilleur</h2>
          <p className="mb-6">
            EmotiFy utilise l'intelligence artificielle pour analyser les émotions dans différents contextes : texte,
            voix, expressions faciales, réseaux sociaux et conversations. Notre mission est de mettre cette technologie
            au service de la santé mentale, de l'inclusion et de la prévention.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/about"
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors"
            >
              En savoir plus
            </Link>
            <Link
              to="/text"
              className="bg-indigo-700 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-800 transition-colors"
            >
              Essayer maintenant
            </Link>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Nos modules d'analyse</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-indigo-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Analyse de texte</h3>
            <p className="text-gray-600 mb-4">
              Découvrez les émotions cachées dans vos textes pour mieux comprendre vos sentiments et améliorer votre
              bien-être mental.
            </p>
            <Link
              to="/text"
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center"
            >
              Essayer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-purple-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Analyse vocale</h3>
            <p className="text-gray-600 mb-4">
              Identifiez les émotions dans votre voix pour améliorer votre communication et détecter les signes de
              stress ou d'anxiété.
            </p>
            <Link
              to="/voice"
              className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center"
            >
              Essayer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-green-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Analyse faciale</h3>
            <p className="text-gray-600 mb-4">
              Analysez les expressions faciales pour mieux comprendre les émotions et faciliter l'inclusion des
              personnes ayant des difficultés à interpréter les émotions.
            </p>
            <Link
              to="/face"
              className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
            >
              Essayer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-amber-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Analyse des réseaux sociaux</h3>
            <p className="text-gray-600 mb-4">
              Détectez les tendances émotionnelles et les contenus toxiques dans les commentaires des réseaux sociaux
              pour créer des espaces en ligne plus sains.
            </p>
            <Link
              to="/social"
              className="text-amber-600 font-medium hover:text-amber-800 transition-colors flex items-center"
            >
              Essayer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-orange-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Analyse de dialogues en chat</h3>
            <p className="text-gray-600 mb-4">
              Identifiez les signaux de détresse ou de harcèlement dans les conversations pour prévenir les risques et
              protéger les personnes vulnérables.
            </p>
            <Link
              to="/chat"
              className="text-orange-600 font-medium hover:text-orange-800 transition-colors flex items-center"
            >
              Essayer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-3 bg-violet-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Tableau de bord émotionnel</h3>
            <p className="text-gray-600 mb-4">
              Visualisez les tendances émotionnelles globales pour mieux comprendre l'état émotionnel collectif et
              anticiper les besoins sociaux.
            </p>
            <Link
              to="/dashboard"
              className="text-violet-600 font-medium hover:text-violet-800 transition-colors flex items-center"
            >
              Consulter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Impact social</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Santé mentale</h3>
              <p className="text-gray-600">
                Nos outils aident à la détection précoce des signes de détresse psychologique et facilitent
                l'auto-réflexion et la gestion du stress.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Inclusion</h3>
              <p className="text-gray-600">
                Notre analyse faciale aide les personnes neurodivergentes à mieux comprendre et interpréter les émotions
                des autres.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Sécurité en ligne</h3>
              <p className="text-gray-600">
                Nos outils d'analyse des réseaux sociaux et des chats contribuent à créer des espaces en ligne plus sûrs
                et respectueux.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Recherche sociale</h3>
              <p className="text-gray-600">
                Notre tableau de bord fournit des insights précieux pour les chercheurs et les décideurs publics sur
                l'état émotionnel collectif.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Prêt à explorer vos émotions ?</h2>
        <Link
          to="/text"
          className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors inline-block"
        >
          Commencer maintenant
        </Link>
      </div>
    </div>
  )
}

export default Home
