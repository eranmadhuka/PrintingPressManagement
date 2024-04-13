import React, { useEffect, useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const DeleteAccount = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/customer")
      .then((result) => {
        console.log(result);
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteAccount = (id) => {
    Axios.delete("http://localhost:3001/auth/deleteaccount/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
    setShowModal(true); // Show confirmation modal
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
                onClick={(e) => handleDeleteAccount(id)}
              >
                Delete Account
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
                    Account Deletion Confirmation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Your account has been successfully deleted.</p>
                </div>
                <div className="modal-footer">
                  <Link to="/" className="btn btn-primary">
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

export default DeleteAccount;
