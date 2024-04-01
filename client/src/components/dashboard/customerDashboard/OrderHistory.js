import React from 'react'
import CustomerLayout from '../../Layouts/CustomerLayout'

const OrderHistory = () => {
    return (
        <>
            <CustomerLayout>
                <div className="p-3 mt-2">
                    <h3 className='fs-5 fw-bold'>All Orders</h3>

                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>

                    {/* Table */}
                    <div className='mt-3 px-2'>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table-light'>
                                    <th scope="col">#</th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>O215</td>
                                    <td>PB513</td>
                                    <td>23, Feb 2024</td>
                                    <td>Rs.6500</td>
                                    <td><span className="badge text-bg-primary">Pending</span></td>
                                    <td>
                                        <button className='btn btn-dark me-2'><i className="bi bi-pencil-square"></i></button>
                                        <button className='btn btn-danger'><i className="bi bi-trash-fill"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </CustomerLayout>
        </>
    )
}

export default OrderHistory
