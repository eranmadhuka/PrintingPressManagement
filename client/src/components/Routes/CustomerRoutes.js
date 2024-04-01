import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CustomerDashboard from '../dashboard/customerDashboard/CustomerDashboard';
import OrderHistory from '../dashboard/customerDashboard/OrderHistory';

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/wishlist" element={<OrderHistory />} />
            <Route path="/updatePassword" element={<OrderHistory />} />
        </Routes>
    )
}

export default CustomerRoutes
