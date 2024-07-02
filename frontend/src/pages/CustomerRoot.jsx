import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerNav from '../components/Customer/CustomerNav';

function CustomerRoot() {
    const [customerFirstName, setCustomerFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage after successful login
    const userType = localStorage.getItem('userType');
    const firstName = localStorage.getItem('firstName');
    if (userType === 'customer' && firstName) {
      setCustomerFirstName(firstName);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication token stored in cookies
    const cookies = new Cookies();
    cookies.remove('authToken', { path: '/' });
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('cart')
    navigate('/'); // Redirect user to sign-in page
  };

  return (
    <div>
      <CustomerNav title="FieldFare" name={customerFirstName} func={handleLogout}/>
      <Outlet firstName={customerFirstName} />
    </div>
  );
}

export default CustomerRoot;
