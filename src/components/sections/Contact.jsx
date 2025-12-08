/* ===========================================
   Contact Section Component
   Contact form with EmailJS integration
   =========================================== */

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
  Loader2
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_6izrbyg';
const EMAILJS_TEMPLATE_ID = 'template_3q7v1ve';
const EMAILJS_PUBLIC_KEY = 'gHMkjU3VqkT1916z3';

// Contact info
const contactInfo = [
  {
    icon: <Mail />,
    label: 'Email',
    value: 'alleabdo301@gmail.com',
    href: 'mailto:alleabdo301@gmail.com'
  },
  {
    icon: <Phone />,
    label: 'Phone',
    value: '+212 625 034 547',
    href: 'tel:+212625034547'
  },
  {
    icon: <MapPin />,
    label: 'Location',
    value: 'Morocco',
    href: '#'
  }
];

// Social links
const socialLinks = [
  { icon: <Instagram />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <Twitter />, label: 'Twitter', href: 'https://twitter.com' },
  { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Dribbble />, label: 'Dribbble', href: 'https://dribbble.com' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const formElementRef = useRef(null);
  const infoRef = useRef(null);
  const statusRef = useRef(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'alleabdo301@gmail.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');

      // Success animation
      setTimeout(() => {
        if (statusRef.current) {
          gsap.fromTo(statusRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      }, 100);

      // Reset form after delay
      setTimeout(() => {
        setSubmitStatus(null);
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');

      // Error animation
      setTimeout(() => {
        if (statusRef.current) {
          gsap.fromTo(statusRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      }, 100);

      // Reset error after delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }

    setIsSubmitting(false);
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
            {submitStatus === null ? (
              <form
                ref={formElementRef}
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="contact__form-row">
                  {/* Name Field */}
                  <div className={`contact__input-group ${focusedField === 'from_name' ? 'focused' : ''} ${errors.from_name ? 'error' : ''}`}>
                    <label htmlFor="from_name" className="contact__label">Your Name</label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      className="contact__input"
                      value={formData.from_name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    <span className="contact__input-border"></span>
                    {errors.from_name && <span className="contact__error">{errors.from_name}</span>}
                  </div>

                  {/* Email Field */}
                  <div className={`contact__input-group ${focusedField === 'from_email' ? 'focused' : ''} ${errors.from_email ? 'error' : ''}`}>
                    <label htmlFor="from_email" className="contact__label">Your Email</label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      className="contact__input"
                      value={formData.from_email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    <span className="contact__input-border"></span>
                    {errors.from_email && <span className="contact__error">{errors.from_email}</span>}
                  </div>
                </div>

                {/* Subject Field */}
                <div className={`contact__input-group ${focusedField === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''}`}>
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
                    placeholder="Project Inquiry"
                    disabled={isSubmitting}
                  />
                  <span className="contact__input-border"></span>
                  {errors.subject && <span className="contact__error">{errors.subject}</span>}
                </div>

                {/* Message Field */}
                <div className={`contact__input-group ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''}`}>
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
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                  ></textarea>
                  <span className="contact__input-border"></span>
                  {errors.message && <span className="contact__error">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={isSubmitting ? <Loader2 size={18} className="spinning" /> : <Send size={18} />}
                  className={isSubmitting ? 'submitting' : ''}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div ref={statusRef} className={`contact__status contact__status--${submitStatus}`}>
                <div className="contact__status-icon">
                  {submitStatus === 'success' ? (
                    <CheckCircle size={64} />
                  ) : (
                    <AlertCircle size={64} />
                  )}
                </div>
                <h3 className="contact__status-title">
                  {submitStatus === 'success' ? 'Message Sent!' : 'Oops! Something went wrong'}
                </h3>
                <p className="contact__status-text">
                  {submitStatus === 'success'
                    ? "Thank you for reaching out. I'll get back to you as soon as possible."
                    : "Please try again or contact me directly via email."}
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
