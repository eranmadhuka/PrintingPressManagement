import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import proImg from "../../assets/images/9434619.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHistory,
  faHeart,
  faBell,
  faComments,
  faLock,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

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
                    <div>ama123</div>
                    <p>amal@gmail.com</p>
                  </div>

                  {/* Navigation Menu */}
                  <ul className="nav flex-column">
                    <li className="nav-item mt-2">
                      <Link
                        to="/user"
                        className={`nav-link ${
                          location.pathname === "/user" ? "active" : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Profile Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/orders"
                        className={`nav-link ${
                          location.pathname === "/user/orders" ? "active" : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faHistory} className="me-2" />
                        Order History
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/wishlist"
                        className={`nav-link ${
                          location.pathname === "/user/wishlist" ? "active" : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                        Wishlist
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/notifications"
                        className={`nav-link ${
                          location.pathname === "/user/notifications"
                            ? "active"
                            : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faBell} className="me-2" />
                        Notifications
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/feedback"
                        className={`nav-link ${
                          location.pathname === "/user/feedback" ? "active" : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faComments} className="me-2" />
                        Feedback & Support
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/updatePassword"
                        className={`nav-link ${
                          location.pathname === "/user/updatePassword"
                            ? "active"
                            : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faLock} className="me-2" />
                        Update Password
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/deleteAccount"
                        className={`nav-link ${
                          location.pathname === "/user/deleteAccount/:id"
                            ? "active"
                            : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />
                        Delete Account
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/user/logout"
                        className={`nav-link ${
                          location.pathname === "/user/logout" ? "active" : ""
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
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
