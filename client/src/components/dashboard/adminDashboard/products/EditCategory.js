import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../Layouts/AdminLayout'

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/categories/${id}`)
            .then(response => {
                const { cname, description } = response.data.category;
                setCategoryName(cname);
                setDescription(description);
            })
            .catch(error => {
                console.error("Error fetching category:", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cname':
                setCategoryName(value);
                break;

            case 'description':
                setDescription(value);
                break;

            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            cname: categoryName,
            description: description
        };

        axios.put(`http://localhost:5000/api/categories/update/${id}`, data)
            .then(response => {
                if (response.data.success) {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        navigate('/admin/products/categories'); // navigate to Home.js 
                    }, 2000); // 2 seconds delay before navigating
                }
            })
            .catch(error => {
                console.error("There was an error!", error);
                alert('Failed to update the category!');
            });
    };

    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Edit Category</h1>
                    <form className="needs-validation" noValidate onSubmit={onSubmit}>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Category Name</label>
                            <input type="text"
                                className="form-control"
                                name="cname"
                                placeholder="Enter Category Name"
                                value={categoryName}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Category Description</label>
                            <input type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter Category Description"
                                value={description}
                                onChange={handleInputChange} />
                        </div>

                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
                            <i className="far fa-check-square"></i>
                            &nbsp;Update
                        </button>
                    </form>
                    {showPopup && (
                        <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                            Category updated successfully!
                            <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditCategory;
