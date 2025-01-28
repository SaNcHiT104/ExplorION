import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  AccountID: { type: String, required: true },
  Date: { type: Date, required: true },
  Category: { type: String, required: true },
  Description: { type: String, required: true },
  Amount: { type: Number, required: true },
  Currency: { type: String, required: true },
  TransactionType: { type: String, required: true }, // Use the exact name from the header
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

