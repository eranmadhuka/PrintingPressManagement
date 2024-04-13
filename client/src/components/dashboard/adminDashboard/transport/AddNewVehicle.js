import React, { useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [registrationDocument, setRegistrationDocument] = useState(null);
  const [proofOfInsurance, setProofOfInsurance] = useState(null);
  const [isInformationAccurate, setIsInformationAccurate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // State variables for validation errors
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [insuranceError, setInsuranceError] = useState("");
  const [confirmedError, setConfirmedError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearErrors();

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

    if (!registrationDocument) {
      setDocumentError("Please upload Vehicle Registration Document");
      isValid = false;
    }

    if (!proofOfInsurance) {
      setInsuranceError("Please upload Proof of Insurance");
      isValid = false;
    }

    if (!isInformationAccurate) {
      setConfirmedError("Please confirm the accuracy of the information");
      isValid = false;
    }

    if (isValid) {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("vehicleName", vehicleName);
      formData.append("vehicleNumber", vehicleNumber);
      formData.append("vehicleStatus", vehicleStatus);
      formData.append("vehicleType", vehicleType);
      formData.append("registrationDocument", registrationDocument);
      formData.append("proofOfInsurance", proofOfInsurance);
      formData.append("isInformationAccurate", isInformationAccurate);

      try {
        const response = await axios
          .post("http://localhost:5000/createVehicle", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("Update successful: ", response.data);
            alert("Vehicle updated successfully!");
            navigate("/admin/transport/vehicles");
          });
      } catch (error) {
        // Handle error
        if (error.response) {
          // Server responded with a status code
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", error.message);
        }
        console.error(error.config);
        alert("Failed to add vehicle. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const clearErrors = () => {
    setNameError("");
    setNumberError("");
    setStatusError("");
    setTypeError("");
    setDocumentError("");
    setInsuranceError("");
    setConfirmedError("");
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Register New Vehicle</h3>

          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label htmlFor="vdocument" className="form-label">
                Vehicle Registration Document
              </label>
              <input
                className={`form-control ${documentError ? "is-invalid" : ""}`}
                type="file"
                id="vdocument"
                accept="application/pdf"
                //required
                onChange={(e) => handleFileChange(e, setRegistrationDocument)}
              />
              {documentError && (
                <div className="invalid-feedback">{documentError}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Proof of Insurance
              </label>
              <input
                className={`form-control ${insuranceError ? "is-invalid" : ""}`}
                type="file"
                id="formFileMultiple"
                multiple
                onChange={(e) => handleFileChange(e, setProofOfInsurance)}
              />
              {insuranceError && (
                <div className="invalid-feedback">{insuranceError}</div>
              )}
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddNewVehicle;
