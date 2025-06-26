import React from 'react';
import '../index.css';

const heroBg = '/hero-bg.jpg';

const Hero = () => (
  <section id="hero" className="hero-section-animate" style={{
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 0,
    marginBottom: '2rem',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
  }}>
    {/* Background Image */}
    <img
      src={heroBg}
      alt="Fitness Hero"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 1,
        filter: 'brightness(0.38) saturate(1.08)',
        background: '#181a22',
      }}
    />
    {/* Fluid Overlay */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 2,
      background: 'radial-gradient(ellipse at 60% 40%, rgba(24,26,34,0.32) 0%, rgba(17,19,27,0.92) 80%)',
      pointerEvents: 'none',
      animation: 'fluidWave 8s ease-in-out infinite alternate',
    }} />
    {/* Content */}
    <div style={{
      position: 'relative',
      zIndex: 3,
      textAlign: 'center',
      color: '#fff',
      width: '100%',
      maxWidth: 700,
      margin: '0 auto',
      padding: '3rem 1rem',
      borderRadius: '2.5rem',
      boxShadow: '0 8px 48px 0 #a084ee22, 0 0 0 2.5px #a084ee55',
      border: '2.5px solid',
      borderImage: 'linear-gradient(90deg, #a084ee 0%, #6d83f2 100%) 1',
      background: 'rgba(24,26,34,0.55)',
      backdropFilter: 'blur(2.5px)',
      overflow: 'visible',
    }} className="animate-fadeInUp hero-content-glow hero-animated-border">
      {/* Floating accent shapes */}
      <div style={{
        position: 'absolute',
        top: -48,
        left: -64,
        width: 180,
        height: 120,
        background: 'radial-gradient(circle at 30% 40%, #a084ee55 0%, transparent 80%)',
        filter: 'blur(32px) saturate(1.2)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
        animation: 'floatAccent1 7s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -48,
        right: -64,
        width: 180,
        height: 120,
        background: 'radial-gradient(circle at 70% 60%, #6d83f299 0%, transparent 80%)',
        filter: 'blur(32px) saturate(1.2)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
        animation: 'floatAccent2 8s ease-in-out infinite alternate',
      }} />
      {/* Main content */}
      <h1 style={{
        fontSize: '3.2rem',
        fontWeight: 900,
        marginBottom: '1.2rem',
        letterSpacing: '-1px',
        lineHeight: 1.1,
        background: 'linear-gradient(90deg, #a084ee 0%, #6d83f2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        textShadow: '0 6px 32px #181a22cc, 0 1px 0 #a084ee44',
      }}>
        Unlock Your Best Self
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#e0e0f0',
        fontWeight: 500,
        marginBottom: '2.2rem',
        textShadow: '0 2px 16px rgba(35,41,70,0.25)',
      }}>
        Transform your body and mind with Shriraj Mahidhar – Fitness Influencer & Coach
      </p>
      <a href="#programs" className="btn" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>Get Started</a>
      {/* Down arrow indicator */}
      <div style={{
        marginTop: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <span style={{
          display: 'inline-block',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(160,132,238,0.13)',
          boxShadow: '0 2px 12px 0 #a084ee33',
          position: 'relative',
          animation: 'bounceDown 1.8s infinite',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 6, top: 6 }} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="#a084ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  </section>
);

export default Hero; 