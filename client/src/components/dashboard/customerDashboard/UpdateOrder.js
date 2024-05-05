import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerLayout from '../../Layouts/CustomerLayout';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState({
        products: {},
        shippingDetails: {
            fullName: '',
            address: '',
            city: '',
            zipCode: '',
            country: ''
        }
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${id}`)
            .then(response => setOrder(response.data))
            .catch(error => console.error('Error fetching order:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            shippingDetails: {
                ...prevOrder.shippingDetails,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/orders/${id}`, { shippingDetails: order.shippingDetails });
            console.log(order);
            navigate("/user/orders");
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <CustomerLayout>
            <div className="p-3 mt-2">
                <h3 className='fs-5 fw-bold'>Update Shipping Details</h3>

                <div>
                    <h3 className='fs-6 mb-3'>Product Details</h3>
                    <div>
                        <p>Product: {order.products.product}</p>
                        <p>Quantity: {order.products.quantity}</p>
                        <p>Price: {order.products.price}</p>
                    </div>
                </div>

                <form className="g-3" onSubmit={handleSubmit}>
                    <div>
                        <h3 className='fs-6 mb-3'>Shipping Details</h3>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name:</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" value={order.shippingDetails.fullName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input type="text" className="form-control" id="address" name="address" value={order.shippingDetails.address} onChange={handleChange} />
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="city" className="form-label">City:</label>
                                <input type="text" className="form-control" id="city" name="city" value={order.shippingDetails.city} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="zipCode" className="form-label">Zip Code:</label>
                                <input type="text" className="form-control" id="zipCode" name="zipCode" value={order.shippingDetails.zipCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country:</label>
                            <input type="text" className="form-control" id="country" name="country" value={order.shippingDetails.country} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Update Order</button>
                    </div>
                </form>
            </div>
        </CustomerLayout>
    );
}

export default UpdateOrder;
