import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from '../../assets/logo.png';
import profile from '../../assets/pictureprofile.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminNav({ title, name, func }) {
    const location = useLocation();

    return (
        <header>
            <div className="admin-nav-container">
                <ul className="admin-nav-navtop-left">
                    <li><img src={image} className="admin-nav-logo" alt="Logo" /></li>
                    <li className="admin-nav-title">{title}</li>
                </ul>
                <ul className="admin-nav-navtop-center">
                    <li><Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>HOME</Link></li>
                    <li><Link to="/admin/catalog" className={location.pathname === '/admin/catalog' ? 'active' : ''}>CATALOG</Link></li>
                    <li><Link to="/admin/accounts" className={location.pathname === '/admin/accounts' ? 'active' : ''}>ACCOUNTS</Link></li>
                    <li><Link to="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''}>ORDERS</Link></li>
                    <li><Link to="/admin/sales" className={location.pathname === '/admin/sales' ? 'active' : ''}>SALES</Link></li>
                </ul>
                <ul className="admin-nav-navtop-right">
                    <li className='logouticon' onClick={func}><i className="fas fa-sign-out-alt"></i></li>
                    <li className='admin-nav-name'>{name}</li>
                    <li><img src={profile} className="admin-nav-profile" alt="Profile" /></li>
                </ul>
            </div>
        </header>
    );
}

export default AdminNav;
