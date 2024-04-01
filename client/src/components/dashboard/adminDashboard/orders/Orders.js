import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import axios from 'axios'

const Orders = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <AdminLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className='fs-5 fw-bold'>All Orders</h3>

                    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <button className='btn btn-primary'>+ Add Order</button>
                    </div>

                    {/* Table */}
                    <div className='mt-3 px-2'>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table-light'>
                                    <th scope="col">#</th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Customer Email</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </AdminLayout>
        </>
    )
}

export default Orders
