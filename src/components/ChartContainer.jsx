import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const ChartContainer = ({ data }) => {
  console.log(data);

  const formattedData = data.map((item) => ({
    name: item.category,
    value: item.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF69B4"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <PieChart width={250} height={250}>
        <Pie
          data={formattedData}
          cx={125}
          cy={125}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ChartContainer;
