/**
 * ==========================================================================
 * Cart.jsx - Shopping Cart Page
 * ==========================================================================
 * 
 * This page displays:
 * 1. Cart items from localStorage
 * 2. Quantity controls
 * 3. Total calculation
 * 4. Checkout button
 * 
 * TO MODIFY:
 * - Change cart item layout: modify cartItemStyle
 * - Change total display: modify totalStyle
 * - Add/remove cart operations: modify button handlers
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '@clerk/clerk-react';
import { showToast } from '../components/Toast';
import { Trash2 } from 'lucide-react';
import '../index.css';

const Cart = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    getCartTotal, 
    getCartItemCount,
    addItem,
    isLoading 
  } = useCart();
  const hasProcessedSignUp = useRef(false);

  // ==========================================================================
  // SIGN-UP SUCCESS HANDLER
  // ==========================================================================
  // Handle what happens after successful sign-up - only run once
  useEffect(() => {
    if (isSignedIn && !hasProcessedSignUp.current) {
      hasProcessedSignUp.current = true;
      
      // Check if there's a pending program in localStorage
      const pendingProgram = localStorage.getItem('pendingProgram');
      
      if (pendingProgram) {
        try {
          const programData = JSON.parse(pendingProgram);
          
          // Add item to cart after sign-up
          addItem({
            slug: programData.slug,
            title: programData.title,
            price: programData.price,
            quantity: 1
          });
          
          // Show toast notification
          showToast('Welcome! Item added to cart');
          
          // Clear the pending program from localStorage
          localStorage.removeItem('pendingProgram');
        } catch (error) {
          console.warn('Failed to parse pending program:', error);
          localStorage.removeItem('pendingProgram');
        }
      }
    }
  }, [isSignedIn, addItem]);

  // ==========================================================================
  // STYLING CONFIGURATION
  // ==========================================================================
  const pageStyle = {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    background: '#ffffff',
    minHeight: '85vh',
    padding: '4rem clamp(2rem, 6vw, 8rem)',
    boxSizing: 'border-box',
    scrollMarginTop: '120px',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
    padding: '0 2rem'
  };

  const cartItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    border: '2px solid #000000',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    background: '#ffffff'
  };

  const totalStyle = {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: '#000000',
    fontFamily: 'Arial Black, Arial, sans-serif',
    textAlign: 'center',
    marginTop: '2rem',
    padding: '1rem',
    border: '2px solid #000000',
    borderRadius: '0.5rem',
    background: '#f0f0f0'
  };

  // ==========================================================================
  // HANDLERS
  // ==========================================================================
  const handleQuantityChange = (slug, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(slug);
    } else {
      updateQuantity(slug, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  // ==========================================================================
  // LOADING STATE
  // ==========================================================================
  if (isLoading) {
    return (
      <section style={pageStyle}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#000000' }}>
            Loading cart...
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================================
  // EMPTY CART STATE
  // ==========================================================================
  if (cart.length === 0) {
    return (
      <section style={pageStyle}>
        <div style={containerStyle}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: 'Arial Black, Arial, sans-serif',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Your Cart
          </h1>
          
          <div style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#000000',
            marginTop: '3rem'
          }}>
            Your cart is empty. Add some programs to get started!
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => navigate('/programs')}
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'Arial Black, Arial, sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '0.8rem 2rem',
                background: '#000000',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.color = '#000000';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#000000';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Browse Programs
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================================
  // CART WITH ITEMS
  // ==========================================================================
  return (
    <section style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#000000',
          fontFamily: 'Arial Black, Arial, sans-serif',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Your Cart ({getCartItemCount()} items)
        </h1>

        {/* CART ITEMS */}
        {cart.map((item, index) => (
          <div key={item.slug} style={cartItemStyle}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                color: '#000000',
                fontFamily: 'Arial Black, Arial, sans-serif',
                marginBottom: '0.5rem'
              }}>
                {item.title}
              </h3>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#000000',
                fontFamily: 'Arial, sans-serif'
              }}>
                {formatPrice(item.price)} each
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* QUANTITY CONTROLS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleQuantityChange(item.slug, item.quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#000000',
                    color: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#000000',
                  minWidth: '2rem',
                  textAlign: 'center'
                }}>
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.slug, item.quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#000000',
                    color: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: '#000000',
                fontFamily: 'Arial Black, Arial, sans-serif',
                minWidth: '6rem',
                textAlign: 'right'
              }}>
                {formatPrice(item.price * item.quantity)}
              </div>

              {/* DUSTBIN ICON */}
              <button
                onClick={() => removeItem(item.slug)}
                style={{
                  background: 'transparent',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'scale(1)';
                }}
                title="Remove item"
                aria-label="Remove item"
              >
                <Trash2 size={18} color="#000000" />
              </button>
            </div>
          </div>
        ))}

        {/* CART TOTAL */}
        <div style={totalStyle}>
          Total: {formatPrice(getCartTotal())}
        </div>

        {/* CHECKOUT BUTTON */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleCheckout}
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'Arial Black, Arial, sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              background: '#000000',
              color: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.color = '#000000';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#000000';
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Pay Now
          </button>

        </div>
      </div>
    </section>
  );
};

export default Cart;
