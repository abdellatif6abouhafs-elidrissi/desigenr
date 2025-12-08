/* ===========================================
   All Projects Page
   Full portfolio with categories
   =========================================== */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, ArrowLeft, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import './AllProjects.css';

gsap.registerPlugin(ScrollTrigger);

// All portfolio items organized by category
const allProjects = {
  branding: [
    {
      id: 1,
      title: 'Nexus Brand Identity',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      description: 'Complete brand identity for a tech startup, including logo, color palette, and brand guidelines.',
      client: 'Nexus Technologies',
      year: '2024'
    },
    {
      id: 5,
      title: 'Bloom Studio',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      description: 'Elegant brand identity for a premium interior design studio.',
      client: 'Bloom Interiors',
      year: '2023'
    },
    {
      id: 9,
      title: 'Artisan Coffee Co.',
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
      description: 'Warm and inviting brand identity for an artisan coffee roaster.',
      client: 'Artisan Coffee',
      year: '2023'
    },
    {
      id: 10,
      title: 'Luxe Fashion House',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop',
      description: 'Sophisticated luxury fashion brand identity with minimalist approach.',
      client: 'Luxe Fashion',
      year: '2024'
    },
    {
      id: 11,
      title: 'Green Earth Organics',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
      description: 'Eco-friendly brand identity for an organic food company.',
      client: 'Green Earth',
      year: '2023'
    },
    {
      id: 12,
      title: 'Summit Athletics',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
      description: 'Dynamic sports brand identity for a fitness equipment company.',
      client: 'Summit Athletics',
      year: '2024'
    }
  ],
  'ui-ux': [
    {
      id: 2,
      title: 'Aria Mobile App',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop',
      description: 'Modern mobile app design for a wellness platform focusing on user experience and accessibility.',
      client: 'Aria Health',
      year: '2024'
    },
    {
      id: 6,
      title: 'Finance Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Comprehensive dashboard design for a fintech platform with data visualization.',
      client: 'FinFlow',
      year: '2024'
    },
    {
      id: 13,
      title: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'Complete e-commerce experience design with seamless checkout flow.',
      client: 'ShopEase',
      year: '2024'
    },
    {
      id: 14,
      title: 'Travel Booking App',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      description: 'Intuitive travel booking application with personalized recommendations.',
      client: 'Wanderlust',
      year: '2023'
    },
    {
      id: 15,
      title: 'Healthcare Portal',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      description: 'Patient-centered healthcare portal with appointment scheduling.',
      client: 'MediCare Plus',
      year: '2024'
    },
    {
      id: 16,
      title: 'Learning Management System',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
      description: 'Educational platform design for online learning and course management.',
      client: 'EduLearn',
      year: '2023'
    }
  ],
  motion: [
    {
      id: 3,
      title: 'Cosmic Logo Animation',
      image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&h=600&fit=crop',
      description: 'Dynamic logo animation for a space exploration company with particle effects.',
      client: 'Cosmic Ventures',
      year: '2023'
    },
    {
      id: 7,
      title: 'Abstract Motion',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
      description: 'Abstract motion graphics piece for a creative agency showreel.',
      client: 'Creative Lab',
      year: '2023'
    },
    {
      id: 17,
      title: 'Product Launch Video',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
      description: 'High-energy product launch video with kinetic typography.',
      client: 'TechStart',
      year: '2024'
    },
    {
      id: 18,
      title: 'Social Media Animations',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
      description: 'Engaging social media animation pack for brand campaigns.',
      client: 'BuzzMedia',
      year: '2024'
    },
    {
      id: 19,
      title: 'Explainer Video',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
      description: 'Animated explainer video simplifying complex technical concepts.',
      client: 'DataFlow',
      year: '2023'
    },
    {
      id: 20,
      title: 'Event Opening Sequence',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
      description: 'Dramatic opening sequence for annual tech conference.',
      client: 'TechSummit',
      year: '2024'
    }
  ],
  '3d': [
    {
      id: 4,
      title: 'Product Visualization',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      description: 'Photorealistic 3D product renders for an electronics brand launch campaign.',
      client: 'TechWave',
      year: '2024'
    },
    {
      id: 8,
      title: 'Architectural Renders',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      description: 'Stunning 3D architectural visualizations for a real estate development.',
      client: 'Urban Heights',
      year: '2024'
    },
    {
      id: 21,
      title: 'Character Design',
      image: 'https://images.unsplash.com/photo-1633899306328-c5e70574aaa2?w=800&h=600&fit=crop',
      description: '3D character design and modeling for gaming company.',
      client: 'GameForge',
      year: '2023'
    },
    {
      id: 22,
      title: 'Interior Visualization',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
      description: 'Luxurious interior 3D renders for high-end real estate.',
      client: 'Elite Properties',
      year: '2024'
    },
    {
      id: 23,
      title: 'Product Packaging 3D',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      description: '3D packaging visualization for consumer products.',
      client: 'PackagePro',
      year: '2023'
    },
    {
      id: 24,
      title: 'Abstract 3D Art',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
      description: 'Abstract 3D artwork for digital art gallery exhibition.',
      client: 'Digital Arts Collective',
      year: '2024'
    }
  ]
};

