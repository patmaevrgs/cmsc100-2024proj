import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';
import ReactPaginate from 'react-paginate';
import '@fortawesome/fontawesome-free/css/all.min.css';
import image from '../../assets/storeimg.png';
import Footer from '../Footer';

function StorePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortOption, setSortOption] = useState('priceAsc');
  const [isCartVisible, setIsCartVisible] = useState(false); 

  useEffect(() => {
    fetchProducts();
    loadCartFromLocalStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/getproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'nameAsc':
        return products.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'nameDesc':
        return products.sort((a, b) => b.productName.localeCompare(a.productName));
      case 'priceAsc':
        return products.sort((a, b) => a.productPrice - b.productPrice);
      case 'priceDesc':
        return products.sort((a, b) => b.productPrice - a.productPrice);
      case 'typeAsc':
        return products.sort((a, b) => a.productType - b.productType);
      case 'typeDesc':
        return products.sort((a, b) => b.productType - a.productType);
      case 'quantityAsc':
        return products.sort((a, b) => a.productQuantity - b.productQuantity);
      case 'quantityDesc':
        return products.sort((a, b) => b.productQuantity - a.productQuantity);
      default:
        return products;  
    }
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (product) => {
    const productIndex = cart.findIndex(item => item._id === product._id);
    let updatedCart;
    if (productIndex !== -1) {
      if (cart[productIndex].quantity < product.productQuantity) {
        updatedCart = cart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart];
      }
    } else {
      updatedCart = [...cart, { ...product, quantity: 1, availableQuantity: product.productQuantity }];
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(true);
  };

  const removeFromCart = (removeProduct) => {
    const updatedCart = cart.filter(product => product._id !== removeProduct._id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(cart.length > 1);
  };

  const updateItemQuantity = (product, updatedQuantity) => {
    let updatedCart;
    if (updatedQuantity === 0) {
      updatedCart = cart.filter(item => item._id !== product._id);
    } else {
      updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: updatedQuantity } : item
      );
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(updatedQuantity > 0);
  };

  return (
    <div className="app">
      <img src={image} className='store-img' />
      <div className="sort-options">
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="nameAsc">Name (A to Z)</option>
          <option value="nameDesc">Name (Z to A)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="typeAsc">Type (A to Z)</option>
          <option value="typeDesc">Type (Z to A)</option>
          <option value="quantityAsc">Quantity (Low to High)</option>
          <option value="quantityDesc">Quantity (High to Low)</option>
        </select>
      </div>
      <div className='product-cart-cont'>
        <div className="product-list">
          {sortProducts(products).map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
        {isCartVisible && (
          <div className='shopping-cart-main'>
            <ShoppingCart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateItemQuantity={updateItemQuantity} 
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default StorePage;
