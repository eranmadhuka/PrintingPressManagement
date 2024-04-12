import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateDelivery = () => {
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [productId, setProductId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [vehicles, setVehicles] = useState([]); // State variable for vehicles
  const navigate = useNavigate();

  // State variables for validation errors
  const [driverIdError, setDriverIdError] = useState("");
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
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!driverId) {
      setDriverIdError("Driver Id is required");
      isValid = false;
    }

    if (!vehicleId) {
      setVehicleIdError("Vehicle Id is required");
      isValid = false;
    }

    if (!productId) {
      setProductIdError("Product Id is required");
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
        driverId,
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
        console.log(response.data);
        alert("Delivery added successfully!");
        navigate("/admin/transport/delivery");
      } catch (error) {
        console.error("Error adding delivery:", error);
        alert("Failed to add delivery. Please try again.");
      }
    }
  };

  const clearForm = () => {
    setDriverId("");
    setVehicleId("");
    setProductId("");
    setCustomerId("");
    setAddress("");
    setConfirmed(false);
  };

  const clearErrors = () => {
    setDriverIdError("");
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
              <label htmlFor="driverid" className="form-label">
                Driver Id
              </label>
              <input
                type="text"
                className={`form-control ${driverIdError ? "is-invalid" : ""}`}
                id="driverid"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              />
              {driverIdError && (
                <div className="invalid-feedback">{driverIdError}</div>
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
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.name} - {vehicle.id}
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
                Customer Id
              </label>
              <input
                type="text"
                className={`form-control ${
                  customerIdError ? "is-invalid" : ""
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
                className={`form-check-input ${
                  confirmedError ? "is-invalid" : ""
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
