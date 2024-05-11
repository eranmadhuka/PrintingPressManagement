import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeLayout from "../../Layouts/EmployeeLayout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AddLeave = () => {
  const { user } = useAuthContext();

  const { id } = useParams();
  const [userEmail, SetUserEmail] = useState(user.email);
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setLeaveType] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    // if (!name) {
    //   errors.name = "Name is required";
    // }
    // Validate "from" and "to" dates
    // Validate "from" and "to" dates
    if (!from) {
      errors.from = "From date is required";
    } else {
      const fromDate = new Date(from);
      const currentDate = new Date();
      if (isNaN(fromDate.getTime())) {
        errors.from = "Invalid from date format";
      } else if (fromDate < currentDate) {
        errors.from = "From date must be in the future";
      }
    }

    if (!to) {
      errors.to = "To date is required";
    } else {
      const toDate = new Date(to);
      const fromDate = new Date(from);
      if (isNaN(toDate.getTime())) {
        errors.to = "Invalid to date format";
      } else if (toDate < fromDate) {
        errors.to = "To date must be after the from date";
      }
    }

    // Validate leave type
    if (!type) {
      errors.type = "Leave type is required";
    }

    // Validate reason
    if (!reason) {
      errors.reason = "Reason is required";
    }

    // Validate leave duration
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const differenceInDays = Math.ceil(
        (toDate - fromDate) / (1000 * 60 * 60 * 24)
      );
      if (differenceInDays > 30) {
        errors.to = "Leave duration cannot exceed 30 days";
      }
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      axios
        .post("http://localhost:5000/employeeLeave/createLeave", {
          userEmail,
          reason,
          from,
          to,
          type,
        })
        .then((result) => {
          console.log(result);
          navigate("/employee/leaves");
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <EmployeeLayout>
        <div className="bg-white p-3 mt-2">
          <div>
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-3">
                <input
                  type="text"
                  className={`form-contro`}
                  id="name"
                  value={id}
                  required
                  onChange={(e) => setEID(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div> */}
              <div className="mb-3">
                <label htmlFor="rsn" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.reason && "is-invalid"}`}
                  id="rsn"
                  required
                  onChange={(e) => setReason(e.target.value)}
                />
                {errors.reason && (
                  <div className="invalid-feedback">{errors.reason}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.from && "is-invalid"}`}
                  id="from"
                  required
                  onChange={(e) => setFrom(e.target.value)}
                />
                {errors.from && (
                  <div className="invalid-feedback">{errors.from}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.to && "is-invalid"}`}
                  id="to"
                  required
                  onChange={(e) => setTo(e.target.value)}
                />
                {errors.to && (
                  <div className="invalid-feedback">{errors.to}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  Leave type
                </label>
                <select
                  className={`form-select ${errors.type && "is-invalid"}`}
                  aria-label="Default select example"
                  id="leaveType"
                  required
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option selected>Leave type</option>
                  <option value="Medical">Medical</option>
                  <option value="Personal">Personal</option>
                  <option value="Service">Service</option>
                </select>
                {errors.type && (
                  <div className="invalid-feedback">{errors.type}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </EmployeeLayout>
    </>
  );
};

export default AddLeave;
