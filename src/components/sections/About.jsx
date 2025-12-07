/* ===========================================
   About Section Component
   Designer bio and animated skills
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Coffee, Users, Briefcase } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

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
const stats = [
  { icon: <Briefcase />, number: '150+', label: 'Projects Done' },
  { icon: <Users />, number: '50+', label: 'Happy Clients' },
  { icon: <Award />, number: '15', label: 'Awards Won' },
  { icon: <Coffee />, number: '999+', label: 'Coffees Drunk' },
];

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
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                  alt="Designer Portrait"
                />
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

        {/* Stats */}
        <div className="about__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="about__stat-card">
              <div className="about__stat-icon">{stat.icon}</div>
              <span className="about__stat-number">{stat.number}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
