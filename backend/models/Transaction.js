import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  status: Number,
  date: { type: Date, required: true, default: Date.now },
  time: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true }
});

export default mongoose.model('Transaction', transactionSchema);
