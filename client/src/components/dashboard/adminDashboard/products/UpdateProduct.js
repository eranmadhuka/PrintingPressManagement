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

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/" + id)
            .then((result) => setProduct(result.data.product))
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/products/update/${id}`, product)
            .then((res) => {
                console.log(res.data);
                navigate("/admin/products");
            })
            .catch((err) => console.log(err));
    };

    const handleImageChange = (e) => {
        // Handle image change here
    };

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className="fs-5 fw-bold">Update Product</h3>

                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="pname" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="pname" name="pname" value={product.pname} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pcategory" className="form-label">Category</label>
                            <input type="text" className="form-control" id="pcategory" name="pcategory" value={product.pcategory} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pprice" className="form-label">Price</label>
                            <input type="text" className="form-control" id="pprice" name="pprice" value={product.pprice} onChange={handleChange} />
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
