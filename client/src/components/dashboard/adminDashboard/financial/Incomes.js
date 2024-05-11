import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

const Incomes = () => {
    const [incomeDetails, setIncomeDetails] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isDataAdded, setIsDataAdded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/financial/incomeStatement/getIncomeDetails")
            .then((result) => {
                setIncomeDetails(result.data);
                const total = result.data.reduce((acc, item) => acc + item.products.price, 0);
                setTotalIncome(total);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const filteredIncomeDetails = incomeDetails.filter((item) =>
        item.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.products.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendTotalIncome = () => {
        setIsFetching(true);

        Swal.fire({
            title: "Are you sure?",
            text: "This action will add the total salary to the Loss or Profit entries.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:5000/financial/createLPSEntry`, {
                    description: "Total Income",
                    entryType: "revenue",
                    date: new Date().toISOString(),
                    amount: totalIncome,
                })
                    .then((result) => {
                        console.log("Total income sent successfully:", result);
                        // Handle navigation or any other action after successful submission
                    })
                    .catch((err) => console.log("Error sending total income:", err));
            } else {
                setIsFetching(false);
            }
        });


    };

    return (
        <AdminLayout>
            <div className="container">
                <div className="bg-white p-3 mt-2">
                    <h2>Income Details (Order Details)</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search "
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Order Date</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIncomeDetails.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.orderID}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.products.product}</td>
                                    <td>{item.products.quantity}</td>
                                    <td>{item.products.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleViewOrder(item)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="container mt-4">
                <div className="bg-white p-3">
                    <h4>Total Income Details</h4>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Description</th>
                                <td>Total Income</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>revenue</td>
                            </tr>
                            <tr>
                                <th>Amount</th>
                                <td>{totalIncome}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary" onClick={sendTotalIncome}>
                        Add to Loss or Profit
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Order ID: {selectedOrder.orderID}</p>
                                <p>Customer ID: {selectedOrder.customer}</p>
                                <p>Order Date: {selectedOrder.createdAt}</p>
                                <p>Product ID: {selectedOrder.products.product}</p>
                                <p>Quantity: {selectedOrder.products.quantity}</p>
                                <p>Total Amount: {selectedOrder.products.price}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Incomes;