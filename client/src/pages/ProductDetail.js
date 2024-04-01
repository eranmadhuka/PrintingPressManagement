import React from 'react'
import PageTopBanner from '../components/common/PageTopBanner'
import ProductImg from '../assets/images/product1.png'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    return (
        <>
            <PageTopBanner
                title="products/:productId"
                path="/shop"
            />

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    {/* Product  Details */}
                    <div className="row">
                        <div className="col-lg-6">
                            <img src={ProductImg} alt={ProductImg} className='img-thumbnail' />
                        </div>
                        <div className="col-lg-6">
                            <span>IN STOCK</span>
                            <h3>Business card</h3>
                            <div className='d-flex'>
                                <div className='text-warning'>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>(5 Reviews)</p>
                            </div>
                            <h3>Rs. 10.00 - Rs. 18.00</h3>
                            <p className='border-top border-bottom py-3'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</p>

                            <form>
                                <div className="row mb-3 border-bottom pb-3">
                                    <label className="col-sm-2 col-form-label">Size:</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3 border-bottom pb-3">
                                    <label htmlFor="Quantity" className="col-sm-2 col-form-label">Quantity:</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="Quantity" />
                                    </div>
                                </div>
                                <div className="row mb-3 border-bottom pb-3">
                                    <label className="col-sm-2 col-form-label">Size:</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <span className='fw-bold fs-3'>Rs. 5000</span>
                            <br />
                            <Link to='/tell-us-more'>
                                <button className='btn btn-primary mt-3'>Start Order Request</button>
                            </Link>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="row mt-5">
                        <Tabs
                            defaultActiveKey="Description"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="Description" title="Description">
                                <p>
                                    Dimensions:W:90 x D:90 x H:103cm (Seat height: 60cm)Built around a solid beech frame with legs in polished stainless steel. The Wing chair employs hand-finished stainless steel legs that are virtually maintenance free. CH445 works equally well in groups and on its own, and is best placed where its elegant design can be viewed from all sides.Ut at erat id nunc maximus iaculis in sed mi.Lorem ipsum dolor sit amet, consectetur adipiscing.Pellentesque a odio id felis iaculis posuere a at 100% dolor.Aenean pulvinar lorem vitae felis congue, finibus sem 185.5cm/6’1″ blandit.Vestibulum convallis erat quis urna condimentum.Sed risus neque, sagittis sed pellentesque at, pharetra ut nunc. Phasellus id enim eget ante pellentesque pharetra. Phasellus et nisl urna. Integer nisl dui, efficitur in vopat sodales, tempor sed orci. Donec et euismod ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam tincidunt dictum eros at porta. Phasellus gravida dolor in sem placerat sodales sagittis sed pellentesque at, pharetra ut nunc.
                                </p>
                            </Tab>
                            <Tab eventKey="profile" title="Additional information">
                                <p>
                                    Dimensions:W:90 x D:90 x H:103cm (Seat height: 60cm)Built around a solid beech frame with legs in polished stainless steel. The Wing chair employs hand-finished stainless steel legs that are virtually maintenance free. CH445 works equally well in groups and on its own, and is best placed where its elegant design can be viewed from all sides.Ut at erat id nunc maximus iaculis in sed mi.Lorem ipsum dolor sit amet, consectetur adipiscing.Pellentesque a odio id felis iaculis posuere a at 100% dolor.Aenean pulvinar lorem vitae felis congue, finibus sem 185.5cm/6’1″ blandit.Vestibulum convallis erat quis urna condimentum.Sed risus neque, sagittis sed pellentesque at, pharetra ut nunc. Phasellus id enim eget ante pellentesque pharetra. Phasellus et nisl urna. Integer nisl dui, efficitur in vopat sodales, tempor sed orci. Donec et euismod ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam tincidunt dictum eros at porta. Phasellus gravida dolor in sem placerat sodales sagittis sed pellentesque at, pharetra ut nunc.
                                </p>
                            </Tab>
                            <Tab eventKey="longer-tab" title="Reviews">
                                Reviews
                            </Tab>
                        </Tabs>
                    </div>

                </div>
            </section>

        </>
    )
}

export default ProductDetail
