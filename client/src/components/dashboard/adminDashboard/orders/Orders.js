import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    // Function to handle click event on order row
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        console.log(selectedOrder);
    };

    // Function to handle status update
    const handleStatusUpdate = (orderId, newStatus) => {
        axios.patch(`http://localhost:5000/orders/${orderId}`, { status: newStatus })
            .then(response => {
                // Update the status in the local state
                const updatedOrders = orders.map(order => {
                    if (order._id === orderId) {
                        return { ...order, status: newStatus };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            })
            .catch(error => console.error('Error updating order status:', error));
    };


    console.log(selectedOrder);
    return (
        <AdminLayout>
            <div className="bg-white p-3 mt-2">
                <h3 className='fs-5 fw-bold'>All Orders</h3>
                <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    {/* <button className='btn btn-primary'>+ Add Order</button> */}
                </div>
                {/* Table */}
                <div className='mt-3 px-2'>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table-light'>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer ID</th>
                                <th scope="col">Product ID</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    {/*  */}
                                    <td>{order.products.length > 0 ? order.products[0]._id : 'N/A'}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.products[0].price}</td>
                                    <td>
                                        <select
                                            className='form-select'
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => handleOrderClick(order)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Order Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedOrder && (
                                <>
                                    <p> Date: <strong>{selectedOrder.createdAt}</strong></p>
                                    {/* Customer Details */}
                                    <h4 className='fw-bold'>Customer Details</h4>
                                    <p>Customer Name: {selectedOrder.customer}</p> {/* Access customer details */}
                                    <p>Email: {selectedOrder.customer.email}</p>
                                    <p>Phone Number: {selectedOrder.customer.phoneNumber}</p>

                                    {/* Product Details */}
                                    <h4 className='fw-bold'>Product Details</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.products.map((product) => (
                                                <tr key={product._id}>
                                                    <td>{product.product.name}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>${product.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Order Details */}
                                    <h4 className='fw-bold'>Order Details</h4>
                                    <p>Status: {selectedOrder.status}</p>
                                    <p>Order Date: {selectedOrder.createdAt}</p>
                                    {/* Calculate total amount */}
                                    <p>Total Amount: ${selectedOrder.products.reduce((total, product) => total + (product.quantity * product.price), 0)}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Orders;
