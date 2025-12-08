/* ===========================================
   Navbar Component
   Fixed navigation with scroll effects
   =========================================== */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation links
const navLinks = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Portfolio', href: '#portfolio', section: 'portfolio' },
  { label: 'Testimonials', href: '#testimonials', section: 'testimonials' },
  { label: 'Contact', href: '#contact', section: 'contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
      .from(linksRef.current, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out'
      }, '-=0.2');
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking (only on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const sections = navLinks.map(link => link.section);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      });
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Handle link click - navigate to home if not on home page
  const handleLinkClick = (e, href, section) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (!isHomePage) {
      // Navigate to home page first, then scroll to section
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      >
        <div className="container navbar__container">
          {/* Logo */}
          <a ref={logoRef} href="/" className="navbar__logo" onClick={handleLogoClick}>
            <span className="navbar__logo-text">
              <span className="gradient-text">Studio</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar__links">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <a
                  ref={(el) => (linksRef.current[index] = el)}
                  href={link.href}
                  className={`navbar__link ${isHomePage && activeSection === link.section ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href, link.section)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="navbar__cta">
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact', 'contact')}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="navbar__mobile">
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${isHomePage && activeSection === link.section ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href, link.section)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          variant="primary"
          size="lg"
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact', 'contact')}
        >
          Let's Talk
        </Button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
