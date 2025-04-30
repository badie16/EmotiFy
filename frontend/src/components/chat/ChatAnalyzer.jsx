"use client";

import { useState } from "react";
import { analyzeChat } from "../../api/chatService";

function ChatAnalyzer({ onAnalysisComplete }) {
	const [conversation, setConversation] = useState("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!conversation.trim()) {
			setError("Veuillez entrer une conversation à analyser");
			return;
		}

		setIsAnalyzing(true);
		setError("");

		try {
			const result = await analyzeChat(conversation);
			if (onAnalysisComplete) {
				onAnalysisComplete(result);
			}
		} catch (err) {
			console.error("Erreur lors de l'analyse du chat:", err);
			setError(
				"Une erreur est survenue lors de l'analyse. Veuillez réessayer."
			);
		} finally {
			setIsAnalyzing(false);
		}
	};

	const handleConversationChange = (e) => {
		setConversation(e.target.value);
	};

	const handleClear = () => {
		setConversation("");
		setError("");
	};

	const handleLoadExample = () => {
		setConversation(`User1: Salut, comment ça va aujourd'hui?
User2: Pas très bien pour être honnête. Je me sens vraiment déprimé ces derniers temps.
User1: Oh, je suis désolé d'entendre ça. Qu'est-ce qui se passe?
User2: Je ne sais pas trop. J'ai du mal à trouver un sens à tout ça. Parfois je me demande si ça vaut la peine de continuer.
User1: Ça m'inquiète ce que tu dis. Tu as pensé à parler à quelqu'un, comme un professionnel?
User2: Non, je ne pense pas que ça aiderait. Personne ne peut vraiment comprendre de toute façon.
User1: Je comprends que tu te sentes comme ça, mais il y a des gens qui peuvent aider. Tu n'es pas seul.
User2: Peut-être. Je ne sais pas. Je suis juste fatigué de tout ça.
User1: Est-ce que tu veux qu'on se voie pour en parler? Je suis là pour toi.
User2: Je ne sais pas. Peut-être plus tard. Merci quand même.`);
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-8">
			<h2 className="text-xl font-semibold mb-4">
				Analysez les conversations de chat
			</h2>

			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="conversation"
						className="block text-gray-700 font-medium mb-2"
					>
						Conversation à analyser
					</label>
					<textarea
						id="conversation"
						value={conversation}
						onChange={handleConversationChange}
						placeholder="Collez ici une conversation de chat (format: Nom: message)..."
						rows={10}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						disabled={isAnalyzing}
					></textarea>

					<div className="mt-2 text-sm text-gray-500">
						Format recommandé: "Nom: message" pour chaque ligne de conversation.
					</div>
				</div>

				{error && <div className="mb-4 text-red-600">{error}</div>}

				<div className="flex flex-wrap gap-4">
					<button
						type="submit"
						className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
						disabled={isAnalyzing}
					>
						{isAnalyzing ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Analyse en cours...
							</>
						) : (
							"Analyser"
						)}
					</button>

					<button
						type="button"
						onClick={handleClear}
						className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
						disabled={isAnalyzing}
					>
						Effacer
					</button>

					<button
						type="button"
						onClick={handleLoadExample}
						className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors"
						disabled={isAnalyzing}
					>
						Charger un exemple
					</button>
				</div>
			</form>

			<div className="mt-8 bg-orange-50 p-4 rounded-md">
				<h3 className="font-medium text-orange-800 mb-2">
					Signaux détectés par l'analyse
				</h3>
				<ul className="list-disc pl-6 text-gray-700 space-y-2">
					<li>
						<span className="font-medium">Détresse émotionnelle</span> -
						Identifie les signes de tristesse, d'anxiété ou de désespoir qui
						pourraient nécessiter un soutien.
					</li>
					<li>
						<span className="font-medium">Idées suicidaires</span> - Détecte les
						expressions qui pourraient indiquer des pensées suicidaires ou
						d'automutilation.
					</li>
					<li>
						<span className="font-medium">Harcèlement</span> - Repère les
						schémas d'intimidation, de menaces ou de harcèlement dans les
						conversations.
					</li>
					<li>
						<span className="font-medium">Violence</span> - Identifie les
						menaces de violence ou les discussions concernant des actes
						violents.
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ChatAnalyzer;
