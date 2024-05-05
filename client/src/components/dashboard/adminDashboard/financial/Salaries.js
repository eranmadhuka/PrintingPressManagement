import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Salaries = () => {
    const [salaries, setSalaries] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0); // State for total salary

    useEffect(() => {
        axios.get("http://localhost:5000/financial/empFinancial/getEmployeeDetails")
            .then((result) => {
                setSalaries(result.data);
                // Calculate total salary when salaries are fetched
                const total = result.data.reduce((acc, salary) => acc + salary.netSalary, 0);
                setTotalSalary(total);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const sendTotalIncome = () => {
        console.log("Sending total income...");
        axios.post("http://localhost:5000/financial/empFinancial/createLPSEntry", {
            description: "Total Salary",
            entryType: "expense",
            date: new Date().toISOString(), // Assuming today's date
            amount: totalSalary,
        })
            .then((result) => {
                console.log("Total income sent successfully:", result);
                // Handle navigation or any other action after successful submission
            })
            .catch((err) => console.log("Error sending total income:", err));
    };

    return (
        <AdminLayout>
            <div className="container">
                <div className="bg-white p-3 mt-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Department</th>
                                {/* <th>Gross Salary</th> */}
                                <th>Net Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.map((salary, index) => (
                                <tr key={index}>
                                    <td>{salary._id}</td>
                                    <td>{salary.fname}</td>
                                    <td>{salary.designation}</td>
                                    <td>{salary.department}</td>
                                    {/* <td>{salary.grossSalary}</td> */}
                                    <td>{salary.netSalary}</td>
                                    <td>
                                        <Link to={`/admin/financial/emForm/${salary._id}`}>
                                            <button className="btn btn-sm btn-primary me-2">Update</button>
                                        </Link>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="container mt-4">
                <div className="bg-white p-3">
                    <h4>Total Salary Details</h4>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Description</th>
                                <td>Total Salary</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>expense</td>
                            </tr>
                            <tr>
                                <th>Amount</th>
                                <td>{totalSalary}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary" onClick={sendTotalIncome}>Add to Loss or Profit</button>
                </div>
            </div>

        </AdminLayout>
    );
};

export default Salaries;
