import React from 'react'
import AboutImg from '../../assets/images/about.png'

const AboutSection = () => {
    return (
        <>
            <section className='bg-white'>
                <div className="container p-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-6 d-none d-md-block">
                            <img src={AboutImg} alt="AboutImg" style={{ 'width': '100%' }} />
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <h4>LET’S GET PRINTING</h4>
                                <h2>Reasons to get printing started with us.</h2>
                                <p className='my-3'>We have all the equipment, know-how and every thing you will need to receive fast, reliable printing services with high quality results. Chat live with us today to get things moving. </p>
                                <button className='btn btn-primary'>Get in touch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default AboutSection
