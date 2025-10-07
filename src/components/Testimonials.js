import React, { useState, useEffect, useRef } from 'react';
import '../index.css';

const testimonials = [
  { name: 'Client 1', text: 'Shriraj’s coaching transformed my approach to work and life. I learned strategy, mindset, and discipline like never before.', rating: 5 },
  { name: 'Client 2', text: 'Amazing guidance! Every session helped me overcome obstacles and achieve goals I thought were impossible.', rating: 5 },
  { name: 'Client 3', text: 'Professional, motivating, and insightful. I grew personally and professionally thanks to Shriraj.', rating: 5 },
  { name: 'Client 4', text: 'His coaching made a real difference in my career trajectory. Highly recommended!', rating: 5 },
  { name: 'Client 5', text: 'I now approach challenges with confidence and clarity, all because of the structured guidance I received.', rating: 5 },
  { name: 'Client 6', text: 'Each session was actionable and practical. The results I achieved were tangible and long-lasting.', rating: 5 },
];

const CARD_WIDTH = 360; // ⬅️ Adjusted slightly larger to look good on full width
const GAP = 28;         // ⬅️ Added more spacing for wide layouts
const TRANSITION_DURATION = 600;
const AUTO_ROTATE_INTERVAL = 2500;

const Star = () => (
  <span style={{ color: '#a084ee', fontSize: '1.1rem', marginRight: 2 }}>★</span>
);

const getClonedTestimonials = (arr) => [...arr, ...arr];

const Testimonials = () => {
  const cards = getClonedTestimonials(testimonials);
  const trackRef = useRef(null);
  const timeoutRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const step = CARD_WIDTH + GAP;
  const translateX = -index * step;

  const handleNext = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  // Auto-rotation
  useEffect(() => {
    if (!isPaused) timeoutRef.current = setTimeout(handleNext, AUTO_ROTATE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  // Infinite loop logic
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (index >= testimonials.length) {
        setIsTransitioning(false);
        setIsInstant(true);
        setIndex(0);
      } else if (index < 0) {
        setIsTransitioning(false);
        setIsInstant(true);
        setIndex(testimonials.length - 1);
      }
    };
    const node = trackRef.current;
    node?.addEventListener('transitionend', handleTransitionEnd);
    return () => node?.removeEventListener('transitionend', handleTransitionEnd);
  }, [index]);

  useEffect(() => {
    if (isInstant) setTimeout(() => setIsInstant(false), 20);
  }, [isInstant]);

  return (
    <section
      id="testimonials"
      /* ⚙️ Full-Width Section Fix: makes the background and carousel fill the entire viewport horizontally */
      style={{
        width: '100vw',                             // full viewport width
        marginLeft: 'calc(50% - 50vw)',             // pushes section to align exactly with screen edges
        background: 'linear-gradient(135deg, #232946 60%, #181c2b 100%)',
        minHeight: '75vh',
        padding: '4rem clamp(2rem, 6vw, 8rem)',     // responsive left/right padding
        boxSizing: 'border-box',
        scrollMarginTop: '120px',
      }}
    >
      {/* ⚙️ No fixed-width container here — removed maxWidth limitation so carousel can stretch end-to-end */}
      <div
        className="animate-fadeInUp"
        style={{
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            marginBottom: '2.5rem',
            color: '#a084ee',
            textAlign: 'center',
            letterSpacing: '-1px',
          }}
        >
          Client Stories
        </h2>

        {/* ⚙️ Carousel wrapper now uses 100% width so the card track can reach both sides */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ⚙️ The track now spreads across the entire width and cards animate smoothly */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: GAP,
              justifyContent: 'center',
              transform: `translateX(${translateX}px)`,
              transition: isInstant
                ? 'none'
                : isTransitioning
                ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`
                : 'none',
              width: 'max-content',                 // prevents track from being constrained
            }}
          >
            {cards.map((t, idx) => {
              const isCenter = idx === index;
              const isHovered = hoveredIdx === idx;
              const pop = isCenter || isHovered;
              const popScale = pop ? 1.05 : 0.98;
              const popShadow = pop
                ? '0 6px 20px 0 #a084ee55, 0 0 0 2px #a084ee22'
                : '0 1px 6px 0 rgba(160,132,238,0.08)';
              const popZ = pop ? 2 : 1;

              return (
                <div
                  key={idx}
                  style={{
                    minWidth: CARD_WIDTH,
                    maxWidth: CARD_WIDTH,
                    padding: '2.8rem 1.5rem',
                    background: '#20233a',
                    borderRadius: '1.5rem',
                    textAlign: 'center',
                    boxShadow: popShadow,
                    transition: 'all 0.4s ease',
                    transform: `scale(${popScale})`,
                    zIndex: popZ,
                  }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setHoveredIdx(idx);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                    setHoveredIdx(null);
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#a084ee',
                      marginBottom: 12,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontStyle: 'italic',
                      color: '#c7c9d9',
                      marginBottom: 12,
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    "{t.text}"
                  </div>
                  <div>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ⚙️ Controls now pinned at extreme edges of the viewport */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: 'clamp(0.5rem, 2vw, 2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#a084ee',
              fontSize: 36,
              cursor: 'pointer',
              opacity: 0.8,
              zIndex: 5,
            }}
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: 'clamp(0.5rem, 2vw, 2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#a084ee',
              fontSize: 36,
              cursor: 'pointer',
              opacity: 0.8,
              zIndex: 5,
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;