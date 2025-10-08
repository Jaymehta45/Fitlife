/**
 * ==========================================================================
 * Checkout.jsx - Checkout Page Placeholder
 * ==========================================================================
 * 
 * This is a placeholder page for the checkout process:
 * 1. Displays the program being checked out
 * 2. Shows placeholder message for payment integration
 * 3. Provides navigation back to program details or home
 * 
 * ROUTING: /checkout/:slug (e.g., /checkout/strength-training)
 * 
 * FUTURE IMPLEMENTATION:
 * - Add payment gateway integration (Razorpay)
 * - Add authentication system (Supabase)
 * - Add form validation and user data collection
 * - Add order confirmation and email notifications
 * 
 * TO MODIFY:
 * - Change the placeholder message
 * - Add payment integration logic
 * - Modify navigation behavior
 * - Add form components for user data
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const Checkout = () => {
  // ==========================================================================
  // ROUTING AND NAVIGATION
  // ==========================================================================
  const { slug } = useParams();    // Get program slug from URL
  const navigate = useNavigate();  // Navigation function

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          boxSizing: 'border-box',
          padding: '0 2rem'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: 'Arial Black, Arial, sans-serif',
            marginBottom: '2rem',
            lineHeight: 1.1,
            textAlign: 'center',
            width: '100%'
          }}
        >
          CHECKOUT
        </h1>
        
        <div
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#000000',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            textAlign: 'center'
          }}
        >
          {slug?.replace('-', ' ').toUpperCase()}
        </div>
        
        <p
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: '3rem',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 3rem auto'
          }}
        >
          Payment integration coming soon. This is a placeholder for the checkout process.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            className="btn"
            onClick={() => navigate(`/programs/${slug}`)}
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'Arial Black, Arial, sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '1.2rem 2.5rem',
              background: '#000000',
              color: '#ffffff',
              border: '3px solid #000000',
              borderRadius: '0',
              transition: 'all 0.3s ease'
            }}
          >
            BACK TO PROGRAM
          </button>
          
          <button
            className="btn"
            onClick={() => navigate('/')}
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'Arial Black, Arial, sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '1.2rem 2.5rem',
              background: '#ffffff',
              color: '#000000',
              border: '3px solid #000000',
              borderRadius: '0',
              transition: 'all 0.3s ease'
            }}
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
