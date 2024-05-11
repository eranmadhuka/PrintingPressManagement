import React from "react";
import Logo from "../../assets/images/logo.png";
import PaymentImg from "../../assets/images/payment.png";

const Footer = () => {
    return (
        <>
            <div className="container-fluid my-3 bg-white">
                <footer className="text-center text-lg-start py-5">
                    <div className="container pb-0">
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <img
                                    src={Logo}
                                    alt="logo"
                                    style={{ width: "150px" }}
                                    className="mb-4"
                                />
                                <p className="text-primary-emphasis">
                                    Welcome to our printing press management system. We offer a
                                    wide range of services, from design to delivery, ensuring your
                                    printing needs are met efficiently and professionally.
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Services</h6>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/services/design"
                                    >
                                        Graphic Design
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/services/printing"
                                    >
                                        Printing Services
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/services/bindery"
                                    >
                                        Bindery & Finishing
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/services/delivery"
                                    >
                                        Delivery
                                    </a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Resources</h6>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/blog"
                                    >
                                        Blog
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/faq"
                                    >
                                        FAQ
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/contact"
                                    >
                                        Contact Us
                                    </a>
                                </p>
                                <p>
                                    <a
                                        className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                                        href="/about"
                                    >
                                        About Us
                                    </a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Contact</h6>
                                <p className="text-primary-emphasis">
                                    <i className="bi bi-envelope-fill"></i> info@printpress.com
                                </p>
                                <p className="text-primary-emphasis">
                                    <i className="bi bi-telephone-fill"></i> +1 234 567 8901
                                </p>
                                <p className="text-primary-emphasis">
                                    <i className="bi bi-house-door-fill"></i> 123 Print Way, New
                                    York, NY 10012, US
                                </p>
                                <p className="text-primary-emphasis">
                                    <i className="bi bi-printer-fill"></i> +1 234 567 8902
                                </p>
                            </div>
                        </div>

                        {/* Add employee login link here */}
                        <div className="text-center mt-3">
                            <a
                                href="/emplogin"
                                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis"
                            >
                                Employee Login
                            </a>
                        </div>

                        <hr className="my-3" />

                        <div className="pt-0">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-7 col-lg-8 text-center text-md-start">
                                    <div className="p-3 text-primary-emphasis">
                                        © 2023 PrintPress. All rights reserved.
                                    </div>
                                </div>

                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                    <img
                                        src={PaymentImg}
                                        alt="Accepted payment methods"
                                        width="300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
