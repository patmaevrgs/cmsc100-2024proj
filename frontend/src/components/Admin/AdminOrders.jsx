import React, { useEffect, useState } from 'react';
import AdminTitle from './AdminTitle';
import Footer from '../Footer';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('http://localhost:3002/pending-transactions');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const confirmOrder = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:3002/update-transaction-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionId, status: 1 })
      });
      const result = await response.json();

      if (result.success) {
        alert('Order confirmed successfully');
        fetchPendingOrders(); // Refresh the orders list
      } else {
        alert('Failed to confirm order');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const cancelOrder = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:3002/cancel-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionId })
      });
      const result = await response.json();

      if (result.success) {
        alert('Order cancelled successfully');
        fetchPendingOrders(); // Refresh the orders list
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

    function getStatusText(status) {
        switch(status) {
            case 0:
                return "Pending";
            case 1:
                return "Complete";
            case 2:
                return "Canceled";
            default:
                return "Unknown";
        }
    }

    return (
    <div className="admin-orders1">
        <AdminTitle title="Manage Order Requests" />
        <div className='orders-section1'>
            {orders.length === 0 ? (
                <p className="no-orders1">No pending orders.</p>
            ) : (
                orders.map(order => (
                <div key={order._id} className="order-card1">
                    <div className="order-header1">
                    <h3 className='order-id-title'>Order ID: {order._id}</h3>
                    </div>
                    <div className="order-details1">
                        <p><strong>Email:</strong> {order.userId?.email}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {order.time}</p>
                        <div className="order-products1">
                            <p><strong>Products:</strong></p>
                            <div className="product-list1">
                            {order.products.map((product, index) => (
                                <div key={index} className="product-item1">
                                <p><strong>Name:</strong> {product.productId?.productName}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                        <p><strong>Order Status:</strong> {getStatusText(order.status)}</p>
                        <div className="order-actions1">
                            <button className="cancel-button1" onClick={() => cancelOrder(order._id)}>Decline</button>
                            <button className="confirm-button1" onClick={() => confirmOrder(order._id)}>Approve</button>
                        </div>
                    </div>
                </div>
                ))
            )}
        </div>
        <Footer />
    </div>
  );
}

export default AdminOrders;
