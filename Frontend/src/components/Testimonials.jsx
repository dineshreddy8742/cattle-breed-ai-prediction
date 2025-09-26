import React, { useState, useEffect } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Raju Sharma',
      role: 'Field Worker, Andhra Pradesh',
      quote: 'PashuAI has revolutionized how we identify cattle breeds in the field. The accuracy is incredible!',
      avatar: '👨‍🌾'
    },
    {
      name: 'Priya Patel',
      role: 'Veterinarian, Gujarat',
      quote: 'As a vet, I rely on accurate breed identification for treatment plans. This app saves me hours of work.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Amit Kumar',
      role: 'Farm Manager, Punjab',
      quote: 'The buffalo breed recognition is spot-on. Helps us maintain our herd quality and productivity.',
      avatar: '👨‍💼'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Real feedback from field workers and farmers across India</p>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <div className="testimonial-avatar">
              {testimonials[currentIndex].avatar}
            </div>
            <blockquote className="testimonial-quote">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="testimonial-author">
              <h4>{testimonials[currentIndex].name}</h4>
              <p>{testimonials[currentIndex].role}</p>
            </div>
          </div>

          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
