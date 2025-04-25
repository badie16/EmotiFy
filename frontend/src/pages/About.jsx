function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">À propos de MoodMirror</h1>
        <p className="text-gray-600">
          Découvrez comment MoodMirror analyse les émotions dans vos textes.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
        <p className="text-gray-700 mb-4">
          MoodMirror a été créé pour aider les utilisateurs à mieux comprendre les émotions exprimées dans leurs textes. 
          Que ce soit pour analyser des commentaires clients, des messages personnels ou des publications sur les réseaux sociaux, 
          notre outil utilise l'intelligence artificielle pour détecter les nuances émotionnelles présentes dans le langage.
        </p>
        <p className="text-gray-700">
          Notre objectif est de rendre l'analyse des émotions accessible à tous, en fournissant des résultats précis 
          et faciles à comprendre grâce à des visualisations intuitives.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technologie</h2>
        <p className="text-gray-700 mb-4">
          MoodMirror utilise le modèle GoEmotions de Hugging Face, un modèle de traitement du langage naturel 
          spécialement conçu pour la détection d'émotions. Ce modèle a été entraîné sur un large corpus de textes 
          annotés manuellement pour reconnaître plus de 27 catégories d'émotions différentes.
        </p>
        <p className="text-gray-700 mb-4">
          Notre application est construite avec:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li><span className="font-medium">Frontend:</span> React avec Vite, Tailwind CSS et Recharts pour les visualisations</li>
          <li><span className="font-medium">Backend:</span> Node.js avec Express</li>
          <li><span className="font-medium">Base de données:</span> PostgreSQL via Supabase</li>
          <li><span className="font-medium">API NLP:</span> Hugging Face Inference API</li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Comment ça marche</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-4">
          <li>
            <p className="font-medium">Entrée de texte</p>
            <p>Vous entrez le texte que vous souhaitez analyser dans la zone de saisie.</p>
          </li>
          <li>
            <p className="font-medium">Analyse par IA</p>
            <p>Notre système envoie votre texte au modèle GoEmotions qui analyse le contenu et identifie les émotions présentes.</p>
          </li>
          <li>
            <p className="font-medium">Traitement des résultats</p>
            <p>Les résultats bruts sont traités pour calculer les scores d'intensité pour chaque émotion détectée.</p>
          </li>
          <li>
            <p className="font-medium">Visualisation</p>
            <p>Les résultats sont présentés sous forme de graphiques interactifs pour une compréhension facile.</p>
          </li>
          <li>
            <p className="font-medium">Sauvegarde (optionnelle)</p>
            <p>Les résultats sont automatiquement sauvegardés dans votre historique pour référence future.</p>
          </li>
        </ol>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">API publique</h2>
        <p className="text-gray-700 mb-4">
          MoodMirror propose également une API publique pour les développeurs souhaitant intégrer l'analyse d'émotions 
          dans leurs propres applications. Pour obtenir une clé d'API et consulter la documentation, veuillez nous contacter.
        </p>
        <a 
          href="/api-docs" 
          className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Documentation de l'API
        </a>
      </div>
    </div>
  )
}

export default About