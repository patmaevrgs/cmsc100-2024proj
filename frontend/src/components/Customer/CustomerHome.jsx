import image from '../../assets/logo.png';
import farm1 from '../../assets/farm1.jpeg';
import farm2 from '../../assets/farm2.jpeg';
import farm3 from '../../assets/farm3.jpeg';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CustomerHome() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [farm1, farm2, farm3];

    const handleStorePage = () => {
        navigate("/customer/storepage");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="customer-home">
            <div className='customer-home-top'>
                <div className='customer-left'>
                    <ul className="customer-home-title">
                        <li><img src={image} className="customer-home-logo" /></li>
                        <li className="customer-home-titletext">FieldFare</li>
                    </ul>
                    <h2>A farm-to-table e-commerce platform <br />by the Department of Agriculture</h2>
                    <p>Your direct link to farm-fresh produce: bringing the harvest <br />straight to your doorstep!</p>
                    <a href="#order">How to Order</a>
                </div>
                <div className='customer-right'>
                    <div className="slideshow-container">
                        <div className="slide fade">
                            <img src={images[currentImageIndex]} alt="Slide" style={{ width: '100%', height: '540px'}} className='slideshow-imgs' />
                        </div>
                        <a className="prev" onClick={handlePrev}>&#10094;</a>
                        <a className="next" onClick={handleNext}>&#10095;</a>
                    </div>
                </div>
            </div>
            <div className='rectangle'></div>
            <div>
                <h2 id='order' className='orderprocess'>Order Process</h2>
                <div className="process-steps-container">
                    <a href="#step1" className="diamond"><span><p className='ordernum'>1</p><p>BROWSE STORE</p></span></a>
                    <a href="#step2" className="diamond"><span><p className='ordernum'>2</p><p>SUBMIT ORDER</p></span></a>
                    <a href="#step3" className="diamond"><span><p className='ordernum'>3</p><p>WAIT FOR APPROVAL</p></span></a>
                    <a href="#step4" className="diamond"><span><p className='ordernum'>4</p><p>ORDER SECURED</p></span></a>
                </div>
                <div className="steps-container">
                    <div className="step" id='step1'>
                        <i className="fas fa-store" id='step-icon'/>
                        <div className="step-content">
                            <h3 className="step-title">Browse Shop</h3>
                            <p className="step-description">Explore our digital market to discover a bounty of farm-fresh staples, vibrant fruits and vegetables, hearty livestock, and succulent seafood—all sourced directly from local farms and fisheries.</p>
                        </div>
                    </div>
                    <div className="step" id='step2'>
                        <i className="fas fa-paper-plane" id='step-icon'/>
                        <div className="step-content">
                            <h3 className="step-title">Submit Order</h3>
                            <p className="step-description">After carefully selecting your farm-fresh favorites, simply proceed to submit your order. Confirm your chosen items, along with their quantities, in your shopping cart. Rest assured, all transactions are processed securely, with cash on delivery (COD) as the hassle-free payment method.</p>
                        </div>
                    </div>
                    <div className="step" id='step3'>
                        <i className="fas fa-hourglass-half" id='step-icon'/>
                        <div className="step-content">
                            <h3 className="step-title">Wait for Approval</h3>
                            <p className="step-description">Your order has been successfully submitted and is now awaiting approval from our admin team. During this time, our team will review your order details and ensure everything is in order. Once approved, your order will proceed to the next stage for fulfillment.</p>
                        </div>
                    </div>
                    <div className="step" id='step4'>
                        <i className="fas fa-shopping-bag" id='step-icon'/>
                        <div className="step-content">
                            <h3 className="step-title">Order Secured</h3>
                            <p className="step-description">Your order has been successfully processed and secured. It signifies that your transaction has been confirmed and your selected items are now reserved for you. Enjoy your fresh-farm goods!</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CustomerHome;
