import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;

// 3 categories x 6 unique plants each
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('photo-1593482892290-f54927ae1bb6'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('photo-1572688484438-313a6e50c333'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: img('photo-1593691509543-c55fb32d8de5'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('photo-1598880940371-c756e015fea1'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: img('photo-1598880513655-2a5bb7be7f7d'), description: 'Bold glossy leaves that absorb airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: img('photo-1509423350716-97f9360b4e09'), description: 'Purifies air and its gel soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('photo-1499002238440-d264edd596ec'), description: 'Calming scent that promotes relaxation.', cost: 20 },
      { name: 'Jasmine', image: img('photo-1592729645009-b96d1e63d14b'), description: 'Sweet fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: img('photo-1515586000433-45406d8e6662'), description: 'Woody aroma, great for cooking too.', cost: 15 },
      { name: 'Mint', image: img('photo-1628556270448-4d4e4148e1b1'), description: 'Refreshing scent and a kitchen staple.', cost: 12 },
      { name: 'Lemon Balm', image: img('photo-1615485290382-441e4d049cb5'), description: 'Citrusy aroma that eases stress.', cost: 14 },
      { name: 'Gardenia', image: img('photo-1602923668104-8f9e03e77e62'), description: 'Creamy white blooms with a rich perfume.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Jade Plant', image: img('photo-1509423350716-97f9360b4e09'), description: 'Symbol of good luck, easy to grow.', cost: 16 },
      { name: 'Echeveria', image: img('photo-1459156212016-c812468e2115'), description: 'Rosette-shaped succulent in soft pastel tones.', cost: 10 },
      { name: 'Haworthia', image: img('photo-1520412099551-62b6bafeb5bb'), description: 'Compact striped succulent for low light.', cost: 11 },
      { name: 'Barrel Cactus', image: img('photo-1485955900006-10f4d324d411'), description: 'Round, spiny cactus that loves the sun.', cost: 19 },
      { name: 'Bunny Ear Cactus', image: img('photo-1459411552884-841db9b3cc2a'), description: 'Fuzzy pads shaped like bunny ears.', cost: 13 },
      { name: 'String of Pearls', image: img('photo-1596724878582-76f3b3a5f2a7'), description: 'Trailing strands of bead-like leaves.', cost: 21 },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <div className="navbar-brand">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onPlantsClick}>Plants</button>
          <button className="nav-link cart-icon" onClick={onCartClick} aria-label="Cart">
            <svg viewBox="0 0 256 256" height="30" width="30" fill="#fff" aria-hidden="true">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
            <span className="cart-count">{totalItems}</span>
          </button>
        </div>
      </nav>

      {plantsArray.map((group) => (
        <section key={group.category}>
          <h2 className="category-title">{group.category}</h2>
          <div className="product-grid">
            {group.plants.map((plant) => (
              <div className="product-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} loading="lazy" />
                <h3>{plant.name}</h3>
                <p className="product-description">{plant.description}</p>
                <p className="product-price">${plant.cost}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.name)}
                >
                  {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
