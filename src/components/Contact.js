import React from 'react';
import '../index.css';

const Contact = () => (
  <section
    id="contact"
    /* ⚙️ Full-Width Section Fix — removes side gaps, fills entire viewport width */
    style={{
      width: '100vw',                            // fill full viewport width
      marginLeft: 'calc(50% - 50vw)',            // align perfectly with screen edges
      background: '#000000',
      minHeight: '85vh',
      padding: '4rem clamp(2rem, 6vw, 8rem)',    // responsive left/right spacing
      boxSizing: 'border-box',
      scrollMarginTop: '120px',
    }}
  >
    {/* ⚙️ Removed width constraint — now content sits centered inside full-bleed background */}
    <div
      style={{
        width: '100%',
        maxWidth: 1000,                          // still caps content for readability
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <h2
        className="animate-stagger-1"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 800,
          marginBottom: '2.5rem',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span className="text-gradient">Contact</span>
      </h2>

      {/* ⚙️ Centered form, expands to full width inside padded section */}
      <form
        className="animate-stagger-2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          background: '#000000',
          padding: '2rem',
          borderRadius: '1.5rem',
          border: '1px solid #00000022',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.06)',
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #ffffff',
            fontSize: '1rem',
          }}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #ffffff',
            fontSize: '1rem',
          }}
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #ffffff',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
        <button
          type="submit"
          className="btn"
          style={{
            fontSize: '1rem',
            width: '100%',
            marginTop: '0.5rem',
          }}
        >
          Send Message
        </button>
      </form>

      {/* ⚙️ Contact info centered and spaced */}
      <div
        className="animate-stagger-3"
        style={{
          textAlign: 'center',
          color: '#ffffff',
          fontSize: '1.1rem',
          lineHeight: 1.6,
        }}
      >
        <div style={{ marginBottom: '0.5rem' }}>
          Email:{' '}
          <a
            href="mailto:shriraj@fitinfluence.com"
            style={{ color: '#000000', textDecoration: 'underline' }}
          >
            shriraj@fitinfluence.com
          </a>
        </div>
        <div>
          Instagram:{' '}
          <a
            href="https://instagram.com/fitinfluence"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#000000', textDecoration: 'underline' }}
          >
            @fitinfluence
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;