"use client";

import { useState } from "react";
import { analyzeChat } from "../../api/chatService";

function ChatAnalyzer({ onAnalysisComplete }) {
	const [conversation, setConversation] = useState("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [error, setError] = useState("");
	const [showExamples, setShowExamples] = useState(false);

	const exampleConversations = [
		{
			id: 1,
			name: "Conversation Amicale",
			description: "Une conversation décontractée entre amis",
			text: `Karim: Sbah lkhir! Labas 3lik?
Youssef: Sbah lkhir! Labas, lhamdullah. W nta?
Karim: Lhamdullah, kolchi mzyan. 3ndk chi plan f had lweekend?
Youssef: Aji, ghadi nmshi l’plage m3a s7abi. W nta?
Karim: Ghadi nmchi l’café w mn b3d nshof chi film. Bghiti tjina?
Youssef: Inshallah, ghadi nshof wach 3ndi chi chi haja. N3tik lkhbar l3chiya`
		},
		{
			id: 2,
			name: "Conversation Familiale",
			description: "Une conversation entre membres de la famille",
			text: `Maman: Wlidi, 3ndk chi 7aja bghiti f l3id?
Sara: Maman, bghit chi 7aja b simple, li t3jbni.
Maman: Goliya chno bghiti, w ana n9awd lik.
Sara: Bghit chi smartphone jdiiid, had li 3ndi 9dim bzaaaf.
Maman: Ma kaynach chi 7aja okhra? Had chi ghali shwiya.
Sara: Maman, ana 3ndi 18 3am, w koulchi 3ndhom smartphone jdid.`
		},
		{
			id: 3,
			name: "Conversation Professionnelle",
			description: "Une conversation au travail",
			text: `Rachid: Ssalamu 3alaykum Ahmed, kif dayr m3a lprojet?
Ahmed: Wa3alaykum salam, lhamdullah, lprojet kaymchi mzyan. Saliyt lphase loula.
Rachid: Zwin! T9dar tsift lia rapport qbl la réunion dyal gheda?
Ahmed: Bien sûr, ghadi nwajjdo l3shiya. Kayn chi modification bghiti nzid?
Rachid: La, daba kolchi bikhir. Nchof ghir wach lclient m3jbou.
Ahmed: Inshallah. Ila b9a chi 7aja n3ayt lik.`
		},
		{
			id: 4,
			name: "Conversation Émotionnelle",
			description: "Une conversation sur des sujets personnels",
			text: `Fatima: Layla, 3ndi chi 7aja bghit nhdr m3ak 3liha.
Layla: Goli, ana sma3ak.
Fatima: 7assa brassi wahdi, koulchi 3ando chi wa7ed, ana ma3ndi 7tta wa7ed.
Layla: Ma t7ssich b had tariqa. Rak benti zwina w 3ndek bzaaf dyal lqualities.
Fatima: Bghit chi wa7ed li yfhmani w y3tini l’attention.
Layla: Ghadi nji ndouz lweekend m3ak. Ma ghadi nkhlikch wahdek.`

		},
		{
			id: 5,
			name: "Conversation Quotidienne",
			description: "Une conversation de tous les jours",
			text: `Mehdi: Slaam, kayn cours lyom?
Sami: Slaam, n3am, lcours bda m3a 9:00. W nta?
Mehdi: Ana ma 3ndich cours lyom. Ghadi nmchi l’café m3a s7abi.
Sami: Zwin, ana ghadi nji mn b3d lcours. Wach ghadi tkounu tmma?
Mehdi: N3am, l’café jdida lli f centre. Jib m3ak les notes dyalek.
Sami: Ok, nji b les cours. Nchofkom tmma.`

		},
		{
			id: 6,
			name: "Conversation Amoureuse",
			description: "Une conversation romantique entre deux personnes",
			text: `Sara: Hi a zin, kif dayr lyom?
Younes: Hi habibti, labas 3lia w nta?
Sara: Ana bikhir, bghit ndir lik surprise f lweekend.
Younes: Waaaw, bghit nshoufha! Ghadi nji ndouz m3ak.
Sara: Ghadi nkounu f chi moment spécial. Bghit nfrah bik.
Younes: Ana 7ta ana bghit ndir lik chi 7aja zwina. Ghadi nji w njiibha m3aya.
Sara: Ana msta3dach, bghit nkoun m3ak.`

		},
		{
			id: 7,
			name: "Conversation Joyeuse",
			description: "Une conversation pleine de joie et d'enthousiasme",
			text: `Amina: Yaaaaay! Ana fer7ana bzaaaf!
Leila: Wach kayn chi khbar zwina?
Amina: Jbt concours dyal la fac! Lhamdullah!
Leila: Waaaw, mabrouk! Ghadi n3aydou bih had chi!
Amina: N3am! Ghadi ndir chi fête zwina!
Leila: Ana m3ak! Ghadi nshark m3ak had lfar7a!`

		},
		{
			id: 8,
			name: "Conversation de Colère",
			description: "Une conversation montrant de la colère et de la frustration",
			text: `Karim: Shno had chi?! Shno kayn?!
Youssef: A s7bi, chno kayn? 3lach m3صب?
Karim: Kolchi ghalat! Ma fhamt walou!
Youssef: Hda rassek, goul lia chno wa9e3.
Karim: Ghadra f lkhidma w nta 3aref!
Youssef: Hada ma kayt7mlch... khask t9der l’7al.
`
		},
		{
			id: 9,
			name: "Signaux d'Alerte - Détresse",
			description: "Une conversation montrant des signes de détresse émotionnelle",
			text: `Sara: Ma b9it fahma walo. 7assa brassi khawya.
Leila: A zin, chno kayn? 3lach t7ssi hakda?
Sara: Kolchi wal l3ya, w ma kayn 7ta wa7ed fahmni.
Leila: Ana hna m3ak. Goul lia chno kaydkhl rassek.`

		},
		{
			id: 10,
			name: "Signaux d'Alerte - Idées Suicidaires",
			description: "Une conversation contenant des signaux d'alerte graves",
			text: `Mehdi: 7assa brassi ma3ndich chi qima. Kolchi ma kaymchich m3aya.
Sami: A sadi9i, chno kayn? 3lach katgol had lhdra?
Mehdi: Kul nhar kaymchi w kayzid l’7al t9il 3liya.
Sami: Mashi b7alk hakda. Ana hna, w kaynin nass kayhmmhom amrak. Ghadi n3awnk.`
		},
		{
			id: 11,
			name: "Signaux d'Alerte - Violence",
			description: "Une conversation révélant des signes de violence verbale ou physique",
			text: `Nadia: Ana ma ba9itch qadra ntsanak. Kay3yyotni w kay3ayyed lia b klam khayb.
Salma: Chkon? Wach rajlk?
Nadia: N3am. Kul nhar kayghut 3lia bla sabab, w mrrat kaydir l'yd.
Salma: Hadi ma shi 3icha. Khassk tkhbri chi wa7ed, chi proche, ou bien lpolice.
Nadia: Khayfa... kayhddedni ila hdrt.
Salma: Matb9ach skita. Kayn mossa3ada. Ana m3ak, w ghadi nmsi m3ak l'centre nta3 l'aide.`
		}

	];

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

	const loadExample = (exampleText) => {
		setConversation(exampleText);
		setShowExamples(false);
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
						onClick={() => setShowExamples(true)}
						className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors"
						disabled={isAnalyzing}
					>
						Voir les exemples
					</button>
				</div>
			</form>

			{/* Modal des exemples */}
			{showExamples && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-semibold">Exemples de conversations</h3>
							<button
								onClick={() => setShowExamples(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div className="grid grid-cols-1 gap-4">
							{exampleConversations.map((example) => (
								<div key={example.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
									<h4 className="font-medium text-gray-800 mb-2">{example.name}</h4>
									<p className="text-sm text-gray-600 mb-2">{example.description}</p>
									<div className="bg-white p-3 rounded-md mb-3 text-sm text-gray-700 border border-gray-200 whitespace-pre-line">
										{example.text}
									</div>
									<button
										onClick={() => loadExample(example.text)}
										className="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
									>
										Utiliser cet exemple
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

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
