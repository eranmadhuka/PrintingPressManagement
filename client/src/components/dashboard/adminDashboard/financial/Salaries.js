import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Salaries = () => {
    const [salaries, setSalaries] = useState([]);
    const [totalSalary, setTotalSalary] = useState(0);
    const [otRate, setOtRate] = useState('');
    const [otHours, setOtHours] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/financial/empFinancial/getEmployeeDetails")
            .then((result) => {
                setSalaries(result.data);
                const total = result.data.reduce((acc, salary) => acc + salary.salary?.basicSalary, 0);
                setTotalSalary(total);
            })
            .catch((error) => {
                console.log(error);
            });

        // Fetch OT hours data from the attendance API endpoint
        axios.get("http://localhost:5000/attendance/getAllAttendance")
            .then((response) => {
                const otData = response.data.reduce((acc, entry) => {
                    acc[entry.EmpEmail] = entry.Overtime;
                    return acc;
                }, {});
                setOtHours(otData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const calculateTotalIncomeAmount = () => {
        return salaries.reduce((acc, x) => {
            const netSalary = ((otHours[x.email] || 0) * parseFloat(otRate)) + (x.salary?.basicSalary || 0);
            return acc + netSalary;
        }, 0);
    };

    const sendTotalIncome = () => {
        const totalIncomeAmount = calculateTotalIncomeAmount();
        axios.post("http://localhost:5000/financial/createLPSEntry", {
            description: "Total Salary",
            entryType: "expense",
            date: new Date().toISOString(),
            amount: totalIncomeAmount,
            otRate: otRate,
        })
            .then((result) => {
                console.log("Total income sent successfully:", result);
            })
            .catch((err) => console.log("Error sending total income:", err));
    };

    const handleSetOtRate = () => {
        setOtRate(otRate);
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
                                <th>OT Hours</th>
                                <th>Basic Salary</th>
                                <th>Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.department}</td>
                                    <td>{otHours[item.email] || 'N/A'}</td>
                                    <td>{item.salary?.basicSalary}</td>
                                    <td>{((otHours[item.email] || 0) * parseFloat(otRate)) + (item.salary?.basicSalary || 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mb-3 d-flex align-items-center">
                        <label htmlFor="otRate" className="form-label me-2">OT Rate:</label>
                        <input
                            type="text"
                            className="form-control me-2"
                            id="otRate"
                            value={otRate}
                            onChange={(e) => setOtRate(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSetOtRate}>Set</button>
                    </div>
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
                                <td>{calculateTotalIncomeAmount()}</td>
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
