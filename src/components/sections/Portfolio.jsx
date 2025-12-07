/* ===========================================
   Portfolio Section Component
   Filterable gallery with carousel and lightbox
   =========================================== */

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

// Portfolio categories
const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'branding', label: 'Branding' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'motion', label: 'Motion' },
  { id: '3d', label: '3D Design' }
];

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: 'Nexus Brand Identity',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
    description: 'Complete brand identity for a tech startup, including logo, color palette, and brand guidelines.',
    client: 'Nexus Technologies',
    year: '2024'
  },
  {
    id: 2,
    title: 'Aria Mobile App',
    category: 'ui-ux',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop',
    description: 'Modern mobile app design for a wellness platform focusing on user experience and accessibility.',
    client: 'Aria Health',
    year: '2024'
  },
  {
    id: 3,
    title: 'Cosmic Logo Animation',
    category: 'motion',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&h=600&fit=crop',
    description: 'Dynamic logo animation for a space exploration company with particle effects.',
    client: 'Cosmic Ventures',
    year: '2023'
  },
  {
    id: 4,
    title: 'Product Visualization',
    category: '3d',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    description: 'Photorealistic 3D product renders for an electronics brand launch campaign.',
    client: 'TechWave',
    year: '2024'
  },
  {
    id: 5,
    title: 'Bloom Studio',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    description: 'Elegant brand identity for a premium interior design studio.',
    client: 'Bloom Interiors',
    year: '2023'
  },
  {
    id: 6,
    title: 'Finance Dashboard',
    category: 'ui-ux',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Comprehensive dashboard design for a fintech platform with data visualization.',
    client: 'FinFlow',
    year: '2024'
  },
  {
    id: 7,
    title: 'Abstract Motion',
    category: 'motion',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
    description: 'Abstract motion graphics piece for a creative agency showreel.',
    client: 'Creative Lab',
    year: '2023'
  },
  {
    id: 8,
    title: 'Architectural Renders',
    category: '3d',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    description: 'Stunning 3D architectural visualizations for a real estate development.',
    client: 'Urban Heights',
    year: '2024'
  }
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  const sectionRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);

  // Filter portfolio items
  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeFilter);

    // Animate out then in
    gsap.to('.portfolio__item', {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setFilteredItems(filtered);
        gsap.fromTo('.portfolio__item',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05 }
        );
      }
    });
  }, [activeFilter]);

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(filterRef.current?.children, {
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 85%',
          once: true
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Open lightbox
  const openLightbox = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section ref={sectionRef} className="portfolio section" id="portfolio">
      <div className="container">
        <SectionTitle
          title="Portfolio"
          subtitle="A selection of my recent work across branding, UI/UX, motion, and 3D design"
        />

        {/* Filter Buttons */}
        <div ref={filterRef} className="portfolio__filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`portfolio__filter ${activeFilter === cat.id ? 'portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Carousel */}
        <div className="portfolio__carousel">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false
            }}
            navigation={{
              prevEl: '.portfolio__nav--prev',
              nextEl: '.portfolio__nav--next'
            }}
            pagination={{
              el: '.portfolio__pagination',
              clickable: true
            }}
            className="portfolio__swiper"
          >
            {filteredItems.map((item) => (
              <SwiperSlide key={item.id} className="portfolio__slide">
                <div className="portfolio__item" onClick={() => openLightbox(item)}>
                  <div className="portfolio__image">
                    <img src={item.image} alt={item.title} />
                    <div className="portfolio__overlay">
                      <span className="portfolio__category">{item.category}</span>
                      <h3 className="portfolio__title">{item.title}</h3>
                      <span className="portfolio__view">View Project</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="portfolio__nav portfolio__nav--prev">
            <ChevronLeft size={24} />
          </button>
          <button className="portfolio__nav portfolio__nav--next">
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div className="portfolio__pagination"></div>
        </div>

        {/* View All Button */}
        <div className="portfolio__cta">
          <Button variant="secondary" size="lg">
            View All Projects
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="portfolio__lightbox" onClick={closeLightbox}>
          <div className="portfolio__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="portfolio__lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>

            <div className="portfolio__lightbox-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="portfolio__lightbox-info">
              <span className="portfolio__lightbox-category">{selectedProject.category}</span>
              <h2 className="portfolio__lightbox-title">{selectedProject.title}</h2>
              <p className="portfolio__lightbox-description">{selectedProject.description}</p>

              <div className="portfolio__lightbox-meta">
                <div className="portfolio__lightbox-meta-item">
                  <span className="portfolio__lightbox-label">Client</span>
                  <span className="portfolio__lightbox-value">{selectedProject.client}</span>
                </div>
                <div className="portfolio__lightbox-meta-item">
                  <span className="portfolio__lightbox-label">Year</span>
                  <span className="portfolio__lightbox-value">{selectedProject.year}</span>
                </div>
              </div>

              <Button variant="primary" icon={<ExternalLink size={18} />}>
                View Live Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
