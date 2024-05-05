import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useHistory hook
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import proImg from "../../assets/images/9434619.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../../../src/hooks/useAuthContext.js";
import Axios from "axios";
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
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const { dispatch } = useAuthContext();
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) {
      Axios.get(`http://localhost:5000/auth/customer/` + user.email, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Pass JWT token in the Authorization header
        },
      }).then((result) => {
        console.log(result);
        setUsers(result.data);
        const filename = result.data.filename;
        // Store filename in a variable
        console.log(filename);

        Axios.get(`http://localhost:5000/auth/images/` + filename, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "arraybuffer",
        })
          .then((response) => {
            const base64Image = arrayBufferToBase64(response.data);
            setImageData(base64Image);
            // Handle image retrieval result as needed
          })
          .catch((error) => {
            console.error("Error fetching profile picture:", error);
            console.log("Please add a profile picture");
          });
      });
    }
  }, [user]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const handleDeleteAccount = () => {
    if (!user || !user.token) {
      console.error("User not authenticated");
      return;
    }

    Axios.delete(`http://localhost:5000/auth/deleteacc/` + user.email, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        handleLogout();
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        console.log(res);
        window.location.href = "/register";
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                  <div className="text-center mb-3 mt-2">
                    <img
                      src={
                        imageData
                          ? `data:image/jpeg;base64,${imageData}`
                          : proImg
                      } // Use the profile image path if available, otherwise fallback to default image
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  {user && (
                    <div style={{ textAlign: "center" }}>
                      <div>{users.username}</div>
                      <p>{user.email}</p>
                    </div>
                  )}

                  {/* Navigation Menu */}
                  <ul className="nav flex-column">
                    {user && (
                      <li className="nav-item mt-2">
                        <Link
                          to={`/user/${user.email}`}
                          className={`nav-link ${
                            location.pathname === "/user/:email" ? "active" : ""
                          }`}
                          style={{ textDecoration: "none" }}
                        >
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Profile Settings
                        </Link>
                      </li>
                    )}
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
                    {user && (
                      <li className="nav-item">
                        <Link
                          to={`/user/notifi/${user.email}`}
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
                    )}
                    {user && (
                      <li className="nav-item">
                        <Link
                          to={`/user/feedback/${user.email}`}
                          className={`nav-link ${
                            location.pathname === "/user/feedback"
                              ? "active"
                              : ""
                          }`}
                          style={{ textDecoration: "none" }}
                        >
                          <FontAwesomeIcon icon={faComments} className="me-2" />
                          Feedback & Support
                        </Link>
                      </li>
                    )}
                    {user && (
                      <li className="nav-item">
                        <Link
                          to={`/user/updatepassword/${user.email}`}
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
                    )}
                    <li className="nav-item">
                      <Link
                        to="/user/deleteaccount"
                        className={`nav-link ${
                          location.pathname === "/user/deleteaccount"
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => handleDeleteAccount(user.email)}
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
                        onClick={(e) => handleLogout()}
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
