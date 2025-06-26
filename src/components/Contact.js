import React from 'react';
import '../index.css';

const Contact = () => (
  <section id="contact" style={{ background: 'linear-gradient(135deg, #181c2b 60%, #232946 100%)', borderRadius: '2rem', marginBottom: '2rem' }}>
    <div className="container animate-fadeInUp" style={{ padding: '3rem 0', maxWidth: 700 }}>
      <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff', textAlign: 'center' }}>
        <span className="text-gradient">Contact</span>
      </h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: '#232946', color: '#fff', fontSize: '1rem' }} />
        <input type="email" placeholder="Your Email" style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: '#232946', color: '#fff', fontSize: '1rem' }} />
        <textarea placeholder="Your Message" rows={5} style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: '#232946', color: '#fff', fontSize: '1rem', resize: 'vertical' }} />
        <button type="submit" className="btn" style={{ fontSize: '1rem', width: '100%' }}>Send Message</button>
      </form>
      <div style={{ textAlign: 'center', color: '#a084ee', fontSize: '1.1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>Email: <a href="mailto:shriraj@fitinfluence.com" style={{ color: '#a084ee', textDecoration: 'underline' }}>shriraj@fitinfluence.com</a></div>
        <div>Instagram: <a href="https://instagram.com/fitinfluence" target="_blank" rel="noopener noreferrer" style={{ color: '#a084ee', textDecoration: 'underline' }}>@fitinfluence</a></div>
      </div>
    </div>
  </section>
);

export default Contact; 