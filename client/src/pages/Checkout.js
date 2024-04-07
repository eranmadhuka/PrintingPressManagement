import React from 'react'
import PageTopBanner from '../components/common/PageTopBanner'
import { Link } from 'react-router-dom'

const Checkout = () => {
    // Sample product data
    const products = [
        {
            id: 1,
            items: "Business Card",
            price: "$20.99",
            shipping: "$12.5"
        }
    ];

    // Calculate total cost
    const totalCost = products.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <>
            <PageTopBanner
                title="Checkout"
                path="/checkout"
            />

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3>Shipping details</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className="form-control" id="address" rows="3" placeholder="Enter your address"></textarea>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" placeholder="Enter your city" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="zip" className="form-label">Zip Code</label>
                                        <input type="text" className="form-control" id="zip" placeholder="Enter your zip code" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Enter your country" />
                                </div>
                                <Link to='/checkout' className='d-grid gap-2 pt-3'>
                                    <button type="submit" className="btn btn-primary">Complete Order</button>
                                </Link>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <div className='bg-white p-3'>
                                {/* <h3>Order Summary</h3> */}
                                <div className="d-flex justify-content-between border-bottom">
                                    <p className='fw-bold'>Product</p>
                                    <p className='fw-bold'>Total</p>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>
                                        <p>Item</p>
                                        <p>Shipping and handling:</p>
                                    </div>
                                    <div>
                                        <p>$20.99</p>
                                        <p>$15.00</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-top">
                                    <p className='fw-bold'>Order Total</p>
                                    <p className='fw-bold'>$35.99</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
