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

import React, { useRef } from 'react';
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
  },
  {
    title: 'Cardio Fitness',                                      // Program name
    desc: 'Boost endurance and burn calories with dynamic cardio.', // Description
    color: 'linear-gradient(90deg, #a084ee 0%, #6d83f2 100%)',   // Gradient (unused in current theme)
    icon: '🏃‍♂️',                                                  // Emoji icon
    slug: 'cardio-fitness',                                      // URL slug for routing
  },
  {
    title: 'Weight Loss',                                         // Program name
    desc: 'Personalized plans to help you lose fat and keep it off.', // Description
    color: 'linear-gradient(90deg, #232946 0%, #a084ee 100%)',   // Gradient (unused in current theme)
    icon: '🔥',                                                    // Emoji icon
    slug: 'weight-loss',                                          // URL slug for routing
  },
];

const Programs = () => {
  // ==========================================================================
  // STATE AND REFS
  // ==========================================================================
  const cardsRef = useRef([]); // Array of refs for each program card

  // ==========================================================================
  // MOUSE TRACKING FOR SPOTLIGHT EFFECT
  // ==========================================================================
  // This creates a spotlight effect that follows the mouse cursor
  // TO DISABLE: Remove this function and the onMouseMove prop from cards
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (card) {
      // Calculate mouse position relative to the card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set CSS custom properties for the spotlight effect
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section
      id="programs"
      style={{
        // ==========================================================================
        // SECTION LAYOUT
        // ==========================================================================
        width: '100vw',                    // Full viewport width
        marginLeft: 'calc(50% - 50vw)',    // Full-bleed background
        background: '#ffffff',             // White background
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
              className={`program-card-spotlight animate-stagger-${i + 2}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              style={{
                // CARD LAYOUT
                minHeight: 550,                    // Minimum card height
                display: 'flex',                   // Flexbox layout
                flexDirection: 'column',           // Vertical layout
                justifyContent: 'space-between',  // Space out content
                
                // CARD STYLING
                borderRadius: '1.5rem',           // Rounded corners
                padding: '2rem',                  // Internal spacing
                background: '#ffffff',             // White background
                border: '1px solid #000000',      // Black border
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)' // Subtle shadow
              }}
            >
              {/* PROGRAM ICON */}
              <div
                style={{
                  fontSize: '2.8rem',              // Large emoji
                  marginBottom: '1.2rem',          // Bottom margin
                  color: '#000000',               // Black color
                  fontWeight: 900,                // Bold weight
                  lineHeight: 1,                  // Tight line height
                }}
              >
                {p.icon}
              </div>
              
              {/* PROGRAM TITLE */}
              <div
                style={{
                  fontWeight: 700,                // Bold weight
                  fontSize: '1.35rem',           // Large text
                  color: '#000000',              // Black text
                  marginBottom: '0.7rem',        // Bottom margin
                }}
              >
                {p.title}
              </div>
              
              {/* PROGRAM DESCRIPTION */}
              <div
                style={{
                  color: '#000000',              // Black text
                  fontSize: '1.05rem',          // Medium text
                  marginBottom: '1.2rem',       // Bottom margin
                }}
              >
                {p.desc}
              </div>
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
                    textDecoration: 'none'        // Remove underline
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
                    background: '#ffffff',        // White background
                    color: '#000000',             // Black text
                    border: '2px solid #000000'  // Black border
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
};

export default Programs;