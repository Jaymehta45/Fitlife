/**
 * ==========================================================================
 * CartContext.js - Client-Side Cart Management
 * ==========================================================================
 * 
 * This context provides:
 * 1. localStorage-based cart persistence
 * 2. Cart operations (add, remove, clear, get)
 * 3. Automatic cart seeding on sign-up
 * 4. Future server merge hooks
 * 
 * TO MODIFY:
 * - Change localStorage key: modify CART_STORAGE_KEY
 * - Change cart item structure: modify addItem function
 * - Add server sync: implement TODO sections marked with "SERVER SYNC"
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

// ==========================================================================
// CART STORAGE CONFIGURATION
// ==========================================================================
const CART_STORAGE_KEY = 'fitlife_cart';

// ==========================================================================
// CART CONTEXT CREATION
// ==========================================================================
const CartContext = createContext();

// ==========================================================================
// CART PROVIDER COMPONENT
// ==========================================================================
export const CartProvider = ({ children }) => {
  const { isSignedIn, userId } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================================================
  // CART PERSISTENCE FUNCTIONS
  // ==========================================================================
  
  // Load cart from localStorage
  const loadCart = () => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      setCart([]);
    }
  };

  // Save cart to localStorage
  const saveCart = (newCart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  };

  // ==========================================================================
  // CART OPERATIONS
  // ==========================================================================
  
  // Add item to cart
  const addItem = (item) => {
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex(cartItem => 
      cartItem.slug === item.slug
    );

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      newCart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // New item, add to cart
      newCart.push({
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      });
    }

    saveCart(newCart);
    
    // TODO: SERVER SYNC - Send to server when user is signed in
    // if (isSignedIn && userId) {
    //   syncCartToServer(newCart);
    // }
  };

  // Remove item from cart
  const removeItem = (slug) => {
    const newCart = cart.filter(item => item.slug !== slug);
    saveCart(newCart);
    
    // TODO: SERVER SYNC - Update server when user is signed in
    // if (isSignedIn && userId) {
    //   syncCartToServer(newCart);
    // }
  };

  // Update item quantity
  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }

    const newCart = cart.map(item => 
      item.slug === slug ? { ...item, quantity } : item
    );
    saveCart(newCart);
    
    // TODO: SERVER SYNC - Update server when user is signed in
    // if (isSignedIn && userId) {
    //   syncCartToServer(newCart);
    // }
  };

  // Clear entire cart
  const clearCart = () => {
    saveCart([]);
    
    // TODO: SERVER SYNC - Clear server cart when user is signed in
    // if (isSignedIn && userId) {
    //   clearServerCart();
    // }
  };

  // Get cart items
  const getCart = () => cart;

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // ==========================================================================
  // CART SEEDING ON SIGN-UP
  // ==========================================================================
  // When user signs up, seed cart with the program they clicked
  const seedCartWithProgram = (programData) => {
    if (!isSignedIn) return;
    
    // Check if cart is empty or doesn't have this program
    const hasProgram = cart.some(item => item.slug === programData.slug);
    
    if (!hasProgram) {
      addItem({
        slug: programData.slug,
        title: programData.title,
        price: programData.price,
        quantity: 1
      });
    }
  };

  // ==========================================================================
  // EFFECTS
  // ==========================================================================
  
  // Load cart on mount
  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, []);

  // TODO: SERVER SYNC - Load server cart when user signs in
  // useEffect(() => {
  //   if (isSignedIn && userId) {
  //     loadServerCart();
  //   }
  // }, [isSignedIn, userId]);

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================
  const contextValue = {
    // Cart state
    cart,
    isLoading,
    
    // Cart operations
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCart,
    getCartTotal,
    getCartItemCount,
    
    // Special operations
    seedCartWithProgram,
    
    // TODO: SERVER SYNC - Add server operations
    // loadServerCart,
    // syncCartToServer,
    // clearServerCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// ==========================================================================
// CART HOOK
// ==========================================================================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
