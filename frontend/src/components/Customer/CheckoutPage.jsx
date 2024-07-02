import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminTitle from '../Admin/AdminTitle';

function CheckoutPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");
  const email = localStorage.getItem("email"); // Assuming email is also stored in localStorage
  console.log('User ID from localStorage:', userId);
  console.log('Email from localStorage:', email); // Log email to ensure it's being retrieved

  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Cart:', cart);
    console.log('Email:', email);
  }, [location.state]);

  const totalPrice = cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);

  function FieldGetterChecker() {
    const currentStatus = 0;
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(' ')[0];

    const products = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    addTransaction(products, currentStatus, currentDate, currentTime, userId, email);
    localStorage.removeItem('cart');
  }

  const addTransaction = async (products, currentStatus, currentDate, currentTime, userId, email) => {
    console.log('Sending data:', { products, status: currentStatus, date: currentDate, time: currentTime, userId, email }); // Log data being sent
    await fetch("http://localhost:3002/add-transaction", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products, status: currentStatus, date: currentDate, time: currentTime, userId, email })
    })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        alert("Successfully Requested");
        navigate('/customer/orders');
      } else {
        alert("Request Failed");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className='checkout-whole'>
      <AdminTitle title="Order Confirmation" />
      <div className='checkout-page-container'>
        <p className='mot'><strong>Mode of Transaction:</strong> COD</p>
        <div className="checkout-cart">
          {cart.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            cart.map(item => (
              <div key={item._id} className="checkout-cart-item">
                <img src={item.productImage} alt={item.productName} width="100" height="50" className='checkout-image'/>
                <h3>{item.productName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: <i className="fas fa-peso-sign" />{item.productPrice}</p>
                <p>Total: <i className="fas fa-peso-sign" />{item.productPrice * item.quantity}</p>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="checkout-total">
            <h3>Total Price: <i className="fas fa-peso-sign" />{totalPrice.toFixed(2)}</h3>
          </div>
        )}
        <div className='confirm-order-button-container'>
          <button id='confirm-order-button' onClick={FieldGetterChecker}>Confirm order</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
