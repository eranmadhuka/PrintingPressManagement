import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  // Check if data is defined before mapping
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract labels and datasetData from data
  const labels = data.map((entry) => entry.type); // Change to 'type' for vehicle types
  const datasetData = data.map((entry) => entry.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Vehicle Type Distribution", // Update label
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(128, 0, 128, 0.2)",
          "rgba(128, 128, 0, 0.2)",
          "rgba(0, 128, 128, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(128, 128, 0, 1)",
          "rgba(0, 128, 128, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(0, 128, 0, 0.4)",
          "rgba(128, 0, 128, 0.4)",
          "rgba(128, 128, 0, 0.4)",
          "rgba(0, 128, 128, 0.4)",
        ],
        hoverBorderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(128, 128, 0, 1)",
          "rgba(0, 128, 128, 1)",
        ],
        data: datasetData,
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "auto" }}>
      {" "}
      {/* Adjust the dimensions as needed */}
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
