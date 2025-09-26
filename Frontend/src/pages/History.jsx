import React, { useEffect, useState } from 'react'

const History = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://10.100.182.69:5001/api/history')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPredictions(data)
      } catch (e) {
        setError('Failed to fetch prediction history. Make sure the backend is running.')
        console.error("Error fetching history:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="history-page">
        <div className="container">
          <h1>Prediction History</h1>
          <p>Loading history...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="container">
          <h1>Prediction History</h1>
          <p className="error-message">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-page">
      <div className="page-header">
        <div className="container">
          <h1>Prediction History</h1>
          <p>Review your past cattle breed identifications.</p>
        </div>
      </div>

      <div className="history-content">
        <div className="container">
          {predictions.length === 0 ? (
            <p>No prediction history found. Upload an image to get started!</p>
          ) : (
            <div className="predictions-grid">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="prediction-card">
                  <img 
                    src={`data:image/jpeg;base64,${prediction.image_base64}`}
                    alt="Uploaded Cattle"
                    className="prediction-image"
                  />
                  <div className="prediction-details">
                    <h4>{prediction.breed}</h4>
                    <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                    <p className="timestamp">{new Date(prediction.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History
