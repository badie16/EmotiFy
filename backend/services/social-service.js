// Service pour l'analyse des émotions dans les contenus des réseaux sociaux

/**
 * Analyse les émotions dans les contenus des réseaux sociaux
 * @param {Object} genAI - Instance de l'API Gemini
 * @param {string} platform - Plateforme de réseau social (Twitter, Facebook, etc.)
 * @param {string} content - Contenu à analyser
 * @returns {Object} - Objet contenant les émotions détectées et leur intensité
 */
export async function analyzeSocialMediaEmotions(genAI, platform, content) {
  try {
    // Utiliser le modèle Gemini Pro
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    })

    // Prompt pour l'analyse des émotions et de la toxicité
    const prompt = `
    Analyse le contenu suivant provenant de ${platform} et identifie:
    1. Les émotions présentes avec leur intensité sur une échelle de 0 à 1
    2. Le niveau de toxicité du contenu sur une échelle de 0 à 1

    Contenu: ${content}
    
    Réponds uniquement avec un objet JSON contenant les émotions détectées, leur score, et le niveau de toxicité, comme cet exemple:
    {
      "joy": 0.2,
      "sadness": 0.1,
      "anger": 0.4,
      "fear": 0.1,
      "surprise": 0.1,
      "toxic": 0.7
    }
    
    Inclus uniquement les émotions suivantes si elles sont présentes: joy, sadness, anger, fear, surprise, disgust, neutral, love, admiration, approval, caring, confusion, curiosity, desire, disappointment, disapproval, embarrassment, excitement, gratitude, grief, nervousness, optimism, pride, realization, relief, remorse, annoyance, amusement.
    
    La somme des valeurs des émotions doit être 1, chaque valeur représente une probabilité.
    Le champ "toxic" est séparé et représente le niveau global de toxicité du contenu.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extraire l'objet JSON de la réponse
    console.log("Réponse brute de Gemini pour l'analyse sociale:", text)

    const jsonMatch = text.match(/{[\s\S]*}/)

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Format de réponse invalide")
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse des réseaux sociaux:", error)
    throw error
  }
}
