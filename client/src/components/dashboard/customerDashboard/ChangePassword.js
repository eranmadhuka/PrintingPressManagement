import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerLayout from "../../Layouts/CustomerLayout";
import "./customer.css";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation rules
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Basic validation
    let errors = {};
    if (!currentPassword.trim()) {
      errors.currentPassword = "Current Password is required";
    }
    if (!newPassword.trim()) {
      errors.newPassword = "New Password is required";
    } else if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        "Password must contain at least 8 characters, including letters, numbers, and a special character";
    } else if (newPassword === currentPassword) {
      errors.newPassword =
        "Please enter a different password from your current one";
    }
    if (!confirmNewPassword.trim()) {
      errors.confirmNewPassword = "Confirm New Password is required";
    } else if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      if (!user || !user.token) {
        console.error("User not authenticated");
        // Handle authentication error, such as redirecting to the login page
        return;
      }

      axios
        .post(
          "http://localhost:5000/auth/changepassword/" + user.email,
          {
            currentPassword,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Pass JWT token in the Authorization header
            },
          }
        )
        .then((response) => {
          setSuccess(response.data.message);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          console.log(response.data.message);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "password updated successfully!",
          });
          navigate("/user/" + user.email);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized: Fill the fields");
            setErrors({ currentPassword: "Wrong password" });
          } else {
            console.error("Error:", error);
            // Handle other errors
          }
        });
    } else {
      // Display validation errors
      setErrors(errors);
    }
  };

  return (
    <CustomerLayout>
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center ms-2 pt-3 pb-2 mt-3 mb-3 border-bottom">
          <h3>Update Password</h3>
        </div>
        {/* Your dashboard content goes here */}
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-7">
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password*
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.currentPassword ? "is-invalid" : ""
                    }`}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                  {errors.currentPassword && (
                    <div className="invalid-feedback">
                      {errors.currentPassword}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password*
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.newPassword ? "is-invalid" : ""
                    }`}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Re-Enter New Password*
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmNewPassword ? "is-invalid" : ""
                    }`}
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                  />
                  {errors.confirmNewPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmNewPassword}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-5">
                    <div
                      className="d-grid gap-2"
                      style={{ marginTop: "30px", width: "180px" }}
                    >
                      <button className="btn btn-primary" type="submit">
                        Update Password
                      </button>
                    </div>
                  </div>
                  <div className="col-5">
                    <div
                      className="d-grid gap-2"
                      style={{ marginTop: "30px", width: "180px" }}
                    >
                      <button className="btn btn-outline-primary" type="button">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ChangePassword;
