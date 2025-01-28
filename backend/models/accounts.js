import mongoose from 'mongoose';

// Define schema
const accountSchema = new mongoose.Schema({
  AccountID: { type: Number, required: true },
  UserID: { type: Number, required: true },
  AccountType: { type: String, required: true },
  Balance: { type: mongoose.Types.Decimal128, required: true }, // Using Decimal128 for better precision
  Currency: { type: String, required: true },
  BankName: { type: String, required: true },
  LastUpdated: { type: Date, require: true }, // Store as Date
});

// Convert Decimal128 to string when retrieving data
accountSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.Balance = ret.Balance ? ret.Balance.toString() : null;
    return ret;
  },
});

const Account = mongoose.model('Account', accountSchema);

// Export the model as default
export default Account;
