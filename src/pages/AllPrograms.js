/**
 * ==========================================================================
 * AllPrograms.js - All Programs Page Component
 * ==========================================================================
 * 
 * This page displays all available programs in a grid layout.
 * Follows the FitLife design system with black/white theme.
 * 
 * PROGRAMS DISPLAYED:
 * - Fat Loss
 * - Muscle Gain  
 * - Tone & Sculpt
 * 
 * Each program card includes title, description, and View Details button.
 * Cards are responsive: 3 columns on desktop, 1 column on mobile.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const AllPrograms = () => {
  // ==========================================================================
  // PROGRAMS DATA
  // ==========================================================================
  const programs = [
    {
      id: 'fatloss',
      title: 'Fat Loss',
      description: 'Comprehensive fat loss program designed to help you burn calories and achieve your ideal body composition through proven training methods.',
      slug: 'fatloss',
      icon: '🔥'
    },
    {
      id: 'musclegain', 
      title: 'Muscle Gain',
      description: 'Build lean muscle mass with science-backed strength training routines and progressive overload techniques for maximum growth.',
      slug: 'musclegain',
      icon: '💪'
    },
    {
      id: 'tonesculpt',
      title: 'Tone & Sculpt', 
      description: 'Sculpt and tone your body with targeted exercises that focus on muscle definition and overall body composition.',
      slug: 'tonesculpt',
      icon: '✨'
    }
  ];

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
            PAGE HEADER
            ========================================================================== */}
        <div className="animate-stagger-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#000000',
              fontFamily: 'Arial Black, Arial, sans-serif',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}
          >
            All Programs
          </h1>
          
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#000000',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
              lineHeight: 1.6,
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            Choose from our comprehensive fitness programs designed to help you achieve your goals. 
            Each program is tailored to specific objectives with proven methodologies.
          </p>
        </div>

        {/* ==========================================================================
            PROGRAMS GRID
            ========================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`animate-stagger-${index + 2}`}
              style={{
                // ==========================================================================
                // CARD STYLING
                // ==========================================================================
                background: '#ffffff',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                border: '2px solid #000000',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                
                // HOVER EFFECTS
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              }}
            >
              {/* PROGRAM ICON */}
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
              >
                {program.icon}
              </div>

              {/* PROGRAM TITLE */}
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  lineHeight: 1.2
                }}
              >
                {program.title}
              </h3>

              {/* PROGRAM DESCRIPTION */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: '#000000',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}
              >
                {program.description}
              </p>

              {/* VIEW DETAILS BUTTON */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link
                  to={`/programs/${program.slug}`}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '0.8rem 2rem',
                    background: '#000000',
                    color: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ffffff';
                    e.target.style.color = '#000000';
                    e.target.style.border = '2px solid #000000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#000000';
                    e.target.style.color = '#ffffff';
                    e.target.style.border = '2px solid #000000';
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ==========================================================================
            BACK TO HOME BUTTON
            ========================================================================== */}
        <div className="animate-stagger-5" style={{ textAlign: 'center' }}>
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
