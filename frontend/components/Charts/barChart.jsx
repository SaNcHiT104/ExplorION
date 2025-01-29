import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["29th", "30th", "31st"],
    datasets: [
      {
        label: "Stock",
        data: [38335.26, 37497.75, 12520.73],
        backgroundColor: "#FF6384",
      },
      {
        label: "Real Estate",
        data: [22878.58, 21303.51, 12320.58],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Cryptocurrency",
        data: [25530.49, 25593.36, 10742.18],
        backgroundColor: "#FFCE56",
      },
      {
        label: "Commodity",
        data: [24928.1, 25529.02, 13707.57],
        backgroundColor: "#4BC0C0",
      },
      {
        label: "Bond",
        data: [33893.86, 32821.45, 15303.2],
        backgroundColor: "#9966FF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Values per Category by Day",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <Bar data={data} options={options} />
  );
};

export default BarChart;