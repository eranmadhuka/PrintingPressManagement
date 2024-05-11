import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import Card from "../../common/Card";
import BarChart from "../../charts/BarChart";
import PieChart from "../../charts/PieChart";
import axios from "axios";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const chartRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dailyFeedbackCountData, setDailyFeedbackCountData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/handlecustomer")
            .then((result) => {
                // Filter users with role 'user'
                const filteredUsers = result.data.filter(
                    (user) => user.role === "user"
                );
                setUsers(filteredUsers);

                // The rest of your logic remains the same
                const registrationDates = filteredUsers.map(
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

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/handlecustomer")
            .then((result) => {
                const filteredUsers = result.data.filter(
                    (user) => user.role === "user" && user.feedback
                );

                // Sort the filtered users by feedback date in descending order
                const sortedUsers = filteredUsers.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });

                setUsers(sortedUsers);

                // Prepare data for daily feedback count chart
                const feedbackDates = sortedUsers.map(
                    (user) => user.date.split("T")[0] // Use 'date' instead of 'updated'
                );
                const feedbackCounts = feedbackDates.reduce((acc, date) => {
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
                const feedbackDataArray = Object.entries(feedbackCounts).map(
                    ([date, count]) => ({
                        date,
                        count,
                    })
                );

                setDailyFeedbackCountData(feedbackDataArray);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <AdminLayout>
                {/* Overview */}
                <div className="bg-white p-3 mt-3 rounded shadow-sm">
                    <h3 className="fs-5 fw-bold">Overview</h3>

                    <div className="row mt-4">
                        <div className="col-lg-3">
                            <Card
                                title="Total Users"
                                number="50"
                                icon={<i class="bi bi-people-fill"></i>}
                                subtext="Increased by 60%"
                            />
                        </div>
                        <div className="col-lg-3">
                            <Card
                                title="Total Products"
                                number="50"
                                icon={<i class="bi bi-people-fill"></i>}
                                subtext="Increased by 60%"
                            />
                        </div>
                        <div className="col-lg-3">
                            <Card
                                title="Total Orders"
                                number="50"
                                icon={<i class="bi bi-people-fill"></i>}
                                subtext="Increased by 60%"
                            />
                        </div>
                        <div className="col-lg-3">
                            <Card
                                title="Total Employees"
                                number="50"
                                icon={<i class="bi bi-people-fill"></i>}
                                subtext="Increased by 60%"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="row">
                        {/* Bar Chart */}
                        <div className="col-lg-6">
                            <div className="card border-0 p-3">
                                <div className="card-body">
                                    <h2>Daily Registration Count</h2>
                                    <br></br>
                                    <PieChart data={registrationData} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card border-0 p-3">
                                <div className="card-body">
                                    <h2>Daily Feedback Count</h2>
                                    <br></br>
                                    <PieChart data={dailyFeedbackCountData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Dashboard;