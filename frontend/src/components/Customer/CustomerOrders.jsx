import React, { useEffect, useState } from 'react';
import AdminTitle from '../Admin/AdminTitle';
import Footer from '../Footer';

function CustomerOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [activeSection, setActiveSection] = useState('pending'); // Default to 'pending'

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      const userId = localStorage.getItem('user');
      const response = await fetch(`http://localhost:3002/customer-orders/${userId}`);
      const data = await response.json();
      setPendingOrders(data.pendingOrders);
      setConfirmedOrders(data.confirmedOrders);
      setCanceledOrders(data.canceledOrders);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3002/cancel-order/${orderId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert('Order cancelled successfully');
        fetchCustomerOrders();
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  function getStatusText(status) {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
      case 2:
        return "Cancelled";
      default:
        return "Unknown";
    }
  }

  return (
    <>
    <div className='customer-orders'>
      <AdminTitle title="My Orders" />
      <div className='customer-orders-container'>
        <div className='section-buttons'>
          <button className={activeSection === 'pending' ? 'active' : ''} onClick={() => setActiveSection('pending')}>Pending</button>
          <button className={activeSection === 'confirmed' ? 'active' : ''} onClick={() => setActiveSection('confirmed')}>Confirmed</button>
          <button className={activeSection === 'cancelled' ? 'active' : ''} onClick={() => setActiveSection('cancelled')}>Cancelled</button>
        </div>
        {activeSection === 'pending' && (
          <div>
            <div className='customer-pending-orders'>
              {pendingOrders.length === 0 ? (
                <p className='customer-no-orders'>No Pending Orders.</p>
              ) : (
                pendingOrders.map(order => (
                  <div key={order._id} className='customer-order-card'>
                    <div className='customer-order-header'>
                      <h3>Order ID: {order._id}</h3>
                    </div>
                    <div className='customer-order-details'>
                      <div className='customer-order-products'>
                        <p><strong>Products:</strong></p>
                        <div className='customer-order-product-list'>
                          {order.products.map((product, index) => (
                            <div key={index} className='customer-product-item'>
                              <p><strong>Name:</strong> {product.productId?.productName}</p>
                              <p><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                      <div className='cancel-order-button-container'>
                        {order.status === 0 && (
                          <button className='cancel-order-button' onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeSection === 'confirmed' && (
          <div>
            <div className='customer-confirmed-orders'>
              {confirmedOrders.length === 0 ? (
                <p className='customer-no-orders'>No Confirmed Orders.</p>
              ) : (
                confirmedOrders.map(order => (
                  <div key={order._id} className='customer-order-card'>
                    <div className='customer-order-header'>
                      <h3>Order ID: {order._id}</h3>
                    </div>
                    <div className='customer-order-details'>
                      <div className='customer-order-products'>
                        <p><strong>Products:</strong></p>
                        <div className='customer-order-product-list'>
                          {order.products.map((product, index) => (
                            <div key={index} className='customer-product-item'>
                              <p><strong>Name:</strong> {product.productId?.productName}</p>
                              <p><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeSection === 'cancelled' && (
          <div>
            <div className='customer-cancelled-orders'>
              {canceledOrders.length === 0 ? (
                <p className='customer-no-orders'>No Cancelled Orders.</p>
              ) : (
                canceledOrders.map(order => (
                  <div key={order._id} className='customer-order-card'>
                    <div className='customer-order-header'>
                      <h3>Order ID: {order._id}</h3>
                    </div>
                    <div className='customer-order-details'>
                      <div className='customer-order-products'>
                        <p><strong>Products:</strong></p>
                        <div className='customer-order-product-list'>
                          {order.products.map((product, index) => (
                            <div key={index} className='customer-product-item'>
                              <p><strong>Name:</strong> {product.productId?.productName}</p>
                              <p><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default CustomerOrders;
