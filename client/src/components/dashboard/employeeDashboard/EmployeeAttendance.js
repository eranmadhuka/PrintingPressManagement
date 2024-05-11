import React, { useState } from "react";
import EmployeeLayout from "../../Layouts/EmployeeLayout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";

const EmployeeAttendance = () => {
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const handleCheckIn = async () => {
    try {
      // Get the current employee's email (replace 'employee@example.com' with your actual implementation)
      const empEmail = user.email;
      const checkInTime = new Date(); // Current time

      // Send a POST request to the backend to log the check-in time
      const response = await axios.post(
        "http://localhost:5000/attendance/createAttendance",
        { empEmail, checkInTime }
      );
      console.log(response.data); // Assuming the backend returns the attendance log

      // Update the displayed check-in time
      setCheckInTime(checkInTime.toLocaleString());
    } catch (error) {
      setError("Failed to log check-in time");
      console.error(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      // Get the current employee's email (replace 'employee@example.com' with your actual implementation)
      const empEmail = user.email;
      const checkOutTime = new Date(); // Current time

      // Send a PUT request to the backend to update check-out time
      const response = await axios.put(
        "http://localhost:5000/attendance/updateAttendance",
        { empEmail, checkOutTime }
      );
      console.log(response.data); // Assuming the backend returns the updated attendance log

      // Update the displayed check-out time
      setCheckOutTime(checkOutTime.toLocaleString());
    } catch (error) {
      setError("Failed to log check-out time");
      console.error(error);
    }
  };

  return (
    <EmployeeLayout>
      <div className="bg-white p-3 mt-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <h3 className="fs-5 fw-bold">Employee Attendance</h3>
        <div>
          {checkInTime ? (
            <p>Check-in Time: {checkInTime}</p>
          ) : (
            <button onClick={handleCheckIn} className="btn btn-primary">
              Check In
            </button>
          )}
          {checkOutTime && <p>Check-out Time: {checkOutTime}</p>}
          {!checkOutTime && checkInTime && (
            <button onClick={handleCheckOut} className="btn btn-primary mt-2">
              Check Out
            </button>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeAttendance;
