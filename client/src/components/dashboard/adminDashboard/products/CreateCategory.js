import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminLayout from '../../../Layouts/AdminLayout'

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({}); // To store errors for each field
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the success popup

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cname') {
            setCategoryName(value);
        } else if (name === 'description') {
            setDescription(value);
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    };

    //validation

    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;

        if (!categoryName) {
            formIsValid = false;
            tempErrors["cname"] = "Cannot be empty";
        }

        if (!description) {
            formIsValid = false;
            tempErrors["description"] = "Cannot be empty";
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            cname: categoryName,
            description: description,
        };

        axios.post("http://localhost:5000/api/category/save", data)
            .then((res) => {
                if (res.data.success) {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        setCategoryName("");
                        setDescription("");
                        navigate("/admin/products/categories"); // navigate to Home.js
                    }, 2000); // 2 seconds delay before navigating
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
                alert('Failed to create the category!');
            });
    };

    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Create new Category</h1>
                    <form className="needs-validation" noValidate onSubmit={onSubmit}>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cname"
                                placeholder="Enter Category Name"
                                value={categoryName}
                                onChange={handleInputChange}
                            />
                            {errors.cname && <div className="text-danger">{errors.cname}</div>}
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Category Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter Category Description"
                                value={description}
                                onChange={handleInputChange}
                            />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>

                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
                            <i className="far fa-check-square"></i>
                            &nbsp;Save
                        </button>
                    </form>
                    {showPopup && (
                        <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                            Category created successfully!
                            <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>

    );
};

export default CreateCategory;
