import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 col-lg-2 position-fixed vh-100 overflow-auto bg-white">
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <Link
              to="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <img src={Logo} alt="logo" className="logo me-3" />
            </Link>
            <hr />
            <ul className="list-unstyled ps-0">
              {/* Dashboard */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin"
                  className="text-decoration-none d-block nav-link p-3"
                >
                  <i className="bi bi-cart-check me-2"></i>
                  Dashboard
                </Link>
              </li>

              {/* Order collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/orders") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#order-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-box-seam me-2"></i> Orders
                </Link>
                <div className="collapse" id="order-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <Link
                        to="/admin/orders"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orders/refunds"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Refund Requests
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Products collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/products") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#product-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-box-seam me-2"></i> Products
                </Link>
                <div className="collapse" id="product-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <Link
                        to="/admin/products"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/products/categories"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Categories
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Customer collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/customers") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#customer-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-people me-2"></i> Customers
                </Link>
                <div className="collapse" id="customer-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/customers"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Customers
                      </Link>
                      <Link
                        to="/admin/feedbackmanagement"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Feedbacks
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Inventory collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/inventory") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#Inventory-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-receipt-cutoff me-2"></i> Inventory
                </Link>
                <div className="collapse" id="Inventory-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/inventory"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Inventory
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Suplliers collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/suppliers") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#Suplliers-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-diagram-3 me-2"></i> Suplliers
                </Link>
                <div className="collapse" id="Suplliers-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/suppliers"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Suppliers
                      </Link>
                    </li>
                    {/* <li>
                                            <Link
                                                to="/admin/suppliers/add-spplier"
                                                className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                                            >
                                                Add Suppliers
                                            </Link>
                                        </li> */}
                    <li>
                      <Link
                        to="/admin/suppliers/raw-materials"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Raw Materials
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/suppliers/place-order"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Place Order
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Transport collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/transport") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#Transport-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-truck me-2"></i> Transport
                </Link>
                <div className="collapse" id="Transport-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/transport/vehicles"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Vehicles
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/transport/delivery"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Delivery
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/transport/UpdateDelivery"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Add Delivery
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Employee collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/employees") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#Employee-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-video2 me-2"></i> Employee
                </Link>
                <div className="collapse" id="Employee-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/employees"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        All Employees
                      </Link>
                    </li>
                    {/* <li>
                                            <Link
                                                to="/admin/employees/AddEmployee"
                                                className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                                            >
                                                Add Employee
                                            </Link>
                                        </li> */}
                    <li>
                      <Link
                        to="/admin/employees/leaves"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Leaves
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/employees/attendance"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Attendance
                      </Link>
                    </li>
                    {/* <li>
                                            <Link
                                                to="/admin/employees/departments"
                                                className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                                            >
                                                Departments
                                            </Link>
                                        </li> */}
                  </ul>
                </div>
              </li>

              {/* Financial collapse */}
              <li
                className={`mb-1 nav-item border-bottom ${
                  location.pathname.includes("/admin/financial") ? "active" : ""
                }`}
              >
                <Link
                  className="text-decoration-none d-block nav-link  p-3"
                  data-bs-toggle="collapse"
                  data-bs-target="#financial-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-cash-stack me-2"></i> Financial
                </Link>
                <div className="collapse" id="financial-collapse">
                  <ul className="btn-toggle-nav list-unstyled  pb-1 small">
                    <li>
                      <Link
                        to="/admin/financial/lostProfit"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Lost Or Profit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/financial/salaries"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Employee Salaries
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/financial/incomes"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        Income Statement
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="col-md-10 col-lg-10 offset-md-2 offset-lg-2">
          <header className="admin-header bg-white shadow-sm p-2 px-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Dashboard</h5>
              <div className="d-flex justify-content-between align-items-center">
                <i className="bi bi-person-circle fs-1 me-3"></i>
                <div className="dropdown cursor-pointer">
                  <div
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown button
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        Account
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Account
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
