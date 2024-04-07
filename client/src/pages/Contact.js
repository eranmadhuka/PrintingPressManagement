import React from 'react'
import PageTopBanner from '../components/common/PageTopBanner'
import ContactImg from '../assets/images/Contact-print.webp'

const Contact = () => {
    return (
        <>
            <PageTopBanner
                title="Contact Us"
                path="/contact"
            />

            <section className='bg-white' >
                <div className="container p-5">
                    <div className='text-center'>
                        <h2><span>Get in touch</span> with us</h2>
                        <p>
                            Get in touch to discuss your employee wellbeing needs today. Please give us a call, <br /> drop us an email or fill out the contact form and we’ll get back to you.
                        </p>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-4">
                            <div className="card text-center">
                                <i className="bi bi-telephone-fill fs-1 py-2"></i>
                                <div className="card-body">
                                    <h5 className="card-title">Get In Touch</h5>
                                    <p className="m-0">Mobile: 084 3456 19 89</p>
                                    <p className="m-0">Hotline: 1900 26886</p>
                                    <p className="m-0">E-mail: hello@printec.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card text-center">
                                <i className="bi bi-geo-alt-fill fs-1 py-2"></i>
                                <div className="card-body">
                                    <h5 className="card-title">Address</h5>
                                    <p className="m-0">Head Office: 785 15h Street, Office 478</p>
                                    <p className="m-0">Berlin, De 81566</p>
                                    <p className="m-0">Check Location</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card text-center">
                                <i className="bi bi-clock-fill fs-1 py-2"></i>
                                <div className="card-body">
                                    <h5 className="card-title">Hour of operation</h5>
                                    <p className="m-0">Monday-Friday: 8am-5pm</p>
                                    <p className="m-0">Saturday: 9am-Midday</p>
                                    <p className="m-0">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63372.81289574271!2d79.87110799156677!3d6.914403829698229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1711994370381!5m2!1sen!2slk"
                                // width="600"
                                // height="450"
                                style={{ "width": "100%", "height": "400px" }}
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className='text-center'>
                            <h2>Send a <span>message</span></h2>
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-6">
                                <form>
                                    <div className="mb-3">
                                        <label for="name" className="form-label">Your Name</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="comment" className="form-label">Message.</label>
                                        <textarea class="form-control" placeholder="Write Somthing.." id="comment"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-6">
                                <img src={ContactImg} alt={ContactImg} className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
