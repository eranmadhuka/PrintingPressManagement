import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Header from '../common/Header';
import UserImg from '../../assets/images/users/user1.jpg'

const CustomerLayout = ({ children }) => {
    const location = useLocation();
    return (
        <div>
            {/* Header */}
            <Header />

            <section>
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <nav id="sidebarMenu" className="col-md-3 col-lg-3 p-4 d-md-block sidebar collapse bg-white shadow-sm border">
                            <div className="position-sticky pt-3">
                                <div className='text-center d-flex flex-column align-items-center justify-content-center'>
                                    <div className='my-3'>
                                        <img src={UserImg} alt={UserImg} className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "100px", height: "100px" }} />
                                    </div>
                                    <h4 className='fs-5 fw-bold text-dark mb-0'>Cutomer Name</h4>
                                    <p>example@email.com</p>
                                </div>
                                <ul className="nav flex-column">
                                    <li className={`nav-item mb-2 ${location.pathname === '/user' ? 'active' : ''} `}>
                                        <Link to="/user" className='nav-link active'>
                                            <i class="bi bi-gear-fill me-2"></i> Prodile Settings
                                        </Link>
                                    </li>
                                    <li className={`nav-item mb-2 ${location.pathname === '/user/orders' ? 'active' : ''} `}>
                                        <Link to="/user/orders" className='nav-link active'>
                                            <i className="bi bi-bag-check-fill me-2"></i> Order History
                                        </Link>
                                    </li>
                                    <li className={`nav-item mb-2 ${location.pathname === '/user/wishlist' ? 'active' : ''} `}>
                                        <Link to="/user/wishlist" className='nav-link active'>
                                            <i className="bi bi-bookmark-heart-fill me-2"></i> Wishlist
                                        </Link>
                                    </li>
                                    <li className={`nav-item mb-2 ${location.pathname === '/user/updatePassword' ? 'active' : ''} `}>
                                        <Link to="/user/updatePassword" className='nav-link active'>
                                            <i className="bi bi-file-earmark-lock2-fill me-2"></i> Update Password
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        {/* Customer dashboard Body */}
                        <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 bg-white shadow-sm">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerLayout;
