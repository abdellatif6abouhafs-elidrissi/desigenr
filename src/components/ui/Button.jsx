/* ===========================================
   Button Component
   Reusable button with multiple variants
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  onClick,
  href,
  className = '',
  ...props
}) => {
  const buttonRef = useRef(null);
  const magnetRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Magnetic effect on hover
    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const buttonClasses = `
    btn
    btn--${variant}
    btn--${size}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
      <span className="btn__shine"></span>
    </>
  );

  if (href) {
    return (
      <a ref={buttonRef} href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef} className={buttonClasses} onClick={onClick} {...props}>
      {content}
    </button>
  );
};

export default Button;
