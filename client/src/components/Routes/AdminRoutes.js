import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/adminDashboard/Dashboard';

import Orders from '../dashboard/adminDashboard/orders/Orders';
import Refunds from '../dashboard/adminDashboard/orders/Refunds';

import Products from '../dashboard/adminDashboard/products/Products';
import Categories from '../dashboard/adminDashboard/products/Category';

import Customers from "../dashboard/adminDashboard/customers/Customers";
import FeedbackManagement from "../dashboard/adminDashboard/customers/FeedbackManagement";

import Inventory from '../dashboard/adminDashboard/inventory/Inventory';

import Suppliers from '../dashboard/adminDashboard/suppliers/Suppliers';
import AddSupliers from "../dashboard/adminDashboard/suppliers/AddSupliers";
import UpdateSupplier from "../dashboard/adminDashboard/suppliers/UpdateSupplier";
import PlaceOrder from "../dashboard/adminDashboard/suppliers/PlaceOrder";
import RawMaterials from "../dashboard/adminDashboard/suppliers/RawMaterials";
import UpdateOrder from "../dashboard/adminDashboard/suppliers/updateOrder";

import Vehicles from '../dashboard/adminDashboard/transport/Vehicles';
import Delivery from '../dashboard/adminDashboard/transport/Delivery';
import UpdateVehicle from "../dashboard/adminDashboard/transport/UpdateVehicle";
import UpdateDelivery from "../dashboard/adminDashboard/transport/UpdateDelivery";
import AddNewVehicle from "../dashboard/adminDashboard/transport/AddNewVehicle";

import Employees from '../dashboard/adminDashboard/employees/Employees';
import Leaves from '../dashboard/adminDashboard/employees/Leaves';
import Attendance from '../dashboard/adminDashboard/employees/Attendance';
import AddEmployee from "../dashboard/adminDashboard/employees/AddEmployee";
import UpdateEmployee from "../dashboard/adminDashboard/employees/UpdateEmployee";

import LostProfit from "../dashboard/adminDashboard/financial/LostProfit";
import Salaries from "../dashboard/adminDashboard/financial/Salaries";
import Incomes from "../dashboard/adminDashboard/financial/Incomes";
import AddEnries from "../dashboard/adminDashboard/financial/AddEnries";
import EmployeeForm from "../dashboard/adminDashboard/financial/EmployeeForm";
import UpdateEntries from "../dashboard/adminDashboard/financial/UpdateEntry";
import IncomedetailsForm from "../dashboard/adminDashboard/financial/IncomedetailsForm";

import AddProduct from '../dashboard/adminDashboard/products/AddProduct';
import UpdateProduct from '../dashboard/adminDashboard/products/UpdateProduct';
import CreateCategory from '../dashboard/adminDashboard/products/CreateCategory';
import EditCategory from '../dashboard/adminDashboard/products/EditCategory';
import CategoryDetails from '../dashboard/adminDashboard/products/CategoryDetails';
import ProductDetails from '../dashboard/adminDashboard/products/ProductDetails';

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
            <Route path="/products/addProduct" element={<AddProduct />} />
            <Route path="/products/updateProduct/:id" element={<UpdateProduct />} />

            <Route path="/products/categories" element={<Categories />} />
            <Route path="/products/AddCategory" element={<CreateCategory />} />
            <Route path="/products/editCategory/:id" element={<EditCategory />} />
            <Route path="/products/categoryDetails/:id" element={<CategoryDetails />} />
            <Route path="/products/ProductDetails/:id" element={<ProductDetails />} />

            {/* Customers Routes */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/feedbackmanagement" element={<FeedbackManagement />} />

            {/* Inventory Routes */}
            <Route path="/inventory" element={<Inventory />} />

            {/* Suppliers Routes */}
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/add-spplier" element={<AddSupliers />} />
            <Route
                path="/suppliers/updatesupplier/:id"
                element={<UpdateSupplier />}
            />
            <Route path="/suppliers/place-order" element={<PlaceOrder />} />
            <Route path="/suppliers/raw-materials" element={<RawMaterials />} />
            <Route path="/suppliers/update-orders/:id" element={<UpdateOrder />} />
            <Route path="/suppliers/add-orders" element={<PlaceOrder />} />

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
            <Route path="/employees/AddEmployee" element={<AddEmployee />} />
            <Route
                path="/employees/UpdateEmployee/:id"
                element={<UpdateEmployee />}
            />

            {/* Financial Routes */}
            <Route path="/financial/lostProfit" element={<LostProfit />} />
            <Route path="/financial/salaries" element={<Salaries />} />
            <Route path="/financial/updatentry/:id" element={<UpdateEntries />} />
            <Route path="/financial/incomes" element={<Incomes />} />
            <Route path="/financial/entry" element={<AddEnries />} />
            <Route path="/financial/emForm/:id" element={<EmployeeForm />} />
            <Route path="/financial/updateIncome/:id" element={<IncomedetailsForm />} />

        </Routes>
    );
};

export default AdminRoutes;
