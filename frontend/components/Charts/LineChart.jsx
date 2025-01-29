import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  // Data for Line Chart
  const lineData = {
    labels: ["29th", "30th", "31st"],
    datasets: [
      {
        label: "Stock",
        data: [39000, 37500, 13000],
        borderColor: "#FF6384",
        fill: false,
      },
      {
        label: "Real Estate",
        data: [23000, 21500, 12500],
        borderColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Cryptocurrency",
        data: [26000, 25600, 11000],
        borderColor: "#FFCE56",
        fill: false,
      },
      {
        label: "Commodity",
        data: [25000, 25600, 14000],
        borderColor: "#4BC0C0",
        fill: false,
      },
      {
        label: "Bond",
        data: [34000, 33000, 15500],
        borderColor: "#9966FF",
        fill: false,
      },
    ],
  };

  // Data for Histogram
  const histogramData = {
    labels: ["Stock", "Real Estate", "Cryptocurrency", "Commodity", "Bond"],
    datasets: [
      {
        label: "29th",
        data: [39000, 23000, 26000, 25000, 34000],
        backgroundColor: "#FF6384",
      },
      {
        label: "30th",
        data: [37500, 21500, 25600, 25600, 33000],
        backgroundColor: "#36A2EB",
      },
      {
        label: "31st",
        data: [13000, 12500, 11000, 14000, 15500],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Values Over Days (Line Chart)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Values by Day (Histogram)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <Line data={lineData} options={lineOptions} />
      </div>
      <div>
        <Bar data={histogramData} options={histogramOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;