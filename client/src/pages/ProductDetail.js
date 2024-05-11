import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageTopBanner from '../components/common/PageTopBanner'
import ProductImg from '../assets/images/product1.png'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        pname: "",
        pcategory: "",
        description: "",
        pprice: "",
        image: ""
    });
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/products/${productId}`)
            .then((result) => setProduct(result.data.product))
            .catch((err) => console.log(err));
    }, [productId]);

    useEffect(() => {
        // Calculate total price based on selected quantity and product price
        const calculateTotalPrice = () => {
            const totalPrice = product.pprice * selectedQuantity;
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [product, selectedQuantity]);

    const handleQuantityChange = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    };

    const handleMaterialChange = (e) => {
        setSelectedMaterial(e.target.value);
    };

    return (
        <>
            <PageTopBanner
                title={product.pname}
                path="/shop"
            />

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    {/* Product  Details */}
                    <div className="row">
                        <div className="col-lg-6">
                            <img src={product.image} alt={product.pname} className='img-thumbnail' />
                        </div>
                        <div className="col-lg-6">
                            <span>IN STOCK</span>
                            <h3>{product.pname}</h3>
                            <div className='d-flex'>
                                <div className='text-warning'>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p>(5 Reviews)</p>
                            </div>
                            <h3>{product.pprice}</h3>
                            <p className='border-top border-bottom py-3'>{product.description}</p>

                            {/* Additional details */}
                            <div className="row mb-3 border-bottom pb-3">
                                <label className="col-sm-2 col-form-label">Category:</label>
                                <div className="col-sm-10">
                                    <p>{product.pcategory}</p>
                                </div>
                            </div>

                            <form>
                                <div className="row mb-3 border-bottom pb-3">
                                    <label htmlFor="Quantity" className="col-sm-2 col-form-label">Quantity:</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="Quantity" value={selectedQuantity} onChange={handleQuantityChange} />
                                    </div>
                                </div>
                                <div className="row mb-3 border-bottom pb-3">
                                    <label className="col-sm-2 col-form-label">Material:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" placeholder="Enter material" value={selectedMaterial} onChange={handleMaterialChange} />
                                    </div>
                                </div>
                            </form>

                            <span className='fw-bold fs-3'>Total Price: Rs. {totalPrice}</span>
                            <br />
                            <Link to={`/tell-us-more?productId=${productId}&quantity=${selectedQuantity}&totalAmount=${totalPrice}`}>
                                <button className='btn btn-primary mt-3'>Start Order Request</button>
                            </Link>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="row mt-5">
                        <Tabs
                            defaultActiveKey="Description"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="Description" title="Description">
                                <p>{product.description}</p>
                            </Tab>
                            <Tab eventKey="profile" title="Additional information">
                                <p>Additional information goes here.</p>
                            </Tab>
                            <Tab eventKey="longer-tab" title="Reviews">
                                Reviews
                            </Tab>
                        </Tabs>
                    </div>

                </div>
            </section>

        </>
    )
}

export default ProductDetail;
