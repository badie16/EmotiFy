"use client"

import { useState } from "react"
import TextAnalyzer from "../components/text/TextAnalyzer"
import EmotionChart from "../components/EmotionChart"
import { exportToPdf } from "../utils/exportPdf"

function TextAnalysis() {
	const [analysisResult, setAnalysisResult] = useState(null)
	const [originalText, setOriginalText] = useState("")

	const handleAnalysisComplete = (result) => {
		setAnalysisResult(result.emotions)
		setOriginalText(result.text)
	}

	const handleExportPdf = () => {
		if (analysisResult) {
			exportToPdf({
				text: originalText,
				emotions: analysisResult,
				timestamp: new Date().toISOString(),
			})
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden">
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							EmotiFy Core
						</div>
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Analyse de <span className="text-cyan-300">Texte</span>
						</h1>
						<p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
							Découvrez les émotions cachées dans vos textes pour mieux comprendre vos sentiments et améliorer votre
							bien-être mental.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<div className="flex items-center text-blue-200">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Analyse en temps réel
							</div>
							<div className="flex items-center text-blue-200">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Intelligence artificielle avancée
							</div>
							<div className="flex items-center text-blue-200">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Confidentialité garantie
							</div>
						</div>
					</div>
				</div>

				{/* Floating elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
				<div
					className="absolute top-40 right-20 w-16 h-16 bg-cyan-300/20 rounded-full animate-float"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-float"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Info Section */}
				<div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-12">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi analyser vos textes ?</h2>
							<p className="text-gray-600 mb-6">L'analyse émotionnelle de texte peut vous aider à :</p>
							<ul className="space-y-3">
								<li className="flex items-start">
									<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
										<svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<span className="text-gray-700">Prendre conscience de vos émotions sous-jacentes</span>
								</li>
								<li className="flex items-start">
									<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
										<svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<span className="text-gray-700">Suivre votre état émotionnel au fil du temps</span>
								</li>
								<li className="flex items-start">
									<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
										<svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<span className="text-gray-700">Identifier les déclencheurs de stress ou d'anxiété</span>
								</li>
								<li className="flex items-start">
									<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
										<svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<span className="text-gray-700">Améliorer votre communication écrite</span>
								</li>
							</ul>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center">
								<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Analyse Intelligente</h3>
								<p className="text-gray-600 text-sm">
									Notre IA analyse votre texte en profondeur pour identifier les nuances émotionnelles les plus
									subtiles.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Analyzer Component */}
				<div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-6">
						<h2 className="text-2xl font-bold text-white">Commencez votre analyse</h2>
						<p className="text-blue-100">Saisissez votre texte ci-dessous pour découvrir les émotions qu'il contient</p>
					</div>
					<div className="p-8">
						<TextAnalyzer onAnalysisComplete={handleAnalysisComplete} />
					</div>
				</div>

				{/* Results */}
				{analysisResult && (
					<div className="mt-12 space-y-8">
						{/* Results Overview */}
						<div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse</h2>
								<button
									onClick={handleExportPdf}
									className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									Exporter PDF
								</button>
							</div>

							<div className="grid lg:grid-cols-2 gap-8">
								<div>
									<h3 className="font-semibold text-gray-700 mb-4">Texte analysé :</h3>
									<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 max-h-64 overflow-y-auto">
										<p className="text-gray-700 leading-relaxed">{originalText}</p>
									</div>
								</div>
								<div>
									<h3 className="font-semibold text-gray-700 mb-4">Émotions détectées :</h3>
									<EmotionChart emotions={analysisResult} />
								</div>
							</div>
						</div>

						{/* Interpretation */}
						<div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Interprétation détaillée</h2>
							<div className="space-y-6">
								{analysisResult.joy > 0.3 && (
									<div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
										<div className="flex items-start">
											<div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
												<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-lg font-semibold text-yellow-800 mb-2">Joie élevée détectée</h3>
												<p className="text-yellow-700">
													Votre texte exprime un niveau significatif de joie et d'émotions positives. Cela peut refléter
													un état d'esprit optimiste ou des expériences positives récentes.
												</p>
											</div>
										</div>
									</div>
								)}

								{analysisResult.sadness > 0.3 && (
									<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
										<div className="flex items-start">
											<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
												<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-lg font-semibold text-blue-800 mb-2">Tristesse notable</h3>
												<p className="text-blue-700">
													Une présence importante de tristesse est détectée dans votre texte. Cela peut indiquer des
													préoccupations ou des difficultés que vous traversez actuellement.
												</p>
											</div>
										</div>
									</div>
								)}

								{analysisResult.anger > 0.3 && (
									<div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
										<div className="flex items-start">
											<div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
												<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-lg font-semibold text-red-800 mb-2">Colère significative</h3>
												<p className="text-red-700">
													Votre texte révèle un niveau élevé de colère ou de frustration. Identifier la source de ces
													émotions peut être une première étape pour les gérer.
												</p>
											</div>
										</div>
									</div>
								)}

								{analysisResult.fear > 0.3 && (
									<div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
										<div className="flex items-start">
											<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
												<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-lg font-semibold text-purple-800 mb-2">Peur ou anxiété</h3>
												<p className="text-purple-700">
													Une présence notable de peur ou d'anxiété est détectée. Ces émotions peuvent signaler des
													inquiétudes qui méritent votre attention.
												</p>
											</div>
										</div>
									</div>
								)}

								{Object.values(analysisResult).every((val) => val < 0.3) && (
									<div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6">
										<div className="flex items-start">
											<div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
												<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-lg font-semibold text-gray-800 mb-2">Émotions équilibrées</h3>
												<p className="text-gray-700">
													Votre texte présente un équilibre émotionnel, sans qu'une émotion particulière ne domine
													fortement. Cela peut refléter un état d'esprit neutre ou complexe.
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default TextAnalysis
