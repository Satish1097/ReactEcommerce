import React, { useEffect } from 'react';
import './assets/CAnimate.css';

function CAnimate() {
  useEffect(() => {
    const carouselInner = document.querySelector('.carouselInner');
    const prevBtn = document.querySelector('.carouselControlPrev');
    const nextBtn = document.querySelector('.carouselControlNext');

    let currentIndex = 0;
    const itemCount = carouselInner.children.length;

    function moveCarousel(direction) {
      if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      } else {
        currentIndex = (currentIndex + 1) % itemCount;
      }
      carouselInner.style.transform = `translateX(-${currentIndex * 20}%)`;
    }

    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    nextBtn.addEventListener('click', () => moveCarousel('next'));

    // Cleanup function to remove event listeners
    return () => {
      prevBtn.removeEventListener('click', () => moveCarousel('prev'));
      nextBtn.removeEventListener('click', () => moveCarousel('next'));
    };
  }, []);

  return (
    <>
      <div className="carouselContainer">
        <div className="carouselInner">
          <div className="carouselItem">
            <img src="images/image1.jpeg" alt="Image 1" />
          </div>
          <div className="carouselItem">
            <img src="images/image2.png" alt="Image 2" />
          </div>
          <div className="carouselItem">
            <img src="images/image3.png" alt="Image 3" />
          </div>
          <div className="carouselItem">
            <img src="images/image4.png" alt="Image 4" />
          </div>
          <div className="carouselItem">
            <img src="images/image5.png" alt="Image 5" />
          </div>
        </div>
        <button className="carouselControlPrev">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carouselControlNext">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

export default CAnimate;
