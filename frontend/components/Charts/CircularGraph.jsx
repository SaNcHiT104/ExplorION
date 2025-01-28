import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './CircularGraph.module.css';

// Example exchange rates (replace with real API for live data)
const exchangeRates = {
  INR: 1,       // 1 INR = 1 INR
  USD: 82,      // Example: 1 USD = 82 INR
  EUR: 90,      // Example: 1 EUR = 90 INR
  GBP: 100,     // Example: 1 GBP = 100 INR
};

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularGraph = ({ savings }) => {
  if (!Array.isArray(savings) || savings.length === 0) {
    return <p>No savings data available</p>;
  }

  // Convert all balances to INR
  const labels = savings.map(account => `${account.BankName} (${account.Currency})`);
  const data = savings.map(account => {
    const currency = account.Currency;
    const balanceInINR = parseFloat(account.Balance) * (exchangeRates[currency] || 1); // Default to 1 if currency is not in the exchangeRates map
    return balanceInINR;
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data, // Converted balances
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FFCD56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FFCD56']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className={styles.graphContainer}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CircularGraph;
