/**
 * ==========================================================================
 * PaymentSuccess.jsx - Payment Success Animation Page
 * ==========================================================================
 * 
 * This page displays:
 * 1. Success animation when payment is completed
 * 2. Automatic redirect to external dashboard (https://fitlife-dashboard-eqa4.vercel.app) after 3 seconds
 * 3. Beautiful UI with success message
 * 
 * ROUTING: /payment-success
 * 
 * TO MODIFY:
 * - Change animation: modify the success animation
 * - Change redirect delay: modify timeout value in useEffect
 * - Change redirect destination: modify window.location.href URL
 */

import React, { useEffect } from 'react';
import '../index.css';

const PaymentSuccess = () => {

  // Auto-redirect to external dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://fitlife-dashboard-eqa4.vercel.app';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        marginLeft: 'calc(50% - 50vw)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          animation: 'fadeInUp 0.8s ease-out'
        }}
      >
        {/* Success Icon Container */}
        <div
          style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 3rem auto',
            position: 'relative',
            animation: 'scaleIn 0.5s ease-out'
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              animation: 'ringPulse 2s ease-out infinite'
            }}
          />
          
          {/* Middle Ring */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: 'calc(100% - 20px)',
              height: 'calc(100% - 20px)',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              animation: 'ringPulse 2s ease-out infinite 0.3s'
            }}
          />

          {/* Main Circle */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
              }}
            />
            
            {/* Checkmark SVG */}
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'relative',
                zIndex: 1,
                animation: 'checkmarkDraw 0.6s ease-out 0.3s forwards',
                strokeDasharray: 50,
                strokeDashoffset: 50
              }}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}
        >
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#999999',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            marginBottom: '3rem',
            lineHeight: 1.5
          }}
        >
          Your transaction has been processed
        </p>

        {/* Redirect Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '4rem'
        }}>
          <p
            style={{
              fontSize: '0.95rem',
              color: '#666666',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Redirecting to dashboard
          </p>

          {/* Progress Bar */}
          <div
            style={{
              width: '200px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '2px',
                animation: 'progressBar 3s ease-out forwards'
              }}
            />
          </div>
        </div>
      </div>

      {/* Animations via CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes ringPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }

          @keyframes checkmarkDraw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes progressBar {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default PaymentSuccess;