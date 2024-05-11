import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDept] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees/getUser/" + id)
      .then((result) => {
        console.log(result);
        setfName(result.data.fname);
        setlName(result.data.lname);
        setGender(result.data.gender);
        setBirthDate(result.data.birthDate);
        setAddress(result.data.address);
        setEmail(result.data.email);
        setPhone(result.data.phone);
        setUsername(result.data.username);
        setPassword(result.data.password);
        setDesignation(result.data.designation);
        setDept(result.data.department);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!fname) {
      errors.fname = "First Name is required";
    }
    if (!lname) {
      errors.lname = "Last Name is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!birthDate) {
      errors.birthDate = "Birth Date is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!phone) {
      errors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone Number is invalid";
    }
    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = "Password must contain at least one capital letter";
    } else if (!/(?=.[!@#$%^&])/.test(password)) {
      errors.password = "Password must contain at least one special character";
    }
    if (!designation) {
      errors.designation = "Designation is required";
    }
    if (!department) {
      errors.department = "Department is required";
    }

    if (Object.keys(errors).length === 0) {
      axios
        .put("http://localhost:5000/employees/updateEmployee/" + id, {
          fname,
          lname,
          gender,
          birthDate,
          address,
          email,
          phone,
          username,
          password,
          designation,
          department,
        })
        .then((result) => {
          console.log(result);
          navigate("/admin/employees");
        })

        .catch((err) => console.log(err));
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fName"
                value={fname}
                onChange={(e) => setfName(e.target.value)}
              />
              {errors.fname && (
                <div className="text-danger">{errors.fname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lName"
                value={lname}
                onChange={(e) => setlName(e.target.value)}
              />
              {errors.lname && (
                <div className="text-danger">{errors.lname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">
                Birth date
              </label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                value={birthDate}
                required
                onChange={(e) => setBirthDate(e.target.value)}
              />
              {errors.birthDate && (
                <div className="text-danger">{errors.birthDate}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && (
                <div className="text-danger">{errors.address}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <input
                type="text"
                className="form-control"
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              {errors.designation && (
                <div className="text-danger">{errors.designation}</div>
              )}
            </div>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              value={department}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">Department</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Transportation">Transportation</option>
            </select>
            {errors.department && (
              <div className="text-danger">{errors.department}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default UpdateEmployee;