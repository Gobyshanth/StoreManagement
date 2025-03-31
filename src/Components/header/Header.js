import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #30002C, #1A0118)', // Gradient background
        padding: '10px 20px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow effect
        borderRadius: '5px', // Rounded corners
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>PIXGEO</h1>

      {/* Hamburger Menu Icon */}
      <div
        style={{
          display: 'block', // Show on mobile
          cursor: 'pointer',
          fontSize: '1.5rem',
        }}
        onClick={toggleMenu}
      >
        ☰
      </div>

      {/* Navigation Menu */}
      <nav
        style={{
          display: isMenuOpen ? 'block' : 'none', // Show menu when isMenuOpen is true
          position: 'absolute', // Position menu for mobile
          top: '100px',
          left: 0, // Align menu to the left
          width: '100%', // Make the menu span the full width
          backgroundColor: '#30002C',
          padding: '10px 0', // Add padding to the top and bottom
          zIndex: 1000,
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px', // Add padding for better spacing
                display: 'block', // Make links block-level for better spacing
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A0118'; // Add hover background color
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'; // Reset background color
              }}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Home
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/aboutus"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                display: 'block',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A0118';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/services"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                display: 'block',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A0118';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/contact"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                display: 'block',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A0118';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/admin"
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                display: 'block',
                transition: 'all 0.3s ease',
                backgroundColor: '#C70039', // Highlight Admin Login
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FF5733'; // Change hover color
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#C70039'; // Reset to original color
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;