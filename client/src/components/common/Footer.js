import React from 'react'
import Logo from '../../assets/images/logo.png'
import PaymentImg from '../../assets/images/payment.png'

const Footer = () => {
    return (
        <>
            <div className="container-fluid my-3 bg-white">
                <footer className="text-center text-lg-start py-5">
                    <div className="container pb-0">

                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <img src={Logo} alt="logo" style={{ 'width': '150px' }} className='mb-4' />
                                <p className='text-primary-emphasis'>
                                    Here you can use rows and columns to organize your footer
                                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Useful links</h6>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Useful links</h6>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                                <p>
                                    <a className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-primary-emphasis" href="/">
                                        Help Center
                                    </a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">Contact</h6>
                                <p className='text-primary-emphasis'><i className="bi bi-envelope-fill"></i> info@gmail.com</p>
                                <p className='text-primary-emphasis'><i className="bi bi-telephone-fill"></i> + 01 234 567 88</p>
                                <p className='text-primary-emphasis'><i className="bi bi-house-door-fill"></i> New York, NY 10012, US</p>
                                <p className='text-primary-emphasis'><i className="bi bi-printer-fill"></i> + 01 234 567 89</p>
                            </div>
                        </div>

                        <hr className="my-3" />

                        <div className="pt-0">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-7 col-lg-8 text-center text-md-start">
                                    <div className="p-3 text-primary-emphasis">
                                        Copyright © 2023 Vikum Graphics. All rights reserved
                                    </div>
                                </div>

                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                    <img src={PaymentImg} alt="PaymentImg" width="300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer
