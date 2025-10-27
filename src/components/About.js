/**
 * ==========================================================================
 * About.js - Home Section Component
 * ==========================================================================
 * 
 * This is the main landing section that includes:
 * 1. Profile card with coach information
 * 2. Hero text and statistics
 * 3. Background image with overlay
 * 4. Responsive layout for all screen sizes
 * 
 * LAYOUT STRUCTURE:
 * - Left column: ProfileCard component
 * - Right column: Text content and statistics
 * 
 * TO MODIFY:
 * - Change BG_URL to use a different background image
 * - Adjust overlayOpacity to make background more/less visible
 * - Modify statistics in the stats section
 * - Update profile information in ProfileCard props
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ProfileCard from './ProfileCard';


// ==========================================================================
// BACKGROUND CONFIGURATION
// ==========================================================================
// Background image URL - change this to use a different image
const BG_URL = 'https://gymhero.me/active_storage_proxy/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzI3M2I1Ni0xNjZlLTQ4M2MtYWQ0Yi05MzM2MmY0MTg5M2YiLCJ0cmFuc2Zvcm1hdGlvbnMiOnt9fQ.F9C_qRN_eJINDDpj_L8PfbX9nDeJduRbupE2mNpzP50';

const About = () => {
  const navigate = useNavigate();
  
  // ==========================================================================
  // OVERLAY CONFIGURATION
  // ==========================================================================
  // Controls how visible the background image is
  // Higher values = more transparent image (more white overlay)
  // Lower values = more visible image (less white overlay)
  // TO MODIFY: Change this value between 0 (invisible) and 1 (completely white)
  const overlayOpacity = 0.4;

  return (
    <section
      id="about"
      style={{
        // ==========================================================================
        // SECTION LAYOUT
        // ==========================================================================
        width: '100vw',                    // Full viewport width
        marginLeft: 'calc(50% - 50vw)',    // Full-bleed background
        minHeight: '84vh',                 // Minimum height (84% of viewport)
        padding: '4rem clamp(1rem, 6vw, 6rem) 8rem', // Reduced top padding to bring content up
        boxSizing: 'border-box',          // Include padding in width calculation
        scrollMarginTop: '160px',          // Offset for fixed navbar
        borderRadius: '0',                 // No border radius
        
        // ==========================================================================
        // BACKGROUND IMAGE WITH REDUCED OPACITY
        // ==========================================================================
        // Background image with subtle overlay to reduce opacity
        backgroundImage: `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url(${BG_URL})`,
        backgroundRepeat: 'no-repeat',     // Don't repeat image
        backgroundPosition: 'center center', // Center the image
        backgroundSize: 'cover',           // Cover entire section
        backgroundAttachment: 'fixed',     // Parallax effect (image stays fixed while scrolling)
      }}
    >
      {/* ==========================================================================
          MAIN CONTENT CONTAINER
          ========================================================================== */}
      <div
        className="container"
        style={{
          // FLEXBOX LAYOUT
          display: 'flex',                    // Horizontal layout
          flexWrap: 'nowrap',                // Don't wrap on smaller screens
          alignItems: 'center',          // Align to top instead of center
          gap: '2.5rem',                    // Space between columns
          justifyContent: 'space-between',   // Space out columns
          paddingTop: '0rem',               // Add top padding to bring content up
          
          // CONTAINER SIZING
          width: '100%',                    // Full width
          maxWidth: 1400,                   // Maximum width
          margin: '0 auto',                 // Center horizontally
          padding: 0,                       // No internal padding
          boxSizing: 'border-box',         // Include padding in width
        }}
      >
        {/* ==========================================================================
            LEFT COLUMN - PROFILE CARD
            ========================================================================== */}
        <div 
          className="animate-stagger-1" 
          style={{ 
            flex: '0 0 clamp(260px, 24vw, 420px)', // Fixed width, responsive
            minWidth: 260 
          }}
        >
          <ProfileCard
            name="Shriraj"                                    // Coach name
            title="Fitness Expert & Coach"                   // Job title
            handle="shrirajmahidhar_45"                              // Social handle
            status=""                                        // Status text (empty)
            contactText="Contact Me"                         // Contact button text
            avatarUrl="https://i.ibb.co/SXc6H7gC/PHOTOg-2025-06-26-09-36-17-2.jpg"  // Main profile image
            miniAvatarUrl="https://i.ibb.co/SXc6H7gC/PHOTOg-2025-06-26-09-36-17-2.jpg" // Mini profile image
            showUserInfo={true}                              // Show user info section
            enableTilt={true}                               // Enable 3D tilt effect
            onContactClick={() => (window.location.href = '#contact')} // Contact click handler
          />
        </div>

        {/* ==========================================================================
            RIGHT COLUMN - TEXT CONTENT
            ========================================================================== */}
        <div 
          className="animate-stagger-2" 
          style={{ 
            flex: '1 1 520px',           // Flexible width, minimum 520px
            minWidth: 300,               // Minimum width for mobile
            paddingLeft: '1rem'          // Left padding for spacing
          }}
        >
          {/* MAIN HEADING */}
          <h2
            style={{
              // TYPOGRAPHY
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', // Responsive font size
              fontWeight: 900,                         // Extra bold
              letterSpacing: '1px',                   // Letter spacing
              textTransform: 'uppercase',              // All caps
              color: '#ffffff',                        // White text
              lineHeight: 1.05,                        // Tight line height
              textAlign: 'center',                    // Center text
              marginBottom: '1.2rem',                  // Bottom margin
            }}
          >
            Shriraj Mahidhar
          </h2>

          {/* DESCRIPTION PARAGRAPH */}
          <p
            style={{
              // TYPOGRAPHY
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', // Responsive font size
              color: '#ffffff',                         // White text
              fontWeight: 700,                          // Bold weight
              lineHeight: 1.6,                         // Comfortable line height
              
              // LAYOUT
              marginBottom: '2rem',                    // Bottom margin
              maxWidth: 920,                          // Maximum width for readability
            }}
          >
            Certified fitness coach with a decade of experience. Helping you unlock your best self through science, motivation, and real-world results.
          </p>

          {/* JOIN NOW BUTTON */}
          <div style={{ 
            marginBottom: '2rem', 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%'
          }}>
                <button
                  onClick={() => navigate('/programs')}
              style={{
                // BUTTON STYLING - SMALLER SIZE
                fontSize: '1.3rem',
                fontWeight: 700,
                fontFamily: 'Arial Black, Arial, sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '1.2rem 3rem',
                background: '#000000',
                color: '#ffffff',
                border: '3px solid #ffffff',
                borderRadius: '0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(255,255,255,0.2)',
                
                // HOVER EFFECTS
                ':hover': {
                  background: '#ffffff',
                  color: '#000000',
                  border: '3px solid #ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(255,255,255,0.3)'
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.color = '#000000';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 12px rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000000';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 8px rgba(255,255,255,0.2)';
              }}
            >
              JOIN NOW
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;