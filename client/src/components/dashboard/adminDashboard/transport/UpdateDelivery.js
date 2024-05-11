import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CreateDelivery = () => {
  const [employeeId, setEmployeeId] = useState(""); // Selected employee ID
  const [vehicleId, setVehicleId] = useState("");
  const [productId, setProductId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [vehicles, setVehicles] = useState([]); // State variable for vehicles
  const [employees, setEmployees] = useState([]); // State variable for employees
  const navigate = useNavigate();

  // State variables for validation errors
  const [employeeIdError, setEmployeeIdError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [vehicleIdError, setVehicleIdError] = useState("");
  const [productIdError, setProductIdError] = useState("");
  const [customerIdError, setCustomerIdError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [confirmedError, setConfirmedError] = useState("");

  useEffect(() => {
    // Fetch vehicles from the server
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setVehicles(response.data); // Assuming response.data is an array of vehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    // Fetch employee IDs from the server
    const fetchEmployeeIDs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/employees/drivers/ids"
        );
        const employeeIDs = response.data; // Assuming response.data is an array of employee IDs
        setEmployees(employeeIDs); // Set the state directly with the array of employee IDs
      } catch (error) {
        console.error("Error fetching employee IDs:", error);
      }
    };

    fetchEmployeeIDs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;

    // Resetting previous errors
    clearErrors();

    if (!employeeId) {
      setEmployeeIdError("Employee Id is required");
      isValid = false;
    }

    if (!vehicleId) {
      setVehicleIdError("Vehicle Id is required");
      isValid = false;
    }

    if (!productId) {
      setProductIdError("Product Id is required");
      isValid = false;
    } else if (!/^\d+$/.test(productId)) {
      setNumberError("Vehicle Number must be an integer");
      isValid = false;
    }

    if (!customerId) {
      setCustomerIdError("Customer Id is required");
      isValid = false;
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (!confirmed) {
      setConfirmedError("Please confirm the accuracy of the information");
      isValid = false;
    }

    if (isValid) {
      // Prepare data for submission
      const deliveryData = {
        employeeId,
        vehicleId,
        productId,
        customerId,
        address,
        confirmed,
      };

      try {
        // Send POST request to create delivery
        const response = await axios.post(
          "http://localhost:5000/api/deliveries/",
          deliveryData
        );
        Swal.fire("Success", "Delivery added successfully!", "success");
        navigate("/admin/transport/delivery");
      } catch (error) {
        Swal.fire(
          "Error",
          "Failed to add delivery. Please try again.",
          "error"
        );
      }
    }
  };

  const clearErrors = () => {
    setEmployeeIdError("");
    setVehicleIdError("");
    setProductIdError("");
    setCustomerIdError("");
    setAddressError("");
    setConfirmedError("");
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Add Delivery</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="employeeid" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                className={`form-control ${employeeIdError ? "is-invalid" : ""
                  }`}
                id="employeeid"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter Employee ID"
              />
              {employeeIdError && (
                <div className="invalid-feedback">{employeeIdError}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="vehicleid" className="form-label">
                Vehicle Id
              </label>
              <select
                className={`form-select ${vehicleIdError ? "is-invalid" : ""}`}
                id="vehicleid"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.vehicleID} value={vehicle.vehicleID}>
                    {vehicle.vehicleID}
                  </option>
                ))}
              </select>
              {vehicleIdError && (
                <div className="invalid-feedback">{vehicleIdError}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="productid" className="form-label">
                Product Id
              </label>
              <input
                type="text"
                className={`form-control ${productIdError ? "is-invalid" : ""}`}
                id="productid"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              {productIdError && (
                <div className="invalid-feedback">{productIdError}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="customerid" className="form-label">
                Customer Email
              </label>
              <input
                type="text"
                className={`form-control ${customerIdError ? "is-invalid" : ""
                  }`}
                id="customerid"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
              {customerIdError && (
                <div className="invalid-feedback">{customerIdError}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${addressError ? "is-invalid" : ""}`}
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {addressError && (
                <div className="invalid-feedback">{addressError}</div>
              )}
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className={`form-check-input ${confirmedError ? "is-invalid" : ""
                  }`}
                id="confirmed"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="confirmed">
                I confirm the accuracy of the information I have supplied.
              </label>
              {confirmedError && (
                <div className="invalid-feedback">{confirmedError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateDelivery;
