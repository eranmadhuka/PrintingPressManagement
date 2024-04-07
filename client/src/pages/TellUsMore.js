import React from 'react'
import { Link } from 'react-router-dom'

const TellUsMore = () => {
    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className='text-start'>
                                <span>Get your Order</span>
                                <h2>Our Grate Startup IsLaunching This Fall</h2>
                                <p>Get in touch to discuss your employee wellbeing needs today. Please give us a call, drop us an email or fill out the contact form and we’ll get back to you.</p>
                                <ul className='p-0'>
                                    <li className='list-group-item pb-2 me-3'><i className="bi bi-asterisk me-2"></i>Collaborate</li>
                                    <li className='list-group-item pb-2 me-3'><i className="bi bi-asterisk me-2"></i>Collaborate</li>
                                    <li className='list-group-item pb-2 me-3'><i className="bi bi-asterisk me-2"></i>Collaborate</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='bg-white shadow-sm p-4'>
                                <h3>Tell us more about!</h3>
                                <form className='py-4'>
                                    <div className="row mb-3">
                                        <label for="inputEmail3" className="col-sm-4 col-form-label">Business name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="inputPassword3" className="col-sm-4 col-form-label">Address:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="inputPassword3" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="inputPassword3" className="col-sm-4 col-form-label">Telephone:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="inputPassword3" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="inputPassword3" className="col-sm-4 col-form-label">Des:</label>
                                        <div className="col-sm-8">
                                            <textarea class="form-control" id="floatingTextarea2"></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="inputPassword3" className="col-sm-4 col-form-label">Upload Design:</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="file" id="formFile" />
                                        </div>
                                    </div>
                                    <Link to='/checkout' className='d-grid gap-2 pt-3'>
                                        <button type="submit" className="btn btn-primary">Complete Order</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TellUsMore
