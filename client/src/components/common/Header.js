import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import proImg from "../../assets/images/9434619.jpg";

const Header = () => {
    const location = useLocation();
    const { user } = useAuthContext();
    const [imageData, setImageData] = useState(null);
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        if (user && (user.role === "admin" || user.role === "user")) {
            Axios.get(`http://localhost:5000/auth/customer/` + user.email, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }).then((result) => {
                console.log(result);

                const filename = result.data.filename;
                console.log(filename);

                // Fetch the image using the filename
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
                    .catch((err) => console.log(err));
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

    const menu = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Shop",
            link: "/shop",
        },
        {
            name: "Blog",
            link: "/blog",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
                <div className="container">
                    <Link to={`/`}>
                        <img src={Logo} alt="logo" className="logo me-3" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {menu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.link}
                                            className={`nav-link fw-bold ${location.pathname === item.link ? "active" : ""
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {user && (
                            <div>
                                <span>{user.email}</span>
                                <img
                                    src={
                                        imageData ? `data:image/jpeg;base64,${imageData}` : proImg
                                    }
                                    alt="Profile"
                                    onClick={() => (window.location.href = `/user/${user.email}`)}
                                    className="img-fluid rounded-circle ms-3"
                                    style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                />
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login">
                                    <button className="btn btn-outline-primary me-2">
                                        Sign In
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button className="btn btn-primary me-2">Sign Up</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
