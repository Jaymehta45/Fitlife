/**
 * ==========================================================================
 * UserNav.jsx - Improved User Navigation with Clerk Authentication
 * ==========================================================================
 * 
 * This component provides:
 * 1. Clean avatar button with Lucide User icon
 * 2. Dropdown with Sign In/Sign Up options when signed out
 * 3. Cart icon (only visible when user is signed in)
 * 4. Clerk authentication integration
 * 5. Fixed positioning in top-right corner
 * 
 * TO MODIFY:
 * - Change avatar size: modify width/height in avatarStyle
 * - Change cart icon size: modify size prop in ShoppingCart component
 * - Change positioning: modify top/right values in containerStyle
 * - Change dropdown styling: modify dropdownStyle
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, useClerk } from '@clerk/clerk-react';
import { User, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../index.css';

const UserNav = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { getCartItemCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Authentication state managed by Clerk

  // ==========================================================================
  // CLICK OUTSIDE HANDLER
  // ==========================================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // ==========================================================================
  // STYLING CONFIGURATION
  // ==========================================================================
  // TO CHANGE SIZES: Modify these values
  const avatarSize = 40; // Avatar diameter in pixels
  const cartIconSize = 24; // Cart icon size
  const spacing = 12; // Space between avatar and cart icon

  const containerStyle = {
    // POSITIONING - MATCH NAVBAR STYLE
    position: 'fixed',           // Stays at top of screen
    top: 'max(1rem, env(safe-area-inset-top))', // Same as navbar
    right: '1rem',               // Position on right side
    zIndex: 100,                 // Same as navbar
    
    // LAYOUT
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing}px`,
    
    // STYLING - MATCH NAVBAR DESIGN
    background: '#000000',       // Black background like navbar
    backdropFilter: 'blur(10px)', // Glass effect like navbar
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    border: '2px solid #ffffff', // White border like navbar
    boxShadow: '0 10px 30px rgba(255,255,255,0.12)', // Same shadow as navbar
    borderRadius: 9999,          // Pill shape like navbar
    padding: '10px 16px',        // Same padding as navbar
    
    // INTERACTION
    pointerEvents: 'auto'
  };

  const avatarStyle = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
    borderRadius: '50%',
    backgroundColor: '#ffffff', // White background to match navbar theme
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    border: '2px solid #ffffff' // White border to match navbar theme
  };

  const cartIconStyle = {
    width: `${cartIconSize}px`,
    height: `${cartIconSize}px`,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    color: '#ffffff' // White color to match navbar theme
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '0.5rem 0',
    minWidth: '150px',
    zIndex: 1001
  };

  const dropdownButtonStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#000000',
    transition: 'background-color 0.2s ease',
    fontFamily: 'Arial, sans-serif'
  };

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================
  const handleCartClick = () => {
    if (isSignedIn) {
      navigate('/cart');
    }
  };

  const handleSignOut = () => {
    signOut();
    setDropdownOpen(false);
  };

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAvatarMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
    setDropdownOpen(true);
  };

  const handleAvatarMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    // Don't close dropdown immediately to allow user to move to dropdown
  };

  const handleCartMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleCartMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleDropdownButtonMouseEnter = (e) => {
    e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
  };

  const handleDropdownButtonMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  return (
    <div style={containerStyle}>
      {/* USER AVATAR SECTION */}
      <div 
        style={{ position: 'relative' }} 
        ref={dropdownRef}
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <SignedIn>
          {/* USER AVATAR - BLACK AND WHITE DESIGN */}
          <div
            onClick={handleAvatarClick}
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
            style={avatarStyle}
            aria-label="User account"
            title="User Account"
          >
            <User size={24} strokeWidth={2.2} color="#000000" />
          </div>

          {/* USER DROPDOWN - SHOWS WHEN SIGNED IN */}
          {dropdownOpen && (
            <div style={dropdownStyle}>
              <button
                onClick={() => navigate('/cart')}
                style={dropdownButtonStyle}
                onMouseEnter={handleDropdownButtonMouseEnter}
                onMouseLeave={handleDropdownButtonMouseLeave}
              >
                View Cart
              </button>
              
              {/* HORIZONTAL SEPARATOR LINE */}
              <div style={{
                width: '100%',
                height: '2px',
                background: '#000000',
                margin: '0.5rem 0'
              }}></div>
              
              <button
                onClick={handleSignOut}
                style={dropdownButtonStyle}
                onMouseEnter={handleDropdownButtonMouseEnter}
                onMouseLeave={handleDropdownButtonMouseLeave}
              >
                Sign Out
              </button>
            </div>
          )}
        </SignedIn>
        
        <SignedOut>
          {/* AVATAR BUTTON WITH DROPDOWN - SHOWS WHEN SIGNED OUT */}
          <div
            onClick={handleAvatarClick}
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
            style={avatarStyle}
            aria-label="User menu"
            title="User Menu"
          >
            <User size={24} strokeWidth={2.2} color="#111" />
          </div>

          {/* DROPDOWN MENU - ONLY VISIBLE WHEN SIGNED OUT */}
          {dropdownOpen && (
            <div style={dropdownStyle}>
              <SignInButton mode="modal">
                <button
                  style={dropdownButtonStyle}
                  onMouseEnter={handleDropdownButtonMouseEnter}
                  onMouseLeave={handleDropdownButtonMouseLeave}
                >
                  Sign In
                </button>
              </SignInButton>
              
              {/* HORIZONTAL SEPARATOR LINE */}
              <div style={{
                width: '100%',
                height: '2px',
                background: '#000000',
                margin: '0.5rem 0'
              }}></div>
              
              <SignUpButton mode="modal">
                <button
                  style={dropdownButtonStyle}
                  onMouseEnter={handleDropdownButtonMouseEnter}
                  onMouseLeave={handleDropdownButtonMouseLeave}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </SignedOut>
      </div>

      {/* CART ICON SECTION - ONLY VISIBLE WHEN SIGNED IN */}
      <SignedIn>
        <div
          onClick={handleCartClick}
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
          style={{
            ...cartIconStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${cartIconSize + 8}px`,
            height: `${cartIconSize + 8}px`,
            borderRadius: '50%',
            backgroundColor: '#ffffff', // White background to match navbar theme
            border: '2px solid #ffffff', // White border to match navbar theme
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            position: 'relative' // For cart badge positioning
          }}
          aria-label="View shopping cart"
          title="View Cart"
        >
          <ShoppingCart size={cartIconSize} strokeWidth={2.2} color="#000000" />
          
          {/* CART BADGE - SHOWS ITEM COUNT */}
          {getCartItemCount() > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#000000',
                color: '#ffffff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'Arial, sans-serif',
                border: '2px solid #ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                minWidth: '20px',
                padding: '0 2px'
              }}
            >
              {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
            </div>
          )}
        </div>
      </SignedIn>
    </div>
  );
};

export default UserNav;
