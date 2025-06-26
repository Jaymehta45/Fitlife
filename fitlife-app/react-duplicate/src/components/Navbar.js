import React, { useEffect, useRef, useState } from 'react';
import '../index.css';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef();

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'programs', 'testimonials', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const handleScroll = () => {
      let current = 'hero';
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
    <nav className="navbar" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, background: 'rgba(17,19,27,0.96)', boxShadow: '0 2px 16px 0 rgba(24,26,34,0.18)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div className="logo" style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px', color: '#a084ee' }}>Shriraj</div>
        <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ul ref={navRef} style={{ display: 'flex', gap: '2.2rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
            {/* Gooey blob */}
            <span
              className="gooey-blob"
              style={{
                position: 'absolute',
                top: '50%',
                left: blobStyle.left,
                width: blobStyle.width,
                height: 36,
                background: 'linear-gradient(90deg, #181a22 0%, #232946 100%)',
                borderRadius: 18,
                filter: 'blur(10px) saturate(2)',
                opacity: 0.45,
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
                    color: active === link.href.replace('#', '') ? '#fff' : '#fff',
                    fontWeight: active === link.href.replace('#', '') ? 800 : 600,
                    fontSize: '1.08rem',
                    letterSpacing: '-0.5px',
                    borderBottom: active === link.href.replace('#', '') ? '2.5px solid #a084ee' : '2.5px solid transparent',
                    transition: 'color 0.2s, border-bottom 0.2s',
                    padding: '0.2rem 0',
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