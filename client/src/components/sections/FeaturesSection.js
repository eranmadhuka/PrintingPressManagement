import React from 'react';
import TransportImg from '../../assets/images/transport.png';

const FeaturesSection = () => {
    return (
        <>
            <section>
                <div className='container p-5'>
                    <div className='text-center'>
                        <h4>100% SOLID PRINTING</h4>
                        <h2>Reduce costs and <span>deliver <br /> faster</span> with web print</h2>
                        <p>We have all the equipment, know-how and everything you will need to receive fast, </p>
                    </div>

                    <div className='row mt-5'>
                        <div className="col-lg-4">
                            <div className="card border-0 shadow p-2 my-3">
                                <div className='d-flex flex-column align-items-center p-1'>
                                    <i className="bi bi-calendar-check fs-1"></i>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                            <div className="card border-0 shadow p-2 my-3">
                                <div className='d-flex flex-column align-items-center p-1'>
                                    <i className="bi bi-calendar-check fs-1"></i>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center align-items-center d-none d-md-block">
                            <img src={TransportImg} alt="TransportImg" />
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 shadow p-2 my-3">
                                <div className='d-flex flex-column align-items-center p-1'>
                                    <i className="bi bi-calendar-check fs-1"></i>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                            <div className="card border-0 shadow p-2 my-3">
                                <div className='d-flex flex-column align-items-center p-1'>
                                    <i className="bi bi-calendar-check fs-1"></i>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturesSection;
