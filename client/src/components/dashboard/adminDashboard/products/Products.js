import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from '../../../Layouts/AdminLayout'
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import PieChart from '../../../charts/PieChart'; // Import the PieChart component


const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/")
            .then((result) => {
                setProducts(result.data.existingProducts);
                // Calculate category counts
                const counts = {};
                result.data.existingProducts.forEach(product => {
                    // Ensure category name is not undefined or null
                    if (product.pcategory) {
                        counts[product.pcategory] = (counts[product.pcategory] || 0) + 1;
                    }
                });
                // Convert counts to array format for PieChart component
                const categoryChartData = Object.keys(counts).map(category => ({
                    category,
                    count: counts[category]
                }));
                setCategoryData(categoryChartData);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Do you want to delete this product?");
        if (!isConfirmed) return;
        axios
            .delete("http://localhost:5000/products/delete/" + id)
            .then((res) => {
                console.log(res);
                setProducts(products.filter(product => product._id !== id));
            })
            .catch((err) => console.log(err));
    };

    const filteredProducts = products.filter(
        (item) =>
            item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.pcategory && item.pcategory.toLowerCase().includes(searchQuery.toLowerCase())) // Ensure category name is not undefined or null
    );

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "products.xlsx");
    };



    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <h3 className="fs-5 fw-bold">Products</h3>

                <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by Product ID, Name, or Category"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <button className="btn btn-success ms-2" onClick={handleExport}>
                        Export to Excel
                    </button>
                    <Link to="/admin/products/addProduct">
                        <button className="btn btn-primary">+ Add Product</button>
                    </Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>
                                    <Link to={`/admin/products/ProductDetails/${product._id}`} style={{ textDecoration: 'none' }}>
                                        {product.pname}
                                    </Link>
                                </td>
                                <td>
                                    {/* Render the image using img tag */}
                                    <img src={product.image} alt={product.pname} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                </td>
                                <td>{product.pcategory}</td>
                                <td>{product.description}</td>
                                <td>{product.pprice}</td>
                                <td>
                                    <Link to={`/admin/products/updateProduct/${product._id}`}>
                                        <button className="btn btn-dark me-2">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            {/* Render the PieChart and BarChart components next to each other */}
            < div className="d-flex justify-content-between" >
                <div style={{ width: '400px', height: '400px' }}>
                    <h4 className="text-center">Category Distribution (Pie Chart)</h4>
                    <PieChart data={categoryData} />
                </div>
            </div >
        </AdminLayout >
    );
}

export default Products;