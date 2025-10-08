/**
 * ==========================================================================
 * Programs.js - Programs Section Component
 * ==========================================================================
 * 
 * This component displays a grid of program cards with:
 * 1. Program information (title, description, icon)
 * 2. Navigation links to program details and checkout
 * 3. Hover effects and animations
 * 4. Responsive grid layout
 * 
 * PROGRAM STRUCTURE:
 * - Each program has: title, description, icon, slug
 * - "View Details" links to /programs/:slug
 * - "Join Now" links to /checkout/:slug
 * 
 * TO MODIFY PROGRAMS:
 * - Add/remove items in the programs array
 * - Change titles, descriptions, icons, or slugs
 * - Modify the routing behavior in the Link components
 */

import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// ==========================================================================
// PROGRAMS DATA CONFIGURATION
// ==========================================================================
// Define all available programs with their details
// TO ADD NEW PROGRAMS: Add objects to this array
// TO MODIFY EXISTING: Change the properties of existing objects
const programs = [
  {
    title: 'Strength Training',                                    // Program name
    desc: 'Build muscle and power with science-backed routines.', // Description
    color: 'linear-gradient(90deg, #6d83f2 0%, #a084ee 100%)',   // Gradient (unused in current theme)
    icon: '💪',                                                    // Emoji icon
    slug: 'strength-training',                                    // URL slug for routing
    backgroundImage: 'https://supremepersonaltraining.com/wp-content/uploads/2023/07/weighs-dumbbell-1200x800.jpg', // Background image
  },
  {
    title: 'Cardio Fitness',                                      // Program name
    desc: 'Boost endurance and burn calories with dynamic cardio.', // Description
    color: 'linear-gradient(90deg, #a084ee 0%, #6d83f2 100%)',   // Gradient (unused in current theme)
    icon: '🏃‍♂️',                                                  // Emoji icon
    slug: 'cardio-fitness',                                      // URL slug for routing
    backgroundImage: 'https://media.istockphoto.com/id/1498050355/photo/start-and-finish-point-of-a-race-track-in-a-stadium.jpg?s=612x612&w=0&k=20&c=931T8Gsyixp3pGTZMa5LsyXQpYvCWisWyeSj46hlkCE=', // Background image
  },
  {
    title: 'Weight Loss',                                         // Program name
    desc: 'Personalized plans to help you lose fat and keep it off.', // Description
    color: 'linear-gradient(90deg, #232946 0%, #a084ee 100%)',   // Gradient (unused in current theme)
    icon: '🔥',                                                    // Emoji icon
    slug: 'weight-loss',                                          // URL slug for routing
    backgroundImage: 'https://images.stockcake.com/public/6/a/9/6a92ba1b-64d2-4117-a57e-8393e5c89024_medium/dewy-fruit-contrast-stockcake.jpg', // Background image
  },
];

