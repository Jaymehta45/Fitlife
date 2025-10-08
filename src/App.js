/**
 * ==========================================================================
 * App.js - Main Application Component
 * ==========================================================================
 * 
 * This is the root component that sets up:
 * 1. React Router for navigation between pages
 * 2. Global color inversion (black/white theme)
 * 3. Scroll-triggered animations for sections
 * 4. Route definitions for all pages
 * 
 * ROUTING STRUCTURE:
 * - "/" (Home): Shows About, Programs, Testimonials, Contact sections
 * - "/programs/:slug": Individual program details page
 * - "/checkout/:slug": Checkout page for specific program
 * 
 * TO MODIFY ROUTES: Add new <Route> components inside <Routes>
 * TO CHANGE THEME: Modify the 'invert-colors' class in useEffect
 * TO ADD ANIMATIONS: Modify the IntersectionObserver logic
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

// Component imports - all main sections and pages
import Navbar from './components/Navbar';           // Fixed navigation bar
import About from './components/About';               // Home section with profile
import Programs from './components/Programs';        // Program cards grid
import Testimonials from './components/Testimonials'; // Client testimonials carousel
import Contact from './components/Contact';          // Contact form
import Footer from './components/Footer';            // Site footer
import AllPrograms from './pages/AllPrograms.jsx';   // All programs page
import ProgramDetails from './pages/ProgramDetails'; // Individual program page
import Checkout from './pages/Checkout';             // Checkout placeholder

function AuthTest() {
  return (
    <div style={{ textAlign: "center", margin: "1rem 0" }}>
      <SignedOut>
        <SignInButton>
          <button style={{ padding: "0.8rem 1.25rem", fontWeight: 800, borderRadius: 8 }}>Sign In</button>
        </SignInButton>
        <SignUpButton>
          <button style={{ marginLeft: 12, padding: "0.8rem 1.25rem", fontWeight: 800, borderRadius: 8 }}>Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

function App() {
  // ==========================================================================
  // THEME SETUP
  // ==========================================================================
  // NOTE: Global inversion removed - each component now has individual black and white styling

  // ==========================================================================
  // PAGE RELOAD HANDLING
  // ==========================================================================
  // This ensures users always start at the home page when reloading
  // TO DISABLE: Remove this useEffect
  useEffect(() => {
    // Check if the current path is not the home page
    if (window.location.pathname !== '/') {
      // Redirect to home page
      window.location.href = '/';
    }
  }, []);

  // ==========================================================================
  // SCROLL-TRIGGERED ANIMATIONS (OPTIMIZED)
  // ==========================================================================
  // This sets up smooth animations when sections come into view
  // TO MODIFY ANIMATIONS: Change threshold value (0.15 = 15% visible)
  // TO ADD MORE ANIMATIONS: Modify the CSS classes in index.css
  useEffect(() => {
    // Find all section elements on the page
    const sections = document.querySelectorAll('section');
    
    // Create intersection observer to detect when sections are visible
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add 'visible' class when section comes into view
            entry.target.classList.add('visible');
          } else {
            // Remove 'visible' class when section goes out of view
            entry.target.classList.remove('visible');
          }
        });
      },
      { 
        threshold: 0.15, // Trigger when 15% of section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before section is fully visible
      }
    );
    
    // Set up each section for animation
    sections.forEach(section => {
      section.classList.add('section-animate'); // Base animation class
      observer.observe(section);                // Start watching this section
    });
    
    // Cleanup: stop observing when component unmounts
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // ==========================================================================
  // ROUTER SETUP
  // ==========================================================================
  // This defines all the routes in the application
  // TO ADD NEW PAGES: Add new <Route> components here
  // TO CHANGE HOME PAGE: Modify the element prop of the "/" route
  return (
    <Router>
      {/* Fixed navigation bar - appears on all pages */}
      <Navbar />
      
      {/* Main content area - changes based on current route */}
      <main>
        {/* Test Auth UI - visible for testing */}
        <AuthTest />
        
        <Routes>
          {/* HOME PAGE ROUTE */}
          {/* This is the main landing page with all sections */}
          <Route path="/" element={
            <>
              <About />        {/* Profile and introduction section */}
              <Programs />     {/* Program cards grid */}
              <Testimonials /> {/* Client testimonials carousel */}
              <Contact />      {/* Contact form */}
            </>
          } />
          
          {/* ALL PROGRAMS ROUTE */}
          {/* Shows all available programs */}
          <Route path="/programs" element={<AllPrograms />} />
          
          {/* PROGRAM DETAILS ROUTE */}
          {/* Shows individual program information */}
          {/* :slug is a URL parameter (e.g., /programs/strength-training) */}
          <Route path="/programs/:slug" element={<ProgramDetails />} />
          
          {/* CHECKOUT ROUTE */}
          {/* Placeholder for payment/checkout process */}
          {/* :slug identifies which program is being purchased */}
          <Route path="/checkout/:slug" element={<Checkout />} />
          
          {/* CATCH-ALL ROUTE - REDIRECT TO HOME */}
          {/* Any unmatched routes will redirect to the home page */}
          {/* This ensures users always land on the home page when reloading */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
