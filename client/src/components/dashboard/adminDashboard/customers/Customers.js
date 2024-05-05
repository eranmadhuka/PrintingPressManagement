import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import BarChart from "../../../charts/BarChart"; // Import the BarChart component
import PieChart from "../../../charts/PieChart"; // Import the PieChart component
import axios from "axios";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);
  const chartRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/handlecustomer")
      .then((result) => {
        // Filter users with role 'user'
        const filteredUsers = result.data.filter(
          (user) => user.role === "user"
        );
        setUsers(filteredUsers);

        // The rest of your logic remains the same
        const registrationDates = filteredUsers.map(
          (user) => user.updated.split("T")[0]
        );
        const registrationCounts = registrationDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const registrationDataArray = Object.entries(registrationCounts).map(
          ([date, count]) => ({
            date,
            count,
          })
        );
        setRegistrationData(registrationDataArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteCustomer = (email) => {
    // SweetAlert confirmation modal
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5000/auth/handledeleteaccount/" + email)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const exportToExcel = () => {
    // Filtered array containing only specific fields
    const filteredUsers = users.map(
      ({ _id, username, email, phone, updated, address }) => ({
        _id,
        username,
        email,
        phone,
        updated,
        address,
      })
    );

    // Creating a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert filteredUsers array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "handlecustomer");

    // Generate an Excel file and trigger download
    XLSX.writeFile(workbook, "CustomerData.xlsx");
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("bar-chart");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: registrationData.map((entry) => entry.date),
        datasets: [
          {
            label: "Customer Registration Count",
            data: registrationData.map((entry) => entry.count),
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(0, 128, 0, 0.2)",
              "rgba(128, 0, 128, 0.2)",
              "rgba(128, 128, 0, 0.2)",
              "rgba(0, 128, 128, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(0, 128, 0, 1)",
              "rgba(128, 0, 128, 1)",
              "rgba(128, 128, 0, 1)",
              "rgba(0, 128, 128, 1)",
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              "rgba(54, 162, 235, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(153, 102, 255, 0.4)",
              "rgba(255, 159, 64, 0.4)",
              "rgba(0, 128, 0, 0.4)",
              "rgba(128, 0, 128, 0.4)",
              "rgba(128, 128, 0, 0.4)",
              "rgba(0, 128, 128, 0.4)",
            ],
            hoverBorderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(0, 128, 0, 1)",
              "rgba(128, 0, 128, 1)",
              "rgba(128, 128, 0, 1)",
              "rgba(0, 128, 128, 1)",
            ],
          },
        ],
      },
    });
  }, [registrationData]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white p-3 mt-3">
        <div class="row justify-content-between mt-3">
          <div class="col-8">
            <h3 className="fs-5 fw-bold ms-3">All Customers</h3>
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
            </div>
          </div>
          <div class="col-2">
            <button className="btn btn-success" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
        </div>

        <div className="mt-4 px-2">
          <table className="table table-hover">
            <thead>
              <tr className="table-light">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Register Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.updated}</td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteCustomer(user.email)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <div className="row">
            <div className="col-lg-7">
              <div className="card border-0 p-3">
                <div className="card-body">
                  <div className="mb-4">
                    <h2 className="card-title float-left fs-5 fw-bold">
                      Customer Distribution
                    </h2>
                  </div>
                  <canvas id="bar-chart" />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card border-0 p-3">
                <div className="card-body">
                  <PieChart data={registrationData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;
