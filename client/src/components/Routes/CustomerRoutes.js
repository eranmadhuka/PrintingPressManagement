import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "../dashboard/customerDashboard/CustomerDashboard";
import OrderHistory from "../dashboard/customerDashboard/OrderHistory";
import ChangePassword from "../dashboard/customerDashboard/ChangePassword";
import CustomerNotification from "../dashboard/customerDashboard/CustomerNotification"; // Import NotificationPage component
import FeedbackForm from "../dashboard/customerDashboard/FeedbackForm";
import DeleteAccount from "../dashboard/customerDashboard/DeleteAccount";
import LogoutPage from "../dashboard/customerDashboard/LogoutPage";

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/:id" element={<CustomerDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/wishlist" element={<OrderHistory />} />
            <Route path="/updatepassword" element={<ChangePassword />} />
            <Route path="/notifications" element={<CustomerNotification />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/deleteAccount:/id" element={<DeleteAccount />} />
            <Route path="/logout" element={<LogoutPage />} />
        </Routes>
    )
}

export default CustomerRoutes
