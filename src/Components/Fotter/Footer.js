import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #30002C, #1A0118)', // Gradient background
        color: '#fff',
        padding: '20px 10px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        marginTop: '40px',
        boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Follow Us</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
            onMouseLeave={(e) => (e.target.style.color = '#fff')}
          >
            <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#1DA1F2')}
            onMouseLeave={(e) => (e.target.style.color = '#fff')}
          >
            <i className="fab fa-twitter"></i> {/* Twitter Icon */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#E1306C')}
            onMouseLeave={(e) => (e.target.style.color = '#fff')}
          >
            <i className="fab fa-instagram"></i> {/* Instagram Icon */}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0077B5')}
            onMouseLeave={(e) => (e.target.style.color = '#fff')}
          >
            <i className="fab fa-linkedin-in"></i> {/* LinkedIn Icon */}
          </a>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <a
          href="/privacy-policy"
          style={{
            color: '#fff',
            textDecoration: 'none',
            marginRight: '15px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          style={{
            color: '#fff',
            textDecoration: 'none',
            marginRight: '15px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          Terms of Service
        </a>
        <a
          href="/contact"
          style={{
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#007BFF')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          Contact Us
        </a>
      </div>
      <div>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} PIXGEO All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;