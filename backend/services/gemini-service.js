// Service pour l'analyse des émotions avec Gemini AI

/**
 * Analyse les émotions dans un texte en utilisant Gemini AI
 * @param {Object} genAI - Instance de l'API Gemini
 * @param {string} textInput - Texte à analyser
 * @returns {Object} - Objet contenant les émotions détectées et leur intensité
 */
export async function analyzeEmotionsWithGemini(genAI, textInput) {
  try {
    // Utiliser le modèle Gemini Pro
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    })

    // Prompt pour l'analyse des émotions
    const prompt =
      `
    Analyse le texte suivant et identifie les émotions présentes avec leur intensité sur une échelle de 0 à 1.
    Texte: ` +
      textInput +
      `
    
    Réponds uniquement avec un objet JSON contenant les émotions détectées et leur score, comme cet exemple:
    {
      "joy": 0.8,
      "sadness": 0.1,
      "anger": 0.05,
      "fear": 0.02,
      "surprise": 0.03
    }
    Inclus uniquement les émotions suivantes si elles sont présentes: joy, sadness, anger, fear, surprise, disgust, neutral, love, admiration, approval, caring, confusion, curiosity, desire, disappointment, disapproval, embarrassment, excitement, gratitude, grief, nervousness, optimism, pride, realization, relief, remorse, annoyance, amusement.
    La somme des valeurs doit être 1, chaque valeur représente une probabilité.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extraire l'objet JSON de la réponse
    console.log("Réponse brute de Gemini:", text)

    const jsonMatch = text.match(/{[\s\S]*}/)

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Format de réponse invalide")
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse avec Gemini:", error)
    throw error
  }
}
