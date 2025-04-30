// Fonction pour exporter les résultats en PDF
// Nécessite l'installation de jspdf et jspdf-autotable
// npm install jspdf jspdf-autotable

export async function exportToPdf(analysisData) {
  // Dynamiquement importer jsPDF pour éviter les problèmes de SSR
  const { default: jsPDF } = await import("jspdf")
  const { default: autoTable } = await import("jspdf-autotable")

  const { text, emotions, timestamp } = analysisData
  const doc = new jsPDF()

  // Importer la police arabe (ex: Amiri) — fichier externe
  import("./fonts/Amiri-Regular.js") // doit contenir addFileToVFS et addFont
  doc.addFont("Amiri-Regular.ttf", "Amiri", "normal")

  // Titre
  doc.setFontSize(20)
  doc.text("EmotiFy - Analyse d'émotions", 105, 15, { align: "center" })

  // Date
  doc.setFontSize(12)
  doc.text(`Date: ${new Date(timestamp).toLocaleString()}`, 20, 25)

  // Texte analysé
  doc.setFontSize(14)
  doc.text("Texte analysé:", 20, 35)
  doc.setFontSize(12)

  // Gérer le texte long avec des sauts de ligne
  let textLines
  // doc.text(textLines, 20, 45);

  const hasArabic = /[\u0600-\u06FF]/.test(text)
  doc.setFontSize(12)

  if (hasArabic) {
    doc.setFont("Amiri", "normal")
    textLines = doc.splitTextToSize(text, 170)
    doc.text(textLines, 190, 45, { align: "right" })
  } else {
    doc.setFont("helvetica", "normal")
    textLines = doc.splitTextToSize(text, 170)
    doc.text(textLines, 20, 45)
  }

  // Calculer la position Y après le texte
  let yPos = 45 + textLines.length * 7
  if (yPos > 250) yPos = 250 // Limiter la hauteur

  // Résultats de l'analyse
  doc.setFontSize(14)
  doc.text("Résultats de l'analyse:", 20, yPos + 10)

  // Tableau des émotions
  const emotionsData = Object.entries(emotions)
    .map(([name, score]) => [name, `${Math.round(score * 100)}%`])
    .sort((a, b) => Number.parseFloat(b[1]) - Number.parseFloat(a[1]))

  autoTable(doc, {
    startY: yPos + 20,
    head: [["Émotion", "Intensité"]],
    body: emotionsData,
    theme: "striped",
    headStyles: {
      fillColor: [99, 102, 241], // Indigo
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251], // Très léger gris
    },
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text("EmotiFy - Analyse d'émotions par IA", 105, doc.internal.pageSize.height - 10, { align: "center" })
  }

  // Sauvegarder le PDF
  doc.save(`EmotiFy-analyse-${new Date().toISOString().slice(0, 10)}.pdf`)
}
