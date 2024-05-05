import React, { useState } from "react";
import Axios from "axios"; // Import Axios with curly braces
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!password.trim()) {
      // Fix the validation condition to check password instead of email
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must contain at least 8 characters, one letter, one number and one special character";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      Axios.post(`http://localhost:5000/auth/resetpassword/${token}`, {
        password,
      })
        .then((response) => {
          console.log(response.data);
          // Handle success
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          // Handle error
        });
    }
  };

  return (
    <>
      <section>
        <div className="container text-start">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5 bg-white shadow-sm">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                  <div
                    className={`mb-3 ${
                      submitted && errors.password ? "has-error" : ""
                    }`}
                  >
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {submitted && errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
