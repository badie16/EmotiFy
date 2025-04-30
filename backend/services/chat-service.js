/**
 * Service pour l'analyse des émotions dans les conversations de chat
 * Utilise Gemini AI pour détecter les émotions et les signaux de détresse
 */

// Fonction pour analyser les émotions dans une conversation de chat
export async function analyzeChatEmotions(genAI, conversation) {
	try {
		// Si Gemini AI n'est pas configuré, utiliser le mode simulé
		if (!genAI) {
			console.log(
				"Gemini AI n'est pas configuré, utilisation du mode simulé pour l'analyse de chat"
			);
			return generateMockChatAnalysis(conversation);
		}

		console.log(
			"Analyse de conversation avec Gemini AI:",
			conversation.substring(0, 100) + "..."
		);

		// Utiliser le modèle Gemini Pro
		const model = genAI.getGenerativeModel({
			model: "models/gemini-1.5-flash",
		});

		// Prompt pour l'analyse des émotions et des signaux de détresse
		const prompt = `
    Analyse la conversation suivante et identifie:
    1. Les émotions présentes avec leur intensité sur une échelle de 0 à 1
    2. Les signaux de détresse ou de risque sur une échelle de 0 à 1

    Conversation:
    ${conversation}
    
    Réponds uniquement avec un objet JSON contenant deux parties:
    1. "emotions": les émotions détectées et leur score
    2. "flags": les signaux de détresse ou de risque

    Exemple:
    {
      "emotions": {
        "joy": 0.1,
        "sadness": 0.4,
        "anger": 0.2,
        "fear": 0.2,
        "surprise": 0.1
      },
      "flags": {
        "suicidal": 0.1,
        "harassment": 0.2,
        "distress": 0.7,
        "selfHarm": 0.1,
        "violence": 0.0
      }
    }
    
    Pour les émotions, inclus uniquement: joy, sadness, anger, fear, surprise, disgust, neutral, love, admiration, approval, caring, confusion, curiosity, desire, disappointment, disapproval, embarrassment, excitement, gratitude, grief, nervousness, optimism, pride, realization, relief, remorse, annoyance, amusement.
    
    Pour les flags, évalue: suicidal (idées suicidaires), harassment (harcèlement), distress (détresse), selfHarm (automutilation), violence (violence).
    
    La somme des valeurs des émotions doit être 1, chaque valeur représente une probabilité.
    Les flags sont indépendants les uns des autres et représentent chacun une probabilité de 0 à 1.
    `;

		console.log("Envoi du prompt à Gemini pour l'analyse de chat");
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Extraire l'objet JSON de la réponse
		console.log("Réponse brute de Gemini pour l'analyse de chat:", text);

		const jsonMatch = text.match(/{[\s\S]*}/);

		if (jsonMatch) {
			const analysis = JSON.parse(jsonMatch[0]);
			console.log("Analyse extraite:", analysis);
			return analysis;
		} else {
			console.error("Format de réponse invalide de Gemini");
			throw new Error("Format de réponse invalide");
		}
	} catch (error) {
		console.error("Erreur lors de l'analyse du chat avec Gemini:", error);
		console.log("Utilisation du mode simulé en raison d'une erreur");
		return generateMockChatAnalysis(conversation);
	}
}

// Fonction pour générer une analyse simulée en cas d'erreur ou si Gemini n'est pas disponible
function generateMockChatAnalysis(conversation) {
	console.log("Génération d'une analyse de chat simulée");

	// Analyse basique du texte pour simuler une détection d'émotions
	const lowerConversation = conversation.toLowerCase();

	// Détection basique de mots-clés pour simuler l'analyse
	const joyKeywords = [
		"heureux",
		"content",
		"joie",
		"super",
		"génial",
		"excellent",
		":)",
		"😊",
		"haha",
	];
	const sadnessKeywords = [
		"triste",
		"déprimé",
		"malheureux",
		"désolé",
		"malheureusement",
		":(",
		"😢",
	];
	const angerKeywords = [
		"énervé",
		"colère",
		"furieux",
		"frustré",
		"agacé",
		"merde",
		"putain",
		"😠",
	];
	const fearKeywords = [
		"peur",
		"effrayé",
		"inquiet",
		"anxieux",
		"stressé",
		"terrifié",
		"😨",
	];
	const suicidalKeywords = [
		"suicide",
		"mourir",
		"plus la peine",
		"en finir",
		"disparaître",
	];
	const harassmentKeywords = [
		"harcèlement",
		"insulte",
		"menace",
		"intimidation",
	];

	// Calculer des scores basiques basés sur la présence de mots-clés
	let joyScore = countKeywords(lowerConversation, joyKeywords) * 0.2;
	let sadnessScore = countKeywords(lowerConversation, sadnessKeywords) * 0.2;
	let angerScore = countKeywords(lowerConversation, angerKeywords) * 0.2;
	let fearScore = countKeywords(lowerConversation, fearKeywords) * 0.2;

	// Ajouter des valeurs aléatoires pour compléter
	joyScore += Math.random() * 0.2;
	sadnessScore += Math.random() * 0.2;
	angerScore += Math.random() * 0.2;
	fearScore += Math.random() * 0.2;
	const surpriseScore = Math.random() * 0.2;
	const disgustScore = Math.random() * 0.2;

	// Normaliser pour que la somme soit 1
	const totalEmotions =
		joyScore +
		sadnessScore +
		angerScore +
		fearScore +
		surpriseScore +
		disgustScore;

	// Calculer les scores de signaux de détresse
	const suicidalScore =
		countKeywords(lowerConversation, suicidalKeywords) * 0.3 +
		Math.random() * 0.1;
	const harassmentScore =
		countKeywords(lowerConversation, harassmentKeywords) * 0.3 +
		Math.random() * 0.1;
	const distressScore = (sadnessScore + fearScore) * 0.5 + Math.random() * 0.2;

	return {
		emotions: {
			joy: joyScore / totalEmotions,
			sadness: sadnessScore / totalEmotions,
			anger: angerScore / totalEmotions,
			fear: fearScore / totalEmotions,
			surprise: surpriseScore / totalEmotions,
			disgust: disgustScore / totalEmotions,
		},
		flags: {
			suicidal: Math.min(suicidalScore, 1),
			harassment: Math.min(harassmentScore, 1),
			distress: Math.min(distressScore, 1),
			selfHarm: Math.random() * 0.3,
			violence: Math.random() * 0.2,
		},
	};
}

// Fonction utilitaire pour compter les occurrences de mots-clés
function countKeywords(text, keywords) {
	return keywords.reduce((count, keyword) => {
		const regex = new RegExp(keyword, "gi");
		const matches = text.match(regex);
		return count + (matches ? matches.length : 0);
	}, 0);
}
