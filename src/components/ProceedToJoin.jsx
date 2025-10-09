/**
 * ==========================================================================
 * ProceedToJoin.jsx - Clerk Sign-Up Modal Component
 * ==========================================================================
 * 
 * This component handles the "Proceed to Join" flow:
 * 1. If user is signed in → navigate directly to checkout
 * 2. If user is signed out → open Clerk SignUp modal
 * 3. After successful signup → redirect to /checkout/{programSlug}
 * 
 * TO MODIFY:
 * - Change redirectUrl pattern in SignUpButton
 * - Modify modal mode (modal vs redirect)
 * - Update button styling
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpButton, useAuth } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import { showToast } from './Toast';
import '../index.css';

const ProceedToJoin = ({ programSlug, programData }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { addItem, getCartItemCount } = useCart();

  // ==========================================================================
  // SIGNED-IN USER FLOW
  // ==========================================================================
  // If user is already signed in, add to cart and navigate to cart
  const handleSignedInClick = () => {
    if (programData) {
      // Add item to cart
      addItem({
        slug: programData.slug,
        title: programData.title,
        price: programData.price,
        quantity: 1
      });
      
      // Show toast notification with correct count
      setTimeout(() => {
        const itemCount = getCartItemCount();
        showToast(`${itemCount} item${itemCount > 1 ? 's' : ''} in cart`);
      }, 100); // Small delay to ensure cart is updated
      
      // Navigate to cart
      navigate('/cart');
    }
  };

  // ==========================================================================
  // SIGN-UP SUCCESS HANDLER - REMOVED
  // ==========================================================================
  // The automatic sign-up handling has been removed to prevent multiple cart additions
  // Instead, we'll handle this through the SignUpButton's redirectUrl

  // ==========================================================================
  // BUTTON STYLING
  // ==========================================================================
  const buttonStyle = {
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
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer'
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = '#ffffff';
    e.target.style.color = '#000000';
    e.target.style.border = '2px solid #000000';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = '#000000';
    e.target.style.color = '#ffffff';
    e.target.style.border = '2px solid #000000';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  };

  // ==========================================================================
  // RENDER LOGIC
  // ==========================================================================
  if (isSignedIn) {
    // User is signed in - direct navigation to checkout
    return (
      <button
        className="btn"
        onClick={handleSignedInClick}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        PROCEED TO CHECKOUT
      </button>
    );
  }

  // User is signed out - show SignUp modal
  return (
    <SignUpButton 
      mode="modal"
    >
      <button
        className="btn"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          // Store the program data in localStorage before sign-up
          if (programData) {
            localStorage.setItem('pendingProgram', JSON.stringify({
              slug: programData.slug,
              title: programData.title,
              price: programData.price
            }));
          }
        }}
      >
        PROCEED TO CHECKOUT
      </button>
    </SignUpButton>
  );
};

export default ProceedToJoin;
