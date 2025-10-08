/**
 * ==========================================================================
 * ProgramDetails.jsx - Individual Program Details Page
 * ==========================================================================
 * 
 * This page displays detailed information about a specific fitness program:
 * 1. Fetches program data from API or falls back to local data
 * 2. Shows program details (title, description, price, duration)
 * 3. Includes ProfileCard component for coach information
 * 4. Provides navigation to checkout page
 * 
 * ROUTING: /programs/:slug (e.g., /programs/strength-training)
 * 
 * DATA FLOW:
 * 1. Try to fetch from /api/programs/:slug
 * 2. If API fails or returns 404, use LOCAL_PROGRAMS fallback
 * 3. Display program information with navigation options
 * 
 * TO MODIFY:
 * - Add/remove programs in LOCAL_PROGRAMS array
 * - Change API endpoint in fetch URL
 * - Modify program information display
 * - Update navigation behavior
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

// ==========================================================================
// LOCAL PROGRAMS FALLBACK DATA
// ==========================================================================
// This data is used when the API is unavailable or returns 404
// TO ADD NEW PROGRAMS: Add objects to this array
// TO MODIFY EXISTING: Change the properties of existing objects
const LOCAL_PROGRAMS = [
  { 
    slug: "strength-training", 
    title: "Strength Training", 
    desc: "Build muscle and power with science-backed routines designed to maximize your strength gains. Our comprehensive program includes progressive overload techniques, proper form guidance, and personalized workout plans tailored to your fitness level.", 
    price: 149900,  // Price in paise (₹1499.00)
    duration: "12 weeks", 
  },
  { 
    slug: "cardio-fitness", 
    title: "Cardio Fitness", 
    desc: "Boost endurance and burn calories with dynamic cardio workouts. This program focuses on improving cardiovascular health, increasing stamina, and helping you achieve your fitness goals through varied and engaging cardio exercises.", 
    price: 99900,   // Price in paise (₹999.00)
    duration: "8 weeks", 
  },
  { 
    slug: "weight-loss", 
    title: "Weight Loss", 
    desc: "Personalized plans to help you lose fat and keep it off. Our weight loss program combines nutrition guidance, effective workouts, and lifestyle coaching to help you achieve sustainable results and maintain your ideal weight.", 
    price: 129900,  // Price in paise (₹1299.00)
    duration: "10 weeks", 
  }
];

const ProgramDetails = () => {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const { slug } = useParams();                    // Get program slug from URL
  const navigate = useNavigate();                  // Navigation function
  const [program, setProgram] = useState(null);   // Current program data
  const [loading, setLoading] = useState(true);   // Loading state

  // ==========================================================================
  // DATA FETCHING LOGIC
  // ==========================================================================
  // This effect fetches program data with API fallback to local data
  // TO MODIFY API: Change the fetch URL endpoint
  // TO ADD MORE FALLBACK LOGIC: Modify the catch block
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/programs/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProgram(data);
        } else {
          throw new Error('Program not found');
        }
      } catch (error) {
        // API failed, use local fallback
        console.warn('API fetch failed, using local fallback:', error.message);
        const localProgram = LOCAL_PROGRAMS.find(p => p.slug === slug);
        if (localProgram) {
          setProgram(localProgram);
        } else {
          console.warn('Program not found in local fallback');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  // ==========================================================================
  // NAVIGATION HANDLERS
  // ==========================================================================
  // Handle navigation to checkout page
  const handleProceedToJoin = () => {
    navigate(`/checkout/${slug}`);
  };

  const handleAskQuestion = () => {
    navigate('#contact');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#000000'
      }}>
        Loading program details...
      </div>
    );
  }

  if (!program) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 900, 
          color: '#000000',
          marginBottom: '1rem'
        }}>
          Program Not Found
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#000000',
          marginBottom: '2rem'
        }}>
          The program you're looking for doesn't exist.
        </p>
        <button 
          className="btn"
          onClick={() => navigate('/programs')}
          style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}
        >
          Back to Programs
        </button>
      </div>
    );
  }

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
        {/* Program Header - Centered */}
          <div className="animate-stagger-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
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
            </h1>
          </div>

          {/* Two Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '4rem',
            alignItems: 'start',
            marginBottom: '3rem'
          }}>
            {/* Left Column - Description */}
            <div className="animate-stagger-2">
              <h2 style={{
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
              </h2>
              
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

            {/* Right Column - Pricing & Duration */}
            <div className="animate-stagger-3">
              <h2 style={{
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
              </h2>
              
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

          <div className="animate-stagger-4" style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <button
              className="btn"
              onClick={handleProceedToJoin}
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
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
      </div>
    </section>
  );
};

export default ProgramDetails;
