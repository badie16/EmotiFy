function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-30"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos d'EmotiFy</h1>
            <p className="text-xl text-blue-100">L'IA émotionnelle au service de la société</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
              🔍
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Notre vision</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            EmotiFy est né d'une vision simple mais ambitieuse : mettre l'intelligence artificielle émotionnelle au
            service du bien commun. Nous croyons que la compréhension des émotions est fondamentale pour résoudre de
            nombreux défis sociaux, de la santé mentale à l'inclusion, en passant par la prévention des risques.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Notre plateforme a été conçue comme un écosystème complet d'outils d'analyse émotionnelle, chacun répondant
            à un besoin social spécifique. Nous voulons démocratiser l'accès à ces technologies pour qu'elles
            bénéficient au plus grand nombre.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
              🌍
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Impact social</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Santé mentale",
                desc: "L'analyse de texte et de voix permet aux individus de mieux comprendre leurs propres émotions, facilitant l'auto-réflexion et la gestion du stress. Pour les professionnels de santé, ces outils offrent un moyen supplémentaire de détecter les signes précoces de détresse psychologique.",
                icon: "🧠",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Inclusion et accessibilité",
                desc: "Notre analyse faciale aide les personnes neurodivergentes, comme celles atteintes d'autisme, à mieux interpréter les expressions faciales et les émotions des autres. Cet outil peut être utilisé dans des contextes éducatifs pour développer les compétences socio-émotionnelles.",
                icon: "♿",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Sécurité en ligne",
                desc: "L'analyse des réseaux sociaux et des conversations de chat permet d'identifier les contenus toxiques, les discours haineux et les signaux de harcèlement. Ces outils peuvent aider à créer des espaces en ligne plus sûrs et plus respectueux.",
                icon: "🛡️",
                color: "from-emerald-500 to-green-500",
              },
              {
                title: "Veille sociale",
                desc: "Notre tableau de bord agrège des données émotionnelles anonymisées pour fournir une vision globale de l'état émotionnel collectif. Ces insights peuvent être précieux pour les décideurs publics, les organisations humanitaires et les chercheurs en sciences sociales.",
                icon: "📊",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white text-xl mr-3`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
              💻
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Notre technologie</h2>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            EmotiFy utilise une combinaison de technologies avancées pour analyser les émotions dans différents
            contextes :
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Intelligence artificielle",
                desc: "Nous utilisons des modèles d'IA de pointe comme Gemini AI de Google pour l'analyse de texte et de contenu.",
                icon: "🤖",
              },
              {
                title: "Traitement du langage naturel",
                desc: "Nos algorithmes comprennent les nuances émotionnelles dans le texte et la parole.",
                icon: "💬",
              },
              {
                title: "Vision par ordinateur",
                desc: "Pour l'analyse faciale, nous utilisons des technologies de reconnaissance des expressions.",
                icon: "👁️",
              },
              {
                title: "Analyse de données",
                desc: "Notre tableau de bord utilise des techniques avancées de visualisation et d'agrégation de données.",
                icon: "📈",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl mr-3 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">{item.title}</h4>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
            Notre architecture technique est conçue pour être modulaire, évolutive et sécurisée, avec un accent
            particulier sur la protection des données personnelles et le respect de la vie privée.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
              ⚖️
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Éthique et responsabilité</h2>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Nous sommes conscients des enjeux éthiques liés à l'analyse des émotions et nous nous engageons à :
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
            <ul className="space-y-4">
              {[
                "Respecter la vie privée et la confidentialité des données",
                "Lutter contre les biais algorithmiques et promouvoir l'équité",
                "Être transparents sur les capacités et les limites de nos technologies",
                "Impliquer les utilisateurs dans la conception et l'amélioration de nos outils",
                "Évaluer régulièrement l'impact social de notre plateforme",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Notre comité d'éthique, composé d'experts en IA, en psychologie et en sciences sociales, veille au respect
            de ces engagements dans toutes nos activités.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl mr-4">
              🤝
            </div>
            <h2 className="text-2xl font-bold">Rejoignez-nous</h2>
          </div>
          <p className="text-white/90 mb-8 leading-relaxed">
            EmotiFy est plus qu'une plateforme technologique, c'est un mouvement pour une société plus empathique et
            bienveillante. Nous invitons les chercheurs, les développeurs, les organisations sociales et tous ceux qui
            partagent notre vision à collaborer avec nous.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg"
            >
              Devenir partenaire
            </a>
            <a
              href="#"
              className="bg-blue-700/50 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700/70 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
