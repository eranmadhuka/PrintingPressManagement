import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isInformationAccurate, setIsInformationAccurate] = useState(false);

  // State variables for validation errors
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [confirmedError, setConfirmedError] = useState("");

  useEffect(() => {
    // Fetch the existing vehicle data to pre-fill the form
    axios
      .get(`http://localhost:5000/getVehicle/` + id)
      .then((response) => {
        const { vehicleName, vehicleNumber, vehicleStatus, vehicleType } =
          response.data;
        setVehicleName(vehicleName);
        setVehicleNumber(vehicleNumber);
        setVehicleStatus(vehicleStatus);
        setVehicleType(vehicleType);
      })
      .catch((error) => {
        console.error("Error fetching vehicle: ", error);
      });
  }, [id]);

  const update = (e) => {
    e.preventDefault();

    // Resetting previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!vehicleName) {
      setNameError("Vehicle Name is required");
      isValid = false;
    }

    if (!vehicleNumber) {
      setNumberError("Vehicle Number is required");
      isValid = false;
    }

    if (!vehicleStatus) {
      setStatusError("Vehicle Status is required");
      isValid = false;
    }

    if (!vehicleType || vehicleType === "Select Vehicle Type") {
      setTypeError("Please select a valid Vehicle Type");
      isValid = false;
    }

    if (!isInformationAccurate) {
      setConfirmedError("Please confirm the accuracy of the information");
      isValid = false;
    }

    if (isValid) {
      // Prepare data for update
      const updatedVehicle = {
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        vehicleStatus: vehicleStatus,
        vehicleType: vehicleType,
        isInformationAccurate: isInformationAccurate,
      };

      // Send PUT request to update vehicle
      axios
        .put(`http://localhost:5000/updateVehicle/` + id, updatedVehicle)
        .then((response) => {
          Swal.fire("Success", `Vehicle updated successfully`, "success");
          navigate("/admin/transport/vehicles");
        })
        .catch((error) => {
          Swal.fire(
            "Error",
            "Failed to update vehicle. Please try again.",
            "error"
          );
        });
    }
  };

  const clearErrors = () => {
    setNameError("");
    setNumberError("");
    setStatusError("");
    setTypeError("");
    setConfirmedError("");
  };

  return (
    <AdminLayout>
      <div className="bg-white p-3 mt-2">
        <h3 className="fs-5 fw-bold">Update Vehicle Details</h3>

        <form onSubmit={update}>
          <div className="mb-3">
            <label htmlFor="vehiclename" className="form-label">
              Vehicle Name
            </label>
            <input
              type="text"
              className={`form-control ${nameError ? "is-invalid" : ""}`}
              id="vehiclename"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            />
            {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="vehiclenumber" className="form-label">
              Vehicle Number
            </label>
            <input
              type="text"
              className={`form-control ${numberError ? "is-invalid" : ""}`}
              id="vehiclenumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
            {numberError && (
              <div className="invalid-feedback">{numberError}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="vehiclestatus" className="form-label">
              Vehicle Status(Active/Inactive)
            </label>
            <input
              type="text"
              className={`form-control ${statusError ? "is-invalid" : ""}`}
              id="vehiclestatus"
              value={vehicleStatus}
              onChange={(e) => setVehicleStatus(e.target.value)}
            />
            {statusError && (
              <div className="invalid-feedback">{statusError}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="vehicletype" className="form-label">
              Vehicle Type
            </label>
            <select
              className={`form-select ${typeError ? "is-invalid" : ""}`}
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              id="vehicletype"
            >
              <option>Select Vehicle Type</option>
              <option value="Heavy">Heavy</option>
              <option value="Normal">Normal</option>
              <option value="Light">Light</option>
            </select>
            {typeError && <div className="invalid-feedback">{typeError}</div>}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${
                confirmedError ? "is-invalid" : ""
              }`}
              id="exampleCheck1"
              checked={isInformationAccurate}
              onChange={(e) => setIsInformationAccurate(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
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
  );
};

export default UpdateVehicle;
