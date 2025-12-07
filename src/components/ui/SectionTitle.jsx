/* ===========================================
   Section Title Component
   Animated section headings
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionTitle.css';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title, subtitle, align = 'center', className = '' }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true
        }
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(lineRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`section-title section-title--${align} ${className}`}
    >
      <h2 ref={titleRef} className="section-title__heading">
        <span className="gradient-text">{title}</span>
      </h2>
      <div ref={lineRef} className="section-title__line"></div>
      {subtitle && (
        <p ref={subtitleRef} className="section-title__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
