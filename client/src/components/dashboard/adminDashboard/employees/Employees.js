import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";

const Employees = () => {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/employee")
            .then((result) => setEmployee(result.data))
            .catch((err) => console.log(err));
    }, []);
    const handleDelete = (id) => {
        axios
            .delete("http://localhost:5000/employee/deleteUser/" + id)
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
                    <h3 className='fs-5 fw-bold'>Employee List</h3>
                    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <Link to='/admin/employees/AddEmployee'>
                            <button className='btn btn-primary'>+ Add Order</button>
                        </Link>
                    </div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Employee id</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Birth date</th>
                                <th scope="col">Address </th>
                                <th scope="col">email</th>
                                <th scope="col">Contact number</th>
                                <th scope="col">designation</th>
                                <th scope="col">department</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((item) => {
                                return (
                                    <tr>
                                        <td>{item._id}</td>
                                        <td>
                                            {item.fname} {item.lname}
                                        </td>
                                        <td>{item.gender}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{item.address}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.department}</td>
                                        <td>
                                            <Link to={`/admin/employees/UpdateEmployee/${item._id}`}>
                                                <button className="btn btn-dark me-2">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) => handleDelete(item._id)}
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
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

export default Employees;
