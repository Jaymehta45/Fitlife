/**
 * ==========================================================================
 * Navbar.js - Navigation Component
 * ==========================================================================
 * 
 * This component provides:
 * 1. Fixed floating navigation bar
 * 2. Smart navigation that works on all pages
 * 3. Active section highlighting
 * 4. Smooth scrolling to sections
 * 
 * NAVIGATION LOGIC:
 * - On home page: Scrolls to sections
 * - On other pages: Navigates to home + scrolls to section
 * - Active state updates based on scroll position
 * 
 * TO MODIFY NAVIGATION:
 * - Add/remove items in navLinks array
 * - Change sectionId to match your section IDs
 * - Modify handleNavClick for different behavior
 */

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

// ==========================================================================
// NAVIGATION CONFIGURATION
// ==========================================================================
// Define all navigation links and their target sections
// TO ADD NEW LINKS: Add objects to this array
// TO CHANGE SECTIONS: Modify the sectionId values
const navLinks = [
  { label: 'Home', href: '/', sectionId: 'about' },        // Points to About section
  { label: 'Programs', href: '/', sectionId: 'programs' }, // Points to Programs section
  { label: 'Testimonials', href: '/', sectionId: 'testimonials' }, // Points to Testimonials section
  { label: 'Contact', href: '/', sectionId: 'contact' },   // Points to Contact section
];

const Navbar = () => {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const [active, setActive] = useState('about');     // Currently active section
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 }); // Animation blob position
  const navRef = useRef();                          // Reference to navigation element
  const location = useLocation();                   // Current page location
  const navigate = useNavigate();                   // Navigation function

  // ==========================================================================
  // SCROLL-BASED ACTIVE SECTION DETECTION
  // ==========================================================================
  // This only works on the home page to highlight which section is currently visible
  // TO MODIFY: Change the sectionIds array to match your sections
  // TO DISABLE: Remove this useEffect entirely
  useEffect(() => {
    // Only handle scroll-based active state on home page
    if (location.pathname !== '/') {
      return;
    }

    // Define all sections that should be tracked
    const sectionIds = ['about', 'programs', 'testimonials', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));
    
    const handleScroll = () => {
      let current = 'about'; // Default to first section
      
      // Check which section is currently in the viewport
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // Section is active if it's within 80px of the top of viewport
          if (rect.top <= 80 && rect.bottom > 80) {
            current = sectionIds[i];
            break;
          }
        }
      }
      setActive(current);
    };
    
    // Set up scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // ==========================================================================
  // NAVIGATION CLICK HANDLER
  // ==========================================================================
  // Handles navigation clicks with smart routing
  // TO MODIFY BEHAVIOR: Change the logic inside this function
  const handleNavClick = (link) => {
    if (location.pathname === '/') {
      // ON HOME PAGE: Just scroll to the section
      const element = document.getElementById(link.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // ON OTHER PAGES: Navigate to home first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page has loaded
    }
  };

  // ==========================================================================
  // ANIMATED BLOB EFFECT
  // ==========================================================================
  // Creates a smooth animated background blob that follows the active link
  // TO DISABLE: Remove this useEffect entirely
  // TO MODIFY: Change the blob styling in the span element below
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('.nav-link.active');
    if (activeLink) {
      // Calculate position and size of the active link
      const { left, width } = activeLink.getBoundingClientRect();
      const navLeft = navRef.current.getBoundingClientRect().left;
      setBlobStyle({ left: left - navLeft, width });
    }
  }, [active]);

  // ==========================================================================
  // NAVBAR RENDER
  // ==========================================================================
  return (
    <nav
      className="navbar"
      style={{
        // FIXED POSITIONING
        position: 'fixed',           // Stays at top of screen
        top: 20,                     // Distance from top
        left: '50%',                 // Center horizontally
        transform: 'translateX(-50%)', // Perfect centering
        zIndex: 100,                 // Above other content
        
        // VISUAL STYLING
        background: '#ffffff',       // White background
        backdropFilter: 'blur(10px)', // Glass effect
        WebkitBackdropFilter: 'blur(10px)', // Safari support
        border: '2px solid #000000', // Black border
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)', // Subtle shadow
        borderRadius: 9999,          // Pill shape
        padding: '14px 22px',        // Internal spacing
        
        // INTERACTION
        pointerEvents: 'none'        // Allow clicks to pass through to children
      }}
    >
      {/* NAVIGATION CONTAINER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
        {/* NAVIGATION LINKS CONTAINER */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ul ref={navRef} style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative', alignItems: 'center' }}>
            
            {/* ANIMATED BACKGROUND BLOB */}
            {/* This creates the smooth animated background effect */}
            <span
              className="gooey-blob"
              style={{
                position: 'absolute',
                top: '50%',
                left: blobStyle.left,        // Position from state
                width: blobStyle.width,     // Width from state
                height: 44,                  // Fixed height
                background: 'linear-gradient(90deg, #181a22 0%, #232946 100%)', // Gradient
                borderRadius: 22,           // Rounded corners
                filter: 'blur(10px) saturate(2)', // Blur and saturation
                opacity: 0,                 // Hidden by default
                transform: 'translateY(-50%)', // Center vertically
                transition: 'left 0.35s cubic-bezier(0.23, 1, 0.32, 1), width 0.35s cubic-bezier(0.23, 1, 0.32, 1)', // Smooth animation
                zIndex: 0,                   // Behind text
                pointerEvents: 'none',      // Don't interfere with clicks
              }}
            />
            {/* NAVIGATION LINKS */}
            {/* Render each navigation link with active state and animations */}
            {navLinks.map(link => {
              const isActive = active === link.sectionId;
              return (
                <li key={link.href} style={{ position: 'relative', zIndex: 1 }}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className={isActive ? 'nav-link active' : 'nav-link'}
                    style={{
                      // TEXT STYLING
                      color: '#000000',           // Black text
                      fontWeight: 900,           // Bold weight
                      fontSize: '1.15rem',       // Large text
                      letterSpacing: '-0.5px',    // Tighter spacing
                      transition: 'color 0.2s',  // Smooth color changes
                      padding: '0.35rem 0.1rem',  // Internal spacing
                      position: 'relative',       // For absolute positioned underline
                      
                      // BUTTON STYLING
                      background: 'none',        // No background
                      border: 'none',            // No border
                      cursor: 'pointer',         // Pointer cursor
                    }}
                  >
                    {link.label}
                    
                    {/* ANIMATED UNDERLINE */}
                    {/* This creates the smooth underline animation */}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -6,              // Position below text
                        height: 3,               // Underline thickness
                        background: '#000000',   // Black underline
                        borderRadius: 2,         // Rounded corners
                        transform: `scaleX(${isActive ? 1 : 0})`, // Scale from 0 to 1
                        transformOrigin: isActive ? 'left center' : 'right center', // Animation direction
                        transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)', // Smooth animation
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 