"use client"

import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState(null)

  const coreRef = useRef(null)
  const businessRef = useRef(null)
  const healthyRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (coreRef.current && businessRef.current && healthyRef.current) {
        const coreTop = coreRef.current.offsetTop
        const businessTop = businessRef.current.offsetTop
        const healthyTop = healthyRef.current.offsetTop
        const healthyBottom = healthyTop + healthyRef.current.offsetHeight

        if (scrollPosition < coreTop) {
          setActiveSection(null)
        } else if (scrollPosition >= coreTop && scrollPosition < businessTop) {
          setActiveSection("core")
        } else if (scrollPosition >= businessTop && scrollPosition < healthyTop) {
          setActiveSection("business")
        } else if (scrollPosition >= healthyTop && scrollPosition <= healthyBottom) {
          setActiveSection("healthy")
        } else {
          setActiveSection(null)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-cyan-400/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Navigation latérale */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={() => scrollToSection(coreRef)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeSection === "core"
                ? "bg-blue-400 scale-125 shadow-lg shadow-blue-500/50"
                : "bg-white/30 hover:bg-white/50"
              }`}
            aria-label="Section Core"
          />
          <button
            onClick={() => scrollToSection(businessRef)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeSection === "business"
                ? "bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/50"
                : "bg-white/30 hover:bg-white/50"
              }`}
            aria-label="Section Business"
          />
          <button
            onClick={() => scrollToSection(healthyRef)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeSection === "healthy"
                ? "bg-pink-400 scale-125 shadow-lg shadow-pink-500/50"
                : "bg-white/30 hover:bg-white/50"
              }`}
            aria-label="Section Healthy"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className={`min-h-screen flex items-center justify-center text-white transition-all duration-1000 pt-20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Logo Animation */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-slow">
                EmotiFy
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl animate-pulse-slow"></div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl mb-12 text-gray-200 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            L'intelligence émotionnelle au service de l'humanité
          </p>

          {/* Animated Description */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "1s" }}>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Découvrez, analysez et comprenez les émotions grâce à l'IA.
              <span className="text-cyan-400 font-semibold"> EmotiFy transforme </span>
              la façon dont nous interagissons avec nos sentiments et ceux des autres.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in-up"
            style={{ animationDelay: "1.5s" }}
          >
            <Link
              to="/text"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10">Commencer l'analyse</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/about"
              className="group px-8 py-4 border-2 border-purple-400 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105"
            >
              Découvrir EmotiFy
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Core Section */}
      <div ref={coreRef} className="min-h-screen relative z-10 flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-cyan-900/90 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur opacity-25"></div>
                <div className="relative bg-blue-900 border border-blue-700 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white">EmotiFy Core</h2>
                    </div>
                    <p className="text-blue-100 mb-6 text-lg">
                      Analysez vos émotions à partir de votre visage, de votre voix ou via une conversation écrite.
                      EmotiFy Core est le cœur de la plateforme : il comprend vos sentiments en temps réel.
                    </p>
                    <div className="space-y-3 mb-8">
                      {[
                        { icon: "📝", text: "Analyse de texte - Détectez les émotions dans vos écrits" },
                        { icon: "🎤", text: "Analyse vocale - Identifiez les émotions dans votre voix" },
                        { icon: "😊", text: "Analyse faciale - Reconnaissez les expressions du visage" },
                        { icon: "💬", text: "Analyse de chat - Comprenez les émotions dans les conversations" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                          <p className="text-blue-100">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/core"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                    >
                      Explorer Core
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-80 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-slow opacity-30"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <div className="text-8xl">🧠</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Section */}
      <div ref={businessRef} className="min-h-screen relative z-10 flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-green-900/90 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-80 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse-slow opacity-30"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center">
                      <div className="text-8xl">💼</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-lg blur opacity-25"></div>
                <div className="relative bg-emerald-900 border border-emerald-700 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">💼</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white">Business</h2>
                    </div>
                    <p className="text-emerald-100 mb-6 text-lg">
                      Comprenez les émotions de vos collaborateurs, clients et équipes grâce à des outils dédiés à la
                      relation client, à la productivité et au climat de travail.
                    </p>
                    <div className="space-y-3 mb-8">
                      {[
                        { icon: "📱", text: "Analyse des réseaux sociaux - Sentiment client & marque" },
                        { icon: "💬", text: "Analyse de chat - Support client & communication d'équipe" },
                        { icon: "📊", text: "Tableau de bord - Analytics & insights émotionnels" },
                        { icon: "👥", text: "Suivi des employés - Bien-être et productivité" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                          <p className="text-emerald-100">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/business"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                    >
                      Explorer Business
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Healthy Section */}
      <div ref={healthyRef} className="min-h-screen relative z-10 flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/90 to-rose-900/90 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg blur opacity-25"></div>
                <div className="relative bg-pink-900 border border-pink-700 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🧘</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white">Healthy</h2>
                    </div>
                    <p className="text-pink-100 mb-6 text-lg">
                      Prenez soin de votre bien-être émotionnel avec des outils de suivi d'humeur, de gestion du stress,
                      et des exercices de relaxation. EmotiFy vous accompagne chaque jour.
                    </p>
                    <div className="space-y-3 mb-8">
                      {[
                        { icon: "📈", text: "Suivi personnel - Historique et tendances émotionnelles" },
                        { icon: "🌙", text: "Journal d'humeur - Suivi quotidien de votre état émotionnel" },
                        { icon: "🧘", text: "Exercices de relaxation - Méditation et respiration" },
                        { icon: "🎵", text: "Musiques relaxantes - Sélection adaptée à votre humeur" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                          <p className="text-pink-100">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/healthy"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105"
                    >
                      Explorer Healthy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-80 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse-slow opacity-30"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center">
                      <div className="text-8xl">🧘</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Prêt à explorer vos émotions ?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Rejoignez des milliers d'utilisateurs qui ont déjà découvert le pouvoir de l'intelligence émotionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/text"
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10 text-white">Commencer maintenant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
