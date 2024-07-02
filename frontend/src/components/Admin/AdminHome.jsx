import image from '../../assets/indicator.png';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Footer';

function AdminHome() {
  const [confirmedTotalPrice, setConfirmedTotalPrice] = useState(0);
  const [pendingTotalPrice, setPendingTotalPrice] = useState(0);
  const [totals, setTotals] = useState({ confirmedCount: 0, pendingCount: 0 });
  const today = new Date();
  const pending_orders = 3;
  // Format the day of the week in English
  const dayOptions = { weekday: 'long' };
  const day = today.toLocaleDateString('en-US', dayOptions);

  // Format the rest of the date in Filipino
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchTotals();
    fetchTotalPrices();
  }, []);

  function fetchCustomers() {
    fetch('http://localhost:3002/getcustomers')
      .then(response => response.json())
      .then(body => {
          setCustomers(body);
      });
  }

  function fetchTotals() {
    fetch('http://localhost:3002/total-counts')
      .then(response => response.json())
      .then(body => {
        setTotals(body);
      })
      .catch(error => {
        console.error('Error fetching totals:', error);
      });
  }

  const fetchTotalPrices = async () => {
    try {
      const response = await fetch('http://localhost:3002/total-prices');
      const data = await response.json();
      setConfirmedTotalPrice(data.confirmedTotal);
      setPendingTotalPrice(data.pendingTotal);
    } catch (error) {
      console.error('Error fetching total prices:', error);
    }
  };

  return (
    <>
    <div className='adminhome-container'> 
      <div className="adminhome-main">
        <h2>Hello, Admin!</h2>
        <p>Today is {day}, {formattedDate}.</p>
        <p>You have <b>{totals.pendingCount}</b> pending order requests.</p>
      </div>
      <div className="adminhome-reports">
        <div className="adminhome-each">
          <p className='adminhome-titles'><img src={image} className='adminhome-indicator'/>Order Requests</p>
          <div className="adminhome-each-in1">
            <div>
              <h3 className='admin-num'>{totals.confirmedCount}</h3>
              <p className='admin-label' >Total Requests</p>
            </div>
            <div>
              <h3 className='admin-num'>{totals.pendingCount}</h3>
              <p className='admin-label'>Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="adminhome-each">
          <p className='adminhome-titles'><img src={image} className='adminhome-indicator'/>Accounts</p>
          <div className='adminhome-each-in2'>
            <h3 className='admin-num'>{customers.length}</h3>
            <p className='admin-label'>Total Accounts</p>
          </div>
        </div>
        <div className="adminhome-each">
          <p className='adminhome-titles'><img src={image} className='adminhome-indicator'/>Balances</p>
          <div className="adminhome-each-in3">
            <div>
              <h3 className='admin-num'><i className="fas fa-peso-sign" />{confirmedTotalPrice}</h3>
              <p className='admin-label'>Confirmed</p>
            </div>
            <div>
              <h3 className='admin-num'><i className="fas fa-peso-sign" />{pendingTotalPrice}</h3>
              <p className='admin-label'>Pending</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
}
  
export default AdminHome;
  