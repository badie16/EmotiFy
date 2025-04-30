"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isActive = (path) => {
		return location.pathname === path
			? "text-white font-bold"
			: "text-indigo-200 hover:text-white";
	};

	return (
		<header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<Link to="/" className="text-2xl font-bold flex items-center">
						<span className="mr-2"></span>
						EmotiFy
					</Link>

					{/* Menu pour mobile */}
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="text-white focus:outline-none"
							aria-label="Toggle menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>

					{/* Menu pour desktop */}
					<nav className="hidden md:block">
						<ul className="flex space-x-6">
							<li>
								<Link to="/" className={isActive("/")}>
									Accueil
								</Link>
							</li>
							<li>
								<Link to="/text" className={isActive("/text")}>
									Texte
								</Link>
							</li>
							<li>
								<Link to="/voice" className={isActive("/voice")}>
									Voix
								</Link>
							</li>
							<li>
								<Link to="/face" className={isActive("/face")}>
									Visage
								</Link>
							</li>
							<li>
								<Link to="/social" className={isActive("/social")}>
									Réseaux
								</Link>
							</li>
							<li>
								<Link to="/chat" className={isActive("/chat")}>
									Chat
								</Link>
							</li>
							<li>
								<Link to="/dashboard" className={isActive("/dashboard")}>
									Tableau de bord
								</Link>
							</li>
							<li>
								<Link to="/about" className={isActive("/about")}>
									À propos
								</Link>
							</li>
						</ul>
					</nav>

					{/* Bouton de profil */}
					<div className="hidden md:block">
						<Link
							to="/profile"
							className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
						>
							Profil
						</Link>
					</div>
				</div>

				{/* Menu mobile déroulant */}
				{isMenuOpen && (
					<nav className="mt-4 md:hidden">
						<ul className="flex flex-col space-y-2">
							<li>
								<Link
									to="/"
									className={`block py-2 ${isActive("/")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Accueil
								</Link>
							</li>
							<li>
								<Link
									to="/text"
									className={`block py-2 ${isActive("/text")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Texte
								</Link>
							</li>
							<li>
								<Link
									to="/voice"
									className={`block py-2 ${isActive("/voice")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Voix
								</Link>
							</li>
							<li>
								<Link
									to="/face"
									className={`block py-2 ${isActive("/face")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Visage
								</Link>
							</li>
							<li>
								<Link
									to="/social"
									className={`block py-2 ${isActive("/social")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Réseaux
								</Link>
							</li>
							<li>
								<Link
									to="/chat"
									className={`block py-2 ${isActive("/chat")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Chat
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard"
									className={`block py-2 ${isActive("/dashboard")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Tableau de bord
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className={`block py-2 ${isActive("/about")}`}
									onClick={() => setIsMenuOpen(false)}
								>
									À propos
								</Link>
							</li>
							{/* <li>
                <Link
                  to="/profile"
                  className="block py-2 bg-white text-indigo-600 rounded-md px-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
              </li> */}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
}

export default Header;
