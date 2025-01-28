import classes from './Savings.module.css';
import { motion } from 'framer-motion';
import SingleBank from './SingleBank';
import CircularGraph from '../Charts/CircularGraph';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Savings() {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/SavingAccount?userId=10'
        );

        // Extract, filter, and format the savings accounts data
        const formattedSavings = response.data
          .filter((account) => account.AccountType === 'Savings') // Filter for savings accounts
          .map((account) => ({
            AccountID: account.AccountID,
            AccountType: account.AccountType,
            Balance: account.Balance,
            Currency: account.Currency,
            BankName: account.BankName,
            LastUpdated: new Date(account.LastUpdated).toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));

        setSavings(formattedSavings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch savings accounts. Please try again.');
        setLoading(false);
      }
    };

    fetchSavings();
  }, []);

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={classes.header}>
        <div className={classes.heading}>Savings Account</div>
      </div>

      <CircularGraph savings={savings}/>

      {loading ? (
        <p className={classes.loading}>Loading...</p>
      ) : error ? (
        <p className={classes.error}>{error}</p>
      ) : (
        <motion.div
          className={classes.boxWithtransaction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Map through the savings array and pass each item to SingleBank */}
          {savings.map((account) => (
            <SingleBank key={account.AccountID} savings={account} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}