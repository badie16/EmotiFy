function Footer() {
	return (
		<footer className="bg-gray-800 text-white py-4">
			{/* <div className="container mx-auto px-4"> */}
			{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EmotiFy</h3>
            <p className="text-gray-300">
              Analysez les émotions dans vos textes grâce à l'intelligence artificielle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="/api-docs" className="text-gray-300 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/SamLowe/roberta-base-go_emotions" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Modèle GoEmotions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Vous avez des questions ou des suggestions ?
            </p>
            <a href="mailto:contact@EmotiFy.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              contact@EmotiFy.com
            </a>
          </div>
        </div> */}

			<div className=" border-gray-700 text-center text-gray-400">
				<p>
					&copy; {new Date().getFullYear()} EmotiFy. Tous droits réservés.
				</p>
			</div>
			{/* </div> */}
		</footer>
	);
}

export default Footer;
