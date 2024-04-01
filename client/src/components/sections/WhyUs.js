import React from 'react'
import AboutImg from '../../assets/images/Contact-print.webp'

const WhyUs = () => {
    return (
        <>
            <section>
                <div className='container p-5'>
                    <div className="row d-flex align-items-center">
                        <div className="col-lg-6">
                            <div>
                                <h4>CORPORATE GIFTS</h4>
                                <h2>Reasons to get <span>printing</span> started with us</h2>
                                <p className='my-3'>In ullamcorper blandit porta. Aenean venenatis leo. Vivamus imperdiet vel nisl ac lobortis. Praesent ex diam, sollicitudin in sapien nec, hendrerit rutrum odio. Maecenas aliquam lobortis orci, et pellentesque massa blandit pulvinar.</p>
                                <ul className="p-0 bg-transparent">
                                    <li className="list-group-item">
                                        <h4 className='fw-bold fs-5 text-dark'>Embraided & Printed T-Shirts</h4>
                                        <p>Cursus metus aliquam eleifend mi in nulla posuere sollicitudi elis eget nunc.</p>
                                    </li>
                                    <li className="list-group-item">
                                        <h4 className='fw-bold fs-5 text-dark'>Embraided & Printed T-Shirts</h4>
                                        <p>Cursus metus aliquam eleifend mi in nulla posuere sollicitudi elis eget nunc.</p>
                                    </li>
                                    <li className="list-group-item">
                                        <h4 className='fw-bold fs-5 text-dark'>Embraided & Printed T-Shirts</h4>
                                        <p>Cursus metus aliquam eleifend mi in nulla posuere sollicitudi elis eget nunc.</p>
                                    </li>
                                    <li className="list-group-item">
                                        <h4 className='fw-bold fs-5 text-dark'>Embraided & Printed T-Shirts</h4>
                                        <p>Cursus metus aliquam eleifend mi in nulla posuere sollicitudi elis eget nunc.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={AboutImg} alt={AboutImg} style={{ 'width': '100%', 'height': '10%', 'objectFit': 'contain' }} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default WhyUs
