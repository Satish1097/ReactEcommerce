import { useEffect, useState } from 'react';
import './assets/Home.css';

function Home() {
  const [userdata, setdata] = useState([]);
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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const x = data.filter(item => item.category === 'jewelery');
        setdata(data
          
        );
        console.log(x);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        toast.error("Data not found");  // Use toast.error if toast is imported
      });
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



     <div className="products">
  {userdata.map(e => (
    <div className="product-card" key={e.id} onClick={()=>ProductDetailed(key)}>
      <img src={e.image} alt={e.title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{e.title}</h2>
        <p className="product-category">{e.category}</p>
        <p className="product-price">
          <span className="original-price">Rs.{(e.price * 120 / 100).toFixed(2)}</span>
          <span className="discounted-price">Rs.{e.price.toFixed(2)}</span>
        </p>
      </div>
      <div className="product-buttons">
        <button className="btn-buy">Buy</button>
        <button className="btn-cart">Add to cart</button>
      </div>
    </div>
  ))};
      </div>
    </>
  );
}

export default Home;
