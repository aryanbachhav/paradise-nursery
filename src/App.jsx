import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // 'landing' | 'plants' | 'cart'
  const [page, setPage] = useState('landing');

  if (page === 'plants') {
    return (
      <ProductList
        onHomeClick={() => setPage('landing')}
        onPlantsClick={() => setPage('plants')}
        onCartClick={() => setPage('cart')}
      />
    );
  }

  if (page === 'cart') {
    return (
      <CartItem
        onHomeClick={() => setPage('landing')}
        onPlantsClick={() => setPage('plants')}
        onCartClick={() => setPage('cart')}
        onContinueShopping={() => setPage('plants')}
      />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => setPage('plants')}>
            Get Started
          </button>
        </div>
        <div className="about-us-container">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default App;
