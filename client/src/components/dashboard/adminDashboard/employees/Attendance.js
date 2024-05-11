import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";

const Attendance = () => {
  const [employeeAttendance, setEmployeeAttendance] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/attendance/getAllAttendance")
      .then((result) => setEmployeeAttendance(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Employee Attendance</h3>
          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            <form className="d-flex" role="search">
              {/* <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search by EmpID"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            /> */}
            </form>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Employee Email</th>
                <th scope="col">Date</th>
                <th scope="col">Check-in</th>
                <th scope="col">Check-out</th>
                <th scope="col">Hours</th>
                <th scope="col">Overtime</th>
              </tr>
            </thead>
            <tbody>
              {employeeAttendance.map((item) => (
                <tr key={item._id}>
                  <td>{item.EmpEmail}</td>
                  <td>
                    {item.Date} {item.lname}
                  </td>
                  <td>{item.checkInTime}</td>
                  <td>{item.CheckOut}</td>
                  <td>{item.WorkingHours}</td>
                  <td>{item.Overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default Attendance;
