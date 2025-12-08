/* ===========================================
   Contact Section Component
   Contact form with animations
   =========================================== */

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Instagram,
  Twitter,
  Linkedin,
  Dribbble
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

// Contact info
const contactInfo = [
  {
    icon: <Mail />,
    label: 'Email',
    value: 'hello@designer.com',
    href: 'mailto:hello@designer.com'
  },
  {
    icon: <Phone />,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: <MapPin />,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#'
  }
];

// Social links - open in new tab
const socialLinks = [
  { icon: <Instagram />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <Twitter />, label: 'Twitter', href: 'https://twitter.com' },
  { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Dribbble />, label: 'Dribbble', href: 'https://dribbble.com' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          once: true
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Info animation
      gsap.from(infoRef.current?.children, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          once: true
        },
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Success animation
    gsap.fromTo(successRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Reset after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="contact section" id="contact">
      {/* Background */}
      <div className="contact__bg">
        <div className="contact__bg-gradient"></div>
      </div>

      <div className="container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind? Let's create something amazing together"
        />

        <div className="contact__wrapper">
          {/* Form */}
          <div ref={formRef} className="contact__form-container">
            {!isSubmitted ? (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className={`contact__input-group ${focusedField === 'name' ? 'focused' : ''}`}>
                    <label htmlFor="name" className="contact__label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="contact__input"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <span className="contact__input-border"></span>
                  </div>

                  <div className={`contact__input-group ${focusedField === 'email' ? 'focused' : ''}`}>
                    <label htmlFor="email" className="contact__label">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="contact__input"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <span className="contact__input-border"></span>
                  </div>
                </div>

                <div className={`contact__input-group ${focusedField === 'subject' ? 'focused' : ''}`}>
                  <label htmlFor="subject" className="contact__label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="contact__input"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <span className="contact__input-border"></span>
                </div>

                <div className={`contact__input-group ${focusedField === 'message' ? 'focused' : ''}`}>
                  <label htmlFor="message" className="contact__label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact__input contact__textarea"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                  ></textarea>
                  <span className="contact__input-border"></span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<Send size={18} />}
                  className={isSubmitting ? 'submitting' : ''}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div ref={successRef} className="contact__success">
                <div className="contact__success-icon">
                  <CheckCircle size={64} />
                </div>
                <h3 className="contact__success-title">Message Sent!</h3>
                <p className="contact__success-text">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="contact__info">
            {/* Contact Details */}
            <div className="contact__info-card">
              <h3 className="contact__info-title">Contact Info</h3>
              <div className="contact__info-list">
                {contactInfo.map((item) => (
                  <a key={item.label} href={item.href} className="contact__info-item">
                    <div className="contact__info-icon">{item.icon}</div>
                    <div className="contact__info-content">
                      <span className="contact__info-label">{item.label}</span>
                      <span className="contact__info-value">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="contact__social-card">
              <h3 className="contact__info-title">Follow Me</h3>
              <div className="contact__social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="contact__social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="contact__availability">
              <div className="contact__availability-dot"></div>
              <span>Currently available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
