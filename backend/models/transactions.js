import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  TransactionID: { type: Number, required: true },
  AccountID: { type: Number, required: true },
  Date: { type: Date, required: true },
  Description: { type: String, required: true },
  Category: { type: String, required: true },
  Amount: { type: Number, required: true },
  Currency: { type: String, required: true },
  Type: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
