'use client'
import React, { useState, useEffect } from 'react';
import { NextButton, PrevButton } from './CarouselButtons';

interface CarouselProps {
  images: string[];
  interval?: number; // Добавляем необязательное свойство для задания интервала автопереключения
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 4000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div className="carousel">
      
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <div className="embla__buttons object-center">
          <PrevButton onClick={goToPrevImage} />
          <NextButton onClick={goToNextImage} />
        </div>
      
    </div>
  );
};

export default Carousel;
