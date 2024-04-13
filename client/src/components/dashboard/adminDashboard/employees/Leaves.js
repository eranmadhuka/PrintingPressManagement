//Leaves
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";

const Leaves = () => {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/employeeLeave/allLeaves")
            .then((result) => setEmployee(result.data))
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
        axios.patch(`http://localhost:5000/employeeLeave/updateLeaveStatus/${leaveID}`, { status: newStatus })
            .then(response => {
                // Update the status in the local state
                const updateLeaveStatus = employee.map(item => {
                    if (item._id === leaveID) {
                        return { ...item, status: newStatus };
                    }
                    return item;
                });
                setEmployee(updateLeaveStatus);
            })
            .catch(error => console.error('Error updating order status:', error));
    };

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className='fs-5 fw-bold mb-3'>Employees Leavs</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Reason</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Leave type</th>
                                <th scope="col">status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.eid}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.from}</td>
                                        <td>{item.to}</td>
                                        <td>{item.type}</td>
                                        {/* <td>{item.status}</td> */}
                                        <td>
                                            <select
                                                className='form-select'
                                                value={item.status}
                                                onChange={(e) => handleStatusUpdate(item._id, e.target.value)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td>
                                            {/* <Link to={`/admin/employees/UpdateEmployee/${item._id}`}>
                                                <i className="bi bi-pencil-square text-primary me-3"></i>
                                            </Link> */}

                                            <i className="bi bi-trash-fill text-danger" onClick={(e) => handleDelete(item._id)}></i>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        </>
    );
};

export default Leaves;
