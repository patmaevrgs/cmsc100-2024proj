import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productTypeOptions = [
    { value: 1, label: 'Staple' },
    { value: 2, label: 'Fruits and Vegetables' },
    { value: 3, label: 'Livestock' },
    { value: 4, label: 'Seafood' },
    { value: 5, label: 'Others' },
];

function ProductForm({ closeModal, setProducts }) {
    const [productImage, setProductImage] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState(productTypeOptions[0].value); // Default to the first option
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productImage, productName, productDescription, productType, productQuantity, productPrice }),
            });
            const data = await response.json();
            if (data.success) {
                setProducts((prevProducts) => [...prevProducts, data.product]); // Add the new product to the list
                closeModal(); // Close the modal
                navigate('/admin/catalog'); // Navigate to the catalog page
            } else {
                alert('Error: Unable to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error: Unable to add product');
        }
    };

    return (
        <div>
            <h2 className='modal-title'>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-modal'>
                    <label className='edit-label'>Product Image</label>
                    <input
                        type="text"
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal'>
                    <label className='edit-label'>Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal'>
                    <label className='edit-label'>Product Description</label>
                    <input
                        type="text"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal'>
                    <label className='edit-label'>Product Type</label>
                    <select className='product-type-dropdown'
                        value={productType}
                        onChange={(e) => setProductType(Number(e.target.value))} // Convert the selected value to a number
                        required
                    >
                        {productTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-modal'>
                    <label className='edit-label'>Product Quantity</label>
                    <input
                        type="number"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal'>
                    <label className='edit-label'>Product Price</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className='modal-btns'>
                    <button type="button" className='modal-cancel-btn' onClick={closeModal}>Cancel</button>
                    <button type="submit" className='modal-update-btn'>Add</button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
