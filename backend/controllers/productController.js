import mongoose from 'mongoose';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

//to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
  //from authcontroller.js line 34
  jwt.verify(token, 'secret_key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    } else {
      req.user = decodedToken;
      next();
    }
  });
};

//create product
const createProduct = async (req, res) => {
  const { productImage, productName, productDescription, productType, productQuantity, productPrice } = req.body;

  try {
    // Create product instance
    const product = new Product({
      productImage,
      productName,
      productDescription,
      productType,
      productQuantity,
      productPrice
    });

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json({ success: true, message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productImage, productName, productDescription, productType, productQuantity, productPrice } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productImage, productName, productDescription, productType, productQuantity, productPrice },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    // Perform a case-insensitive search for products matching the query
    const products = await Product.find({
      productName: { $regex: new RegExp(query, "i") }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createProduct, getAllProducts, verifyToken, deleteProduct, updateProduct, searchProducts };