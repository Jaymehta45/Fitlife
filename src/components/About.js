import React from 'react';
import '../index.css';
import ProfileCard from './ProfileCard';

const About = () => {
  return (
    <section
      id="about"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)', // full-bleed background
        background: 'linear-gradient(135deg, #232946 60%, #181c2b 100%)',
        minHeight: '84vh',
        padding: '6rem clamp(1rem, 6vw, 6rem) 8rem',
        boxSizing: 'border-box',
        scrollMarginTop: '160px',
        borderRadius: '0' // keep full-bleed; if you want rounded, use container instead
      }}
    >
      <div
        className="container animate-fadeInUp"
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
          boxSizing: 'border-box'
        }}
      >
        {/* Profile Card column */}
        <div style={{ flex: '0 0 clamp(260px, 24vw, 420px)', minWidth: 260 }}>
          <ProfileCard
            name="Shriraj"
            title="Fitness Expert & Coach"
            handle="shrirajfit"
            status=""
            contactText="Contact Me"
            avatarUrl="https://i.ibb.co/JjdNWHV4/PHOTO-2025-06-26-09-36-17-2.jpg"
            miniAvatarUrl="https://i.ibb.co/JjdNWHV4/PHOTO-2025-06-26-09-36-17-2.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => (window.location.href = '#contact')}
          />
        </div>

        {/* Content column */}
        <div style={{ flex: '1 1 520px', minWidth: 300, paddingLeft: '1rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              color: '#fff',
              lineHeight: 1.05
            }}
          >
            <span className="text-gradient">Meet Shriraj Mahidhar</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: '#c7c9d9',
              marginBottom: '1.5rem',
              maxWidth: 920,
              lineHeight: 1.6
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
              justifyContent: 'flex-start'
            }}
          >
            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2rem)', fontWeight: 700, color: '#a084ee' }}>
                10+
              </div>
              <div style={{ color: '#c7c9d9', fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}>
                Years Experience
              </div>
            </div>

            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2rem)', fontWeight: 700, color: '#a084ee' }}>
                1,000+
              </div>
              <div style={{ color: '#c7c9d9', fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}>
                Clients Transformed
              </div>
            </div>

            <div style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2rem)', fontWeight: 700, color: '#a084ee' }}>
                95%
              </div>
              <div style={{ color: '#c7c9d9', fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}>
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