// Category labels
const categoryLabels = {
  branding: 'Branding',
  'ui-ux': 'UI/UX Design',
  motion: 'Motion Graphics',
  '3d': '3D Design'
};

const AllProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.all-projects__header', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate categories
      gsap.from('.all-projects__category', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Open lightbox
  const openLightbox = (project, category) => {
    setSelectedProject({ ...project, category });
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  // Scroll to category
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveCategory(categoryId);
  };

  return (
    <div ref={pageRef} className="all-projects">
      {/* Header */}
      <header className="all-projects__header">
        <div className="container">
          <Link to="/" className="all-projects__back">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <h1 className="all-projects__title">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="all-projects__subtitle">
            Explore my complete portfolio organized by category
          </p>

          {/* Category Quick Links */}
          <div className="all-projects__quick-nav">
            <Filter size={18} />
            {Object.keys(categoryLabels).map((cat) => (
              <button
                key={cat}
                className={`all-projects__quick-link ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => scrollToCategory(cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Categories with Projects */}
      <main className="all-projects__content">
        <div className="container">
          {Object.entries(allProjects).map(([category, projects]) => (
            <section
              key={category}
              id={category}
              className="all-projects__category"
            >
              <div className="all-projects__category-header">
                <h2 className="all-projects__category-title">
                  {categoryLabels[category]}
                </h2>
                <span className="all-projects__category-count">
                  {projects.length} Projects
                </span>
              </div>

              <div className="all-projects__grid">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="all-projects__item"
                    onClick={() => openLightbox(project, category)}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="all-projects__image">
                      <img src={project.image} alt={project.title} />
                      <div className="all-projects__overlay">
                        <span className="all-projects__view">View Project</span>
                      </div>
                    </div>
                    <div className="all-projects__info">
                      <h3 className="all-projects__item-title">{project.title}</h3>
                      <span className="all-projects__client">{project.client}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="all-projects__lightbox" onClick={closeLightbox}>
          <div className="all-projects__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="all-projects__lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>

            <div className="all-projects__lightbox-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="all-projects__lightbox-info">
              <span className="all-projects__lightbox-category">
                {categoryLabels[selectedProject.category]}
              </span>
              <h2 className="all-projects__lightbox-title">{selectedProject.title}</h2>
              <p className="all-projects__lightbox-description">{selectedProject.description}</p>

              <div className="all-projects__lightbox-meta">
                <div className="all-projects__lightbox-meta-item">
                  <span className="all-projects__lightbox-label">Client</span>
                  <span className="all-projects__lightbox-value">{selectedProject.client}</span>
                </div>
                <div className="all-projects__lightbox-meta-item">
                  <span className="all-projects__lightbox-label">Year</span>
                  <span className="all-projects__lightbox-value">{selectedProject.year}</span>
                </div>
              </div>

              <Button variant="primary" icon={<ExternalLink size={18} />}>
                View Live Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
