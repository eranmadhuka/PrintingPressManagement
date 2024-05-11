import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTopBanner from '../components/common/PageTopBanner';
import StripeCheckout from 'react-stripe-checkout';
import { useAuthContext } from "../hooks/useAuthContext";

const Checkout = () => {
    const [errors, setErrors] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');
    const quantity = queryParams.get('quantity');
    const totalAmount = queryParams.get('totalAmount');

    const { user } = useAuthContext();

    // Get additional details.
    const businessName = queryParams.get('businessName');
    const address = queryParams.get('address');
    const telephone = queryParams.get('telephone');
    const description = queryParams.get('description');

    const navigate = useNavigate();

    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!shippingDetails.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (!shippingDetails.address.trim()) {
            errors.address = 'Address is required';
        }
        if (!shippingDetails.city.trim()) {
            errors.city = 'City is required';
        }
        if (!shippingDetails.zip.trim()) {
            errors.zip = 'Zip Code is required';
        }
        if (!shippingDetails.country.trim()) {
            errors.country = 'Country is required';
        }
        return errors;
    };

    const handleToken = async (token) => {
        try {
            const orderData = {
                customer: user.email,
                products: {
                    product: productId,
                    quantity: quantity,
                    price: totalAmount,
                    additionalDetails: {
                        businessName: businessName,
                        address: address,
                        telephone: telephone,
                        description: description
                    }
                },
                shippingDetails: {
                    fullName: shippingDetails.fullName,
                    address: shippingDetails.address,
                    city: shippingDetails.city,
                    zipCode: shippingDetails.zip,
                    country: shippingDetails.country
                }
            };

            // Send POST request to save order data
            const response = await axios.post('http://localhost:5000/orders', orderData);
            console.log('Order saved:', response.data);

            // Redirect to a success page or any other page after saving data
            navigate("/user/orders");
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

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
                                    <input type="text" className={`form-control ${errors.fullName && 'is-invalid'}`} id="fullName" name="fullName" value={shippingDetails.fullName} onChange={handleChange} placeholder="Enter your full name" />
                                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className={`form-control ${errors.address && 'is-invalid'}`} id="address" name="address" value={shippingDetails.address} onChange={handleChange} rows="3" placeholder="Enter your address" ></textarea>
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className={`form-control ${errors.city && 'is-invalid'}`} id="city" name="city" value={shippingDetails.city} onChange={handleChange} placeholder="Enter your city" />
                                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="zip" className="form-label">Zip Code</label>
                                        <input type="text" className={`form-control ${errors.zip && 'is-invalid'}`} id="zip" name="zip" value={shippingDetails.zip} onChange={handleChange} placeholder="Enter your zip code" />
                                        {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className={`form-control ${errors.country && 'is-invalid'}`} id="country" name="country" value={shippingDetails.country} onChange={handleChange} placeholder="Enter your country" />
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                </div>
                            </form>
                            {/* Stripe Checkout Button */}
                            <StripeCheckout
                                token={handleToken}
                                stripeKey="pk_test_51PCvlA01WOktj22OUQfJWjznDW6RukNEc3Co8PzAbd7Z9mgxTWX86Y74VTbfgBNtc5wVHvy4ZQyTRpJmA24FvwJd00D6V6i1Kk"
                                amount={totalAmount * 100} // Amount in cents
                                name="Your Store Name"
                                description="Payment for products"
                                currency="USD"
                                email={userEmail}
                            >
                                <button className="btn btn-primary">Complete Order</button>
                            </StripeCheckout>
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
                                        <p>Rs {totalAmount}</p>
                                        <p>Rs 0</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-top">
                                    <p className='fw-bold'>Order Total</p>
                                    <p className='fw-bold'>Rs {totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout;
