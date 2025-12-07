/* ===========================================
   Services Section Component
   Service cards with hover animations and example images
   =========================================== */

import { useRef, useEffect, useState } from 'react';
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

// Services data with example images
const services = [
  {
    icon: <PenTool />,
    title: 'Logo Design',
    description: 'Crafting unique, memorable logos that capture your brand essence and leave a lasting impression on your audience.',
    features: ['Custom Concepts', 'Vector Files', 'Brand Guidelines'],
    examples: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=300&fit=crop'
    ]
  },
  {
    icon: <Palette />,
    title: 'Brand Identity',
    description: 'Developing comprehensive brand systems that create cohesive visual experiences across all touchpoints.',
    features: ['Visual Identity', 'Brand Strategy', 'Style Guides'],
    examples: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop'
    ]
  },
  {
    icon: <Smartphone />,
    title: 'Social Media Design',
    description: 'Creating scroll-stopping social content that engages your audience and builds brand recognition.',
    features: ['Content Templates', 'Story Designs', 'Campaign Assets'],
    examples: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop'
    ]
  },
  {
    icon: <Monitor />,
    title: 'UI/UX Design',
    description: 'Designing intuitive digital experiences that delight users and drive conversions for web and mobile.',
    features: ['User Research', 'Wireframes', 'Prototypes'],
    examples: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop'
    ]
  },
  {
    icon: <Film />,
    title: 'Motion Graphics',
    description: 'Bringing brands to life with dynamic animations that capture attention and tell compelling stories.',
    features: ['Logo Animation', 'Explainer Videos', 'Social Motion'],
    examples: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop'
    ]
  },
  {
    icon: <Box />,
    title: '3D Visuals',
    description: 'Creating stunning 3D renders and visualizations that add depth and dimension to your brand.',
    features: ['Product Renders', '3D Illustrations', 'Virtual Tours'],
    examples: [
      'https://images.unsplash.com/photo-1633899306328-c5e70574aaa2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop'
    ]
  }
];

// Service Card with hover image preview
const ServiceCard = ({ service, index, cardRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % service.examples.length);
      }, 1000); // Change image every 1 second when hovered
    } else {
      setCurrentImage(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, service.examples.length]);

  return (
    <div
      ref={cardRef}
      className="services__card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Example Images Behind Card */}
      <div className={`services__examples ${isHovered ? 'active' : ''}`}>
        {service.examples.map((img, imgIndex) => (
          <div
            key={imgIndex}
            className={`services__example-img ${currentImage === imgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

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
  );
};

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
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
