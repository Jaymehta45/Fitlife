import React from 'react';
import '../index.css';
import ProfileCard from './ProfileCard';

const BG_URL =
  'https://t4.ftcdn.net/jpg/13/40/60/43/360_F_1340604336_5O63ou7weg0Nlgb8BEmh0OP2OxPdHP7E.jpg';

const About = () => {
  // Only white overlay now — no dark tint (prevents "negative" look)
  const overlayOpacity = 0.88; // higher = fainter image, lower = more visible

  return (
    <section
      id="about"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        // ✅ Light image with faint white overlay only
        backgroundImage: `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${BG_URL})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // subtle parallax feel
        minHeight: '84vh',
        padding: '6rem clamp(1rem, 6vw, 6rem) 8rem',
        boxSizing: 'border-box',
        scrollMarginTop: '160px',
        borderRadius: '0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: '2.5rem',
          padding: 0,
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Profile Card column */}
        <div className="animate-stagger-1" style={{ flex: '0 0 clamp(260px, 24vw, 420px)', minWidth: 260 }}>
          <ProfileCard
            name="Shriraj"
            title="Fitness Expert & Coach"
            handle="shrirajfit"
            status=""
            contactText="Contact Me"
            avatarUrl="https://i.ibb.co/SXc6H7gC/PHOTOg-2025-06-26-09-36-17-2.jpg"
            miniAvatarUrl="https://i.ibb.co/SXc6H7gC/PHOTOg-2025-06-26-09-36-17-2.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => (window.location.href = '#contact')}
          />
        </div>

        {/* Content column */}
        <div className="animate-stagger-2" style={{ flex: '1 1 520px', minWidth: 300, paddingLeft: '1rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              backgroundColor: '#fff',
              padding: '0.4em 0.8em',
              display: 'inline-block',
              borderRadius: '0.3rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
              border: '2px solid #000',
              textAlign: 'center',
              marginBottom: '1.2rem',
              lineHeight: 1.05,
            }}
          >
            Shriraj Mahidhar
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: '#000000',
              fontWeight: 700,
              marginBottom: '1.5rem',
              maxWidth: 920,
              lineHeight: 1.6,
            }}
          >
            Shriraj is a certified fitness influencer and coach, dedicated to helping you
            unlock your best self. With a decade of experience, he blends science,
            motivation, and real-world results for every client.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#000000',
                }}
              >
                10+
              </div>
              <div
                style={{
                  color: '#000000',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  fontWeight: 700,
                }}
              >
                Years Experience
              </div>
            </div>

            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#000000',
                }}
              >
                1,000+
              </div>
              <div
                style={{
                  color: '#000000',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  fontWeight: 700,
                }}
              >
                Clients Transformed
              </div>
            </div>

            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3.6vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#000000',
                }}
              >
                95%
              </div>
              <div
                style={{
                  color: '#000000',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                  fontWeight: 700,
                }}
              >
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;