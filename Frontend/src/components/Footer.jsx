import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">



          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/breed-database">Breed Database</Link></li>
              <li><Link to="/upload">Upload Image</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Breed Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Cattle Breeds</a></li>
              <li><a href="#">Buffalo Breeds</a></li>
              <li><a href="#">Crossbred Cattle</a></li>
              <li><a href="#">Indigenous Breeds</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>SVCET, Chittoor, Andhra Pradesh</span>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <span>+91 999999999</span>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <span>divya@example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} PashuAI. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer