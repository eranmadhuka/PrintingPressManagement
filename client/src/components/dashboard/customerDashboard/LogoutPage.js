import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerLayout from "../../Layouts/CustomerLayout";
// import proImg from "../../../assets/images/9434619.jpg";
// import "./customer.css";
// import axios from "axios";

const LogoutPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const Navigate = useNavigate();
  /*axios.defaults.withCredentials = true;*/
  const handleLogout = () => {
    /*axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          Navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });*/
    setShowModal(true); // Show confirmation modal
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
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
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
