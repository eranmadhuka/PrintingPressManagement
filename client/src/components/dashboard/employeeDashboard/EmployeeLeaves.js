//employee leaves
import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeLayout from "../../Layouts/EmployeeLayout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const EmployeeLeaves = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employeeLeave/getLeaveByEmail/${user.email}`)
      .then((result) => setEmployeeLeaves(result.data))
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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge bg-warning";
      case "Approved":
        return "badge bg-success";
      case "Rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <>
      <EmployeeLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Leaves</h3>
          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form> */}
            <Link to="/employee/addLeave">
              <button type="button" className="btn btn-primary">
                Request Leave
              </button>
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Reason</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Leave type</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaves.map((item) => (
                <tr key={item._id}>
                  <td>{item.reason}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.type}</td>
                  {/* <td>{item.status}</td> */}
                  <td>
                    <span className={getStatusBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/employee/updateLeave/${item._id}`}>
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
              ))}
            </tbody>
          </table>
        </div>
      </EmployeeLayout>
    </>
  );
};

export default EmployeeLeaves;
