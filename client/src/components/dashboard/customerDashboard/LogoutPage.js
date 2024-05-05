import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerLayout from "../../Layouts/CustomerLayout";
import "./customer.css";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Swal from "sweetalert2";

const LogoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext;
  const handleModalClose = () => {
    setShowModal(false);
  };

  const Navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      setShowModal(true);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout successfully!",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <CustomerLayout>
      <div>
        <div className="col-md-10 offset-md-1">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mt-3 mb-3 border-bottom">
            <h3>Logout</h3>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Are you sure you want to logout?</h5>
              <p className="card-text">
                You will be logged out of your account.
              </p>
              {user && (
                <div>
                  <span>{user.email}</span>
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
              <Link to="/" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </div>

          {/* Modal */}
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="confirmationModal"
            tabIndex="-1"
            aria-labelledby="confirmationModalLabel"
            aria-hidden={!showModal}
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmationModalLabel">
                    Logout Confirmation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>You have been successfully logged out.</p>
                </div>
                <div className="modal-footer">
                  <Link to="/login" className="btn btn-primary">
                    OK
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End Modal */}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default LogoutPage;
