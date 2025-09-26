import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ChartsSection from '../components/ChartsSection'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'

const Home = () => {
  const [stats, setStats] = useState({ breeds: 0, images: 0, accuracy: 0, workers: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  return (
    <div className="home-page">
      <Hero />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose PashuAI?</h2>
            <p>Advanced AI technology for accurate cattle breed identification</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Recognition</h3>
              <p>Advanced machine learning algorithms trained on Indian cattle and buffalo breeds</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Processing</h3>
              <p>Get breed identification results in seconds with high accuracy</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Optimized for field workers using mobile devices in rural areas</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>High Accuracy</h3>
              <p>94%+ accuracy in identifying Indian cattle and buffalo breeds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.breeds}+</div>
              <div className="stat-label">Indian Breeds</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.images > 10000 ? '10K+' : stats.images}+</div>
              <div className="stat-label">Images Processed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.accuracy}%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.workers}+</div>
              <div className="stat-label">Field Workers</div>
            </div>
          </div>
        </div>
      </section>

      <ChartsSection />
      <HowItWorks />
      <Testimonials />
    </div>
  )
}

export default Home
