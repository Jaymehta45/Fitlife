import React from 'react';
import '../index.css';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      background: '#ffffff',
      color: '#000000',
      padding: '2rem 0 1rem 0',
      borderTopLeftRadius: '2rem',
      borderTopRightRadius: '2rem',
      marginTop: 'auto',
      boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.10)',
      borderTop: '2px solid #000000',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.02em', marginBottom: '0.5rem', color: '#000000' }}>
          FitInfluence
        </div>
        <div style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#000000' }}>
          &copy; {new Date().getFullYear()} FitInfluence. All rights reserved.
        </div>
        <div style={{ fontSize: '0.95rem', color: '#000000' }}>
          Made with passion for fitness & growth.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 