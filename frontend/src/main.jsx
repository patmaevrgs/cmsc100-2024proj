import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AdminRoot from './pages/AdminRoot';
import CustomerRoot from './pages/CustomerRoot';
import StorePage from './components/Customer/StorePage.jsx';
import CustomerHome from './components/Customer/CustomerHome.jsx';
import CustomerOrders from './components/Customer/CustomerOrders.jsx';
import AdminHome from './components/Admin/AdminHome.jsx';
import AdminCatalog from './components/Admin/AdminCatalog.jsx';
import AdminAccounts from './components/Admin/AdminAccounts.jsx';
import AdminOrders from './components/Admin/AdminOrders.jsx';
import AdminSales from './components/Admin/AdminSales.jsx';
import CheckoutPage from './components/Customer/CheckoutPage.jsx';
import './stylesheet.css';
import ProfilePage from './components/Customer/ProfilePage.jsx';

const checkIfLoggedInOnHome = async () => {

  const res = await fetch("http://localhost:3002/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  console.log(`checkIfLoggedInHome: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);
  
  if (payload.isLoggedIn) {
    if(payload.userType=== "customer"){
      return redirect("/customer");
    }else if(payload.userType=== "admin"){
      return redirect("/admin");
    }
  } else {
    return 0;
  }
}

const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3002/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  console.log(`checkIfLoggedInOnDash: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);
    if (payload.isLoggedIn && payload.userType === "admin") {
      return true;
    } else {
      return redirect("/");
    }
}

const checkIfLoggedInOnCustomerPage = async () => {
  const res = await fetch("http://localhost:3002/checkifloggedin", {
    method: "POST",
    credentials: "include"
  });

  const payload = await res.json();
  console.log(`checkIfLoggedInOnCustomerPage: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);

  if (payload.isLoggedIn && payload.userType === "customer") {
    return true;
  } else {
    return redirect("/");
  }
}

const router = createBrowserRouter([
  { path: '/', element: <SignIn />, loader: checkIfLoggedInOnHome},
  { path: '/signup', element: <SignUp />, loader: checkIfLoggedInOnHome},
  { path: '/customer', element: <CustomerRoot />, loader: checkIfLoggedInOnCustomerPage, children:[
    { path: '/customer', element: <CustomerHome />},
    { path: '/customer/storepage', element: <StorePage />},
    { path: '/customer/orders', element: <CustomerOrders />},
    { path: '/customer/checkout', element: <CheckoutPage />},
    { path: '/customer/profile', element: <ProfilePage />},
  ]},
  { path: '/admin', element: <AdminRoot />, loader: checkIfLoggedInOnDash, children:[
    {path: '/admin', element: <AdminHome />},
    {path: '/admin/catalog', element: <AdminCatalog />},
    {path: '/admin/accounts', element: <AdminAccounts />},
    {path: '/admin/orders', element: <AdminOrders />},
    {path: '/admin/sales', element: <AdminSales />},
  ]},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
