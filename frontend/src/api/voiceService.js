// import axios from "axios"

// // URL de l'API backend
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

// // Analyser les émotions dans un fichier audio
// export async function analyzeVoice(formData) {       
//   try {
//     const response = await axios.post(`${API_URL}/voice/analyze`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return response.data
//   } catch (error) {
//     console.error("Error analyzing voice:", error)
//     throw error
//   }
// }

// // Récupérer l'historique des analyses vocales
// export async function getVoiceHistory() {
//   try {
//     const response = await axios.get(`${API_URL}/voice/history`)
//     return response.data
//   } catch (error) {
//     console.error("Error fetching voice history:", error)
//     throw error
//   }
// }

// // Supprimer une analyse vocale
// export async function deleteVoiceAnalysis(id) {
//   try\
