/* ===========================================
   Footer Component
   Site footer with links and info
   =========================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

// Footer links
const footerLinks = {
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ],
  services: [
    { label: 'Logo Design', href: '#services' },
    { label: 'Brand Identity', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Motion Graphics', href: '#services' },
    { label: '3D Visuals', href: '#services' }
  ]
};

// Social links - open in new tab
const socialLinks = [
  { icon: <Instagram />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <Twitter />, label: 'Twitter', href: 'https://twitter.com' },
  { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Dribbble />, label: 'Dribbble', href: 'https://dribbble.com' }
];

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__column', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle link click
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        {/* Main Footer */}
        <div className="footer__main">
          {/* Brand Column */}
          <div className="footer__column footer__column--brand">
            <a href="#home" className="footer__logo">
              <span className="gradient-text">Studio</span>
            </a>
            <p className="footer__description">
              Creating meaningful designs that connect brands with their audience.
              Let's build something amazing together.
            </p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer__column">
            <h4 className="footer__title">Navigation</h4>
            <ul className="footer__links">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer__column">
            <h4 className="footer__title">Services</h4>
            <ul className="footer__links">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__column">
            <h4 className="footer__title">Get In Touch</h4>
            <div className="footer__contact">
              <a href="mailto:hello@designer.com" className="footer__contact-item">
                hello@designer.com
              </a>
              <a href="tel:+15551234567" className="footer__contact-item">
                +1 (555) 123-4567
              </a>
              <span className="footer__contact-item">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Studio. All rights reserved. Made with{' '}
            <Heart size={14} className="footer__heart" /> by Creative Designer
          </p>

          {/* Back to Top */}
          <button className="footer__back-to-top" onClick={scrollToTop}>
            <span>Back to Top</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12V4M8 4L4 8M8 4L12 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="footer__bg-text">STUDIO</div>
    </footer>
  );
};

export default Footer;
