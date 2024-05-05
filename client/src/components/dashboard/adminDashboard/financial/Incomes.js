import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Incomes = () => {
    const [incomeDetails, setIncomeDetails] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/financial/incomeStatement/getIncomeDetails")
            .then((result) => {
                setIncomeDetails(result.data);
                const total = result.data.reduce((acc, item) => acc + item.amount, 0);
                setTotalIncome(total);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(incomeDetails);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/financial/incomeStatement/deleteIncomeDetails/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload(); // Refresh page after deletion
            })
            .catch((err) => console.log(err));
    };

    const sendTotalIncome = () => {
        axios.post("http://localhost:5000/financial/incomeStatement/createLPSEntry", {
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
    };

    // const filteredItems = incomeDetails.filter((item) => {
    //     return item.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    // });

    return (
        <AdminLayout>
            <div className="container">
                <div className="bg-white p-3 mt-2">
                    <h2>Income Details (Order Details)</h2>
                    {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    /> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Order Date</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeDetails.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.orderID}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.products.product}</td>
                                    <td>{item.products.quantity}</td>
                                    <td>{item.products.price}</td>
                                    <td>
                                        <Link
                                            to={`/admin/financial/updateIncome/${item._id}`}
                                            className="btn btn-sm btn-primary me-2"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
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
        </AdminLayout>
    );
};

export default Incomes;
