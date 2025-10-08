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
import '../index.css';
import ProfileCard from './ProfileCard';




// ==========================================================================
// BACKGROUND CONFIGURATION
// ==========================================================================
// Background image URL - change this to use a different image
const BG_URL = 'https://www.shutterstock.com/image-photo/within-gym-modern-fitness-equipment-260nw-1471750145.jpg';

const About = () => {
  // ==========================================================================
  // OVERLAY CONFIGURATION
  // ==========================================================================
  // Controls how visible the background image is
  // Higher values = more transparent image (more white overlay)
  // Lower values = more visible image (less white overlay)
  // TO MODIFY: Change this value between 0 (invisible) and 1 (completely white)
  const overlayOpacity = 0.85;

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
        padding: '6rem clamp(1rem, 6vw, 6rem) 8rem', // Responsive padding
        boxSizing: 'border-box',          // Include padding in width calculation
        scrollMarginTop: '160px',          // Offset for fixed navbar
        borderRadius: '0',                 // No border radius
        
        // ==========================================================================
        // BACKGROUND IMAGE WITH OVERLAY
        // ==========================================================================
        // Creates a layered background with white overlay on top of image
        backgroundImage: `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${BG_URL})`,
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
          alignItems: 'center',              // Center vertically
          gap: '2.5rem',                    // Space between columns
          justifyContent: 'space-between',   // Space out columns
          
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
            handle="shrirajfit"                              // Social handle
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
              color: '#0a0a0a',                        // Dark text
              lineHeight: 1.05,                        // Tight line height
              
              // BOXED STYLING
              backgroundColor: '#fff',                 // White background
              padding: '0.4em 0.8em',                 // Internal padding
              display: 'inline-block',                 // Inline block for box effect
              borderRadius: '0.3rem',                  // Rounded corners
              boxShadow: '0 4px 8px rgba(0,0,0,0.12)', // Drop shadow
              border: '2px solid #000',               // Black border
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
              color: '#000000',                         // Black text
              fontWeight: 700,                          // Bold weight
              lineHeight: 1.6,                         // Comfortable line height
              
              // LAYOUT
              marginBottom: '1.5rem',                  // Bottom margin
              maxWidth: 920,                          // Maximum width for readability
            }}
          >
            Shriraj is a certified fitness influencer and coach, dedicated to helping you
            unlock your best self. With a decade of experience, he blends science,
            motivation, and real-world results for every client.
          </p>

          {/* ==========================================================================
              STATISTICS SECTION
              ========================================================================== */}
          <div
            style={{
              // LAYOUT
              display: 'flex',                    // Horizontal layout
              gap: '2.5rem',                     // Space between stats
              marginTop: '1.5rem',              // Top margin
              flexWrap: 'wrap',                 // Wrap on smaller screens
              justifyContent: 'flex-start',     // Align to left
            }}
          >
            {/* STATISTIC 1 - YEARS EXPERIENCE */}
            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)', // Large, responsive number
                  fontWeight: 900,                           // Extra bold
                  color: '#000000',                          // Black text
                }}
              >
                10+
              </div>
              <div
                style={{
                  color: '#000000',                          // Black text
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', // Responsive label
                  fontWeight: 700,                           // Bold label
                }}
              >
                Years Experience
              </div>
            </div>

            {/* STATISTIC 2 - CLIENTS TRANSFORMED */}
            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)', // Large, responsive number
                  fontWeight: 900,                           // Extra bold
                  color: '#000000',                          // Black text
                }}
              >
                1,000+
              </div>
              <div
                style={{
                  color: '#000000',                          // Black text
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', // Responsive label
                  fontWeight: 700,                           // Bold label
                }}
              >
                Clients Transformed
              </div>
            </div>

            {/* STATISTIC 3 - SUCCESS RATE */}
            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)', // Large, responsive number
                  fontWeight: 900,                           // Extra bold
                  color: '#000000',                          // Black text
                }}
              >
                95%
              </div>
              <div
                style={{
                  color: '#000000',                          // Black text
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', // Responsive label
                  fontWeight: 700,                           // Bold label
                }}
              >
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;