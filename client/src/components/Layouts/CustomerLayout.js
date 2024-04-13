import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import proImg from "../../assets/images/users/user1.jpg";

import './AdminLayout.css';

const CustomerLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div>
            {/* Header */}
            <Header />

            <section>
                <div className="container">
                    <div className="container-fluid">
                        <div className="row">
                            {/* Sidebar */}
                            <nav
                                id="sidebarMenu"
                                className="col-md-3 col-lg-2 d-md-block sidebar bg-white shadow-sm"
                                style={{ height: "80vh", overflowY: "auto", width: "36vh" }}
                            >
                                <div className="position-sticky pt-3">
                                    {/* Profile Photo and Email */}
                                    <div className="text-center mb-3">
                                        <img
                                            src={proImg}
                                            alt="Profile"
                                            className="img-fluid rounded-circle mt-2"
                                            style={{ width: "100px", height: "100px" }}
                                        />
                                        <h3 className="fs-5 mb-0 mt-3">ama123</h3>
                                        <p className="m-0">amal@gmail.com</p>
                                    </div>

                                    {/* Navigation Menu */}
                                    <ul className="list-unstyled ps-0">
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/:id' ? 'active' : ''}`}>
                                            <Link to="/user/:id" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-person-circle me-2"></i>
                                                Profile Settings
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/orders' ? 'active' : ''}`}>
                                            <Link to="/user/orders" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-cart-check-fill me-2"></i>
                                                Order History
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/wishlist' ? 'active' : ''}`}>
                                            <Link to="/user/wishlist" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-bag-heart-fill me-2"></i>
                                                Wishlist
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/notifications' ? 'active' : ''}`}>
                                            <Link to="/user/notifications" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-bell-fill me-2"></i>
                                                Notifications
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/feedback' ? 'active' : ''}`}>
                                            <Link to="/user/feedback" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-chat-dots-fill me-2"></i>
                                                Feedback & Support
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/updatepassword' ? 'active' : ''}`}>
                                            <Link to="/user/updatepassword" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-file-earmark-lock2-fill me-2"></i>
                                                Update Password
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/deleteAccount:/id' ? 'active' : ''}`}>
                                            <Link to="/user/deleteAccount:/id" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-x-octagon-fill me-2"></i>
                                                Delete Account
                                            </Link>
                                        </li>
                                        <li className={`mb-1 nav-item border-bottom ${location.pathname === '/user/logout' ? 'active' : ''}`}>
                                            <Link to="/user/logout" className='text-decoration-none d-block nav-link p-2'>
                                                <i className="bi bi-door-closed-fill me-2"></i>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                            {/* Dashboard Body */}
                            <main
                                className="col-md-9 ms-3 col-lg-9 px-md-4 bg-white shadow-sm"
                                style={{
                                    width: "78%",
                                    margin: "0 auto",
                                    height: "80vh",
                                    overflowY: "auto",
                                }}
                            >
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
