import React from 'react';
import Navbar from './navbar';
import About from './About';
import Footer from './footer';
import Uppernavbar from '../Components/Uppernavbar';
import ImageSlider from '../Components/Imageslider';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Uppernavbar />
        <ImageSlider />
        <About />
      <Footer />
    </>
  );
};

export default HomePage;
