import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="about">
            <h5>About Us</h5>
            <p>We are a leading provider of farm-fresh produce, dedicated to bringing the best quality products <br />from local farms to your doorstep.</p>
          </div>
          <div className="contact">
            <h5>Contact Us</h5>
            <ul className="contact-list">
              <li><i className="fas fa-envelope"></i> fieldfare@gmail.com</li>
              <li><i className="fas fa-phone"></i> +639 123 654 283</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright &#169; 2024 FieldFare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
