/**
 * ==========================================================================
 * AllPrograms.jsx - All Programs Page Component
 * ==========================================================================
 * 
 * This page displays all available programs in a stacked layout.
 * Follows the FitLife design system with black/white theme.
 * 
 * PROGRAMS DISPLAYED (in order):
 * - Strength Training
 * - Cardio Fitness  
 * - Weight Loss
 * 
 * Each program section includes heading, overview, details, and CTA buttons.
 * Sections are separated by horizontal dividers.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const AllPrograms = () => {
  // ==========================================================================
  // PROGRAMS DATA (COPIED FROM PROGRAMDETAILS.JSX)
  // ==========================================================================
  const programs = [
    {
      id: 'strength-training',
      title: 'Strength Training',
      desc: 'Build muscle and power with science-backed routines designed to maximize your strength gains. Our comprehensive program includes progressive overload techniques, proper form guidance, and personalized workout plans tailored to your fitness level.',
      price: 149900,  // Price in paise (₹1499.00)
      duration: '12 weeks',
      slug: 'strength-training'
    },
    {
      id: 'cardio-fitness',
      title: 'Cardio Fitness',
      desc: 'Boost endurance and burn calories with dynamic cardio workouts. This program focuses on improving cardiovascular health, increasing stamina, and helping you achieve your fitness goals through varied and engaging cardio exercises.',
      price: 99900,   // Price in paise (₹999.00)
      duration: '8 weeks',
      slug: 'cardio-fitness'
    },
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      desc: 'Personalized plans to help you lose fat and keep it off. Our weight loss program combines nutrition guidance, effective workouts, and lifestyle coaching to help you achieve sustainable results and maintain your ideal weight.',
      price: 129900,  // Price in paise (₹1299.00)
      duration: '10 weeks',
      slug: 'weight-loss'
    }
  ];

  // ==========================================================================
  // PRICE FORMATTING FUNCTION
  // ==========================================================================
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <section
      style={{
        // ==========================================================================
        // SECTION LAYOUT
        // ==========================================================================
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        background: '#ffffff',
        minHeight: '85vh',
        padding: '4rem clamp(2rem, 6vw, 8rem)',
        boxSizing: 'border-box',
        scrollMarginTop: '120px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '0 2rem'
        }}
      >

        {/* ==========================================================================
            PROGRAMS SECTIONS
            ========================================================================== */}
        {programs.map((program, index) => (
          <React.Fragment key={program.id}>
            <div
              className={`animate-stagger-${index + 2}`}
              style={{
                marginBottom: index < programs.length - 1 ? '4rem' : '2rem',
                padding: '3rem 0'
              }}
            >
              {/* Program Header - Centered (COPIED FROM PROGRAMDETAILS) */}
              <div className="animate-stagger-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  marginBottom: '2rem',
                  lineHeight: 1.1
                }}>
                  {program.title}
                </h2>
              </div>

              {/* Two Column Layout (COPIED FROM PROGRAMDETAILS) */}
              <div className="program-content-grid" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '4rem',
                alignItems: 'start',
                marginBottom: '3rem'
              }}>
                {/* Left Column - Description (COPIED FROM PROGRAMDETAILS) */}
                <div className="animate-stagger-2">
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 900,
                    color: '#000000',
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                    textAlign: 'left'
                  }}>
                    PROGRAM OVERVIEW
                  </h3>
                  
                  <p style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    color: '#000000',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 600,
                    lineHeight: 1.6,
                    textAlign: 'left',
                    marginBottom: '2rem'
                  }}>
                    {program.desc}
                  </p>
                  
                </div>

                {/* Right Column - Pricing & Duration (COPIED FROM PROGRAMDETAILS) */}
                <div className="animate-stagger-3">
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 900,
                    color: '#000000',
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                    textAlign: 'left'
                  }}>
                    PROGRAM DETAILS
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                      background: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      padding: '1.2rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 900, 
                        color: '#000000',
                        fontFamily: 'Arial Black, Arial, sans-serif',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        {formatPrice(program.price)}
                      </div>
                      <div style={{ 
                        color: '#000000', 
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        TOTAL INVESTMENT
                      </div>
                    </div>

                    <div style={{
                      background: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      padding: '1.2rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 900, 
                        color: '#000000',
                        fontFamily: 'Arial Black, Arial, sans-serif',
                        letterSpacing: '1px',
                        marginBottom: '0.3rem'
                      }}>
                        {program.duration}
                      </div>
                      <div style={{ 
                        color: '#000000', 
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        PROGRAM DURATION
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON - CENTERED */}
              <div className="animate-stagger-4" style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                marginBottom: index < programs.length - 1 ? '0' : '2rem'
              }}>
                {/* PROCEED TO CHECKOUT BUTTON - BLACK BOX (COPIED FROM PROGRAMDETAILS) */}
                <Link
                  to={`/checkout/${program.slug}`}
                  className="btn"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    padding: '1rem 2.5rem',
                    background: '#000000',
                    color: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ffffff';
                    e.target.style.color = '#000000';
                    e.target.style.border = '2px solid #000000';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000000';
                    e.target.style.color = '#ffffff';
                    e.target.style.border = '2px solid #000000';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>

            {/* HORIZONTAL DIVIDER */}
            {index < programs.length - 1 && (
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: '#000000',
                  margin: '4rem 0',
                  borderRadius: '3px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              />
            )}
          </React.Fragment>
        ))}

        {/* ==========================================================================
            BACK TO HOME BUTTON
            ========================================================================== */}
        <div className="animate-stagger-5" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            to="/"
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'Arial Black, Arial, sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              background: '#ffffff',
              color: '#000000',
              border: '2px solid #000000',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000000';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.color = '#000000';
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllPrograms;
