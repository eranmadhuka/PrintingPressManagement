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
import UpdateVehicle from "../dashboard/adminDashboard/transport/UpdateVehicle";
import UpdateDelivery from "../dashboard/adminDashboard/transport/UpdateDelivery";
import AddNewVehicle from "../dashboard/adminDashboard/transport/AddNewVehicle";

import Employees from "../dashboard/adminDashboard/employees/Employees";
import Leaves from "../dashboard/adminDashboard/employees/Leaves";
import Attendance from "../dashboard/adminDashboard/employees/Attendance";
import Departments from "../dashboard/adminDashboard/employees/Departments";

import LostProfit from "../dashboard/adminDashboard/financial/LostProfit";
import Salaries from "../dashboard/adminDashboard/financial/Salaries";
import Incomes from "../dashboard/adminDashboard/financial/Incomes";

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
      <Route path="/transport/updateVehicle/:id" element={<UpdateVehicle />} />
      <Route path="/transport/addNewVehicle" element={<AddNewVehicle />} />
      <Route path="/transport/updateDelivery" element={<UpdateDelivery />} />

      {/* Employees Routes */}
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/leaves" element={<Leaves />} />
      <Route path="/employees/attendance" element={<Attendance />} />
      <Route path="/employees/departments" element={<Departments />} />

      {/* Financial Routes */}
      <Route path="/financial/lostProfit" element={<LostProfit />} />
      <Route path="/financial/salaries" element={<Salaries />} />
      <Route path="/financial/incomes" element={<Incomes />} />
    </Routes>
  );
};

export default AdminRoutes;
