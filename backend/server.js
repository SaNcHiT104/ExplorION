import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Account from './models/accounts.js';
import Transaction from './models/transactions.js';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import moment from 'moment'; // Import moment for robust date parsing

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/explorION', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  console.log(`Creating uploads directory: ${uploadDir}`);
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: multerStorage });

// Endpoint for handling file uploads
/*app.post('/api/upload-excel', upload.single('file'), (req, res) => {
  console.log('Request received at /api/upload-excel');

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(uploadDir, req.file.filename);
  console.log('File uploaded to:', filePath);

  fs.open(filePath, 'r', (err, fd) => {
    if (err) {
      console.error('Error opening file:', err);
      return res.status(500).send('Error opening uploaded file.');
    }

    console.log('File is now accessible:', filePath);

    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log('Parsed JSON data:', jsonData);

      const fileType = req.body.fileType;

      if (fileType === 'account') {
        const validData = jsonData.map((row) => {
          let lastUpdated = null;

          if (row['Last Updated']) {
            // Parse the date using moment with strict validation
            lastUpdated = moment(row['Last Updated'], 'DD-MM-YYYY HH:mm', true).toDate();

            console.log('Parsed LastUpdated:', lastUpdated);
          }

          const isValidDate = !isNaN(lastUpdated) && lastUpdated instanceof Date;

          return {
            UserID: row['User ID'] || null,
            AccountID: row['Account ID'] || null,
            AccountType: row['Account Type'] || '',
            Balance: row['Balance'] || 0,
            Currency: row['Currency'] || '',
            BankName: row['Bank Name'] || '',
            LastUpdated: isValidDate ? lastUpdated : null,
          };
        });

        Account.insertMany(validData)
          .then(() => {
            fs.unlinkSync(filePath);
            res.status(200).send('Account data successfully inserted.');
          })
          .catch((dbErr) => {
            console.error('Error inserting account data into database:', dbErr);
            fs.unlinkSync(filePath);
            res.status(500).send('Error inserting account data into database.');
          });
      } else if (fileType === 'transaction') {
        const validTransactions = jsonData.map((row) => {
          return {
            TransactionID: row['Transaction ID'] || null,
            AccountID: row['Account ID'] || null,
            Date: moment(row['Date'], 'DD-MM-YYYY', true).toDate(),
            Description: row['Description'] || '',
            Category: row['Category'] || '',
            Amount: row['Amount (EUR)'] || 0,
            Currency: row['Currency'] || '',
            Type: row['Type'] || '',
          };
        });

        Transaction.insertMany(validTransactions)
          .then(() => {
            fs.unlinkSync(filePath);
            res.status(200).send('Transaction data successfully inserted.');
          })
          .catch((dbErr) => {
            console.error('Error inserting transaction data into database:', dbErr);
            fs.unlinkSync(filePath);
            res.status(500).send('Error inserting transaction data into database.');
          });
      } else {
        res.status(400).send('Invalid file type.');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      fs.unlinkSync(filePath);
      res.status(500).send('Error processing uploaded file.');
    }
  });
}); */

const excelSerialToDate = (serial) => {
  // Excel serial date start from Jan 1, 1900
  const excelEpoch = new Date(Date.UTC(1900, 0, 1));
  // Subtract 1 to account for Excel's incorrect leap year handling
  const daysSinceEpoch = serial - 1;
  // Add the days to the epoch
  return new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
};

app.post('/api/upload-excel', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(uploadDir, req.file.filename);

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    console.log('Parsed JSON data:', jsonData);

    const fileType = req.body.fileType;

    if (fileType === 'transaction') {
      // Validate and map transaction data
      const transactions = jsonData.map((row) => {
        let date;

        if (typeof row['Date'] === 'number') {
          // Convert Excel serial date to JavaScript date
          date = excelSerialToDate(row['Date']);
        } else if (typeof row['Date'] === 'string') {
          // Parse string date in MM/DD/YYYY format
          date = moment(row['Date'], 'MM/DD/YYYY', true).toDate();
        } else {
          throw new Error(`Invalid Date format: ${row['Date']}`);
        }

        if (isNaN(date)) {
          throw new Error(`Invalid Date: ${row['Date']}`);
        }

        return {
          AccountID: row['Account ID'] || null,
          Date: date,
          Category: row['Category'] || '',
          Description: row['Description'] || '',
          Amount: parseFloat(row['Amount']) || 0,
          Currency: row['Currency'] || '',
          TransactionType: row['Transaction Type'] || '',
        };
      });

      // Insert transactions into MongoDB
      await Transaction.insertMany(transactions);
      fs.unlinkSync(filePath);
      return res.status(200).send('Transaction data successfully inserted.');
    }

    res.status(400).send('Invalid file type.');
  } catch (error) {
    console.error('Error processing file:', error.message);
    fs.unlinkSync(filePath); // Clean up the file
    res.status(500).send(`Error processing uploaded file: ${error.message}`);
  }
});


app.get('/api/accounts-and-transactions', async (req, res) => {
  const userId = req.query.userId; // Get userId from the request
  
  try {
    // Fetch all accounts for the given userId
    const accounts = await Account.find({ UserID: userId });

    if (accounts.length === 0) {
      return res.status(404).send('No accounts found for this user.');
    }

    // Fetch all transactions corresponding to the found accounts
    const accountIds = accounts.map((account) => account.AccountID);
    const transactions = await Transaction.find({ AccountID: { $in: accountIds } });
    // Combine accounts with transactions
    const response = accounts.map((account) => {
      // Add all transactions related to this account, which already include AccountID
      const accountTransactions = transactions.filter(
        (transaction) => transaction.AccountID == account.AccountID
      );

      return {
        AccountID: account.AccountID,
        BankName: account.BankName,
        Balance: account.Balance,
        Currency: account.Currency,
        AccountType: account.AccountType,
        transactions: accountTransactions, // Return all transactions associated with this account
      };
    });

    // Send the combined data (accounts and their respective transactions)
    res.json(response);
  } catch (error) {
    console.error('Error fetching accounts and transactions:', error);
    res.status(500).send('Error fetching accounts and transactions');
  }
});


app.get('/api/SavingAccount', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Fetch the savings accounts from the database based on userId
    const userSavings = await Account.find({ UserID: userId });

    if (userSavings.length === 0) {
      return res.status(404).json({ error: 'No savings accounts found for this user' });
    }

    // Return the data as a response
    res.json(userSavings);
  } catch (error) {
    console.error("Error fetching savings account data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Other endpoints remain unchanged

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
