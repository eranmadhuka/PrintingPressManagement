//Employees.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((result) => setEmployee(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5000/employees/deleteUser/" + id)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const filteredEmployee = employee.filter((item) =>
    item.empID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(employee);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
  };

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleEmailLink = () => {
    const { to, subject, text } = emailData;
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoLink;
  };

  return (
    <AdminLayout>
      <div className="bg-white p-3 mt-2">
        <h3 className="fs-5 fw-bold">Employee List</h3>
        <div className="d-flex align-items-center justify-content-between border-bottom py-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by EmpID"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link to="/admin/employees/AddEmployee">
            <button className="btn btn-primary">+ Add Employee</button>
          </Link>
          <button
            className="btn btn-success ms-2"
            onClick={handleDownloadExcel}
          >
            Download Excel
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Employee id</th>
              <th scope="col">Full Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Birth date</th>
              <th scope="col">email</th>
              <th scope="col">Contact number</th>
              <th scope="col">designation</th>
              <th scope="col">department</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.map((item) => (
              <tr key={item._id}>
                <td>{item.empID}</td>
                <td>
                  {item.fname} {item.lname}
                </td>
                <td>{item.gender}</td>
                <td>{item.birthDate}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.designation}</td>
                <td>{item.department}</td>
                <td>{item.salary.basicSalary}</td>
                <td>
                  <Link to={`/admin/employees/UpdateEmployee/${item._id}`}>
                    <i className="bi bi-pencil-square text-primary me-3"></i>
                  </Link>
                  <i
                    className="bi bi-trash-fill text-danger"
                    onClick={(e) => handleDelete(item._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Email form */}
        <div className="mt-4">
          <h4 className="fw-bold">Send Email</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              name="to"
              value={emailData.to}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Message"
              rows="4"
              name="text"
              value={emailData.text}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleEmailLink}>
            Send Email
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employees;