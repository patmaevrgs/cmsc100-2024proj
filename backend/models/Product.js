import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productImage: { type: String, required: true }, 
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productType: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  productPrice: { type: Number, required: true }
});

export default mongoose.model("Product", productSchema);
