import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Stocks", value: 45 },
  { name: "Bonds", value: 25 },
  { name: "Real Estate", value: 15 },
  { name: "Cash", value: 10 },
  { name: "Crypto", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const PieChartComponent= () => {
  return (
    <div className="flex justify-center items-center p-4">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Adding labels
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
