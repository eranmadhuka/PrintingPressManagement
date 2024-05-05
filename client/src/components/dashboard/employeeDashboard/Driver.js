import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../Layouts/EmployeeLayout";
import axios from "axios";

import { useAuthContext } from "../../../hooks/useAuthContext";

const AdminMessageForm = ({ onClose, show }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");

  if (!show) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Prepare data to send
      const formData = {
        employeeId,
        text: message,
        productId,
      };

      // Make POST request to send the message
      const response = await axios.post(
        "http://localhost:5000/api/sendMessage",
        formData
      );

      // Handle success
      console.log("Message sent:", formData);
      onClose(); // Close the modal after submitting
    } catch (error) {
      // Handle error
      console.error("Error sending message:", error);
    }
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Admin Message Form</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  Product ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Driver = () => {
  const { user } = useAuthContext();
  const [delivery, setDelivery] = useState([]);
  const [driverDeliveries, setDriverDeliveries] = useState([]);
  const [showAdminMessageForm, setShowAdminMessageForm] = useState(false);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const deliveryResponse = await axios.get(
          "http://localhost:5000/api/deliveries/"
        );
        setDelivery(deliveryResponse.data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };

    fetchDeliveryData();
  }, []);

  const handleTellAdminClick = () => {
    setShowAdminMessageForm(true);
  };

  return (
    <>
      <EmployeeLayout>
        <AdminMessageForm
          onClose={() => setShowAdminMessageForm(false)}
          show={showAdminMessageForm}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Driver Id</th>
              <th scope="col">Vehicle Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {delivery.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.employeeId}</td>
                <td>{item.vehicleId}</td>
                <td>{item.productId}</td>
                <td>{item.customerId}</td>
                <td>{item.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mb-3" onClick={handleTellAdminClick}>
          Tell Admin
        </button>
        <div className="bg-white p-3 mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vehicle Id</th>
                <th scope="col">Product Id</th>
                <th scope="col">Customer Id</th>
                <th scope="col">Address</th>
                <th scope="col">Product Status</th>
              </tr>
            </thead>
            <tbody>
              {driverDeliveries.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.vehicleId}</td>
                  <td>{item.productId}</td>
                  <td>{item.customerId}</td>
                  <td>{item.address}</td>
                  <td>{item.productStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EmployeeLayout>
    </>
  );
};

export default Driver;
