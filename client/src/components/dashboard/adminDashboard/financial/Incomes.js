import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';


const Incomes = () => {
    const incomeDetails = [
        {
            id:1,
            orderid: "O23",
            customerName: "Name",
            orderdate: "2001.04.20",
            product: "Bag",
            qty: 211,
            unitPrice: 20,
            totalCost: 2100
        },
        {
            id:2,
            orderid: "O23",
            customerName: "Name",
            orderdate: "2001.04.20",
            product: "Bag",
            qty: 211,
            unitPrice: 20,
            totalCost: 2100
        },
        {
            id:3,
            orderid: "O23",
            customerName: "Name",
            orderdate: "2001.04.20",
            product: "Bag",
            qty: 211,
            unitPrice: 20,
            totalCost: 2100
        },
    ];
    // Dummy function for demonstration purposes
    const handleUpdate = (orderId) => {
        // alert(`Update order with ID ${orderId}`);
    };

    // // Dummy function for demonstration purposes
    // const handleDelete = (orderId) => {
    //     alert(`Delete order with ID ${orderId}`);
    // };

    return (
        <>
            <AdminLayout>
                <div className="container">
                    <div className="bg-white p-3 mt-2">
                        <h2>Income Details (Order Details)</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Order Date</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                    <th>Actions</th> {/* Added Actions column */}
                                </tr>
                            </thead>
                            <tbody>
                                {incomeDetails.map((item) =>{
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.orderid}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.orderdate}</td>
                                            <td>{item.product}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.totalCost}</td>
                                            <td>
                                            <td>
                                                <button className="btn btn-sm btn-primary me-2" onClick={handleUpdate(item.orderId)}>Update</button>
                                                <button className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

export default Incomes;
