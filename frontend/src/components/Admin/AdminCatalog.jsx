import React, { useState, useEffect } from 'react';
import ProductForm from "./ProductForm";
import ProductsPage from "./ProductsPage";
import AdminTitle from "./AdminTitle";
import AdminSearch from "./AdminSearch";
import Footer from '../Footer';

function AdminCatalog() {
    const [products, setProducts] = useState([]);
    const [isDescending, setIsDescending] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [isDescending, sortCriteria]);

    function fetchProducts() {
        fetch('http://localhost:3002/getproducts')
            .then(response => response.json())
            .then(body => {
                sortProducts(body);
                setProducts(body);
            });
    }

    function sortProducts(list) {
        if (sortCriteria === 'name') {
            list.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (sortCriteria === 'price') {
            list.sort((a, b) => a.productPrice - b.productPrice);
        } else if (sortCriteria === 'quantity') {
            list.sort((a, b) => a.productQuantity - b.productQuantity);
        } else if (sortCriteria === 'type') {
            list.sort((a, b) => a.productType - b.productType);
        }
        if (isDescending) {
            list.reverse();
        }
    }

    const handleSearch = async (searchQuery) => {
        try {
            const response = await fetch(`http://localhost:3002/search?query=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to search products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleSortChange = (value, type) => {
        if (type === 'criteria') {
            setSortCriteria(value);
        } else if (type === 'order') {
            setIsDescending(value === 'desc');
        }
    };

    return (
        <div className="admincatalog-container">
            <AdminTitle title="Manage Catalog" />
            {/* <ProductForm /> */}
            <AdminSearch title="Search product name" onSearch={handleSearch} onSortChange={handleSortChange} setProducts={setProducts} />
            <ProductsPage initialProducts={products} onSearch={handleSearch} />
            <Footer />
        </div>
    );
}

export default AdminCatalog;
