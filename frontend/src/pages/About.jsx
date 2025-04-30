function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">À propos d'EmotiFy</h1>
        <p className="text-gray-600">L'IA émotionnelle au service de la société</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notre vision</h2>
        <p className="text-gray-700 mb-4">
          EmotiFy est né d'une vision simple mais ambitieuse : mettre l'intelligence artificielle émotionnelle au
          service du bien commun. Nous croyons que la compréhension des émotions est fondamentale pour résoudre de
          nombreux défis sociaux, de la santé mentale à l'inclusion, en passant par la prévention des risques.
        </p>
        <p className="text-gray-700">
          Notre plateforme a été conçue comme un écosystème complet d'outils d'analyse émotionnelle, chacun répondant à
          un besoin social spécifique. Nous voulons démocratiser l'accès à ces technologies pour qu'elles bénéficient au
          plus grand nombre.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Impact social</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">Santé mentale</h3>
          <p className="text-gray-700">
            L'analyse de texte et de voix permet aux individus de mieux comprendre leurs propres émotions, facilitant
            l'auto-réflexion et la gestion du stress. Pour les professionnels de santé, ces outils offrent un moyen
            supplémentaire de détecter les signes précoces de détresse psychologique.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">Inclusion et accessibilité</h3>
          <p className="text-gray-700">
            Notre analyse faciale aide les personnes neurodivergentes, comme celles atteintes d'autisme, à mieux
            interpréter les expressions faciales et les émotions des autres. Cet outil peut être utilisé dans des
            contextes éducatifs pour développer les compétences socio-émotionnelles.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">Sécurité en ligne</h3>
          <p className="text-gray-700">
            L'analyse des réseaux sociaux et des conversations de chat permet d'identifier les contenus toxiques, les
            discours haineux et les signaux de harcèlement. Ces outils peuvent aider à créer des espaces en ligne plus
            sûrs et plus respectueux.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Veille sociale</h3>
          <p className="text-gray-700">
            Notre tableau de bord agrège des données émotionnelles anonymisées pour fournir une vision globale de l'état
            émotionnel collectif. Ces insights peuvent être précieux pour les décideurs publics, les organisations
            humanitaires et les chercheurs en sciences sociales.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notre technologie</h2>
        <p className="text-gray-700 mb-4">
          EmotiFy utilise une combinaison de technologies avancées pour analyser les émotions dans différents contextes
          :
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Intelligence artificielle :</span> Nous utilisons des modèles d'IA de pointe
            comme Gemini AI de Google pour l'analyse de texte et de contenu.
          </li>
          <li>
            <span className="font-medium">Traitement du langage naturel :</span> Nos algorithmes comprennent les nuances
            émotionnelles dans le texte et la parole.
          </li>
          <li>
            <span className="font-medium">Vision par ordinateur :</span> Pour l'analyse faciale, nous utilisons des
            technologies de reconnaissance des expressions.
          </li>
          <li>
            <span className="font-medium">Analyse de données :</span> Notre tableau de bord utilise des techniques
            avancées de visualisation et d'agrégation de données.
          </li>
        </ul>
        <p className="text-gray-700">
          Notre architecture technique est conçue pour être modulaire, évolutive et sécurisée, avec un accent
          particulier sur la protection des données personnelles et le respect de la vie privée.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Éthique et responsabilité</h2>
        <p className="text-gray-700 mb-4">
          Nous sommes conscients des enjeux éthiques liés à l'analyse des émotions et nous nous engageons à :
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Respecter la vie privée et la confidentialité des données</li>
          <li>Lutter contre les biais algorithmiques et promouvoir l'équité</li>
          <li>Être transparents sur les capacités et les limites de nos technologies</li>
          <li>Impliquer les utilisateurs dans la conception et l'amélioration de nos outils</li>
          <li>Évaluer régulièrement l'impact social de notre plateforme</li>
        </ul>
        <p className="text-gray-700">
          Notre comité d'éthique, composé d'experts en IA, en psychologie et en sciences sociales, veille au respect de
          ces engagements dans toutes nos activités.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Rejoignez-nous</h2>
        <p className="text-gray-700 mb-6">
          EmotiFy est plus qu'une plateforme technologique, c'est un mouvement pour une société plus empathique et
          bienveillante. Nous invitons les chercheurs, les développeurs, les organisations sociales et tous ceux qui
          partagent notre vision à collaborer avec nous.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Devenir partenaire
          </a>
          <a
            href="#"
            className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
