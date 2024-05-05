import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available for the bar chart</div>;
  }

  const labels = data.map((entry) => entry.date);
  const datasetData = data.map((entry) => entry.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Deliveries by Date",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: datasetData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
          color: "#333",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Number of Deliveries",
          color: "#333",
          font: {
            weight: "bold",
          },
        },
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
