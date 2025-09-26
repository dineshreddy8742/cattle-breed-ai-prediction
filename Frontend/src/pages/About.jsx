import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>About PashuAI</h1>
          <p>AI-powered cattle breed recognition for Bharat Pashudhan App</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          {/* Mission Section */}
          <section className="mission-section">
            <div className="mission-content">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p className="mission-tagline">
                  Empowering the Bharat Pashudhan App with accurate AI-driven cattle and buffalo breed identification.
                </p>
                <ul className="mission-points">
                  <li>Minimize breed identification errors for improved data integrity.</li>
                  <li>Support genetic improvement, nutrition planning, and disease control programs.</li>
                  <li>Provide a reliable decision-support tool for Field Level Workers (FLWs).</li>
                  <li>Ensure consistent and accurate breed identification across all regions of India.</li>
                </ul>
              </div>
              <div className="mission-image">
                {/* Empty space for mission image */}
                <div className="image-placeholder">
                  <span className="mission-icon">🎯</span>
                </div>
              </div>
            </div>
          </section>

          {/* How It Helps Section */}
          <section className="help-section">
            <h2>How It Helps</h2>
            <div className="help-grid">
              <div className="help-item">
                <div className="help-icon">👨‍🌾</div>
                <h3>Field Workers</h3>
                <p>Quick and accurate breed identification in the field, reducing errors and saving time during livestock surveys and registrations.</p>
              </div>
              <div className="help-item">
                <div className="help-icon">🏛️</div>
                <h3>Government Users</h3>
                <p>Reliable data for policy making, genetic improvement programs, and monitoring livestock health across India.</p>
              </div>
              <div className="help-item">
                <div className="help-icon">📊</div>
                <h3>Data Integrity</h3>
                <p>Consistent breed classification ensures accurate national livestock databases and better resource allocation.</p>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="technology-section">
            <h2>Our Technology</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon">🧠</div>
                <h3>Machine Learning</h3>
                <p>Advanced neural networks trained on thousands of Indian cattle and buffalo images</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">📱</div>
                <h3>Mobile Optimized</h3>
                <p>Lightweight AI models optimized for mobile devices used by field workers</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">☁️</div>
                <h3>Cloud Integration</h3>
                <p>Seamless integration with Bharat Pashudhan App infrastructure</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🔒</div>
                <h3>Data Security</h3>
                <p>Secure handling of animal data with privacy protection measures</p>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="impact-section">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <div className="impact-stat">
                <div className="stat-number">94%</div>
                <div className="stat-label">Accuracy Rate</div>
                <div className="stat-description">In breed identification</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Indian Breeds</div>
                <div className="stat-description">Supported in our database</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Field Workers</div>
                <div className="stat-description">Using our system</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Images Processed</div>
                <div className="stat-description">Successfully identified</div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2>Our Team</h2>
            <p className="team-description">
              We are a dedicated team of AI researchers, agricultural experts, and software developers 
              working together to improve livestock management in India through technology.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <div className="image-placeholder">
                    <span className="member-icon">👩‍💻</span>
                  </div>
                </div>
                <h4>Divya</h4>
                <p>Project Lead (Smart India Hackathon)</p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  {/* Empty space for team member image */}
                  <div className="image-placeholder">
                    <span className="member-icon">👩‍🌾</span>
                  </div>
                </div>
                <h4>Agricultural Experts</h4>
                <p>Livestock & Breed Specialists</p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  {/* Empty space for team member image */}
                  <div className="image-placeholder">
                    <span className="member-icon">👨‍💼</span>
                  </div>
                </div>
                <h4>Development Team</h4>
                <p>Software Engineers & UI/UX Designers</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
