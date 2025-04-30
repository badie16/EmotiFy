function AnalysisCard({ title, description, icon, linkTo, bgColor }) {
  return (
    <div className={`rounded-lg shadow-md p-6 ${bgColor || "bg-white"} transition-transform hover:scale-105`}>
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={linkTo}
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Essayer
      </a>
    </div>
  )
}

export default AnalysisCard
