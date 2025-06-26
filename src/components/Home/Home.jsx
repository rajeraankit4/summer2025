import React from 'react';
// import Navbar from './navbar';
// import About from './About';
// import Footer from './footer';
// import Uppernavbar from '../Components/Uppernavbar';
// import ImageSlider from '../Components/Imageslider';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './Featuresection';
import ExpenseTrackingSection from './Expensetrack';
import TestimonialsSection from './Testinomials';
import CTASection from './CTAsection';
import Footer from './Footer';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ExpenseTrackingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
    </>
  );
};

export default HomePage;
