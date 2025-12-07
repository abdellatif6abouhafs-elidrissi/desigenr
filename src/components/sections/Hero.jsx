/* ===========================================
   Hero Section Component
   Animated hero with 3D background
   =========================================== */

import { useRef, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import FloatingShape from '../3d/FloatingShape';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title letters
      const titleChars = titleRef.current.querySelectorAll('.hero__title-char');
      tl.from(titleChars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate subtitle
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');

      // Animate CTA buttons
      tl.from(ctaRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3');

      // Animate scroll indicator
      tl.from(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2');

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current?.querySelector('.hero__scroll-line'), {
        scaleY: 1,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power2.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split text into individual characters for animation
  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="hero__title-char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={heroRef} className="hero" id="home">
      {/* 3D Background */}
      <div className="hero__3d-container">
        <Suspense fallback={<div className="hero__3d-fallback" />}>
          <FloatingShape />
        </Suspense>
      </div>

      {/* Gradient Overlays */}
      <div className="hero__gradient hero__gradient--top"></div>
      <div className="hero__gradient hero__gradient--bottom"></div>
      <div className="hero__gradient hero__gradient--radial"></div>

      {/* Main Content */}
      <div className="container hero__container">
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge">
            <Sparkles size={16} />
            <span>Available for Freelance Work</span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-line">
              {renderAnimatedText('Creative')}
            </span>
            <span className="hero__title-line hero__title-line--accent">
              {renderAnimatedText('Designer')}
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="hero__subtitle">
            Transforming ideas into stunning visual experiences.
            <br />
            <span className="hero__subtitle-services">
              Logo Design • Brand Identity • UI/UX • Motion Graphics • 3D Visuals
            </span>
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="hero__cta">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              href="#portfolio"
            >
              View My Work
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<Play size={20} />}
              iconPosition="left"
            >
              Watch Showreel
            </Button>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">150+</span>
              <span className="hero__stat-label">Projects Completed</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">50+</span>
              <span className="hero__stat-label">Happy Clients</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">8+</span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line-container">
          <div className="hero__scroll-line"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hero__floating-elements">
        <div className="hero__floating-element hero__floating-element--1"></div>
        <div className="hero__floating-element hero__floating-element--2"></div>
        <div className="hero__floating-element hero__floating-element--3"></div>
      </div>
    </section>
  );
};

export default Hero;
