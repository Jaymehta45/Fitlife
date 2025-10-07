import React, { useEffect, useRef, useState } from 'react';
import '../index.css';

const navLinks = [
  { label: 'Home', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef();

  useEffect(() => {
    const sectionIds = ['about', 'programs', 'testimonials', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const handleScroll = () => {
      let current = 'about';
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = sectionIds[i];
            break;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gooey blob effect
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('.nav-link.active');
    if (activeLink) {
      const { left, width } = activeLink.getBoundingClientRect();
      const navLeft = navRef.current.getBoundingClientRect().left;
      setBlobStyle({ left: left - navLeft, width });
    }
  }, [active]);

  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(24,26,34,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(160,132,238,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(160,132,238,0.15) inset',
        borderRadius: 9999,
        padding: '10px 16px',
        pointerEvents: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', pointerEvents: 'auto' }}>
        {/* logo removed */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ul ref={navRef} style={{ display: 'flex', gap: '1.6rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative', alignItems: 'center' }}>
            {/* Gooey blob */}
            <span
              className="gooey-blob"
              style={{
                position: 'absolute',
                top: '50%',
                left: blobStyle.left,
                width: blobStyle.width,
                height: 32,
                background: 'linear-gradient(90deg, #181a22 0%, #232946 100%)',
                borderRadius: 16,
                filter: 'blur(10px) saturate(2)',
                opacity: 0.4,
                transform: 'translateY(-50%)',
                transition: 'left 0.35s cubic-bezier(0.23, 1, 0.32, 1), width 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {navLinks.map(link => (
              <li key={link.href} style={{ position: 'relative', zIndex: 1 }}>
                <a
                  href={link.href}
                  className={active === link.href.replace('#', '') ? 'nav-link active' : 'nav-link'}
                  style={{
                    color: '#fff',
                    fontWeight: active === link.href.replace('#', '') ? 800 : 600,
                    fontSize: '0.98rem',
                    letterSpacing: '-0.3px',
                    transition: 'color 0.2s',
                    padding: '0.25rem 0',
                    position: 'relative',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 