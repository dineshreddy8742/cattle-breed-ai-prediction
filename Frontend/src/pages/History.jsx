import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../apiConfig';

const History = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/history`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Sort by timestamp descending
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setPredictions(sortedData)
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

  // Group predictions by date
  const groupPredictions = () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const groups = {
      today: [],
      yesterday: [],
      earlier: []
    }

    predictions.forEach(prediction => {
      const predDate = new Date(prediction.timestamp)
      predDate.setHours(0, 0, 0, 0) // Normalize to date only

      if (predDate.toDateString() === today.toDateString()) {
        groups.today.push(prediction)
      } else if (predDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(prediction)
      } else {
        groups.earlier.push(prediction)
      }
    })

    return groups
  }

  const groups = groupPredictions()

  const renderGroup = (title, items) => {
    if (items.length === 0) return null
    return (
      <div className="history-group">
        <h3 className="date-header">{title}</h3>
        <div className="predictions-grid">
          {items.map((prediction) => (
            <div key={prediction.id} className="prediction-card">
              <img 
                src={`data:image/jpeg;base64,${prediction.image_base64}`}
                alt="Uploaded Cattle"
                className="thumbnail-image"
              />
              <div className="prediction-details">
                <h4>{prediction.breed}</h4>
                <p className="confidence-badge">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                <p className="timestamp">{new Date(prediction.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
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
          <div className="history-sections">
            {predictions.length === 0 ? (
              <p>No prediction history found. Upload an image to get started!</p>
            ) : (
              <>
                {renderGroup('Today', groups.today)}
                {renderGroup('Yesterday', groups.yesterday)}
                {renderGroup('Earlier', groups.earlier)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
