/* ===========================================
   Services Section Component
   Service cards with hover animations
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Palette,
  PenTool,
  Smartphone,
  Monitor,
  Film,
  Box,
  ArrowUpRight
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

// Services data
const services = [
  {
    icon: <PenTool />,
    title: 'Logo Design',
    description: 'Crafting unique, memorable logos that capture your brand essence and leave a lasting impression on your audience.',
    features: ['Custom Concepts', 'Vector Files', 'Brand Guidelines']
  },
  {
    icon: <Palette />,
    title: 'Brand Identity',
    description: 'Developing comprehensive brand systems that create cohesive visual experiences across all touchpoints.',
    features: ['Visual Identity', 'Brand Strategy', 'Style Guides']
  },
  {
    icon: <Smartphone />,
    title: 'Social Media Design',
    description: 'Creating scroll-stopping social content that engages your audience and builds brand recognition.',
    features: ['Content Templates', 'Story Designs', 'Campaign Assets']
  },
  {
    icon: <Monitor />,
    title: 'UI/UX Design',
    description: 'Designing intuitive digital experiences that delight users and drive conversions for web and mobile.',
    features: ['User Research', 'Wireframes', 'Prototypes']
  },
  {
    icon: <Film />,
    title: 'Motion Graphics',
    description: 'Bringing brands to life with dynamic animations that capture attention and tell compelling stories.',
    features: ['Logo Animation', 'Explainer Videos', 'Social Motion']
  },
  {
    icon: <Box />,
    title: '3D Visuals',
    description: 'Creating stunning 3D renders and visualizations that add depth and dimension to your brand.',
    features: ['Product Renders', '3D Illustrations', 'Virtual Tours']
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services section" id="services">
      {/* Background Elements */}
      <div className="services__bg">
        <div className="services__bg-gradient"></div>
        <div className="services__bg-grid"></div>
      </div>

      <div className="container">
        <SectionTitle
          title="Services"
          subtitle="Comprehensive design solutions tailored to elevate your brand and captivate your audience"
        />

        <div className="services__grid">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="services__card-wrapper"
            >
              <Card variant="glass" className="services__card">
                {/* Icon */}
                <div className="services__icon">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="services__title">{service.title}</h3>
                <p className="services__description">{service.description}</p>

                {/* Features */}
                <ul className="services__features">
                  {service.features.map((feature) => (
                    <li key={feature} className="services__feature">
                      <span className="services__feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <a href="#contact" className="services__link">
                  <span>Learn More</span>
                  <ArrowUpRight size={18} />
                </a>

                {/* Card Number */}
                <span className="services__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
