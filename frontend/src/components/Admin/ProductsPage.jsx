import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility, should be the root element of your app

function ProductsPage({ initialProducts, onSearch }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        productImage: '',
        productName: '',
        productDescription: '',
        productType: '',
        productQuantity: '',
        productPrice: '',
    });

    useEffect(() => {
        setProducts(initialProducts || []); // Update products state when initialProducts prop changes
        setFilteredProducts(initialProducts || []); // Update filteredProducts state similarly
    }, [initialProducts]);

    const handleSearch = (searchQuery) => {
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        onSearch(searchQuery);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter(product => product._id !== id));
            setFilteredProducts(filteredProducts.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product._id);
        setFormValues({
            productImage: product.productImage,
            productName: product.productName,
            productDescription: product.productDescription,
            productType: product.productType,
            productQuantity: product.productQuantity,
            productPrice: product.productPrice,
        });
        setIsModalOpen(true); // Show the modal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3002/products/${editProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const updatedProduct = await response.json();
            setProducts(products.map(product =>
                product._id === editProduct ? updatedProduct.product : product
            ));
            setFilteredProducts(filteredProducts.map(product =>
                product._id === editProduct ? updatedProduct.product : product
            ));
            setEditProduct(null);
            setFormValues({
                productImage: '',
                productName: '',
                productDescription: '',
                productType: '',
                productQuantity: '',
                productPrice: '',
            });
            setIsModalOpen(false); // Hide the modal
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const productTypeOptions = [
        { value: 1, label: 'Staple' },
        { value: 2, label: 'Fruits/Vegetables' },
        { value: 3, label: 'Livestock' },
        { value: 4, label: 'Seafood' },
        { value: 5, label: 'Others' },
    ];

    const getProductTypeLabel = (type) => {
        const option = productTypeOptions.find(option => option.value === parseInt(type));
        return option ? `${option.label} (${type})` : type;
    };

    return (
        <div>
            <div className='product-container'>
                {filteredProducts.map(product => (
                    <div key={product._id}>
                        <div className='product-each'>
                            <img src={product.productImage} alt={product.productName} />
                            <div className='product-each-info'>
                                <div className='name-price'>
                                    <p className='product-name'>{product.productName}</p>
                                    <p className='product-price'><i className="fas fa-peso-sign" />&nbsp;{product.productPrice}</p>
                                </div>
                                <p className='product-desc'>Description: {product.productDescription}</p>
                                <div className='type-qty'>
                                    <p className='product-type'>{getProductTypeLabel(product.productType)}</p>
                                    <p className='product-quantity'>Qty: {product.productQuantity}</p>
                                </div>
                                <div className='product-btns'>
                                    <button className='product-editbtn' onClick={() => handleEdit(product)}><i className="fas fa-pencil-alt" /></button>
                                    <button className='product-delbtn' onClick={() => handleDelete(product._id)}><i className="fas fa-trash" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Edit Product"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2 className='modal-title'>Edit Product</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className='input-modal'>
                            <label className='edit-label'>Product Image</label>
                            <input
                                type="text"
                                name="productImage"
                                value={formValues.productImage}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal'>
                            <label className='edit-label'>Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                value={formValues.productName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal'>
                            <label className='edit-label'>Product Description</label>
                            <input
                                type="text"
                                name="productDescription"
                                value={formValues.productDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal'>
                            <label className='edit-label'>Product Type</label>
                            <select
                                name="productType"
                                value={formValues.productType}
                                onChange={handleChange}
                                className='product-type-dropdown'
                                required
                            >
                                {productTypeOptions.map(option => (
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
                                name="productQuantity"
                                value={formValues.productQuantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal'>
                            <label className='edit-label'>Product Price</label>
                            <input
                                type="number"
                                name="productPrice"
                                value={formValues.productPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='modal-btns'>
                            <button type="button" className='modal-cancel-btn' onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button type="submit" className='modal-update-btn'>Update</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default ProductsPage;
