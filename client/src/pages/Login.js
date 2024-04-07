import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import LoginImg from '../assets/images/login.png';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        let errors = {};
        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length === 0) {
            // Proceed with form submission
            // For demonstration purposes, we'll just log the values
            console.log("Submitting:", { email, password });
        } else {
            // Display validation errors
            setErrors(errors);
        }

        // Pass data to the server
        axios.post("http://localhost:3", { email, password })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

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
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        <div id="emailHelp" className="form-text">
                                            We'll never share your email with anyone else.
                                        </div>
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
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="exampleInputPassword1"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="row d-flex justify-content-between mb-3">
                                        <div className=" form-check col">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                            />
                                            <label className="form-check-label" htmlFor="exampleCheck1">
                                                Remember me
                                            </label>
                                        </div>
                                        <div className=" form-check col">
                                            <a
                                                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                                href="/"
                                            >
                                                Forget Password
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" type="submit">
                                            Sign In
                                        </button>

                                        <p className="text-center pt-2">
                                            Don't have an account? <a href="/">Sign Up for free</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={LoginImg}
                                alt={LoginImg}
                                style={{ 'width': "100%", 'height': "60%" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
