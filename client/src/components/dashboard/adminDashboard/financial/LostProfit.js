import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import Swal from "sweetalert2";

const LostProfit = () => {
  // Initialize state for entries and search query
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch entries from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/financial/getdetails")
      .then((result) => {
        setEntries(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to delete an entry
  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with delete
        axios
          .delete("http://localhost:5000/financial/deleteaccount/" + id)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Filter entries based on search query
  const filteredEntries = entries.filter((entry) =>
    entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter expenses and revenues
  const expenses = filteredEntries.filter((entry) => entry.entryType === "expense");
  const revenues = filteredEntries.filter((entry) => entry.entryType === "revenue");

  // Calculate total amount for expenses and revenues
  const totalExpenses = expenses.reduce((total, entry) => total + entry.amount, 0);
  const totalRevenues = revenues.reduce((total, entry) => total + entry.amount, 0);

  // Calculate profit or loss
  const profitLoss = totalRevenues - totalExpenses;

  // Data for pie chart
  const pieChartData = {
    labels: ["Expenses", "Revenues"],
    datasets: [
      {
        data: [totalExpenses, totalRevenues],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#002868 ", "#BF0A30"],
      },
    ],
  };

  // Function to generate Excel report
  const generateExcelReport = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredEntries);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lost Profit Report");
    XLSX.writeFile(workbook, "lost_profit_report.xlsx");
  };

  return (
    <>
      <AdminLayout>
        <div>
          <h2>Lost or Profit Statement</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Date or Description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/admin/financial/entry">
            <button className="btn btn-primary">Add Entry</button>
          </Link>
          <button className="ms-2 btn btn-primary" onClick={generateExcelReport}>
            Generate Excel Report
          </button>

          {/* Expenses Table */}
          <h3>Expenses</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Description Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.description}</td>
                  <td>{entry.date}</td>
                  <td>{entry.amount}</td>
                  <td>
                    <Link to={`/admin/financial/updatentry/${entry._id}`} className="bi bi-pencil-square text-primary me-3">

                    </Link>
                    <i className="bi bi-trash-fill text-danger" onClick={(e) => handleDelete(entry._id)}></i>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Revenues Table */}
          <h3>Revenues</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Description Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.description}</td>
                  <td>{entry.date}</td>
                  <td>{entry.amount}</td>
                  <td>
                    <Link to={`/admin/financial/updatentry/${entry._id}`} className="bi bi-pencil-square text-primary me-3">

                    </Link>
                    <i className="bi bi-trash-fill text-danger" onClick={(e) => handleDelete(entry._id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Expenses and Revenues */}
          <div>
            <h4>Total Expenses: {totalExpenses}</h4>
            <h4>Total Revenues: {totalRevenues}</h4>
            <h4>Profit/Loss: {profitLoss}</h4>
          </div>

          {/* Pie Chart  */}
          <div style={{ height: "300px", width: "300px", margin: "auto" }}>
            <Pie data={pieChartData} />
          </div>
        </div >
      </AdminLayout >
    </>
  );
};

export default LostProfit;