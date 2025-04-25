import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link to="/" className="text-2xl font-bold flex items-center">
					EmotiFy
				</Link>
				<nav>
					<ul className="flex space-x-6">
						<li>
							<Link to="/" className="hover:text-indigo-200 transition-colors">
								Home
							</Link>
						</li>
						{/* <li>
              <Link to="/history" className="hover:text-indigo-200 transition-colors">
                Historique
              </Link>
            </li> */}
						<li>
							<Link
								to="/about"
								className="hover:text-indigo-200 transition-colors"
							>
								About
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
