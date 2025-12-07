/* ===========================================
   Card Component
   Reusable glass-morphism card
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !hover) return;

    // 3D tilt effect on hover
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      // Move glow with cursor
      if (glow) {
        gsap.to(glow, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      if (glow) {
        gsap.to(glow, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hover]);

  const cardClasses = `
    card
    card--${variant}
    ${hover ? 'card--hover' : ''}
    ${className}
  `.trim();

  return (
    <div ref={cardRef} className={cardClasses} onClick={onClick} {...props}>
      <div ref={glowRef} className="card__glow"></div>
      <div className="card__content">
        {children}
      </div>
      <div className="card__border"></div>
    </div>
  );
};

export default Card;
