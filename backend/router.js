import { Router } from 'express';
import { signUp, login, checkIfLoggedIn, addAdmin } from './controllers/authController.js';
import { createProduct, getAllProducts, deleteProduct, updateProduct, searchProducts } from './controllers/productController.js'; // Import product controllers
import { getCustomers, updateUser, getUserDetails } from './controllers/userController.js';
import { addTransaction, getPendingTransactions, updateTransactionStatus, cancelTransaction, getCustomerOrders, cancelOrder, getTotalPrices, getTotalCounts, getCompletedOrders, getUserCompletedOrders } from './controllers/transactionController.js';

const router = Router();

//routes for authentication
router.post('/signup', signUp);
router.post('/login', login);
router.post('/checkifloggedin', checkIfLoggedIn);
router.post('/addadmin', addAdmin);

//routes for products
router.post('/products', createProduct); 
router.get('/getproducts', getAllProducts);
router.delete('/products/:id', deleteProduct); // Add delete route
router.put('/products/:id', updateProduct); // Add update route
router.get('/search', searchProducts);
// router.get('/products/sort', async (req, res) => {
//     const { criteria, order } = req.query;
//     console.log('Received criteria:', criteria);
//     console.log('Received order:', order);
//     try {
//         const sortedProducts = await sortProducts(criteria, order); // Pass criteria and order to sortProducts function
//         res.status(200).json(sortedProducts);
//     } catch (error) {
//         console.error('Error sorting products:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/getcustomers', getCustomers);

router.post('/add-transaction', addTransaction);
router.get('/pending-transactions', getPendingTransactions);
router.post('/update-transaction-status', updateTransactionStatus);
router.post('/cancel-transaction', cancelTransaction);
router.get('/customer-orders/:userId', getCustomerOrders);
router.delete('/cancel-order/:orderId', cancelOrder);
router.get('/total-counts', getTotalCounts);
router.get('/total-prices', getTotalPrices);

router.post('/user/:userId', updateUser);
router.get('/user-deets/:userId', getUserDetails);
router.get('/user-transactions/:userId', getUserCompletedOrders);

router.get('/sales-report', getCompletedOrders);

export default router;
