import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "../dashboard/customerDashboard/CustomerDashboard";
import OrderHistory from "../dashboard/customerDashboard/OrderHistory";
import ChangePassword from "../dashboard/customerDashboard/ChangePassword";
import CustomerNotification from "../dashboard/customerDashboard/CustomerNotification"; // Import NotificationPage component
import FeedbackForm from "../dashboard/customerDashboard/FeedbackForm";
import UpdateOrder from "../dashboard/customerDashboard/UpdateOrder";

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/update-order/:id" element={<UpdateOrder />} />
            <Route path="/:email" element={<CustomerDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/wishlist" element={<OrderHistory />} />
            <Route path="/updatepassword/:email" element={<ChangePassword />} />
            <Route path="/notifi/:email" element={<CustomerNotification />} />
            <Route path="/feedback/:email" element={<FeedbackForm />} />
        </Routes>
    )
}

export default CustomerRoutes
