import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../Layouts/AdminLayout';

const Update = () => {
  const { id } = useParams();
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [netSalary, setNetSalary] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/financial/empFinancial/getEmployeeDetails/` + id)
      .then((result) => {
        console.log(result);
        setEmployeeId(result.data._id);
        setEmployeeName(result.data.fname);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setPosition(result.data.designation);
        setDepartment(result.data.department);
        setNetSalary(result.data.netSalary);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const validatePhone = (phoneNumber) => {
    const regex = /^[0-9]{3}[0-9]{3}[0-9]{4}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number (Format: 023 4567890)");
      return;
    }
    setPhoneError(""); // Clear any previous error message
    // Proceed with updating the employee details
    axios
      .put(`http://localhost:5000/financial/empFinancial/updateEmployeeDetails/${id}`, {
        employeeId,
        employeeName,
        email,
        phone,
        position,
        department,
        netSalary,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-center">
        <div>
          <h2>Employee Details Form</h2>
          <div className="border p-3">
            <form id="employeeForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                <input type="text" className="form-control" id="employeeId" name="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">Name:</label>
                <input type="text" className="form-control" id="employeeName" name="employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="tel" className="form-control" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">Position:</label>
                <input type="text" className="form-control" id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department:</label>
                <input type="text" className="form-control" id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="netSalary" className="form-label">Net Salary:</label>
                <input type="number" className="form-control" id="netSalary" name="netSalary" value={netSalary} onChange={(e) => setNetSalary(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Update;
