import React from "react";
import loginImg from "../../src/assets/images/login.png";

const Register = () => {
    return (
        <>
            <section>
                <div className="container text-start">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="p-5 bg-white shadow-sm">
                                <h2>REGISTER</h2>
                                <p>Pelase enter your details</p>
                                <form>
                                    <div className="mb-3">
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
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="exampleInputPassword1"
                                            className="form-label"
                                        >
                                            Phone
                                        </label>
                                        <input type="text" className="form-control" id="phoneid" />
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
                                        />
                                    </div>

                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary" type="button">
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={loginImg}
                                alt={loginImg}
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