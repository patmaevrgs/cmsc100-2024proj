import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CartItem({ item, removeFromCart, updateItemQuantity }) {
    const { _id, productName, productPrice, productImage, quantity, availableQuantity } = item;

    const handleRemoveFromCart = () => {
        removeFromCart(item);
        console.log(`Removed all ${productName}s from cart!`);
    };

    const handleIncrease = () => {
        if (quantity < availableQuantity) {
            updateItemQuantity(item, quantity + 1);
            console.log(`Added ${productName} to cart!`);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateItemQuantity(item, quantity - 1);
            console.log(`Removed ${productName} from cart!`);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 1 && value <= availableQuantity) {
            updateItemQuantity(item, value);
        }
    };

    return (
        <div className="cart-item">
            <img src={productImage} alt={productName} className="cart-item-image" />
            <h3 className="cart-item-name">{productName}</h3>
            <p className="cart-item-quantity">
                <button className="quantity-decrease" onClick={handleDecrease}>-</button>
                <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    min="1"
                    max={availableQuantity}
                    onChange={handleQuantityChange}
                />
                <button className="quantity-increase" onClick={handleIncrease}>+</button>
            </p>
            <p className="cart-item-price"><i className="fas fa-peso-sign" />{productPrice * quantity}</p>
            <button className="remove-from-cart-button" onClick={handleRemoveFromCart}>Remove Item</button>
        </div>
    );
}

export default CartItem;
