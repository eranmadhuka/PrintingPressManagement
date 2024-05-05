import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TellUsMore = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');
    const quantity = queryParams.get('quantity');
    const totalAmount = queryParams.get('totalAmount');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        address: '',
        telephone: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear the error message when the field is not empty
        if (value.trim() !== '') {
            setErrors({ ...errors, [name]: '' });
        } else {
            // Clear the error message when the field becomes empty
            setErrors({ ...errors, [name]: null });
        }

        // Handle telephone number validation
        if (name === 'telephone') {
            // Only allow numbers and limit the length to 10
            const formattedValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: formattedValue });
        } else {
            // For other fields, just update the form data
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.businessName) {
            errors.businessName = 'Business name is required';
        }
        if (!formData.address) {
            errors.address = 'Address is required';
        }
        if (!formData.telephone) {
            errors.telephone = 'Telephone is required';
        }
        if (!formData.description) {
            errors.description = 'Description is required';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors({ ...errors, ...validationErrors }); // Merge new errors with existing ones
        } else {
            // Construct the URL with query parameters
            const queryParams = new URLSearchParams({
                ...formData,
                productId: productId,
                quantity: quantity,
                totalAmount: totalAmount
            }).toString();
            const checkoutUrl = `/checkout?${queryParams}`;
            // Navigate to the checkout page with the data
            navigate(checkoutUrl);
        }
    };


    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className='text-start'>
                                <span>Get your Order</span>
                                <h2>Our Great Startup Is Launching This Fall</h2>
                                <p>Get in touch to discuss your employee well-being needs today. Please give us a call, drop us an email, or fill out the contact form and we’ll get back to you.</p>
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
                                <form className='py-4' onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="businessName" className="col-sm-4 col-form-label">Business name:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className={`form-control ${errors.businessName && 'is-invalid'}`} id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} />
                                            {errors.businessName && <div className="invalid-feedback">{errors.businessName}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="address" className="col-sm-4 col-form-label">Address:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className={`form-control ${errors.address && 'is-invalid'}`} id="address" name="address" value={formData.address} onChange={handleChange} />
                                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="telephone" className="col-sm-4 col-form-label">Telephone:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className={`form-control ${errors.telephone && 'is-invalid'}`} id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
                                            {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="description" className="col-sm-4 col-form-label">Description:</label>
                                        <div className="col-sm-8">
                                            <textarea className={`form-control ${errors.description && 'is-invalid'}`} id="description" name="description" value={formData.description} onChange={handleChange} ></textarea>
                                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary">Complete Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TellUsMore;
