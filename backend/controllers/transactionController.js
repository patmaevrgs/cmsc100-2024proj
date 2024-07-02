import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const addTransaction = async (req, res) => {
  try {
    const { products, status, date, time, userId, email } = req.body;

    console.log('Received data:', { products, status, date, time, userId, email }); // Log received data

    if (!userId) {
      console.error('User ID is missing');
      return res.status(400).send({ success: false, message: 'User ID is required' });
    }

    const newTransaction = new Transaction({
      products: products.map(product => ({
        productId: product.productId,
        quantity: product.quantity
      })),
      status,
      date,
      time,
      userId,
      email
    });

    const result = await newTransaction.save();

    if (result._id) {
      await User.updateOne({ _id: userId }, { $push: { transactions: result._id } });

      // Decrease product stock
      for (const product of products) {
        await Product.updateOne(
          { _id: product.productId },
          { $inc: { productQuantity: -product.quantity } }
        );
      }

      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const getPendingTransactions = async (req, res) => {
  try {
    const pendingTransactions = await Transaction.find({ status: 0 })
      .populate('userId', 'email')
      .populate('products.productId', 'productName'); // Populate productId to get productName
    res.send(pendingTransactions);
  } catch (error) {
    console.error('Error fetching pending transactions:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};


// Add this new function to your transactionController.js

const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    if (status !== 1) {
      return res.status(400).send({ success: false, message: 'Invalid status value' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { status }, { new: true });

    if (!updatedTransaction) {
      return res.status(404).send({ success: false, message: 'Transaction not found' });
    }

    res.send({ success: true, transaction: updatedTransaction });
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// transactionController.js

const cancelTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const cancelledTransaction = await Transaction.findById(transactionId);

    if (!cancelledTransaction) {
      return res.status(404).send({ success: false, message: 'Transaction not found' });
    }

    // Increment product quantities for all products in the cancelled transaction
    for (const product of cancelledTransaction.products) {
      await Product.findByIdAndUpdate(
        product.productId,
        { $inc: { productQuantity: product.quantity } }
      );
    }

    // Update transaction status to canceled
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status: 2 }, // Set status to 2 (Cancelled)
      { new: true }
    );

    res.send({ success: true, transaction: updatedTransaction });
  } catch (error) {
    console.error('Error cancelling transaction:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};


// transactionController.js

const getCustomerOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const pendingOrders = await Transaction.find({ userId, status: 0 }).populate('products.productId');
    const confirmedOrders = await Transaction.find({ userId, status: 1 }).populate('products.productId');
    const canceledOrders = await Transaction.find({ userId, status: 2 }).populate('products.productId');

    res.send({ pendingOrders, confirmedOrders, canceledOrders });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const cancelledTransaction = await Transaction.findById(orderId);

    if (!cancelledTransaction) {
      return res.status(404).send({ success: false, message: 'Order not found' });
    }

    // Increment product quantities for all products in the cancelled transaction
    for (const product of cancelledTransaction.products) {
      await Product.findByIdAndUpdate(
        product.productId,
        { $inc: { productQuantity: product.quantity } }
      );
    }

    // Delete the cancelled order
    const deletedOrder = await Transaction.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).send({ success: false, message: 'Order not found' });
    }

    res.send({ success: true });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// transactionController.js

const calculateTotalPrice = (transactions) => {
  return transactions.reduce((total, transaction) => {
    return total + transaction.products.reduce((subtotal, product) => {
      // Check if product and its properties exist
      if (product && product.productId && product.productId.productPrice && product.quantity) {
        return subtotal + (product.productId.productPrice * product.quantity);
      } else {
        console.error('Invalid product data:', product);
        return subtotal; // Ignore invalid product data
      }
    }, 0);
  }, 0);
};

const getTotalPrices = async (req, res) => {
  try {
    const confirmedTransactions = await Transaction.find({ status: 1 }).populate('products.productId');
    const pendingTransactions = await Transaction.find({ status: 0 }).populate('products.productId');

    const confirmedTotal = calculateTotalPrice(confirmedTransactions);
    const pendingTotal = calculateTotalPrice(pendingTransactions);

    res.send({ confirmedTotal, pendingTotal });
  } catch (error) {
    console.error('Error calculating total prices:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const getTotalCounts = async (req, res) => {
  try {
    const confirmedTransactions = await Transaction.find({ status: 1 });
    const pendingTransactions = await Transaction.find({ status: 0 });
    
    const confirmedCount = confirmedTransactions.length;
    const pendingCount = pendingTransactions.length;

    res.send({ confirmedCount, pendingCount });
  } catch (error) {
    console.error('Error calculating total prices and counts:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const getCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Transaction.find({ status: 1 }).populate('products.productId');
    res.send(completedOrders);
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const getUserCompletedOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find completed orders associated with the specific user ID
    const completedOrders = await Transaction.find({ userId, status: 1 }).populate('products.productId');
    res.send(completedOrders);
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

export { addTransaction, getPendingTransactions, updateTransactionStatus, cancelTransaction, getCustomerOrders, cancelOrder, getTotalPrices, getTotalCounts, getCompletedOrders, getUserCompletedOrders };