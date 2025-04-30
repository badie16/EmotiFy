"use client";

import { useState } from "react";
import TextAnalyzer from "../components/text/TextAnalyzer";
import EmotionChart from "../components/EmotionChart";
import { saveAnalysis } from "../api/emotionService";
import { exportToPdf } from "../utils/exportPdf";

function TextAnalysis() {
	const [analysisResult, setAnalysisResult] = useState(null);
	const [originalText, setOriginalText] = useState("");

	const handleAnalysisComplete = (result) => {
		setAnalysisResult(result.emotions);
		setOriginalText(result.text);
		console.log("ef");
		// Sauvegarder l'analyse dans l'historique
		// saveAnalysis({
		//   text: result.text,
		//   emotions: result.emotions,
		//   timestamp: new Date().toISOString(),
		// })
	};

	const handleExportPdf = () => {
		if (analysisResult) {
			exportToPdf({
				text: originalText,
				emotions: analysisResult,
				timestamp: new Date().toISOString(),
			});
		}
	};

	return (
		<div>
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">Analyse de texte</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Découvrez les émotions cachées dans vos textes pour mieux comprendre
					vos sentiments et améliorer votre bien-être mental.
				</p>
			</div>

			<div className="bg-indigo-50 rounded-lg p-6 mb-8">
				<h2 className="text-xl font-semibold mb-2">
					Pourquoi analyser vos textes ?
				</h2>
				<p className="text-gray-700 mb-4">
					L'analyse émotionnelle de texte peut vous aider à :
				</p>
				<ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
					<li>Prendre conscience de vos émotions sous-jacentes</li>
					<li>Suivre votre état émotionnel au fil du temps</li>
					<li>Identifier les déclencheurs de stress ou d'anxiété</li>
					<li>Améliorer votre communication écrite</li>
				</ul>
				<p className="text-gray-700 italic">
					Idéal pour l'analyse de journaux intimes, de messages importants ou de
					réflexions personnelles.
				</p>
			</div>

			<TextAnalyzer onAnalysisComplete={handleAnalysisComplete} />

			{analysisResult && (
				<div className="space-y-6">
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4">
							Résultats de l'analyse
						</h2>
						<div className="mb-4">
							<h3 className="font-medium text-gray-700 mb-2">
								Texte analysé :
							</h3>
							<div className="bg-gray-50 p-4 rounded-md border border-gray-200">
								<p className="text-gray-700">{originalText}</p>
							</div>
						</div>
						<EmotionChart emotions={analysisResult} />
					</div>

					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4">Interprétation</h2>
						<div className="space-y-4">
							{analysisResult.joy > 0.3 && (
								<div className="p-4 bg-yellow-50 rounded-md">
									<h3 className="font-medium text-yellow-800 mb-1">
										Joie élevée
									</h3>
									<p className="text-gray-700">
										Votre texte exprime un niveau significatif de joie et
										d'émotions positives. Cela peut refléter un état d'esprit
										optimiste ou des expériences positives récentes.
									</p>
								</div>
							)}

							{analysisResult.sadness > 0.3 && (
								<div className="p-4 bg-blue-50 rounded-md">
									<h3 className="font-medium text-blue-800 mb-1">
										Tristesse notable
									</h3>
									<p className="text-gray-700">
										Une présence importante de tristesse est détectée dans votre
										texte. Cela peut indiquer des préoccupations ou des
										difficultés que vous traversez actuellement.
									</p>
								</div>
							)}

							{analysisResult.anger > 0.3 && (
								<div className="p-4 bg-red-50 rounded-md">
									<h3 className="font-medium text-red-800 mb-1">
										Colère significative
									</h3>
									<p className="text-gray-700">
										Votre texte révèle un niveau élevé de colère ou de
										frustration. Identifier la source de ces émotions peut être
										une première étape pour les gérer.
									</p>
								</div>
							)}

							{analysisResult.fear > 0.3 && (
								<div className="p-4 bg-purple-50 rounded-md">
									<h3 className="font-medium text-purple-800 mb-1">
										Peur ou anxiété
									</h3>
									<p className="text-gray-700">
										Une présence notable de peur ou d'anxiété est détectée. Ces
										émotions peuvent signaler des inquiétudes qui méritent votre
										attention.
									</p>
								</div>
							)}

							{Object.values(analysisResult).every((val) => val < 0.3) && (
								<div className="p-4 bg-gray-50 rounded-md">
									<h3 className="font-medium text-gray-800 mb-1">
										Émotions équilibrées
									</h3>
									<p className="text-gray-700">
										Votre texte présente un équilibre émotionnel, sans qu'une
										émotion particulière ne domine fortement. Cela peut refléter
										un état d'esprit neutre ou complexe.
									</p>
								</div>
							)}
						</div>
					</div>

					<div className="flex justify-center">
						<button
							onClick={handleExportPdf}
							className="bg-white border border-indigo-500 text-indigo-500 py-2 px-6 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							Exporter en PDF
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default TextAnalysis;
