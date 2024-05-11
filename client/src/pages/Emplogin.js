import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/images/login.png";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Emplogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    axios
      .post("http://localhost:5000/employees/emplogin", { email, password })

      .then((response) => {
        const { data } = response;
        if (data && data.status) {
          console.log(response);
          dispatch({ type: "LOGIN", payload: response.data });

          // Redirect the user based on their role
          const { role } = response.data;
          console.log(response.data);

          navigate("/employee/" + email);
        } else {
          console.log(response);
          setError("Incorrect email or password");
        }
      })
      .catch((err) => {
        console.log("Login failed:", err.message);
        setError("Login failed. Please try again later.");
      });
  };

  return (
    <>
      <section>
        <div className="container text-start">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5 bg-white shadow-sm">
                <h2>WELCOME BACK</h2>
                <p>Welcome Back. Please enter your details</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                  </div>
                  <div className="mb-3">
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
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                      Sign In
                    </button>
                    <p className="text-center pt-2">
                      <a href="/forgotpassword">Forgot password?</a>
                    </p>
                    <p className="text-center pt-2">
                      Don't have an account?{" "}
                      <a href="/register">Sign Up for free</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={LoginImg}
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

export default Emplogin;
