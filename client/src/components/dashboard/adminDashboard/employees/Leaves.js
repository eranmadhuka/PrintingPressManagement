//Leaves
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";

const Leaves = () => {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/employeeLeave")
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
    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    Leaves
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Employee</th>
                                <th scope="col">reason</th>
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
                                        <td>{item._id}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.from}</td>
                                        <td>{item.to}</td>
                                        <td>{item.type}</td>
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
