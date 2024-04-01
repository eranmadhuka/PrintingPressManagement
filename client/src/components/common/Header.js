import React from 'react'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const menu = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Shop",
            link: "/shop"
        },
        {
            name: "Blog",
            link: "/blog"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ]

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
                <div className="container">
                    <Link to={`/`}>
                        <img src={Logo} alt="logo" className="logo me-3" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {menu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.link}
                                            className={`nav-link fw-bold ${location.pathname === item.link ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </Link>

                                    </li>
                                );
                            })}
                        </ul>
                        <div className="d-flex">
                            <Link to='/login'>
                                <button className='btn btn-outline-primary me-2'>Sign In</button>
                            </Link>

                            <Link to='/register'>
                                <button className='btn btn-primary'>Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
