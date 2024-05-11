import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2"; // Import Pie component from react-chartjs-2

const Leaves = () => {
    const [employee, setEmployee] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State variable to hold the search query
    const [leaveTypes, setLeaveTypes] = useState({}); // State variable to hold leave types for the pie chart

    useEffect(() => {
        axios
            .get("http://localhost:5000/employeeLeave/allLeaves")
            .then((result) => {
                setEmployee(result.data);
                updateLeaveTypes(result.data); // Update leave types for the pie chart
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:5000/employeeLeave/deleteLeave/" + id)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    // Function to handle status update
    const handleStatusUpdate = (leaveID, newStatus) => {
        axios
            .patch(
                `http://localhost:5000/employeeLeave/updateLeaveStatus/${leaveID}`,
                { status: newStatus }
            )
            .then((response) => {
                // Update the status in the local state
                const updatedLeaves = employee.map((item) => {
                    if (item._id === leaveID) {
                        return { ...item, status: newStatus };
                    }
                    return item;
                });
                setEmployee(updatedLeaves);
            })
            .catch((error) => console.error("Error updating order status:", error));
    };

    // Function to filter leaves based on search query
    const filteredLeaves = employee.filter((item) =>
        item.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to update leave types for the pie chart
    const updateLeaveTypes = (leaves) => {
        const typesCount = {};
        leaves.forEach((leave) => {
            typesCount[leave.type] = typesCount[leave.type]
                ? typesCount[leave.type] + 1
                : 1;
        });
        setLeaveTypes(typesCount);
    };

    // Prepare data for the pie chart
    const pieChartData = {
        labels: Object.keys(leaveTypes),
        datasets: [
            {
                data: Object.values(leaveTypes),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#66ff66",
                    "#ff6666",
                    "#808080",
                    "#FFA07A",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#66ff66",
                    "#ff6666",
                    "#808080",
                    "#FFA07A",
                ],
            },
        ],
    };

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className="fs-5 fw-bold mb-3">Employee Leaves</h3>
                    {/* Search input field */}
                    <input
                        className="form-control mb-3"
                        type="search"
                        placeholder="Search by Employee Email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Employee email</th>
                                <th scope="col">Reason</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Leave type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.userEmail}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.from}</td>
                                    <td>{item.to}</td>
                                    <td>{item.type}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={item.status}
                                            onChange={(e) =>
                                                handleStatusUpdate(item._id, e.target.value)
                                            }
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td>
                                        <i
                                            className="bi bi-trash-fill text-danger"
                                            onClick={(e) => handleDelete(item._id)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pie chart for leave types */}

                    <div className="col-lg-5">
                        <div className="card border-0 p-3">
                            <div className="card-body">
                                {/* Render the PieChart component passing feedbackData */}
                                <Pie data={pieChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Leaves;
