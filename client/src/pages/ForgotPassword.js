import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Invalid email format";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (validateForm()) {
            Axios.post("http://localhost:3001/auth/forgotpassword", { email })
                .then((response) => {
                    console.log(response.data);
                    alert("Check your email for the reset password link.");
                    navigate("/login");
                })
                .catch((err) => {
                    console.error(err);
                    setServerError("An error occurred. Please try again later.");
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
                                <h2>Forgot Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <div
                                        className={`mb-3 ${submitted && errors.email ? "has-error" : ""
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
                                    {serverError && (
                                        <div className="mb-3 text-danger">{serverError}</div>
                                    )}
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" type="submit">
                                            Send
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

export default ForgotPassword;