import React, { useEffect, useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./customer.css";
import Axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Swal from "sweetalert2";

const DeleteAccount = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/customer/" + user.email)
      .then((result) => {
        console.log(result);
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAccount = () => {
    Axios.delete("http://localhost:5000/auth/deleteaccount/" + user.email)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CustomerLayout>
      <div>
        <div className="col-md-10 offset-md-1">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mt-3 mb-3 border-bottom">
            <h3>Delete Account</h3>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                Are you sure you want to delete your account?
              </h5>
              <p className="card-text">
                This action cannot be undone. All your data will be lost
                permanently.
              </p>
              <button
                className="btn btn-danger"
                onClick={(e) => handleDeleteAccount(user.email)}
              >
                Delete Account
              </button>
              <Link to="/register" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
export default DeleteAccount;
