/* ===========================================
   Home Page Component
   Main landing page with all sections
   =========================================== */

import {
  Hero,
  About,
  Services,
  Portfolio,
  Testimonials,
  Contact
} from '../components/sections';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
