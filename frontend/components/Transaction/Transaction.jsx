import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Transaction.module.css";
import { motion } from "framer-motion";

import SingleTransaction from "./SingleTransaction"; 

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/accounts-and-transactions?userId=10"
        );

        // Extract and format transactions from accounts
        const formattedTransactions = response.data.flatMap((account) =>
          account.transactions.map((transaction, index) => ({
            id: transaction._id || index + 1,
            name: transaction.Description || "Unknown",
            amount: Math.abs(transaction.Amount),
            date: new Date(transaction.Date).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: transaction.TransactionType.toLowerCase(),
          }))
        );

        setTransactions(formattedTransactions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch transactions. Please try again.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-medium py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 py-10">{error}</div>;
  }

  // Slice the transactions array to display only the first 10 transactions
  const limitedTransactions = transactions.slice(0, 9);

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={classes.header}>
        <div className={classes.heading}>Transaction History</div>
      </div>
  
      <motion.div>
        {limitedTransactions.length > 0 ? (
          limitedTransactions.map((transaction) => (
            <SingleTransaction key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center text-lg text-gray-600">No transactions found.</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Transaction;
