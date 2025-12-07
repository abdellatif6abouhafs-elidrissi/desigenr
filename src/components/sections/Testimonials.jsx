/* ===========================================
   Testimonials Section Component
   Client reviews with smooth slider
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO, Nexus Technologies',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'Working with this designer was an absolute pleasure. They took our vague ideas and transformed them into a stunning brand identity that perfectly captures our vision. The attention to detail and creativity exceeded all expectations.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, Aria Health',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The UI/UX design delivered was not just beautiful but incredibly functional. Our user engagement increased by 40% after the redesign. A true professional who understands both aesthetics and user experience.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director, Bloom Interiors',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'The brand identity created for our studio has received countless compliments from clients. The designs are elegant, timeless, and perfectly represent our premium positioning in the market.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CTO, FinFlow',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Exceptional work on our fintech dashboard. The complex data was presented in such an intuitive way that even our least tech-savvy users found it easy to navigate. Highly recommended!',
    rating: 5
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Creative Director, Creative Lab',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    content: 'The motion graphics work blew us away. As fellow creatives, we have high standards, and this designer not only met them but surpassed them with innovative animations that told our brand story beautifully.',
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sliderRef.current, {
        scrollTrigger: {
          trigger: sliderRef.current,
          start: 'top 80%',
          once: true
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    return Array(rating).fill(null).map((_, index) => (
      <Star key={index} size={18} fill="currentColor" />
    ));
  };

  return (
    <section ref={sectionRef} className="testimonials section" id="testimonials">
      {/* Background */}
      <div className="testimonials__bg">
        <div className="testimonials__bg-shape testimonials__bg-shape--1"></div>
        <div className="testimonials__bg-shape testimonials__bg-shape--2"></div>
      </div>

      <div className="container">
        <SectionTitle
          title="Client Love"
          subtitle="Hear what my amazing clients have to say about working together"
        />

        {/* Slider */}
        <div ref={sliderRef} className="testimonials__slider">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            pagination={{
              el: '.testimonials__pagination',
              clickable: true
            }}
            loop={true}
            className="testimonials__swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonials__card">
                  {/* Quote Icon */}
                  <div className="testimonials__quote-icon">
                    <Quote size={48} />
                  </div>

                  {/* Content */}
                  <p className="testimonials__content">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="testimonials__rating">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Author */}
                  <div className="testimonials__author">
                    <div className="testimonials__avatar">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div className="testimonials__author-info">
                      <h4 className="testimonials__name">{testimonial.name}</h4>
                      <span className="testimonials__role">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination */}
          <div className="testimonials__pagination"></div>
        </div>

        {/* Logos */}
        <div className="testimonials__logos">
          <span className="testimonials__logos-title">Trusted by leading brands</span>
          <div className="testimonials__logos-grid">
            {['Nexus', 'Aria', 'Bloom', 'FinFlow', 'TechWave'].map((brand) => (
              <div key={brand} className="testimonials__logo">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
