import React from "react";
import { Routes, Route } from "react-router-dom";

import EmployeeDashboard from "../../components/dashboard/employeeDashboard/EmployeeDashboard";
import EmployeeLeaves from "../dashboard/employeeDashboard/EmployeeLeaves";
import EmployeeAttendance from "../dashboard/employeeDashboard/EmployeeAttendance";
import AddLeave from "../dashboard/employeeDashboard/AddLeave";
import UpdateLeaves from "../dashboard/employeeDashboard/UpdateLeaves";

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route path="/:email" element={<EmployeeDashboard />} />
            <Route path="/leaves" element={<EmployeeLeaves />} />
            <Route path="/attendance" element={<EmployeeAttendance />} />
            <Route path="/addLeave" element={<AddLeave />} />
            <Route path="/updateLeave/:id" element={<UpdateLeaves />} />
        </Routes>
    );
};

export default EmployeeRoutes;
