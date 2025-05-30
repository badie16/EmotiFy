"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const getCurrentCategory = () => {
		const path = location.pathname
		if (path.includes("/text") || path.includes("/voice") || path.includes("/face") || path.includes("/core") || path.includes("/chat")) {
			return "core"
		}
		if (path.includes("/social") || path.includes("/dashboard") || path.includes("/business") || path.includes("/employee")) {
			return "business"
		}
		if (path.includes("/healthy") || path.includes("/history") || path.includes("/moodjournal")) {
			return "healthy"
		}
		return "home"
	}

	const category = getCurrentCategory()

	const getHeaderStyle = () => {
		if (isScrolled) {
			switch (category) {
				case "core":
					return "bg-white/95 backdrop-blur-lg border-b border-blue-200/50 shadow-lg"
				case "business":
					return "bg-white/95 backdrop-blur-lg border-b border-emerald-200/50 shadow-lg"
				case "healthy":
					return "bg-white/95 backdrop-blur-lg border-b border-pink-200/50 shadow-lg"
				default:
					return "bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg"
			}
		}
		return "bg-transparent"
	}

	const getLogoColor = () => {
		if (isScrolled) return "text-gray-800"
		switch (category) {
			case "core":
				return "text-white"
			case "business":
				return "text-white"
			case "healthy":
				return "text-white"
			default:
				return "text-white"
		}
	}

	const getTextColor = () => {
		if (isScrolled) return "text-gray-700 hover:text-gray-900"
		return "text-white/90 hover:text-white"
	}

	const getActiveColor = () => {
		if (isScrolled) {
			switch (category) {
				case "core":
					return "text-blue-600 font-semibold"
				case "business":
					return "text-emerald-600 font-semibold"
				case "healthy":
					return "text-pink-600 font-semibold"
				default:
					return "text-indigo-600 font-semibold"
			}
		}
		return "text-white font-semibold"
	}

	const isActive = (path) => {
		if (path === "/") {
			return location.pathname === path
		}
		return location.pathname.startsWith(path)
	}

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getHeaderStyle()}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to="/" className={`flex items-center space-x-3 ${getLogoColor()} transition-colors duration-300`}>
						<div className="relative">
							<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
									/>
								</svg>
							</div>
						</div>
						<div>
							<h1 className="text-xl font-bold">EmotiFy</h1>
							<p className="text-xs opacity-75">Intelligence Émotionnelle</p>
						</div>
					</Link>

					{/* Navigation Desktop */}
					<nav className="hidden lg:flex items-center space-x-1">
						<Link
							to="/"
							className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive("/") ? getActiveColor() : getTextColor()
								}`}
						>
							Accueil
						</Link>

						{/* Core */}
						<div className="relative group">
							<button
								className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${category === "core" ? getActiveColor() : getTextColor()
									}`}
							>
								<span className="mr-1">Core</span>
								<svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div className="absolute top-full left-0 mt-2 w-60  bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
								<div className="p-2">
									<Link
										to="/core"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Vue d'ensemble</div>
											<div className="text-xs text-gray-500">Découvrir Core</div>
										</div>
									</Link>
									<Link
										to="/text"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Analyse de texte</div>
											<div className="text-xs text-gray-500">Émotions dans le texte</div>
										</div>
									</Link>
									<Link
										to="/voice"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Analyse vocale</div>
											<div className="text-xs text-gray-500">Émotions dans la voix</div>
										</div>
									</Link>
									<Link
										to="/face"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Analyse faciale</div>
											<div className="text-xs text-gray-500">Expressions du visage</div>
										</div>
									</Link>
									<Link
										to="/chat"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Analyse de chat</div>
											<div className="text-xs text-gray-500">Conversations équipe</div>
										</div>
									</Link>
								</div>
							</div>
						</div>

						{/* Business */}
						<div className="relative group">
							<button
								className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${category === "business" ? getActiveColor() : getTextColor()
									}`}
							>
								<span className="mr-1">Business</span>
								<svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div className="absolute top-full left-0 mt-2 w-60  bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
								<div className="p-2">
									<Link
										to="/business"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Vue d'ensemble</div>
											<div className="text-xs text-gray-500">Solutions Business</div>
										</div>
									</Link>
									<Link
										to="/social"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Réseaux sociaux</div>
											<div className="text-xs text-gray-500">Sentiment client</div>
										</div>
									</Link>
									<Link
										to="/business/dashboard"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Tableau de bord</div>
											<div className="text-xs text-gray-500">Analytics émotionnels</div>
										</div>
									</Link>
									<Link
										to="/business/employees"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-18h18v18zm-2-13h-5v5h5v-5zm-7 0h5v5H7v-5z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Analyse d'employé</div>
											<div className="text-xs text-gray-500">Sentiment émotionnel</div>
										</div>
									</Link>

								</div>
							</div>
						</div>

						{/* Healthy */}
						<div className="relative group">
							<button
								className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${category === "healthy" ? getActiveColor() : getTextColor()
									}`}
							>
								<span className="mr-1">Healthy</span>
								<svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div className="absolute top-full left-0 mt-2 w-60  bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
								<div className="p-2">
									<Link
										to="/healthy"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Vue d'ensemble</div>
											<div className="text-xs text-gray-500">Bien-être émotionnel</div>
										</div>
									</Link>									
									<Link
										to="/healthy/relaxation"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Espace détente</div>
											<div className="text-xs text-gray-500">Relaxation guidée</div>
										</div>
									</Link>
									<Link
										to="/healthy/mood-journal"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Journal d'humeur</div>
											<div className="text-xs text-gray-500">Suivi quotidien</div>
										</div>
									</Link>
									<Link
										to="/healthy/dashboard"
										className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
									>
										<div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
											<svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
										</div>
										<div>
											<div className="font-medium">Tableau de bord</div>
											<div className="text-xs text-gray-500">Vue d'ensemble</div>
										</div>
									</Link>
								</div>
							</div>
						</div>

						<Link
							to="/about"
							className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive("/about") ? getActiveColor() : getTextColor()
								}`}
						>
							À propos
						</Link>
					</nav>

					{/* Bouton CTA */}
					<div className="hidden lg:flex items-center space-x-4">
						<Link
							to="/profile"
							className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${isScrolled
								? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
								: "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
								}`}
						>
							Commencer
						</Link>
					</div>

					{/* Menu mobile */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`lg:hidden p-2 rounded-lg transition-colors ${getTextColor()}`}
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Menu mobile */}
				{isMenuOpen && (
					<div className="lg:hidden mt-4 pb-4">
						<div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 p-4 space-y-2">
							<Link
								to="/"
								className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Accueil
							</Link>

							<div className="border-t border-gray-200 pt-2 mt-2">
								<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Core</div>
								<Link
									to="/text"
									className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Analyse de texte
								</Link>
								<Link
									to="/voice"
									className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Analyse vocale
								</Link>
								<Link
									to="/face"
									className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Analyse faciale
								</Link>
							</div>

							<div className="border-t border-gray-200 pt-2 mt-2">
								<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Business</div>
								<Link
									to="/social"
									className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Réseaux sociaux
								</Link>
								<Link
									to="/chat"
									className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Analyse de chat
								</Link>
								<Link
									to="/dashboard"
									className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Tableau de bord
								</Link>
							</div>

							<div className="border-t border-gray-200 pt-2 mt-2">
								<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Healthy</div>
								<Link
									to="/history"
									className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									Suivi personnel
								</Link>
							</div>

							<div className="border-t border-gray-200 pt-2 mt-2">
								<Link
									to="/about"
									className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
									onClick={() => setIsMenuOpen(false)}
								>
									À propos
								</Link>
								<Link
									to="/profile"
									className="block px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-center"
									onClick={() => setIsMenuOpen(false)}
								>
									Commencer
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
