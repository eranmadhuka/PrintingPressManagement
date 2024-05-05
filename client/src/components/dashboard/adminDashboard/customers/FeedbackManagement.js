import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import Chart from "chart.js/auto";
import BarChart from "../../../charts/BarChart"; // Import the BarChart component
import PieChart from "../../../charts/PieChart"; // Import the PieChart component

const FeedbackManagement = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCustomerFeedback, setSelectedCustomerFeedback] =
    useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [notification, setReplyMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedbackEmail, setSelectedFeedbackEmail] = useState("");
  const [feedbackData, setFeedbackData] = useState([]); // State for feedback data
  const [dailyFeedbackCountData, setDailyFeedbackCountData] = useState([]); // State for daily feedback count data

  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false);
    setReplyMessage("");
  };

  const handleViewFeedback = (feedback) => {
    setSelectedCustomerFeedback(feedback);
    setShowFeedbackModal(true);
    setSelectedFeedbackEmail(feedback.email);
  };

  const handleReplyMessageChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleFeedbackSend = (e) => {
    e.preventDefault();

    if (!notification.trim()) {
      // If notification is empty or contains only whitespace
      alert("Please enter a valid reply message.");
      return;
    }

    axios
      .post(
        `http://localhost:5000/auth/sendfeedback/` + selectedFeedbackEmail,
        {
          notification,
        }
      )
      .then((result) => {
        console.log(result);
        handleFeedbackModalClose();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Notification sent successfully!",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/handlecustomer")
      .then((result) => {
        const filteredUsers = result.data.filter(
          (user) => user.role === "user" && user.feedback
        );

        // Sort the filtered users by feedback date in descending order
        const sortedUsers = filteredUsers.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setUsers(sortedUsers);

        // Prepare data for daily feedback count chart
        const feedbackDates = sortedUsers.map(
          (user) => user.date.split("T")[0] // Use 'date' instead of 'updated'
        );
        const feedbackCounts = feedbackDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const feedbackDataArray = Object.entries(feedbackCounts).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        setDailyFeedbackCountData(feedbackDataArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    const filteredUsers = users.map(
      ({ _id, username, email, phone, address, date, feedback }) => ({
        _id,
        username,
        email,
        phone,
        address,
        date,
        feedback,
      })
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    XLSX.utils.book_append_sheet(workbook, worksheet, "handlecustomer");
    XLSX.writeFile(workbook, "FeedbackData.xlsx");
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-3">
          <div className="row justify-content-between mt-3">
            <div className="col-8">
              <h3 className="fs-5 fw-bold ms-3">All Feedbacks</h3>
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
            <div className="col-2">
              <button className="btn btn-success" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>
          {/* Table */}
          <div className="mt-3 px-2">
            <table className="table table-hover">
              <thead>
                <tr className="table-light">
                  <th scope="col">Customer ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Feedback Date</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback._id}</td>
                    <td>{feedback.username}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.date}</td>
                    <td>
                      <button
                        className="btn btn-dark me-2"
                        onClick={() => handleViewFeedback(feedback)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feedback Modal */}
        {selectedCustomerFeedback && (
          <div
            className={`modal fade ${showFeedbackModal ? "show" : ""}`}
            id="feedbackModal"
            tabIndex="-1"
            aria-labelledby="feedbackModalLabel"
            aria-hidden={!showFeedbackModal}
            style={{ display: showFeedbackModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="feedbackModalLabel">
                    Feedback Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleFeedbackModalClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Customer ID:</strong> {selectedCustomerFeedback._id}
                  </p>
                  <p>
                    <strong>Customer Email:</strong>{" "}
                    {selectedCustomerFeedback.email}
                  </p>
                  <p>
                    <strong>Feedback Date:</strong>{" "}
                    {selectedCustomerFeedback.date}
                  </p>
                  <hr />
                  <p>
                    <strong>Feedback Message:</strong>
                  </p>
                  <p>{selectedCustomerFeedback.feedback}</p>
                  <hr />
                  <div className="mb-3">
                    <label htmlFor="replyMessage" className="form-label">
                      Reply Message:
                    </label>
                    <textarea
                      className="form-control"
                      id="replyMessage"
                      rows="3"
                      value={notification}
                      onChange={handleReplyMessageChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleFeedbackModalClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleFeedbackSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End Feedback Modal */}

        {/* Charts Section */}
        <div className="mt-3">
          <div className="row">
            <div className="col-lg-7">
              <div className="card border-0 p-3">
                <div className="card-body">
                  <div className="mb-4">
                    <h2 className="card-title float-left fs-5 fw-bold">
                      Daily Feedback Count
                    </h2>
                  </div>
                  {/* Render the BarChart component passing dailyFeedbackCountData */}
                  <BarChart data={dailyFeedbackCountData} />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card border-0 p-3">
                <div className="card-body">
                  {/* Render the PieChart component passing feedbackData */}
                  <PieChart data={dailyFeedbackCountData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Charts Section */}
      </AdminLayout>
    </>
  );
};

export default FeedbackManagement;
