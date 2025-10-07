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
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: '#ffffff',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '2px solid #000000',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        borderRadius: 9999,
        padding: '14px 22px',
        pointerEvents: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
        {/* logo removed */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ul ref={navRef} style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative', alignItems: 'center' }}>
            {/* Gooey blob */}
            <span
              className="gooey-blob"
              style={{
                position: 'absolute',
                top: '50%',
                left: blobStyle.left,
                width: blobStyle.width,
                height: 44,
                background: 'linear-gradient(90deg, #181a22 0%, #232946 100%)',
                borderRadius: 22,
                filter: 'blur(10px) saturate(2)',
                opacity: 0,
                transform: 'translateY(-50%)',
                transition: 'left 0.35s cubic-bezier(0.23, 1, 0.32, 1), width 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {navLinks.map(link => {
              const isActive = active === link.href.replace('#', '');
              return (
                <li key={link.href} style={{ position: 'relative', zIndex: 1 }}>
                  <a
                    href={link.href}
                    className={isActive ? 'nav-link active' : 'nav-link'}
                    style={{
                      color: '#000000',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      letterSpacing: '-0.5px',
                      transition: 'color 0.2s',
                      padding: '0.35rem 0.1rem',
                      position: 'relative',
                    }}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -6,
                        height: 3,
                        background: '#000000',
                        borderRadius: 2,
                        transform: `scaleX(${isActive ? 1 : 0})`,
                        transformOrigin: isActive ? 'left center' : 'right center',
                        transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 