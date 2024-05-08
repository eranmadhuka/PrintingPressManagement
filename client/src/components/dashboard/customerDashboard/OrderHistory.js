import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../Layouts/CustomerLayout'
import axios from 'axios'
import { Link } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    // const [myOrders, setMyOrders] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:5000/orders')
    //         .then(response => setOrders(response.data))
    //         .catch(error => console.error('Error fetching orders:', error));
    // }, []);

    useEffect(() => {
        const userID = 'hweranmadhuka@gmail.com';

        axios
            .get(`http://localhost:5000/orders/orderHistory/${userID}`)
            .then((result) => setOrders(result.data))
            .catch((err) => console.log(err));
    }, []);

    // Function to get Bootstrap badge class based on order status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "badge bg-warning";
            case "Processing":
                return "badge bg-primary";
            case "Completed":
                return "badge bg-success";
            case "Cancelled":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    };

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:5000/orders/deleteOrder/" + id)
            .then((res) => {
                console.log(res);
                setOrders(orders.filter(order => order._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <CustomerLayout>
                <div className="p-3 mt-2">
                    <h3 className='fs-5 fw-bold'>All Orders</h3>

                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form> */}
                    </div>

                    {/* Table */}
                    <div className='mt-3 px-2'>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table-light'>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{order.orderID}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>{order.products.product}</td>
                                                <td>{order.products.price}</td>
                                                <td>
                                                    <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
                                                </td>
                                                <td>
                                                    <Link to={`/user/update-order/${order._id}`}>
                                                        <button className="btn btn-dark me-2">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                    </Link>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </CustomerLayout>
        </>
    )
}

export default OrderHistory
