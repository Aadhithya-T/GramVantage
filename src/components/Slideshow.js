// src/components/Slideshow.js
import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const slides = [
  { id: 1, text: "Discover new government schemes for your benefit." },
  { id: 2, text: "Explore job opportunities tailored for you." },
  { id: 3, text: "Connect with experts and fellow farmers on Agri-Connect." },
  { id: 4, text: "Stay updated on ongoing local projects." },
  { id: 5, text: "Support community initiatives through crowdfunding." },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
          <p>{slide.text}</p>
        </div>
      ))}
      <button className="prev" onClick={goToPrev}>&#10094;</button>
      <button className="next" onClick={goToNext}>&#10095;</button>
      <div className="dot-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
