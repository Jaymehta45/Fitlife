/**
 * ==========================================================================
 * Checkout.jsx - Checkout Page (Simplified for Testing)
 * ==========================================================================
 * 
 * This page handles:
 * 1. Cart items display
 * 2. Simplified payment flow (direct to success page)
 * 3. Redirect to success page with animation
 * 4. Clears cart after "payment"
 * 
 * ROUTING: /checkout
 * 
 * NOTE: This is a simplified flow for testing the success animation.
 * To add real Razorpay integration, see the commented code in history.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../index.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  // Handle payment initiation - SIMPLIFIED FOR TESTING
  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart
      clearCart();
      // Redirect to success page
      navigate('/payment-success');
      setLoading(false);
    }, 500); // Small delay for realism
  };

  if (cart.length === 0) {
    return null; // Will redirect to cart
  }

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
            textAlign: 'center'
          }}
        >
          CHECKOUT
        </h1>

        {/* Cart Items Summary */}
        <div style={{ marginBottom: '2rem' }}>
          {cart.map((item) => (
            <div
              key={item.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                border: '2px solid #000000',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                background: '#ffffff'
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#000000',
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <div style={{
                  fontSize: '1rem',
                  color: '#000000',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Quantity: {item.quantity}
                </div>
              </div>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: '#000000',
                fontFamily: 'Arial Black, Arial, sans-serif'
              }}>
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: '#000000',
          fontFamily: 'Arial Black, Arial, sans-serif',
          textAlign: 'center',
          padding: '1rem',
          border: '3px solid #000000',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
          background: '#f0f0f0'
        }}>
          Total: {formatPrice(getCartTotal())}
        </div>

        {/* Pay Now Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'Arial Black, Arial, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '1.5rem 4rem',
              background: loading ? '#666666' : '#000000',
              color: '#ffffff',
              border: '3px solid #000000',
              borderRadius: '0',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#ffffff';
                e.target.style.color = '#000000';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = '#000000';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'Processing...' : 'PAY NOW'}
          </button>
        </div>

        {/* Back to Cart Button */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/cart')}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '0.8rem 2rem',
              background: 'transparent',
              color: '#000000',
              border: '2px solid #000000',
              borderRadius: '0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;