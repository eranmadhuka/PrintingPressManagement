import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../Layouts/EmployeeLayout";
import proImg from "../../../assets/images/users/user1.jpg";
import Card from "../../common/Card";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

const EmployeeDashboard = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [empID, setEmpID] = useState("");
  const { user } = useAuthContext();

  const [employeeLeaves, setEmployeeLeaves] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      const employeeId = user.email;
      axios
        .get(`http://localhost:5000/employeeLeave/getLeaveByEmail/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => setEmployeeLeaves(result.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/employees/` + user.email, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setUserName(result.data.username);
          setEmail(result.data.email);
          setPhoneNumber(result.data.phone);
          setFirstName(result.data.fname);
          setLastName(result.data.lname);
          setAddress(result.data.address);
          setGender(result.data.gender);
          setBirthDate(result.data.birthDate);
          setDesignation(result.data.designation);
          setDepartment(result.data.department);
          setEmpID(result.data.empID);
        });
    }
  }, [user]);

  const approvedLeaves = employeeLeaves.filter(leave => leave.status === 'Approved');

  return (
    <>
      <EmployeeLayout>
        {/* Overview */}
        <div className="bg-white p-3 mt-3 rounded shadow-sm">
          <h3 className="fs-5 fw-bold">Overview</h3>

          <div className="row mt-4">
            <div className="col-lg-3">
              <Card
                title="Total Leaves"
                number={employeeLeaves.length}
                icon={<i className="bi bi-people-fill"></i>}
              />
            </div>
            <div className="col-lg-3">
              <Card
                title="Approved Leaves"
                number={approvedLeaves.length}
                icon={<i className="bi bi-people-fill"></i>}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">My Profile</h3>
          <div className="row mt-4">
            <div className="col-lg-2">
              <img
                src={proImg}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
            <div className="col-lg-10">
              <h3 className="fs-6 fw-bold">
                Employee Id: <span className="fs-6">{empID}</span>
              </h3>
              <h3 className="fs-6 fw-bold">
                Employee Email: <span className="fs-6">{email}</span>
              </h3>
              <h3 className="fs-6 fw-bold">
                Employee Name:
                <span className="fs-6">
                  {firstname} {lastname}
                </span>
              </h3>

              <h3 className="fs-6 fw-bold">
                Designation: <span className="fs-6">{designation}</span>
              </h3>
              <h3 className="fs-6 fw-bold">
                Department: <span className="fs-6">{department}</span>
              </h3>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6">
              <h3 className="fs-6 fw-bold">Personal Information</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  Full Name: {firstname} {lastname}
                </li>{" "}
                <li className="list-group-item">Tel: {phone}</li>{" "}
                <li className="list-group-item">Gender: {gender}</li>
                <li className="list-group-item">BirthDate: {birthDate}</li>
                <li className="list-group-item">Address: {address}</li>{" "}
              </ul>
            </div>
          </div>
        </div>
      </EmployeeLayout>
    </>
  );
};

export default EmployeeDashboard;
