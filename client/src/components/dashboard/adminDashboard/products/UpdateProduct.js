import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from '../../../Layouts/AdminLayout'
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        pname: "",
        pcategory: "",
        description: "",
        pprice: "",
        image: ""
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the visibility of the success message

    useEffect(() => {
        axios
            .get(`http://localhost:5000/products/${id}`)
            .then((result) => setProduct(result.data.product))
            .catch((err) => console.log(err));
    }, [id]);

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
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear errors on new input
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        let newErrors = {};
        if (!product.pname.trim()) newErrors.pname = 'Product name is required';
        if (!product.pcategory.trim()) newErrors.pcategory = 'Category is required';
        if (!product.description.trim()) newErrors.description = 'Description is required';
        // if (!product.pprice.trim()) newErrors.pprice = 'Price is required';

        // Price validation
        if (!/^\d+(\.\d{1,2})?$/.test(product.pprice)) {
            newErrors.pprice = 'Invalid price format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axios.put(`http://localhost:5000/products/update/${id}`, product);
            console.log(res.data);
            setShowSuccessMessage(true); // Show success message
            setTimeout(() => {
                setShowSuccessMessage(false); // Hide success message after 2 seconds
                navigate("/admin/products");
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleImageChange = (e) => {
        // Handle image change here
    };

    return (
        <>
            <AdminLayout>
                {showSuccessMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        Product updated successfully!
                    </div>
                )}
                <div className="bg-white p-3 mt-2">
                    <h3 className="fs-5 fw-bold">Update Product</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="pname" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="pname" name="pname" value={product.pname} onChange={handleChange} />
                            {errors.pname && <div className="text-danger">{errors.pname}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pcategory" className="form-label">Category</label>
                            <select className="form-select" id="pcategory" name="pcategory" value={product.pcategory} onChange={handleChange}>
                                <option value="">Select category</option>
                                {categories && categories.map((category) => (
                                    <option key={category._id} value={category.cname}>{category.cname}</option>
                                ))}
                            </select>
                            {errors.pcategory && <div className="text-danger">{errors.pcategory}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange}></textarea>
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pprice" className="form-label">Price</label>
                            <input type="text" className="form-control" id="pprice" name="pprice" value={product.pprice} onChange={handleChange} />
                            {errors.pprice && <div className="text-danger">{errors.pprice}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}

export default UpdateProduct;