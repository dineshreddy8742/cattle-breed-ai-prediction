import React, { useState, useEffect } from 'react'

const BreedDatabase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const breeds = {
    cattle: [
      {
        name: "Gir",
        region: "Gujarat",
        type: "Dairy",
        image: "./image1.png",
        description: "Famous for high milk production and distinctive red and white coloration",
        keyFacts: "High milk yield up to 1,800 liters per lactation, disease resistant, adaptable to hot climate",
        characteristics: ["High milk yield", "Disease resistant", "Adaptable to hot climate"]
      },
      {
        name: "Sahiwal",
        region: "Punjab",
        type: "Dairy",
        image: "./image2.png",
        description: "Excellent dairy breed known for heat tolerance and milk quality",
        keyFacts: "Heat tolerant, high butterfat content (4-5%), good temperament",
        characteristics: ["Heat tolerant", "High butterfat content", "Good temperament"]
      },
      {
        name: "Red Sindhi",
        region: "Sindh",
        type: "Dairy",
        image: "./image3.png",
        description: "Red colored breed with good milk production and disease resistance",
        keyFacts: "Disease resistant, good milk yield, red coloration, hardy",
        characteristics: ["Disease resistant", "Good milk yield", "Red coloration"]
      },
      {
        name: "Tharparkar",
        region: "Rajasthan",
        type: "Dual Purpose",
        image: "./image4.png",
        description: "White colored breed suitable for both milk and draught purposes",
        keyFacts: "Dual purpose (milk and draught), white color, hardy in arid regions",
        characteristics: ["Dual purpose", "White color", "Hardy"]
      }
    ],
    buffalo: [
      {
        name: "Murrah",
        region: "Haryana",
        type: "Dairy",
        image: "./image1.png",
        description: "Premium buffalo breed with highest milk production",
        keyFacts: "Highest milk yield (2,000-2,500 liters), high butterfat, black color",
        characteristics: ["Highest milk yield", "High butterfat", "Black color"]
      },
      {
        name: "Nili-Ravi",
        region: "Punjab",
        type: "Dairy",
        image: "./image2.png",
        description: "Excellent dairy buffalo with distinctive white markings",
        keyFacts: "High milk production, white markings, good temperament",
        characteristics: ["High milk production", "White markings", "Good temperament"]
      },
      {
        name: "Surti",
        region: "Gujarat",
        type: "Dairy",
        image: "./image3.png",
        description: "Medium-sized buffalo breed with good milk quality",
        keyFacts: "Medium size, good milk quality, adaptable, white with black markings",
        characteristics: ["Medium size", "Good milk quality", "Adaptable"]
      },
      {
        name: "Jaffarabadi",
        region: "Gujarat",
        type: "Dairy",
        image: "./image4.png",
        description: "Large-sized buffalo breed with high milk production",
        keyFacts: "Large size, high milk yield, strong build, white with black markings",
        characteristics: ["Large size", "High milk yield", "Strong build"]
      }
    ]
  }

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setClasses(data)
      } catch (e) {
        setError('Failed to fetch breed classes. Using static data.')
        console.error("Error fetching classes:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  const allBreeds = [...breeds.cattle, ...breeds.buffalo]

  const filteredBreeds = (selectedCategory === 'all'
    ? allBreeds
    : breeds[selectedCategory] || [])
    .filter(breed => selectedRegion === 'all' || breed.region === selectedRegion)
    .filter(breed => selectedType === 'all' || breed.type === selectedType)
    .filter(breed => breed.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="breed-database-page">
      <div className="page-header">
        <div className="container">
          <h1>Indian Cattle & Buffalo Breeds</h1>
          <p>Comprehensive database of Indian cattle and buffalo breeds</p>
        </div>
      </div>

      <div className="breed-database-content">
        <div className="container">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search breeds by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Breeds
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'cattle' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cattle')}
            >
              Cattle Breeds
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'buffalo' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('buffalo')}
            >
              Buffalo Breeds
            </button>
          </div>

          {/* Region Filter */}
          <div className="region-filter">
            <h4>Filter by Region:</h4>
            <button
              className={`filter-btn ${selectedRegion === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('all')}
            >
              All Regions
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Gujarat' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Gujarat')}
            >
              Gujarat
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Punjab' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Punjab')}
            >
              Punjab
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Rajasthan' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Rajasthan')}
            >
              Rajasthan
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Sindh' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Sindh')}
            >
              Sindh
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Haryana' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Haryana')}
            >
              Haryana
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Andhra Pradesh' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Andhra Pradesh')}
            >
              Andhra Pradesh
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Hyderabad' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Hyderabad')}
            >
              Hyderabad
            </button>
            <button
              className={`filter-btn ${selectedRegion === 'Bengaluru' ? 'active' : ''}`}
              onClick={() => setSelectedRegion('Bengaluru')}
            >
              Bengaluru
            </button>
          </div>

          {/* Type Filter */}
          <div className="type-filter">
            <h4>Filter by Type:</h4>
            <button
              className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              All Types
            </button>
            <button
              className={`filter-btn ${selectedType === 'Dairy' ? 'active' : ''}`}
              onClick={() => setSelectedType('Dairy')}
            >
              Dairy
            </button>
            <button
              className={`filter-btn ${selectedType === 'Dual Purpose' ? 'active' : ''}`}
              onClick={() => setSelectedType('Dual Purpose')}
            >
              Dual Purpose
            </button>
          </div>

          {/* Breeds Grid */}
          <div className="breeds-grid">
            {filteredBreeds.map((breed, index) => (
              <div key={index} className="breed-card">
                <div className="breed-image">
                  <img 
                    src={breed.image} 
                    alt={`${breed.name} breed`}
                    className="breed-image-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    <span className="breed-icon">
                      {selectedCategory === 'cattle' ? '🐄' : '🐃'}
                    </span>
                  </div>
                </div>
                <div className="breed-info">
                  <h3 className="breed-name">{breed.name}</h3>
                  <div className="breed-meta">
                    <span className="breed-origin">📍 {breed.region}</span>
                    <span className="breed-type">{breed.type}</span>
                  </div>
                  <p className="breed-description">{breed.description}</p>
                  <p className="breed-key-facts">{breed.keyFacts}</p>
                  <div className="breed-characteristics">
                    <h4>Key Features:</h4>
                    <ul>
                      {breed.characteristics.map((char, idx) => (
                        <li key={idx}>{char}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="see-more-btn">See More Details</button>
                </div>
              </div>
            ))}
          </div>

          {filteredBreeds.length === 0 && (
            <div className="no-breeds">
              <p>No breeds found for the selected category.</p>
            </div>
          )}

          {/* Available Classes from Backend */}
          {classes.length > 0 && (
            <div className="available-classes">
              <h2>Available Breeds from AI Model</h2>
              <p>These are the breeds the AI model can identify:</p>
              <div className="classes-list">
                {classes.map((cls, index) => (
                  <span key={index} className="class-item">{cls.replace(/_/g, ' ')}</span>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BreedDatabase
