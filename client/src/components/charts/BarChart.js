import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
    const labels = data.map((entry) => entry.date);
    const datasetData = data.map((entry) => entry.count);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Daily feedback count",
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
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
        <div>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
