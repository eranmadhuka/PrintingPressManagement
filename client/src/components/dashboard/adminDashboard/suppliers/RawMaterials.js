import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Importing XLSX package
import PieChart from "../../../charts/PieChart"; // Import your PieChart component

const RawMaterials = () => {
  // State for holding the list of raw materials
  const [rawmaterials, setRawMaterials] = useState([]);
  // State for holding the search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for holding the data for the pie chart
  const [pieChartData, setPieChartData] = useState([]);

  // useEffect hook to fetch the list of raw materials when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/raw/")
      .then((result) => setRawMaterials(result.data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect hook to calculate data for the pie chart when raw materials change
  useEffect(() => {
    // Process raw materials data to calculate daily count
    const dailyCount = calculateDailyCount(rawmaterials);
    // Set pie chart data
    setPieChartData(dailyCount);
  }, [rawmaterials]);

  // Function to calculate daily count of raw materials
  const calculateDailyCount = (data) => {
    const dailyCountMap = new Map();
    data.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (dailyCountMap.has(date)) {
        dailyCountMap.set(date, dailyCountMap.get(date) + 1);
      } else {
        dailyCountMap.set(date, 1);
      }
    });
    return Array.from(dailyCountMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  };

  // Function to handle deletion of a raw material
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/raw/deleteRawMaterials/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Function to export raw materials data to Excel
  const exportToExcel = () => {
    // Filtered array containing only specific fields
    const filteredRawMaterials = rawmaterials.map(
      ({
        _id,
        productName,
        quantity,
        unitPrice,
        totalAmount,
        date,
        description,
      }) => ({
        _id,
        productName,
        quantity,
        unitPrice,
        totalAmount,
        date,
        description,
      })
    );

    // Creating a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert filteredRawMaterials array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredRawMaterials);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "RawMaterials");

    // Generate an Excel file and trigger download
    XLSX.writeFile(workbook, "RawMaterials.xlsx");
  };

  //filter product name by searching
  const filteredRawMaterials = rawmaterials.filter((rawMaterial) =>
    rawMaterial.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendEmailToSupplier = (supplierEmail) => {
    // Compose the mailto link with the recipient's email address
    const mailtoLink = `mailto: ${supplierEmail}`;

    // Open the default email application with the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Raw materials</h3>

          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by product Name"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/admin/suppliers/add-orders">
              <button className="btn btn-primary">+ Add Raw Materials</button>
            </Link>
            <div className="col-2">
              <button className="btn btn-success" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Supplier Email</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRawMaterials.map((rawMaterial, index) => (
                <tr key={index}>
                  <td>{rawMaterial._id}</td>
                  <td>{rawMaterial.productName}</td>
                  <td>{rawMaterial.supplierEmail}</td>
                  <td>{rawMaterial.quantity}</td>
                  <td>
                    {parseFloat(rawMaterial.unitPrice) >= 0
                      ? rawMaterial.unitPrice
                      : "Invalid Price"}
                  </td>
                  <td>
                    {parseFloat(rawMaterial.totalAmount) >= 0
                      ? rawMaterial.totalAmount
                      : "Invalid Amount"}
                  </td>
                  <td>{new Date(rawMaterial.date).toLocaleDateString()}</td>
                  <td>{rawMaterial.description}</td>

                  <td>
                    <Link
                      to={`/admin/suppliers / update - orders / ${rawMaterial._id}`}
                    >
                      <button className="btn btn-dark me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(rawMaterial._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        sendEmailToSupplier(rawMaterial.supplierEmail)
                      }
                    >
                      <i className="bi bi-envelope"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <div className="row">
              <div className="col-lg-5">
                <div className="card border-0 p-3">
                  <div className="card-body">
                    <h2 className="card-title float-left fs-5 fw-bold">
                      Daily Supplier Order Count
                    </h2>
                    {/* Render the PieChart component passing feedbackData */}
                    <PieChart data={pieChartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout >
    </>
  );
};

export default RawMaterials;