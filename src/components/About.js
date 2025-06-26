import React from 'react';
import '../index.css';
import ProfileCard from './ProfileCard';

const About = () => {
  return (
    <section id="about" style={{ background: 'linear-gradient(135deg, #232946 60%, #181c2b 100%)', borderRadius: '2rem', marginBottom: '2rem' }}>
      <div className="container animate-fadeInUp" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2.5rem', padding: '3rem 0', justifyContent: 'center' }}>
        {/* Profile Card with Spotlight/Tilt Animation */}
        <div style={{ flex: '0 0 320px', minWidth: 260 }}>
          <ProfileCard
            name="Shriraj Mahidhar"
            title="Fitness Expert & Coach"
            handle="shrirajfit"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/profile-avatar.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => window.location.href = '#contact'}
          />
        </div>
        {/* About Content */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
            <span className="text-gradient">Meet Shriraj Mahidhar</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#c7c9d9', marginBottom: '1.5rem', maxWidth: 600 }}>
            Shriraj is a certified fitness influencer and coach, dedicated to helping you unlock your best self. With a decade of experience, he blends science, motivation, and real-world results for every client.
          </p>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#a084ee' }}>10+</div>
              <div style={{ color: '#c7c9d9', fontSize: '1rem' }}>Years Experience</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#a084ee' }}>1,000+</div>
              <div style={{ color: '#c7c9d9', fontSize: '1rem' }}>Clients Transformed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#a084ee' }}>95%</div>
              <div style={{ color: '#c7c9d9', fontSize: '1rem' }}>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 