import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/adminDashboard/Dashboard";

import Orders from "../dashboard/adminDashboard/orders/Orders";
import Refunds from "../dashboard/adminDashboard/orders/Refunds";

import Products from "../dashboard/adminDashboard/products/Products";
import Categories from "../dashboard/adminDashboard/products/Categories";

import Customers from "../dashboard/adminDashboard/customers/Customers";

import Inventory from "../dashboard/adminDashboard/inventory/Inventory";

import Suppliers from "../dashboard/adminDashboard/suppliers/Suppliers";

import Vehicles from "../dashboard/adminDashboard/transport/Vehicles";
import Delivery from "../dashboard/adminDashboard/transport/Delivery";

import Employees from "../dashboard/adminDashboard/employees/Employees";
import Leaves from "../dashboard/adminDashboard/employees/Leaves";
import Attendance from "../dashboard/adminDashboard/employees/Attendance";
import Departments from "../dashboard/adminDashboard/employees/Departments";

import LostProfit from "../dashboard/adminDashboard/financial/LostProfit";
import Salaries from "../dashboard/adminDashboard/financial/Salaries";
import Incomes from "../dashboard/adminDashboard/financial/Incomes";
import AddEnries from "../dashboard/adminDashboard/financial/AddEnries";
import EmployeeForm from "../dashboard/adminDashboard/financial/EmployeeForm";
import UpdateEntries from "../dashboard/adminDashboard/financial/UpdateEntry";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard Overview */}
      <Route path="/" element={<Dashboard />} />

      {/* Orders Routes */}
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/refunds" element={<Refunds />} />

      {/* Products Routes */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/categories" element={<Categories />} />

      {/* Customers Routes */}
      <Route path="/customers" element={<Customers />} />

      {/* Inventory Routes */}
      <Route path="/inventory" element={<Inventory />} />

      {/* Suppliers Routes */}
      <Route path="/suppliers" element={<Suppliers />} />
      {/* <Route path="/materials" element={<Dashboard />} /> */}

      {/* Transport Routes */}
      <Route path="/transport/vehicles" element={<Vehicles />} />
      <Route path="/transport/delivery" element={<Delivery />} />

      {/* Employees Routes */}
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/leaves" element={<Leaves />} />
      <Route path="/employees/attendance" element={<Attendance />} />
      <Route path="/employees/departments" element={<Departments />} />

      {/* Financial Routes */}
      <Route path="/financial/lostProfit" element={<LostProfit />} />
      <Route path="/financial/salaries" element={<Salaries />} />
      <Route path="/financial/updatentry/:id" element={<UpdateEntries />} />
      <Route path="/financial/incomes" element={<Incomes />} />
      <Route path="/financial/entry" element={<AddEnries />} />
      <Route path="/financial/emForm/:id" element={<EmployeeForm />} />
    </Routes>
  );
};

export default AdminRoutes;
