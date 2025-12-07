/* ===========================================
   About Section Component
   Designer bio and animated skills
   =========================================== */

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Coffee, Users, Briefcase } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// Portfolio images for slideshow
const portfolioImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop&crop=face',
];

// Skills data
const skills = [
  { name: 'Brand Identity', level: 95 },
  { name: 'Logo Design', level: 90 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Motion Graphics', level: 85 },
  { name: '3D Visualization', level: 80 },
  { name: 'Typography', level: 92 },
];

// Stats data
const statsData = [
  { id: 0, icon: <Briefcase />, value: 150, suffix: '+', label: 'Projects Done' },
  { id: 1, icon: <Users />, value: 50, suffix: '+', label: 'Happy Clients' },
  { id: 2, icon: <Award />, value: 15, suffix: '', label: 'Awards Won' },
  { id: 3, icon: <Coffee />, value: 999, suffix: '+', label: 'Coffees Drunk' },
];

// Animated counter component
const AnimatedCounter = ({ value, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const startTime = Date.now();
            const endValue = value;
            const animDuration = duration * 1000;

            const updateCounter = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / animDuration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(easeOutQuart * endValue);

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                setCount(endValue);
              }
            };

            requestAnimationFrame(updateCounter);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={counterRef} className="about__stat-number">
      {count}{suffix}
    </span>
  );
};

// Image slideshow component
const ImageSlideshow = ({ images, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="about__slideshow">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Designer ${index + 1}`}
          className={`about__slideshow-image ${
            index === currentIndex ? 'active' : ''
          } ${isAnimating && index === currentIndex ? 'animating' : ''}`}
        />
      ))}
      <div className="about__slideshow-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`about__slideshow-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// Animated Stats Cards Component - Carousel Style
const AnimatedStatsCards = ({ stats }) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 90); // Rotate 90 degrees (360/4 cards)
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about__stats-wrapper">
      <div
        ref={containerRef}
        className="about__stats-carousel"
        style={{ '--rotation': `${rotation}deg` }}
      >
        {stats.map((stat, index) => {
          const angle = (index * 90); // Each card at 90 degree intervals
          return (
            <div
              key={stat.id}
              className="about__stat-card"
              style={{
                '--angle': `${angle}deg`,
                '--index': index
              }}
            >
              <div className="about__stat-icon">{stat.icon}</div>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={2.5}
              />
              <span className="about__stat-label">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Content animation
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
          once: true
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Skills bars animation
      skillsRef.current.forEach((skill, index) => {
        if (!skill) return;

        const progressBar = skill.querySelector('.about__skill-progress');
        const percentage = skill.getAttribute('data-level');

        gsap.fromTo(progressBar,
          { width: '0%' },
          {
            scrollTrigger: {
              trigger: skill,
              start: 'top 85%',
              once: true
            },
            width: `${percentage}%`,
            duration: 1.2,
            delay: index * 0.1,
            ease: 'power3.out'
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about section" id="about">
      <div className="container">
        <SectionTitle
          title="About Me"
          subtitle="Passionate about creating meaningful designs that connect brands with their audience"
        />

        <div className="about__wrapper">
          {/* Image Side */}
          <div ref={imageRef} className="about__image-container">
            <div className="about__image-wrapper">
              <div className="about__image">
                <ImageSlideshow images={portfolioImages} interval={2000} />
              </div>
              <div className="about__image-decoration about__image-decoration--1"></div>
              <div className="about__image-decoration about__image-decoration--2"></div>
            </div>

            {/* Experience Badge */}
            <div className="about__experience-badge">
              <span className="about__experience-number">8+</span>
              <span className="about__experience-text">Years of Experience</span>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="about__content">
            <h3 className="about__heading">
              I'm a Creative Designer who loves bringing{' '}
              <span className="gradient-text">ideas to life</span>
            </h3>

            <p className="about__bio">
              With over 8 years of experience in graphic design and creative branding,
              I've had the privilege of working with startups and established brands alike.
              My approach combines strategic thinking with creative execution to deliver
              designs that not only look beautiful but also drive results.
            </p>

            <p className="about__bio">
              I believe great design is about solving problems and telling stories.
              Every project is an opportunity to create something unique that resonates
              with the target audience and elevates the brand.
            </p>

            {/* Skills */}
            <div className="about__skills">
              <h4 className="about__skills-title">My Skills</h4>
              <div className="about__skills-grid">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={(el) => (skillsRef.current[index] = el)}
                    className="about__skill"
                    data-level={skill.level}
                  >
                    <div className="about__skill-header">
                      <span className="about__skill-name">{skill.name}</span>
                      <span className="about__skill-percent">{skill.level}%</span>
                    </div>
                    <div className="about__skill-bar">
                      <div className="about__skill-progress"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats with animated cards that swap positions */}
        <AnimatedStatsCards stats={statsData} />
      </div>
    </section>
  );
};

export default About;
