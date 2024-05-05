import React, { useEffect, useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import proImg from "../../../assets/images/9434619.jpg";
import Axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerDashboard = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [profileImagePath, setProfileImagePath] = useState("");

  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  const [filename, setFilename] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:5000/auth/customer/` + user.email, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((result) => {
        console.log(result);
        setUserName(result.data.username);
        setEmail(result.data.email);
        setPhoneNumber(result.data.phone);
        setFirstName(result.data.firstname);
        setLastName(result.data.lastname);
        setAddress(result.data.address);
        setProfileImagePath(result.data.profileImagePath);
        const filename = result.data.filename; // Store filename in a variable
        console.log(filename);

        // Fetch the image using the filename
        Axios.get(`http://localhost:5000/auth/images/` + filename, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "arraybuffer",
        })
          .then((response) => {
            const base64Image = arrayBufferToBase64(response.data);
            setImageData(base64Image);
            // Handle image retrieval result as needed
          })
          .catch((err) => console.log(err));
      });
    }
  }, [user]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      console.error("User not authenticated");
      return;
    }

    const formData = new FormData();

    // Only append the image data if it's not empty
    if (image) {
      formData.append("profileImage", image);
    }

    // Log the FormData content to check if the image data is included
    console.log("FormData:", formData);

    try {
      // Only upload the image if it's selected
      if (image) {
        const uploadResponse = await Axios.post(
          `http://localhost:5000/auth/upload/${user.email}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload response:", uploadResponse.data);
      }

      if (!phone || typeof phone !== "string" || !phone.trim()) {
      } else if (!/^(0\d{9})$/.test(phone)) {
        errors.phone =
          "Invalid phone number format (must start with 0, followed by 9 digits)";
      }
      if (!firstname || !firstname.trim()) {
        errors.firstname = "First Name is required";
      }
      if (!lastname || !lastname.trim()) {
        errors.lastname = "Last Name is required";
      }
      if (!username || !username.trim()) {
        errors.username = "User Name is required";
      }
      if (!address || !address.trim()) {
        errors.address = "Address is required";
      }
      // Update user details if necessary
      const updateUserResponse = await Axios.put(
        `http://localhost:5000/auth/users/` + user.email,
        {
          firstname,
          username,
          lastname,
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Update user response:", updateUserResponse.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });
      navigate("/"); // Navigate to the appropriate route after successful update
    } catch (error) {
      console.error("Error uploading image or updating user details:", error);
      // Handle error
    }

    // Basic validation
    let errors = {};
    if (!firstname || !firstname.trim()) {
      errors.firstname = "First Name is required";
    }
    if (!lastname || !lastname.trim()) {
      errors.lastname = "Last Name is required";
    }
    if (!username || !username.trim()) {
      errors.username = "User Name is required";
    }
    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email format";
    }
    if (!address || !address.trim()) {
      errors.address = "Address is required";
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
    } else if (!/^(0\d{9})$/.test(phone)) {
      errors.phone =
        "Invalid phone number format (must start with 0, followed by 9 digits)";
    }

    if (Object.keys(errors).length === 0) {
      // Proceed with form submissions
      console.log("Submitting:", {
        firstname,
        lastname,
        username,
        email,
        address,
        phone,
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
        {user && (
          <div className="row align-items-center">
            <div className="col-auto">
              <img
                src={imageData ? `data:image/jpeg;base64,${imageData}` : proImg} // Use the profile image path if available, otherwise fallback to default image
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div className="col-auto">
              <form
                action={`/upload/${user.email}`}
                encType="multipart/form-data" // Corrected attribute name
              >
                <label
                  htmlFor="uploadPhoto"
                  className="btn btn-outline-primary"
                >
                  Upload New Photo
                </label>
                <input
                  type="file"
                  id="uploadPhoto"
                  className="visually-hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </form>
            </div>
          </div>
        )}
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
                    errors.firstname ? "is-invalid" : ""
                  }`}
                  id="firstname"
                  value={firstname}
                  onChange={handleFirstNameChange}
                />
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  User Name*
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  value={username}
                  onChange={handleUserNameChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
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
                  readOnly
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
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  id="lastname"
                  value={lastname}
                  onChange={handleLastNameChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number*
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phoneNumber"
                  required
                  value={phone}
                  onChange={handlePhoneNumberChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
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
