import React from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ShoppingCart({ cart, removeFromCart, updateItemQuantity }) {
  const navigate = useNavigate();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    navigate("/customer/checkout", { state: { cart } });
  };

  return (
    <div className="shopping-cart">
      <h2 className="shopping-cart-title"><i className="fas fa-shopping-cart"></i>&nbsp;&nbsp;Shopping Cart [{totalQuantity}]</h2>
      <div className="cart-list">
        {cart.map(item => (
          <CartItem 
            key={item._id} 
            item={item} 
            removeFromCart={removeFromCart} 
            updateItemQuantity={updateItemQuantity} 
          />
        ))}
      </div>
      { cart.length > 0 && (
        <div className='checkout-container'>
          <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
