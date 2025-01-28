import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Account from './models/accounts.js';
import Transaction from './models/transactions.js';  // Import the transaction model
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import multer from 'multer'; // For handling file uploads
import { fileURLToPath } from 'url';

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
    cb(null, uploadDir); // Ensure files are stored in the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Add a unique timestamp to the file name
  },
});

const upload = multer({ storage: multerStorage });

// Endpoint for handling file uploads
app.post('/api/upload-excel', upload.single('file'), (req, res) => {
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

      // Log the parsed data for debugging
      console.log('Parsed JSON data:', jsonData);

      const fileType = req.body.fileType; // Get file type from the request body (account or transaction)

      if (fileType === 'account') {
        // Handle account data parsing
        const validData = jsonData.map((row) => {
          // Add logic similar to your account data validation
        }).filter(item => item !== null);

        // Insert valid account data into MongoDB
        Account.insertMany(validData)
          .then(() => {
            fs.unlinkSync(filePath); // Remove file after processing
            res.status(200).send('Account data successfully inserted.');
          })
          .catch((dbErr) => {
            console.error('Error inserting account data into database:', dbErr);
            fs.unlinkSync(filePath);
            res.status(500).send('Error inserting account data into database.');
          });
      } else if (fileType === 'transaction') {
        // Handle transaction data parsing
        const validTransactions = jsonData.map((row) => {
          // Parse and validate transaction rows here, similar to account data
          return {
            TransactionID: row['Transaction ID'] || null,
            AccountID: row['Account ID'] || null,
            Date: new Date(row['Date']),
            Description: row['Description'] || '',
            Category: row['Category'] || '',
            Amount: row['Amount (EUR)'] || 0,
            Currency: row['Currency'] || '',
            Type: row['Type'] || '',
          };
        }).filter(item => item !== null);

        // Insert valid transactions into MongoDB
        Transaction.insertMany(validTransactions)
          .then(() => {
            fs.unlinkSync(filePath); // Remove file after processing
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
});


app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ AccountID: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await Account.findOne({ UserID: String(req.params.userId) }); // Ensure string match

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});


app.get('/api/accounts/:userId', async (req, res) => {
  try {
    const accounts = await Account.find({ UserID: req.params.userId });

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found for this user." });
    }

    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Error fetching accounts" });
  }
});

app.post('/api/transactions', async (req, res) => {
  console.log("inpost transactions - ", req.body)
  try {
    const { accountIds } = req.body;
    if (!accountIds || accountIds.length === 0) {
      return res.status(400).json({ error: "No account IDs provided" });
    }
    
    const transactions = await Transaction.find({ AccountID: { $in: accountIds } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});



app.get('/api/transactions/:userId', async (req, res) => {
  try {
    // First, find all accounts associated with the given user
    const accounts = await Account.find({ UserID: req.params.userId });

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found for this user" });
    }

    // Extract all account IDs from the user's accounts
    const accountIds = accounts.map(account => account.AccountID);

    // Fetch transactions for all these account IDs
    const transactions = await Transaction.find({ AccountID: { $in: accountIds } });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
