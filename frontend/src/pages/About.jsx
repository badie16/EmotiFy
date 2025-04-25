function About() {
	return (
		<div className="max-w-3xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">About EmotiFy</h1>
				<p className="text-gray-600">
					Discover how EmotiFy analyzes emotions in your texts.
				</p>
			</div>

			<div className="bg-white rounded-lg shadow-md p-8 mb-8">
				<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
				<p className="text-gray-700 mb-4">
					EmotiFy was created to help users better understand the emotions
					expressed in their texts. Whether analyzing customer feedback,
					personal messages, or social media posts, our tool uses artificial
					intelligence to detect emotional nuances in language.
				</p>
				<p className="text-gray-700">
					Our goal is to make emotion analysis accessible to everyone by
					providing accurate and easy-to-understand results through intuitive
					visualizations.
				</p>
			</div>

			<div className="bg-white rounded-lg shadow-md p-8 mb-8">
				<h2 className="text-2xl font-semibold mb-4">Technology</h2>
				<p className="text-gray-700 mb-4">
					EmotiFy uses Google's Gemini AI, an advanced language model capable of
					analyzing and understanding emotional nuances in text. This
					cutting-edge technology allows us to provide precise and detailed
					analysis of the emotions present in your texts.
				</p>
				<p className="text-gray-700 mb-4">Our application is built with:</p>
				<ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
					<li>
						<span className="font-medium">Frontend:</span> React with Vite,
						Tailwind CSS, and Recharts for visualizations
					</li>
					<li>
						<span className="font-medium">Backend:</span> Node.js with Express
					</li>
					<li>
						<span className="font-medium">Database:</span> PostgreSQL via
						Supabase
					</li>
					<li>
						<span className="font-medium">API NLP:</span> Google's Gemini AI
					</li>
				</ul>
			</div>

			<div className="bg-white rounded-lg shadow-md p-8 mb-8">
				<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
				<ol className="list-decimal pl-6 text-gray-700 space-y-4">
					<li>
						<p className="font-medium">Text Input</p>
						<p>You enter the text you want to analyze into the input field.</p>
					</li>
					<li>
						<p className="font-medium">AI Analysis</p>
						<p>
							Our system sends your text to the GoEmotions model, which analyzes
							the content and identifies present emotions.
						</p>
					</li>
					<li>
						<p className="font-medium">Result Processing</p>
						<p>
							The raw results are processed to calculate intensity scores for
							each detected emotion.
						</p>
					</li>
					<li>
						<p className="font-medium">Visualization</p>
						<p>
							The results are presented in interactive charts for easy
							understanding.
						</p>
					</li>
					<li>
						<p className="font-medium">Saving (Optional)</p>
						<p>
							The results are automatically saved in your history for future
							reference.
						</p>
					</li>
				</ol>
			</div>

			<div className="bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-semibold mb-4">Public API</h2>
				<p className="text-gray-700 mb-4">
					EmotiFy also offers a public API for developers who want to integrate
					emotion analysis into their own applications. To get an API key and
					access the documentation, please contact us.
				</p>
				<a
					href="/api-docs"
					className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
				>
					API Documentation
				</a>
			</div>
		</div>
	);
}

export default About;
