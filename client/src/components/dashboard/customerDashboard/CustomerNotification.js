import React, { useState } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";

const NotificationPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleDeleteNotification = () => {
    // Logic to delete notification
    console.log("Notification deleted");
    setShowModal(false);
  };

  return (
    <CustomerLayout>
      <div>
        <div className="col-md-10 offset-md-1">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mt-3 mb-3 border-bottom">
            <h3>Notifications</h3>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Notification Title</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                velit ex, feugiat id arcu sed, consectetur condimentum velit.
                Integer nec nibh et nulla facilisis scelerisque.
              </p>
              <button className="btn btn-primary" onClick={handleViewDetails}>
                View Details
              </button>
            </div>
          </div>

          {/* Add another card for additional notifications */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Notification Title 2</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                velit ex, feugiat id arcu sed, consectetur condimentum velit.
                Integer nec nibh et nulla facilisis scelerisque.
              </p>
              <button className="btn btn-primary" onClick={handleViewDetails}>
                View Details
              </button>
            </div>
          </div>

          {/* Modal */}
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            id="notificationModal"
            tabIndex="-1"
            aria-labelledby="notificationModalLabel"
            aria-hidden={!showModal}
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="notificationModalLabel">
                    Notification Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Notification details go here...</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteNotification}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
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

export default NotificationPage;
