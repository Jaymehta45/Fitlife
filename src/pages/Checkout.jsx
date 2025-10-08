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
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#000000',
            backgroundColor: '#fff',
            padding: '0.4em 0.8em',
            display: 'inline-block',
            borderRadius: '0.3rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            border: '2px solid #000',
            marginBottom: '2rem',
            lineHeight: 1.05,
          }}
        >
          Checkout for {slug}
        </h1>
        
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#000000',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}
        >
          Auth gating to be implemented. This is a placeholder for the checkout process.
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
              fontSize: '1.1rem',
              padding: '1rem 2rem'
            }}
          >
            Back to Program Details
          </button>
          
          <button
            className="btn"
            onClick={() => navigate('/')}
            style={{
              fontSize: '1.1rem',
              padding: '1rem 2rem',
              background: '#ffffff',
              color: '#000000',
              border: '2px solid #000000'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
