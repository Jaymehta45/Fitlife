import React, { useState, useEffect, useRef } from 'react';
import '../index.css';

const testimonials = Array.from({ length: 300 }, (_, i) => ({
  name: `Client ${i + 1}`,
  text: `This is testimonial #${i + 1}. Shriraj's coaching made a real difference for me!`,
  rating: 5,
}));

const Star = () => <span style={{ color: '#a084ee', fontSize: '1.1rem', marginRight: 2 }}>★</span>;

const CARDS_TO_SHOW = 3;
const CARD_WIDTH = 320; // px
const GAP = 24; // px
const TRANSITION_DURATION = 600; // ms
const AUTO_ROTATE_INTERVAL = 2100; // ms

function getClonedTestimonials(arr) {
  // Clone 3 cards at each end for seamless infinite effect
  return [
    arr[arr.length - 3],
    arr[arr.length - 2],
    arr[arr.length - 1],
    ...arr,
    arr[0],
    arr[1],
    arr[2],
  ];
}

const Testimonials = () => {
  const [index, setIndex] = useState(3); // Start at 3 because of three clones at the start
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const timeoutRef = useRef(null);
  const trackRef = useRef(null);
  const total = testimonials.length;
  const cards = getClonedTestimonials(testimonials);

  // Pause only when hovering over a card
  const [isPaused, setIsPaused] = useState(false);

  // Handle transition end for infinite effect
  useEffect(() => {
    const handle = () => {
      if (index === cards.length - 3) {
        // Instantly jump to the real first card (index 3) without transition
        setIsTransitioning(false);
        setTimeout(() => {
          setIsInstant(true);
          setIndex(3);
        }, 10);
      } else if (index === 2) {
        // Instantly jump to the real last card (index cards.length - 6) without transition
        setIsTransitioning(false);
        setTimeout(() => {
          setIsInstant(true);
          setIndex(cards.length - 6);
        }, 10);
      }
    };
    const node = trackRef.current;
    if (node) {
      node.addEventListener('transitionend', handle);
      return () => node.removeEventListener('transitionend', handle);
    }
  }, [index, cards.length]);

  // After an instant jump, re-enable transition for the next move
  useEffect(() => {
    if (isInstant) {
      setTimeout(() => setIsInstant(false), 20);
    }
  }, [isInstant]);

  const handleNext = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  // Calculate translateX
  const trackWidth = cards.length * (CARD_WIDTH + GAP);
  const containerWidth = CARDS_TO_SHOW * CARD_WIDTH + (CARDS_TO_SHOW - 1) * GAP;
  const translateX = -(index * (CARD_WIDTH + GAP) - ((containerWidth - CARD_WIDTH) / 2));

  // Track hovered card
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Pause auto-rotation on hover
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, AUTO_ROTATE_INTERVAL);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  return (
    <section id="testimonials" style={{ background: 'linear-gradient(135deg, #232946 60%, #181c2b 100%)', borderRadius: '2rem', marginBottom: '2rem', minHeight: 340 }}>
      <div className="container animate-fadeInUp" style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem', color: '#a084ee', textAlign: 'center', letterSpacing: '-1px' }}>
          Client Stories
        </h2>
        <div style={{ position: 'relative', width: containerWidth, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Left Arrow */}
          <button onClick={handlePrev} aria-label="Previous" style={{ position: 'absolute', left: -32, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a084ee', fontSize: 32, cursor: 'pointer', zIndex: 2, opacity: 0.7 }}>&lt;</button>
          {/* Carousel Track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: GAP,
              width: trackWidth,
              transform: `translateX(${translateX}px)` ,
              transition: isInstant
                ? 'none'
                : isTransitioning
                  ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`
                  : 'none',
            }}
          >
            {cards.map((testimonial, idx) => {
              // Center-most card is always the one at the current index
              const isCenter = idx === index;
              const isHovered = hoveredIdx === idx;
              const pop = isCenter || isHovered;
              const popScale = pop ? 1.04 : 0.98;
              const popShadow = pop
                ? '0 4px 16px 0 #a084ee55, 0 0 0 2px #a084ee22'
                : '0 1px 6px 0 rgba(160,132,238,0.08)';
              const popBorder = pop ? '1.5px solid #a084ee' : '1px solid #393b5b';
              const popBrightness = pop ? 1.03 : 1;
              const popZ = pop ? 2 : 1;
              return (
                <div
                  key={idx}
                  className="testimonial-carousel-card"
                  style={{
                    background: '#20233a',
                    borderRadius: '1.5rem',
                    boxShadow: popShadow,
                    padding: '2.2rem 1.5rem',
                    textAlign: 'center',
                    minWidth: CARD_WIDTH,
                    maxWidth: CARD_WIDTH,
                    flex: `0 0 ${CARD_WIDTH}px`,
                    margin: '0 auto',
                    position: 'relative',
                    transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow ${TRANSITION_DURATION}ms, border ${TRANSITION_DURATION}ms`,
                    willChange: 'transform, opacity, box-shadow, border',
                    opacity: pop ? 1 : 0.6,
                    transform: `scale(${popScale})`,
                    border: popBorder,
                    zIndex: popZ,
                    filter: pop ? `brightness(${popBrightness})` : 'blur(0.5px)',
                  }}
                  onMouseEnter={() => { setIsPaused(true); setHoveredIdx(idx); }}
                  onMouseLeave={() => { setIsPaused(false); setHoveredIdx(null); }}
                >
                  {pop && (
                    <div style={{
                      position: 'absolute',
                      top: -24,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 120,
                      height: 24,
                      background: 'radial-gradient(circle, #a084ee88 0%, transparent 80%)',
                      filter: 'blur(10px)',
                      zIndex: 1,
                    }} />
                  )}
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a084ee', marginBottom: '0.7rem' }}>{testimonial.name}</div>
                  <div style={{ color: '#c7c9d9', fontSize: '1.05rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>{Array.from({ length: testimonial.rating }).map((_, idx2) => <Star key={idx2} />)}</div>
                </div>
              );
            })}
          </div>
          {/* Right Arrow */}
          <button onClick={handleNext} aria-label="Next" style={{ position: 'absolute', right: -32, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a084ee', fontSize: 32, cursor: 'pointer', zIndex: 2, opacity: 0.7 }}>&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 