import React, { useEffect, useState } from "react";
import loginImg from "../../src/assets/images/login.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(0\d{9})$/.test(phone)) {
      errors.phone =
        "Invalid phone number format (starts with 0, followed by 9 digits)";
    }
    if (!password.trim()) {
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
      // Check if email starts with "print"
      const isAdmin = email.toLowerCase().startsWith("print");

      Axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        phone,
        password,
        role: isAdmin ? "admin" : "user", // Pass role based on email
      })
        .then((response) => {
          // Reset form fields after successful submission
          setUsername("");
          setEmail("");
          setPhone("");
          setPassword("");
          setSubmitted(false); // Reset submitted state

          // Dispatch login action after successful registration
          dispatch({ type: "LOGIN", payload: response.data });

          // Navigate to login page
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          // Handle error here
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
                <h2>REGISTER</h2>
                <p>Please enter your details</p>
                <form onSubmit={handleSubmit}>
                  <div
                    className={`mb-3 ${
                      submitted && errors.username ? "has-error" : ""
                    }`}
                  >
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usernameid"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {submitted && errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>

                  <div
                    className={`mb-3 ${
                      submitted && errors.email ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {submitted && errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div
                    className={`mb-3 ${
                      submitted && errors.phone ? "has-error" : ""
                    }`}
                  >
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneid"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {submitted && errors.phone && (
                      <div className="text-danger">{errors.phone}</div>
                    )}
                  </div>
                  <div
                    className={`mb-3 ${
                      submitted && errors.password ? "has-error" : ""
                    }`}
                  >
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
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
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={loginImg}
                alt="image"
                style={{ width: "100%", height: "60%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
