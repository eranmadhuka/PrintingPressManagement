import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../../Layouts/AdminLayout'

const CategoryDetails = () => {
    const [category, setCategory] = useState({});
    const { id } = useParams(); // Using useParams to get the product ID from the URL

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
                if (response.data.success) {
                    setCategory(response.data.category);
                    console.log(response.data.category);
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [id]);

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className="fs-5 fw-bold">Category Details</h3>
                    <div style={{ marginTop: '20px' }}>
                        <h4>{category.cname}</h4>
                        <hr />

                        <dl className="row">

                            <dt className="col-sm-3">Description</dt>
                            <dd className="col-sm-9">{category.description}</dd>

                        </dl>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default CategoryDetails;
