import React from 'react';
import '../index.css';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(90deg, #232946 60%, #181c2b 100%)',
      color: '#c7c9d9',
      padding: '2rem 0 1rem 0',
      borderTopLeftRadius: '2rem',
      borderTopRightRadius: '2rem',
      marginTop: 'auto',
      boxShadow: '0 -2px 16px 0 rgba(24,28,43,0.10)',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.02em', marginBottom: '0.5rem', color: '#fff' }}>
          FitInfluence
        </div>
        <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          &copy; {new Date().getFullYear()} FitInfluence. All rights reserved.
        </div>
        <div style={{ fontSize: '0.95rem', color: '#a084ee' }}>
          Made with passion for fitness & growth.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 