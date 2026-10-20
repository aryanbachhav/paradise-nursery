import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onHomeClick, onPlantsClick, onCartClick, onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal for a single plant line
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Grand total across all plants
  const calculateTotalAmount = () =>
    items.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would drop to 0, so remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setShowCheckoutMessage(true);
  };

  return (
    <div>
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

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount()}</div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-cost">Unit price: ${item.cost}</p>
                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => handleDecrement(item)}>
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => handleIncrement(item)}>
                    +
                  </button>
                </div>
                <p className="cart-item-total">Total: ${calculateTotalCost(item)}</p>
              </div>
              <button className="delete-button" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          ))
        )}

        <div className="cart-actions">
          <button className="continue-shopping-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>

        {showCheckoutMessage && (
          <p className="checkout-message">Checkout: Coming Soon!</p>
        )}
      </div>
    </div>
  );
}

export default CartItem;
