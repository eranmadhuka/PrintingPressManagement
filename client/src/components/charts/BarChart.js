import React from 'react'
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const BarChart = () => {

    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: "rgb(255, 99, 132)",
                data: [50, 10, 5, 2, 20, 30, 45],
            },
        ],


    };

    return (
        <>
            <Bar data={data} />
        </>
    )
}

export default BarChart
