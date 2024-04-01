import React from 'react'
import { Routes, Route } from 'react-router-dom';

import EmployeeDashboard from '../../components/dashboard/employeeDashboard/EmployeeDashboard'
import EmployeeLeaves from '../dashboard/employeeDashboard/EmployeeLeaves';
import EmployeeAttendance from '../dashboard/employeeDashboard/EmployeeAttendance';
import AccountSetting from '../dashboard/employeeDashboard/AccountSetting';

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeDashboard />} />
            <Route path="/leaves" element={<EmployeeLeaves />} />
            <Route path="/attendance" element={<EmployeeAttendance />} />
            <Route path="/accountSetting" element={<AccountSetting />} />
        </Routes>
    )
}

export default EmployeeRoutes
