import React, { useEffect, useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import proImg from "../../../assets/images/9434619.jpg";
import Axios from "axios";

import { Link, useParams, useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  /* useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get("http://localhost:5000/auth/verify");
        if (!res.data.status) {
          navigate("/");
        }
      } catch (err) {
        console.error("Error verifying authentication:", err);
        navigate("/");
      }
    };
    fetchUserData();
  }, [navigate]);*/

  useEffect(() => {
    const res = Axios.get("http://localhost:5000/auth/customer/" + id)
      .then((result) => {
        console.log(result);
        setUserName(result.data.username);
        setEmail(result.data.email);
        setPhoneNumber(result.data.phone);
      })
      .catch((err) => console.log(err));
  });

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/auth/users/" + id, {
      firstName,
      lastName,
      userName,
      email,
      address,
      phoneNumber,
    })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));

    // Basic validation
    let errors = {};
    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!userName.trim()) {
      errors.userName = "User Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email format";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber =
        "Invalid phone number format. Must contain 10 digits.";
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      console.log("Submitting:", {
        firstName,
        lastName,
        userName,
        email,
        address,
        phoneNumber,
      });
    } else {
      // Display validation errors
      setErrors(errors);
    }
  };

  return (
    <CustomerLayout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="div ms-2">
          <h3>Profile Settings</h3>
        </div>
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={proImg}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="uploadPhoto" className="btn btn-outline-primary">
              Upload New Photo
            </label>
            <input type="file" id="uploadPhoto" className="visually-hidden" />
          </div>
        </div>
      </div>
      <div className="container" style={{ minHeight: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-5">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.userName ? "is-invalid" : ""
                  }`}
                  id="userName"
                  value={userName}
                  onChange={handleUserNameChange}
                />
                {errors.userName && (
                  <div className="invalid-feedback">{errors.userName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>

              <div className="d-grid gap-2" style={{ marginTop: "20px" }}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ width: "150px" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="col-5">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                {errors.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
