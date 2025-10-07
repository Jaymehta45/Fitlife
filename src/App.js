import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(section => {
      section.classList.add('section-animate');
      observer.observe(section);
    });
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <About />
        <Programs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
