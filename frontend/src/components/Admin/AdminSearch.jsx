import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';
import ProductForm from './ProductForm';

Modal.setAppElement('#root'); // Set the root element for accessibility

function AdminSearch({ title, onSearch, onSortChange, setProducts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Pass the search query to the parent component
    };

    const handleSortCriteriaChange = (e) => {
        onSortChange(e.target.value, 'criteria');
    };

    const handleSortOrderChange = (e) => {
        onSortChange(e.target.value, 'order');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <div className='adminsearch-topcontainer'>
            <div className="search-container">
                <input 
                    type="text" className="search-input" 
                    placeholder={title} 
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className='catalog-sortby'>
                <label htmlFor="sortCriteria">Sort by: </label>
                <select id="sortCriteria" onChange={handleSortCriteriaChange} className='sortcriteria-btn'>
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="quantity">Quantity</option>
                    <option value="type">Type</option>
                </select>
            </div>
            <div className='catalog-orderby'>
                <label htmlFor="sortOrder">Order: </label>
                <select id="sortOrder" onChange={handleSortOrderChange} className='sortorder-btn'>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className='addproductbtn-container'>
                <button className='addproductbtn' onClick={openModal}> Add Product </button>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add Product"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <ProductForm closeModal={closeModal} setProducts={setProducts} />
        </Modal>
        </>
    );
}

export default AdminSearch;
