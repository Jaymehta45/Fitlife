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
import { useLocation, useNavigate, Link } from 'react-router-dom';
// Clerk imports removed - UserNav handles authentication display
import '../index.css';

// ==========================================================================
// NAVIGATION CONFIGURATION
// ==========================================================================
// Define all navigation links and their target sections
// TO ADD NEW LINKS: Add objects to this array
// TO CHANGE SECTIONS: Modify the sectionId values
const navLinks = [
  { label: 'Home', href: '/', sectionId: 'about' },        // Points to About section
  { 
    label: 'Programs', 
    href: '/programs', 
    sectionId: 'programs',
    dropdown: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Strength Training', href: '/programs/strength-training' },
      { label: 'Cardio Fitness', href: '/programs/cardio-fitness' },
      { label: 'Weight Loss', href: '/programs/weight-loss' }
    ]
  },
  { label: 'Testimonials', href: '/', sectionId: 'testimonials' }, // Points to Testimonials section
  { label: 'Contact', href: '/', sectionId: 'contact' },   // Points to Contact section
];

const Navbar = React.memo(() => {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const [active, setActive] = useState('about');     // Currently active section
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 }); // Animation blob position
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navRef = useRef();                          // Reference to navigation element
  const location = useLocation();                   // Current page location
  const navigate = useNavigate();                   // Navigation function

  // ==========================================================================
  // PAGE-BASED ACTIVE STATE DETECTION
  // ==========================================================================
  // Determine which nav item should be active based on current page
  const getActiveSection = () => {
    const pathname = location.pathname;
    
    // Handle different page routes
    if (pathname === '/') {
      return active; // Use scroll-based active state for home page
    } else if (pathname.startsWith('/programs/')) {
      return 'programs'; // Highlight Programs when on program details page
    } else if (pathname.startsWith('/checkout/')) {
      return 'programs'; // Highlight Programs when on checkout page
    }
    
    return 'about'; // Default fallback
  };

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
    
    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set up scroll listener with throttling
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', throttledScroll);
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
        top: 'max(1rem, env(safe-area-inset-top))', // Move to top of screen
        left: '50%',                 // Center horizontally
        transform: 'translateX(-50%)', // Perfect centering
        zIndex: 100,                 // Above other content
        
        // VISUAL STYLING
        background: '#000000',       // Black background
        backdropFilter: 'blur(10px)', // Glass effect
        WebkitBackdropFilter: 'blur(10px)', // Safari support
        border: '2px solid #ffffff', // White border
        boxShadow: '0 10px 30px rgba(255,255,255,0.12)', // Subtle shadow
        borderRadius: 9999,          // Pill shape
        padding: '10px 16px',        // Reduced internal spacing
        
        // INTERACTION
        pointerEvents: 'none'        // Allow clicks to pass through to children
      }}
    >
          {/* NAVIGATION CONTAINER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', pointerEvents: 'auto' }}>
              {/* USER ACCOUNT CONTROL REMOVED - UserNav handles authentication display */}
        {/* NAVIGATION LINKS CONTAINER */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ul ref={navRef} style={{ display: 'flex', gap: '0.6rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative', alignItems: 'center' }}>
            
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
                background: 'linear-gradient(90deg, #000000 0%, #333333 100%)', // Black and white gradient
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
              const isActive = getActiveSection() === link.sectionId;
              const hasDropdown = link.dropdown;
              
              return (
                <li key={`${link.sectionId}-${link.label}`} style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => hasDropdown && setDropdownOpen(true)}
                    onMouseLeave={() => hasDropdown && setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(link)}
                      className={isActive ? 'nav-link active' : 'nav-link'}
                      style={{
                        // TEXT STYLING
                        color: isActive ? '#000000' : '#ffffff',  // Black text when active, white when inactive
                        fontWeight: 900,           // Bold weight
                        fontSize: '1.15rem',       // Large text
                        letterSpacing: '-0.5px',    // Tighter spacing
                        transition: 'all 0.3s ease',  // Smooth transitions for all properties
                        padding: '0.3rem 0.6rem',  // Further reduced padding for tighter spacing
                        position: 'relative',       // For absolute positioned elements
                        borderRadius: '25px',       // Rounded background
                        
                        // BUTTON STYLING
                        background: isActive ? '#ffffff' : 'transparent',  // White background when active
                        border: isActive ? '2px solid #ffffff' : '2px solid transparent',  // White border when active
                        cursor: 'pointer',         // Pointer cursor
                        boxShadow: isActive ? '0 4px 12px rgba(255,255,255,0.3)' : 'none',  // Shadow when active
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

                    {/* DROPDOWN MENU */}
                    {hasDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#ffffff',
                          borderRadius: '0.5rem',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          border: '1px solid #e0e0e0',
                          minWidth: '200px',
                          opacity: dropdownOpen ? 1 : 0,
                          visibility: dropdownOpen ? 'visible' : 'hidden',
                          transition: 'all 0.3s ease',
                          zIndex: 1000,
                          marginTop: '0.5rem'
                        }}
                      >
                        {link.dropdown.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            style={{
                              display: 'block',
                              padding: '0.8rem 1.2rem',
                              color: '#000000',
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              transition: 'all 0.2s ease',
                              borderBottom: index < link.dropdown.length - 1 ? '1px solid #f0f0f0' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#f8f8f8';
                              e.target.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.color = '#000000';
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar; 