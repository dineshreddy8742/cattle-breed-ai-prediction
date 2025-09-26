import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🐄</span>
              <span className="logo-text">PashuAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                HOME
              </Link>
              <Link
                to="/breed-database"
                className={`nav-link ${location.pathname === '/breed-database' ? 'active' : ''}`}
              >
                BREED DB
              </Link>
              <Link
                to="/upload"
                className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
              >
                IDENTIFY
              </Link>
              <Link
                to="/history"
                className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
              >
                HISTORY
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                CONTACT
              </Link>
            </div>

            <div className="nav-cta">
              <Link to="/upload" className="cta-button">
                Identify Breed
                <span className="arrow">→</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
            <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-nav-header">
                <div className="mobile-nav-title">
                  <span className="logo-icon">🐄</span>
                  <span>PashuAI</span>
                </div>
              </div>
              <div className="mobile-nav-links">
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  HOME
                </Link>
                <Link
                  to="/breed-database"
                  className={`nav-link ${location.pathname === '/breed-database' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  BREED DB
                </Link>
                <Link
                  to="/upload"
                  className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  IDENTIFY
                </Link>
                <Link
                  to="/history"
                  className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  HISTORY
                </Link>
                <Link
                  to="/contact"
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
