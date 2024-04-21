import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';

const Salaries = () => {
    // Sample data entries
    const [salaries, setSalaries] = useState([
        { id: 1, employeeId: 101, name: 'John Doe', position: 'Manager', department: 'Sales', grossSalary: 5000, netSalary: 4500 },
        { id: 2, employeeId: 102, name: 'Jane Smith', position: 'Developer', department: 'IT', grossSalary: 4000, netSalary: 3500 },
        { id: 3, employeeId: 103, name: 'Alice Johnson', position: 'Accountant', department: 'Finance', grossSalary: 4500, netSalary: 4000 }
    ]);

    // Function to delete a salary entry
    const deleteSalary = (id) => {
        setSalaries(salaries.filter(salary => salary.id !== id));
    }

    // Function to update a salary entry (dummy function for demonstration)
    const updateSalary = (id) => {
        alert(`Update salary with ID ${id}`);
    }

    return (
        <>
            <AdminLayout>
                <div className="container">
                    <div className="bg-white p-3 mt-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Gross Salary</th>
                                    <th>Net Salary</th>
                                    <th>Action</th> {/* Added Action column */}
                                </tr>
                            </thead>
                            <tbody>
                                {salaries.map(salary => (
                                    <tr key={salary.id}>
                                        <td>{salary.employeeId}</td>
                                        <td>{salary.name}</td>
                                        <td>{salary.position}</td>
                                        <td>{salary.department}</td>
                                        <td>{salary.grossSalary}</td>
                                        <td>{salary.netSalary}</td>
                                        <td>
                                           <Link to={`/admin/financial/emForm/${salary.id}`}>
                                            <button className="btn btn-sm btn-primary me-2">Update</button>
                                           </Link>
                                           
                                            <button class="btn btn-primary"className="btn btn-sm btn-danger" onClick={() => deleteSalary(salary.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

export default Salaries;
