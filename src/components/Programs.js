import React, { useRef } from 'react';
import '../index.css';

const programs = [
  {
    title: 'Strength Training',
    desc: 'Build muscle and power with science-backed routines.',
    color: 'linear-gradient(90deg, #6d83f2 0%, #a084ee 100%)',
    icon: '💪',
  },
  {
    title: 'Cardio Fitness',
    desc: 'Boost endurance and burn calories with dynamic cardio.',
    color: 'linear-gradient(90deg, #a084ee 0%, #6d83f2 100%)',
    icon: '🏃‍♂️',
  },
  {
    title: 'Weight Loss',
    desc: 'Personalized plans to help you lose fat and keep it off.',
    color: 'linear-gradient(90deg, #232946 0%, #a084ee 100%)',
    icon: '🔥',
  },
];

const Programs = () => {
  const cardsRef = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section id="programs" style={{ background: 'linear-gradient(135deg, #181c2b 60%, #232946 100%)', borderRadius: '2rem', marginBottom: '2rem' }}>
      <div className="container animate-fadeInUp" style={{ padding: '3rem 0' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem', color: '#fff', textAlign: 'center' }}>
          <span className="text-gradient">Our Programs</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2.2rem',
          justifyContent: 'center',
        }}>
          {programs.map((p, i) => (
            <div
              key={p.title}
              ref={el => cardsRef.current[i] = el}
              className="program-card-spotlight"
              onMouseMove={(e) => handleMouseMove(e, i)}
              style={{ minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1.2rem',
                background: p.color,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 700,
              }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#fff', marginBottom: '0.7rem' }}>{p.title}</div>
              <div style={{ color: '#c7c9d9', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{p.desc}</div>
              <a href="#contact" className="btn" style={{ fontSize: '1rem', padding: '0.6rem 1.5rem' }}>Join Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs; 