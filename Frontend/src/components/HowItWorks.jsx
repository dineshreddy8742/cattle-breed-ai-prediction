import React from 'react'

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Image',
      description: 'Take a photo of your cattle or buffalo using your mobile device',
      icon: '📷'
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our advanced AI model analyzes the image and identifies breed characteristics',
      icon: '🤖'
    },
    {
      number: 3,
      title: 'Breed Prediction',
      description: 'Get instant results with breed name, confidence score, and additional details',
      icon: '🎯'
    },
    {
      number: 4,
      title: 'Result Saved',
      description: 'Results are automatically saved to your history for future reference',
      icon: '💾'
    }
  ]

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple 4-step process to identify cattle and buffalo breeds</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className="step-item">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
