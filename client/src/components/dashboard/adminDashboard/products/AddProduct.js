import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        pname: '',
        pcategory: '',
        description: '',
        pprice: '',
        image: null
    });
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/categories")
            .then((result) => {
                console.log(result.data);
                setCategories(result.data.existingCategories);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear errors on new input
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: null }));
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
        if (errors['image']) {
            setErrors(prev => ({ ...prev, 'image': null }));
        }
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.pname.trim()) newErrors.pname = 'Product name is required';
        if (!formData.pcategory.trim()) newErrors.pcategory = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.pprice.trim()) newErrors.pprice = 'Price is required';
        if (!formData.image) newErrors.image = 'Product image is required';

        // Price validation
        if (!/^\d+(\.\d{1,2})?$/.test(formData.pprice)) {
            newErrors.pprice = 'Invalid price format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('pname', formData.pname);
        formDataToSend.append('pcategory', formData.pcategory);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('pprice', formData.pprice);
        formDataToSend.append('image', formData.image);

        try {
            const res = await axios.post('http://localhost:5000/products/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setFormData({
                pname: '',
                pcategory: '',
                description: '',
                pprice: '',
                image: null
            });
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate("/admin/products");
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Product created successfully!
                </div>
            )}
            <div className="bg-white p-3 mt-2">
                <h3 className="fs-5 fw-bold">Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="pname" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="pname" name="pname" value={formData.pname} onChange={handleChange} />
                        {errors.pname && <div className="text-danger">{errors.pname}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pcategory" className="form-label">Category</label>
                        <select className="form-select" id="pcategory" name="pcategory" value={formData.pcategory} onChange={handleChange}>
                            <option value="">Select category</option>
                            {categories && categories.map((category) => (
                                <option key={category._id} value={category.cname}>{category.cname}</option>
                            ))}
                        </select>
                        {errors.pcategory && <div className="text-danger">{errors.pcategory}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                        {errors.description && <div className="text-danger">{errors.description}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pprice" className="form-label">Price</label>
                        <input type="text" className="form-control" id="pprice" name="pprice" value={formData.pprice} onChange={handleChange} />
                        {errors.pprice && <div className="text-danger">{errors.pprice}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                        {errors.image && <div className="text-danger">{errors.image}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </AdminLayout>
    );
};

export default AddProduct;