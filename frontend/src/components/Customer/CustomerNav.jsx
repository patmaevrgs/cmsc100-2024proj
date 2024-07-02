import image from '../../assets/logo.png';
import profile from '../../assets/pictureprofile.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CustomerNav({title, name, func}){
    const location = useLocation();
    
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const path = location.pathname;
        if (path === '/customer') {
            setActiveLink('home');
        } else if (path === '/customer/storepage') {
            setActiveLink('storepage');
        } else if (path === '/customer/orders') {
            setActiveLink('orders');
        } else if (path === '/customer/about') {
            setActiveLink('about');
        }
    }, [location]);

    return (
        <>
        <header>
            <div className="customer-nav-container">
                <ul className="customer-nav-navtop-left">
                    <li><img src={image} className="customer-nav-logo" /></li>
                    <li className="customer-nav-title">{title}</li>
                </ul>
                <ul className="customer-nav-navtop-center">
                    <li><Link to="/customer" className={activeLink === 'home' ? 'active' : ''}>HOME</Link></li>
                    <li><Link to="/customer/storepage" className={activeLink === 'storepage' ? 'active' : ''}>STORE</Link></li>
                    <li><Link to="/customer/orders" className={activeLink === 'orders' ? 'active' : ''}>ORDERS</Link></li>
                    {/* <li><Link to="/customer/about" className={activeLink === 'about' ? 'active' : ''}>ABOUT</Link></li> */}
                </ul>
                 <ul className="customer-nav-navtop-right">
      <li className='logouticon' onClick={func}>
        <i className="fas fa-sign-out-alt"></i>
      </li>
      <li className='customer-nav-name'>{name}</li>
      <li>
        <Link to="/customer/profile">
          <img src={profile} className="customer-nav-profile" alt="Profile" />
        </Link>
      </li>
    </ul>
            </div>
        </header>
        </>
    );
}

export default CustomerNav;
