import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminSearchAcc({ title, onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Pass the search query to the parent component
    };

    return (
        <div className='adminsearch-topcontainer'>
            <div className="search-container-acc">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder={title} 
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
}

export default AdminSearchAcc;
