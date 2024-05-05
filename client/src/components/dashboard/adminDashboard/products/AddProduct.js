import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../Layouts/AdminLayout'
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
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/categories")
            .then((result) => {
                console.log(result.data);
                setCategories(result.data.existingCategories); // Set categories state to the array of category objects
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            // Reset form fields after successful submission
            setFormData({
                pname: '',
                pcategory: '',
                description: '',
                pprice: '',
                image: null
            });
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <h3 className="fs-5 fw-bold">Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="pname" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="pname" name="pname" value={formData.pname} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pcategory" className="form-label">Category</label>
                        <select className="form-select" id="pcategory" name="pcategory" value={formData.pcategory} onChange={handleChange}>
                            <option value="">Select category</option>
                            {categories && categories.map((category) => (
                                <option key={category._id} value={category.cname}>{category.cname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pprice" className="form-label">Price</label>
                        <input type="text" className="form-control" id="pprice" name="pprice" value={formData.pprice} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddProduct;
