import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useState } from 'react'
import { emotionColors } from '../utils/colors'

function EmotionChart({ emotions }) {
  const [chartType, setChartType] = useState('pie')
  
  // Préparer les données pour les graphiques
  const data = Object.entries(emotions).map(([name, score]) => ({
    name,
    value: Math.round(score * 100)
  })).sort((a, b) => b.value - a.value)
  
  // Filtrer pour n'afficher que les émotions avec une valeur significative
  const filteredData = data.filter(item => item.value > 1)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Résultats de l'analyse</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded-md ${
              chartType === 'pie' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Camembert
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-md ${
              chartType === 'bar' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Barres
          </button>
        </div>
      </div>
      
      <div className="h-80">
        {chartType === 'pie' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={emotionColors[entry.name] || '#' + ((Math.random() * 0xffffff) << 0).toString(16)} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" name="Intensité">
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={emotionColors[entry.name] || '#' + ((Math.random() * 0xffffff) << 0).toString(16)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredData.map((emotion) => (
          <div key={emotion.name} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: emotionColors[emotion.name] || '#' + ((Math.random() * 0xffffff) << 0).toString(16) }}
            ></div>
            <span className="font-medium">{emotion.name}:</span>
            <span className="ml-2">{emotion.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmotionChart