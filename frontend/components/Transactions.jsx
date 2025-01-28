import React, { useState, useEffect } from "react";
import axios from "axios";

function Transactions({ userId }) {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is required.");
      setLoading(false);
      return;
    }

    console.log("Fetching user details for userId:", userId);

    // Fetch user details
    axios.get(`http://localhost:3001/api/user/${userId}`)
      .then(response => {
        console.log("User data received:", response.data);
        setUser(response.data);

        // Fetch all accounts for this user
        return axios.get(`http://localhost:3001/api/accounts/${userId}`);
      })
      .then(response => {
        console.log("Accounts data received:", response.data);
        setAccounts(response.data);

        // Extract account IDs
        const accountIds = response.data.map(acc => acc.AccountID);
        console.log("Extracted account IDs:", accountIds);

        if (accountIds.length === 0) {
          setError("No accounts found for this user.");
          setLoading(false);
          return;
        }

        // Fetch all transactions for these account IDs
        return axios.post(`http://localhost:3001/api/transactions`, { accountIds });
      })
      .then(response => {
        console.log("Transactions data received:", response.data);
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Error fetching user, accounts, or transactions.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      {user ? (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-center">User Details</h2>
          <p className="text-center"><strong className="font-medium">UserID:</strong> {userId}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}

      <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      {accounts.length > 0 ? (
        <ul className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accounts.map(acc => (
            <li key={acc.AccountID} className="p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition duration-300">
              <strong className="block font-medium">Account ID:</strong> {acc.AccountID}
              <span className="block text-gray-600"><strong>Type:</strong> {acc.AccountType}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts found.</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">Transaction History</h2>
      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Transaction ID</th>
                <th className="px-4 py-2 border border-gray-300">Account ID</th>
                <th className="px-4 py-2 border border-gray-300">Date</th>
                <th className="px-4 py-2 border border-gray-300">Description</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">Amount (EUR)</th>
                <th className="px-4 py-2 border border-gray-300">Currency</th>
                <th className="px-4 py-2 border border-gray-300">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.TransactionID} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{txn.TransactionID}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.AccountID}</td>
                  <td className="px-4 py-2 border border-gray-300">{new Date(txn.Date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.Description}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.Category}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.Amount.toFixed(2)}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.Currency}</td>
                  <td className="px-4 py-2 border border-gray-300">{txn.Type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found for these accounts.</p>
      )}
    </div>
  );
}

export default Transactions;
