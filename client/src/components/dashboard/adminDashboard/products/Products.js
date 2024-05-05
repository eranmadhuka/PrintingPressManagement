import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from '../../../Layouts/AdminLayout'
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/")
            .then((result) => setProducts(result.data.existingProducts))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
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
            item._id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "products.xlsx");
    };

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className="fs-5 fw-bold">Products</h3>

                    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search by Product ID"
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
                            <img src="" alt="" />
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.pname}</td>
                                    <td>
                                        <img src={product.image} alt={product.image} style={{ maxWidth: "100px", maxHeight: "100px" }} />
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
                </div>
            </AdminLayout>
        </>
    );
}

export default Products;
