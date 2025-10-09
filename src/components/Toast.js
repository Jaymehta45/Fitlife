/**
 * ==========================================================================
 * Toast.js - Notification Toast Component
 * ==========================================================================
 * 
 * This component provides a simple toast notification system:
 * 1. Shows dismissible messages at the top-right of the screen
 * 2. Auto-dismisses after a timeout
 * 3. Supports manual dismissal
 * 4. Matches site's black/white theme
 * 
 * USAGE:
 * import { showToast } from './Toast';
 * showToast('Item added to cart!');
 * 
 * TO MODIFY:
 * - Change position: modify toastStyle positioning
 * - Change timeout: modify defaultTimeoutMs
 * - Change styling: modify toastStyle and animation classes
 */

import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';

// ==========================================================================
// TOAST STATE MANAGEMENT
// ==========================================================================
let toastId = 0;
const toasts = new Map();
const listeners = new Set();

// ==========================================================================
// TOAST STYLES
// ==========================================================================
const toastStyle = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 9999,
  background: '#000000',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: 'Arial, sans-serif',
  letterSpacing: '0.5px',
  maxWidth: '300px',
  wordWrap: 'break-word',
  border: '2px solid #ffffff',
  transform: 'translateX(100%)',
  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  opacity: 0,
  pointerEvents: 'auto',
  cursor: 'pointer'
};

const toastVisibleStyle = {
  ...toastStyle,
  transform: 'translateX(0)',
  opacity: 1
};

// ==========================================================================
// TOAST COMPONENT
// ==========================================================================
const Toast = ({ id, message, timeoutMs, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => {
      onDismiss(id);
    }, 300); // Match CSS transition duration
  }, [id, onDismiss]);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Auto-dismiss after timeout
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, timeoutMs);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [timeoutMs, handleDismiss]);

  return (
    <div
      style={isVisible && !isRemoving ? toastVisibleStyle : toastStyle}
      onClick={handleDismiss}
      onMouseEnter={(e) => {
        e.target.style.background = '#ffffff';
        e.target.style.color = '#000000';
        e.target.style.border = '2px solid #000000';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = '#000000';
        e.target.style.color = '#ffffff';
        e.target.style.border = '2px solid #ffffff';
      }}
    >
      {message}
    </div>
  );
};

// ==========================================================================
// TOAST CONTAINER COMPONENT
// ==========================================================================
const ToastContainer = () => {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    const updateToasts = () => {
      setToastList(Array.from(toasts.values()));
    };

    listeners.add(updateToasts);
    return () => listeners.delete(updateToasts);
  }, []);

  const handleDismiss = (id) => {
    toasts.delete(id);
    listeners.forEach(listener => listener());
  };

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      {toastList.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          timeoutMs={toast.timeoutMs}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
};

// ==========================================================================
// TOAST UTILITY FUNCTIONS
// ==========================================================================

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {number} timeoutMs - Auto-dismiss timeout in milliseconds (default: 2200)
 */
export const showToast = (message, timeoutMs = 2200) => {
  const id = ++toastId;
  toasts.set(id, {
    id,
    message,
    timeoutMs
  });
  
  // Notify all listeners
  listeners.forEach(listener => listener());
  
  return id;
};

/**
 * Dismiss a specific toast by ID
 * @param {number} id - The toast ID to dismiss
 */
export const dismissToast = (id) => {
  toasts.delete(id);
  listeners.forEach(listener => listener());
};

/**
 * Clear all toasts
 */
export const clearAllToasts = () => {
  toasts.clear();
  listeners.forEach(listener => listener());
};

// ==========================================================================
// EXPORTS
// ==========================================================================
export default ToastContainer;
export { Toast };
