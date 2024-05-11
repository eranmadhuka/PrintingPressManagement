import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters
import AdminLayout from '../../../Layouts/AdminLayout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams(); // Using useParams to get the product ID from the URL
    const productDetailsRef = useRef(null); // Reference to the product details container

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                    console.log(response.data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]); // Effect runs when id changes

    // Function to generate PDF
    const generatePDF = () => {
        const input = productDetailsRef.current;

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const pdfWidth = 210;
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('product_details.pdf');
            });
    };

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2" ref={productDetailsRef}>
                    <h3 className="fs-5 fw-bold">Product Details</h3>
                    <div style={{ marginTop: '20px' }}>
                        <h4>{product.pname}</h4>
                        <hr />

                        <center><b>Product Image</b></center>
                        <center><img src={product.image} alt={product.pname} style={{ maxWidth: "100px", maxHeight: "100px" }} /></center>

                        <dl className="row">
                            <dt className="col-sm-3">Category</dt>
                            <dd className="col-sm-9">{product.pcategory}</dd>

                            <dt className="col-sm-3">Description</dt>
                            <dd className="col-sm-9">{product.description}</dd>

                            <dt className="col-sm-3">Price</dt>
                            <dd className="col-sm-9">{product.pprice}</dd>
                        </dl>
                    </div>
                </div>
                <button className="btn btn-success" onClick={generatePDF}>Download PDF</button>
            </AdminLayout>
        </>
    );
};

export default ProductDetails;