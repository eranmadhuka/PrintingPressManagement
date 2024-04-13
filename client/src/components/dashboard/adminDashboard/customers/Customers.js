import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import BarChart from "../../../charts/BarChart"; // Import the BarChart component
import PieChart from "../../../charts/PieChart"; // Import the PieChart component
import axios from "axios";
import Chart from "chart.js/auto";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/handlecustomer")
            .then((result) => {
                setUsers(result.data);
                const registrationDates = result.data.map(
                    (user) => user.updated.split("T")[0]
                );
                const registrationCounts = registrationDates.reduce((acc, date) => {
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
                const registrationDataArray = Object.entries(registrationCounts).map(
                    ([date, count]) => ({
                        date,
                        count,
                    })
                );
                setRegistrationData(registrationDataArray);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteCustomer = (email) => {
        axios
            .delete("http://localhost:3001/auth/handledeleteaccount/" + email)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const ctx = document.getElementById("bar-chart");
        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: registrationData.map((entry) => entry.date),
                datasets: [
                    {
                        label: "Customer Registration Count",
                        data: registrationData.map((entry) => entry.count),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            },
        });
    }, [registrationData]);

    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <h3 className="fs-5 fw-bold">All Customers</h3>
                <div className="mt-3 px-2">
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Register Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.updated}</td>

                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={(e) => handleDeleteCustomer(user.email)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="card border-0 p-3">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <h2 className="card-title float-left fs-5 fw-bold">
                                            Customer Distribution
                                        </h2>
                                    </div>
                                    <canvas id="bar-chart" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0 p-3">
                                <div className="card-body">
                                    <PieChart data={registrationData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Customers;