const Programs = React.memo(() => {
  // ==========================================================================
  // STATE AND REFS
  // ==========================================================================
  const cardsRef = useRef([]); // Array of refs for each program card
  // ==========================================================================
  // FIXED OVERLAY OPACITY
  // ==========================================================================
  // Fixed overlay opacity for background images (0 = fully transparent, 1 = fully opaque)
  // TO CHANGE: Modify this value between 0 and 1
  const overlayOpacity = 0.4; // 85% opacity - good balance between background visibility and text readability

  // ==========================================================================
  // SPOTLIGHT EFFECT REMOVED
  // ==========================================================================
  // Spotlight effect has been removed for cleaner hover interactions

  return (
    <section
      id="programs"
      style={{
        // ==========================================================================
        // SECTION LAYOUT
        // ==========================================================================
        width: '100vw',                    // Full viewport width
        marginLeft: 'calc(50% - 50vw)',    // Full-bleed background
        background: '#000000',             // Black background
        minHeight: '85vh',                 // Minimum height (85% of viewport)
        padding: '4rem clamp(2rem, 6vw, 8rem)', // Responsive padding
        boxSizing: 'border-box',          // Include padding in width calculation
        scrollMarginTop: '120px',          // Offset for fixed navbar
      }}
    >
      {/* ==========================================================================
          CONTENT CONTAINER
          ========================================================================== */}
      <div
        style={{
          width: '100%',                   // Full width
          maxWidth: 1400,                 // Maximum width
          margin: '0 auto',               // Center horizontally
          boxSizing: 'border-box',       // Include padding in width calculation
        }}
      >
            {/* SECTION TITLE */}
            <h2
              className="animate-stagger-1"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', // Responsive font size
                fontWeight: 800,                          // Bold weight
                marginBottom: '2.5rem',                   // Bottom margin
                color: '#000000',                         // Black text
                textAlign: 'center',                     // Center alignment
              }}
            >
              <span className="text-gradient">Our Programs</span>
            </h2>


        {/* ==========================================================================
            PROGRAMS GRID
            ========================================================================== */}
        <div
          style={{
            display: 'grid',                                    // CSS Grid layout
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // Responsive columns
            gap: '2.2rem',                                      // Space between cards
            justifyContent: 'center',                           // Center the grid
          }}
        >
          {/* PROGRAM CARDS */}
          {/* Render each program as a card with navigation links */}
          {programs.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`program-card-hover animate-stagger-${i + 2}`}
              style={{
                // CARD LAYOUT
                minHeight: 550,                    // Minimum card height
                display: 'flex',                   // Flexbox layout
                flexDirection: 'column',           // Vertical layout
                justifyContent: 'space-between',  // Space out content
                
                // CARD STYLING
                borderRadius: '1.5rem',           // Rounded corners
                padding: '2rem',                  // Internal spacing
                background: `url(${p.backgroundImage})`, // Background image without overlay
                backgroundSize: 'cover',          // Cover entire card
                backgroundPosition: 'center',     // Center the background image
                backgroundRepeat: 'no-repeat',    // Don't repeat the image
                border: '1px solid #ffffff',      // White border
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)', // Subtle shadow
                position: 'relative',             // For overlay positioning
                overflow: 'hidden',               // Hide overflow for clean edges
                
                // HOVER EFFECTS
                transition: 'all 0.3s ease',     // Smooth transitions
                cursor: 'pointer',                // Pointer cursor
                transform: 'scale(1)',            // Default scale
                ':hover': {
                  transform: 'scale(1.05)',       // Scale up on hover
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)', // Enhanced shadow
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
              }}
            >
              {/* PROGRAM ICON - REMOVED */}
              
               {/* PROGRAM TITLE */}
               <div
                 style={{
                   fontWeight: 900,                // Extra bold weight
                   fontSize: '1.4rem',            // Smaller text
                   color: '#ffffff',              // White text
                   marginBottom: '0.7rem',        // Bottom margin
                   backgroundColor: 'rgba(0,0,0,0.85)', // More opaque black background
                   padding: '1rem 2rem',          // More generous padding
                   borderRadius: '0.8rem',        // More rounded corners
                   display: 'inline-block',       // Inline block for box effect
                   textAlign: 'center',           // Center the text
                   border: '2px solid #ffffff',   // White border
                   boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Subtle shadow
                   backdropFilter: 'blur(10px)',  // Glass effect
                   WebkitBackdropFilter: 'blur(10px)', // Safari support
                   letterSpacing: '1px',          // Letter spacing for impact
                   textTransform: 'uppercase',     // All caps for emphasis
                 }}
               >
                 {p.title}
               </div>
              
               {/* PROGRAM DESCRIPTION - REMOVED */}
              
              {/* ==========================================================================
                  ACTION BUTTONS
                  ========================================================================== */}
              <div style={{ 
                display: 'flex',                    // Horizontal layout
                gap: '0.8rem',                     // Space between buttons
                flexWrap: 'wrap',                  // Wrap on smaller screens
                justifyContent: 'center'           // Center buttons
              }}>
                {/* VIEW DETAILS BUTTON */}
                {/* Links to individual program details page */}
                <Link
                  to={`/programs/${p.slug}`}        // Route to program details
                  className="btn"                   // Button styling class
                  style={{ 
                    fontSize: '1rem',              // Font size
                    padding: '0.6rem 1.2rem',     // Button padding
                    flex: '1 1 120px',            // Flexible width
                    minWidth: '120px',            // Minimum width
                    textAlign: 'center',          // Center text
                    textDecoration: 'none',       // Remove underline
                    background: '#000000',        // Black background
                    color: '#ffffff',             // White text
                    border: '2px solid #ffffff'  // White border
                  }}
                >
                  View Details
                </Link>
                
                {/* JOIN NOW BUTTON */}
                {/* Links to checkout page for this program */}
                <Link
                  to={`/checkout/${p.slug}`}       // Route to checkout
                  className="btn"                   // Button styling class
                  style={{ 
                    fontSize: '1rem',              // Font size
                    padding: '0.6rem 1.2rem',     // Button padding
                    flex: '1 1 120px',            // Flexible width
                    minWidth: '120px',            // Minimum width
                    textAlign: 'center',          // Center text
                    textDecoration: 'none',       // Remove underline
                    background: '#000000',        // Black background
                    color: '#ffffff',             // White text
                    border: '2px solid #ffffff'  // White border
                  }}
                >
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Programs;