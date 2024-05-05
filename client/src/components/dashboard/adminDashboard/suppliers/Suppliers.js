// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

// Define functional component Suppliers
const Suppliers = () => {
  const [supplier, setSupplier] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier")
      .then((result) => setSupplier(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/supplier/deleteSupplier/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Function to export filtered supplier data to Excel
  const exportToExcel = () => {
    const filteredUsers = supplier.map(
      ({
        _id,
        supplierName,
        companyName,
        companyAddress,
        emailAddress,
        phoneNumber,
      }) => ({
        _id,
        supplierName,
        companyName,
        companyAddress,
        emailAddress,
        phoneNumber,
      })
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    XLSX.utils.book_append_sheet(workbook, worksheet, "SuppliersData");
    XLSX.writeFile(workbook, "SuppliersData.xlsx");
  };

  //search query
  const filteredUsers = supplier.filter((user) =>
    user.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white p-3 mt-2">
        <h3 className="fs-5 fw-bold">Suppliers</h3>
        <div className="d-flex align-items-center justify-content-between border-bottom py-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 ms-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div class="col-2">
            <button className="btn btn-success" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
          <Link to="/admin/suppliers/add-spplier">
            <button className="btn btn-primary">+ Add Supplier</button>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Supplier ID</th>
              <th scope="col">Supplier Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Company Address</th>
              <th scope="col">Email Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((supplier, index) => (
              <tr key={index}>
                <td>{supplier._id}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.companyName}</td>
                <td>{supplier.companyAddress}</td>
                <td>{supplier.emailAddress}</td>
                <td>{supplier.phoneNumber}</td>
                <td>
                  <Link to={`/admin/suppliers/updatesupplier/${supplier._id}`}>
                    <button className="btn btn-dark me-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(supplier._id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Suppliers;
