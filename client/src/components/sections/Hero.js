import React from 'react'
import HomeImg from '../../assets/images/home.png'

const Hero = () => {
    return (
        <>
            <section>
                <div className="container p-6">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div>
                                <h1 className='fw-bold'>Maximize efficiency, <span>streamline</span> your workflow.</h1>
                                <p>Elementor is an intuitive and flexible page builder. It enables you to create and customize </p>
                                <button className='btn btn-primary'>Order Now</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <img src={HomeImg} alt="HeroImg" style={{ 'width': '100%' }} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero

