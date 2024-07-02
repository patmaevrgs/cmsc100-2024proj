import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import AdminSearchAcc from './AdminSearchAcc';
import Footer from '../Footer';

function AdminAccounts() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    function fetchCustomers() {
        fetch('http://localhost:3002/getcustomers')
            .then(response => response.json())
            .then(body => {
                setCustomers(body);
                setFilteredCustomers(body); // Initialize filtered customers with all customers
            });
    }

    const handleSearch = (searchQuery) => {
        const filtered = customers.filter(customer =>
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

    return (
        <>
        <div className='admin-accounts-container'> 
            <AdminTitle title="Manage Accounts" />
            <div className='adminaccs-top'>
                <AdminSearchAcc title="Search account" onSearch={handleSearch} />
                <p className='totalaccs'>Total Customer Accounts: <b>{filteredCustomers.length}</b></p>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Usertype</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="4">No customers found</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer._id}>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.middleName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.userType}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer />
        </>
    );
}
  
export default AdminAccounts;
