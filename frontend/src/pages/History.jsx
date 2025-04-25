import HistoryList from '../components/HistoryList'

function History() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Historique des analyses</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Consultez l'historique de vos analyses d'émotions précédentes.
        </p>
      </div>
      
      <HistoryList />
    </div>
  )
}

export default History