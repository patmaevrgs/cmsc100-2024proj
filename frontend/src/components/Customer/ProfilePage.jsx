import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; 
import image from '../../assets/aliceguo.png';

function ProfilePage({ initialUser }) {
    const [user, setUser] = useState(initialUser || {});
    const [formValues, setFormValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [transactions, setTransactions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('user');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/user-deets/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user: ${response.statusText}`);
                }

                const userData = await response.json();
                setUser(userData);
                setFormValues({
                    firstName: userData.firstName || '',
                    middleName: userData.middleName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    password: ''
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem('user');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/user-transactions/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
                }

                const transactionsData = await response.json();
                console.log('Fetched transactions data:', transactionsData);

                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await fetch(`http://localhost:3002/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const responseData = await response.json();
            setUser(responseData.user);
            setFormValues({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                password: '',
            });

            console.log('User updated successfully:', responseData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const formatProducts = (products) => {
        return products.map(product => `${product.productId.productName} - ${product.quantity}`).join(', ');
    };

    return (
        <>
        <div className="profile-container"> 
            <div className='content'>
                <div className='profile-cont'>
                    <h2 className="profile-heading">Profile</h2> 
                    <img src={image} className='alice'/>
                </div>
                <div className="profile-details"> 
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Middle Name:</strong> {user.middleName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>User Type:</strong> {user.userType}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <button className="profile-button" onClick={() => setShowForm(!showForm)}> 
                    {showForm ? 'Hide Form' : 'Edit Profile'}
                </button>
                {showForm && (
                    <form className="profile-form" onSubmit={handleUpdate}> 
                        <div>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
            />
        </div>
        <div>
            <label htmlFor="middleName">Middle Name:</label>
            <input
                type="text"
                id="middleName"
                name="middleName"
                value={formValues.middleName}
                onChange={handleChange}
                autoComplete="additional-name"
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                autoComplete="email"
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
            />
        </div>
        <button className='updateprofilebtn' type="submit">Update Profile</button>
                    </form>
                )}
                <div className='transaction-cont'>
                    <h3>Transactions</h3>
                    {transactions.length > 0 ? (
                        <ul>
                            {transactions.map((transaction) => (
                                <li key={transaction._id}>
                                    <p><strong>Order ID:</strong> {transaction._id}</p>
                                    <p><strong>Products Purchased:</strong> {formatProducts(transaction.products)}</p>
                                    <p><strong>Date and Time:</strong> {`${new Date(transaction.date).toLocaleDateString()} at ${transaction.time}`}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No transactions found.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default ProfilePage;
