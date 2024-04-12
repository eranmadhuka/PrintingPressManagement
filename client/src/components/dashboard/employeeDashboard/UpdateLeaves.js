import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeLayout from "../../Layouts/EmployeeLayout";

const UpdateLeaves = () => {
  const { id } = useParams();
  const [eid, setEID] = useState("6611372747da37caca75bd6a");
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setLeaveType] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("" + id)
      .then((result) => {
        console.log(result);
        setEID(result.data.fname);
        setReason(result.data.reason);
        setFrom(result.data.from);
        setTo(result.data.to);
        setLeaveType(result.data.type);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    // if (!name) {
    //   errors.name = "Name is required";
    // }
    if (!reason) {
      errors.reason = "Reason is required";
    }
    if (!from) {
      errors.from = "From date is required";
    }
    if (!to) {
      errors.to = "To date is required";
    }
    if (!type) {
      errors.type = "Leave type is required";
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      axios
        .put("http://localhost:5000/employeeLeave/createLeave" + eid, {
          eid,
          reason,
          from,
          to,
          type,
        })
        .then((result) => {
          console.log(result);
          navigate(""); // Redirect after successful submission
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
              <div className="mb-3">
                {/* <label htmlFor="name" className="form-label">
                      ID
                    </label> */}
                <input
                  type="hidden"
                  className={`form-contro`}
                  id="name"
                  value={id}
                  required
                  onChange={(e) => setEID(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
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
                <select
                  className={`form-select ${errors.type && "is-invalid"}`}
                  aria-label="Default select example"
                  id="leaveType"
                  required
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="">Leave type</option>
                  <option value="1">Medical</option>
                  <option value="2">Personal</option>
                  <option value="3">Service</option>
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

export default UpdateLeaves;
