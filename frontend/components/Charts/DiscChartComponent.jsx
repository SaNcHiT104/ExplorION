import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { div } from "framer-motion/client";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DiscChartComponent = () => {
  const doughnutData = {
    labels: [
      "Apple Stock",
      "Bitcoin ETF",
      "Bitcoin Bond",
      "Vanguard ETF",
      "Bitcoin Stock",
      "Bonds Cryptocurrency",
      "Bitcoin Cryptocurrency",
    ],
    datasets: [
      {
        label: "Investment Distribution",
        data: [
          29728.29,
          23784.4,
          1982.89,
          29539.55,
          46813.38,
          25090.09,
          12714.34,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Investment Distribution by Category",
      },
    },
  };

  return (
        <div className="chart-container">
      <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
  );
};

export default DiscChartComponent;
