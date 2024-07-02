import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Footer';

function AdminSales() {
    const [mergedOrders, setMergedOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [timeRange, setTimeRange] = useState('weekly'); // Default to weekly

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await fetch('http://localhost:3002/sales-report');
                const data = await response.json();
                console.log(data);

                const filteredData = filterDataByTimeRange(data, timeRange);

                const merged = filteredData.reduce((acc, order) => {
                    order.products.forEach(product => {
                        const existingOrder = acc.find(item => item.productId === product.productId._id);
                        if (existingOrder) {
                            existingOrder.quantity += product.quantity;
                            existingOrder.totalSales += product.quantity * (product.productId.productPrice || 0);
                        } else {
                            acc.push({
                                productId: product.productId._id,
                                productName: product.productId.productName,
                                quantity: product.quantity,
                                unitPrice: product.productId.productPrice || 0,
                                totalSales: product.quantity * (product.productId.productPrice || 0)
                            });
                        }
                    });
                    return acc;
                }, []);

                setMergedOrders(merged);

                const total = merged.reduce((acc, order) => acc + order.totalSales, 0);
                setTotalSales(total);
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };

        fetchCompletedOrders();
    }, [timeRange]);

    const filterDataByTimeRange = (data, range) => {
        const now = new Date(); // Current date and time
    
        return data.filter(order => {
            const orderDate = new Date(order.date);
    
            if (range === 'weekly') {
                const oneWeekAgo = new Date(now);
                oneWeekAgo.setDate(now.getDate() - 7);
                return orderDate >= oneWeekAgo;
            } else if (range === 'monthly') {
                const oneMonthAgo = new Date(now);
                oneMonthAgo.setMonth(now.getMonth() - 1);
                return orderDate >= oneMonthAgo;
            } else if (range === 'annually') {
                const oneYearAgo = new Date(now);
                oneYearAgo.setFullYear(now.getFullYear() - 1);
                return orderDate >= oneYearAgo;
            }
            return true;
        });
    };    

    return (
        <div>
            <AdminTitle title="Sales Reports" />
            <div className="admin-sales-container">
                <div className="time-range-select">
                    <label htmlFor="timeRange">Select Time Range: </label>
                    <select id="timeRange" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>
                <ul className="sales-list">
                    {mergedOrders.map(order => (
                        <li key={order.productId} className="sales-item">
                            <p>Product: {order.productName}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Product Sales: <i className="fas fa-peso-sign" />{order.totalSales.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <p className="total-sales">Total Sales: <i className="fas fa-peso-sign" />{totalSales.toFixed(2)}</p>
            </div>
            <Footer />
        </div>
    );
}

export default AdminSales;
