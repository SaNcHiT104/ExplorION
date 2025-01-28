const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Account = require('../backend/models/account');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/explorION', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit on connection error
  });

// Read the Excel file
const workbook = xlsx.readFile('./data/accounts.xlsx'); // Path to your Excel file
const sheetName = workbook.SheetNames[0]; // First sheet
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON format
const data = xlsx.utils.sheet_to_json(sheet, { defval: null }); // Use `defval: null` to handle empty cells

// Validate and map the data to fit the Mongoose schema
const validateAndMapData = (item) => {
  try {
    // Trim string fields and handle potential missing/invalid data
    const account = {
      AccountID: item['Account ID']?.toString().trim() || null,
      UserID: item['User ID']?.toString().trim() || null,
      AccountName: item['Account Name']?.toString().trim() || null,
      AccountType: item['Account Type']?.toString().trim() || null,
      Balance: parseFloat(item['Balance (EUR)']) || 0, // Default balance to 0 if invalid
      Currency: item['Currency']?.toString().trim() || null,
      BankName: item['Bank Name']?.toString().trim() || null,
      LastSynced: item['Last Synced'] ? new Date(item['Last Synced']) : null,
    };

    // Basic validation: Ensure required fields are present
    if (!account.AccountID || !account.UserID || !account.AccountName || !account.Currency) {
      console.warn('Invalid row detected and skipped:', item);
      return null; // Skip invalid rows
    }

    return account;
  } catch (error) {
    console.error('Error processing row:', item, error);
    return null; // Skip rows with unexpected errors
  }
};

// Process and filter valid data
const accounts = data.map(validateAndMapData).filter((item) => item !== null);

// Insert data into MongoDB
if (accounts.length > 0) {
  Account.insertMany(accounts)
    .then(() => {
      console.log('Data inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting data:', error);
    })
    .finally(() => mongoose.disconnect()); // Disconnect after operation
} else {
  console.warn('No valid data to insert');
  mongoose.disconnect();
}
