import React, { useState, useEffect } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import "./customer.css";
import Axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDeleteNotification = (index) => {
    const notificationContent = notifications[index];
    Axios.delete(
      `http://localhost:5000/auth/deletenotification/` + user.email,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          notificationContent: notificationContent,
        },
      }
    )
      .then((result) => {
        console.log("Notification deleted successfully");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Notification deleted successfully!",
        });
        setNotifications((prevNotifications) =>
          prevNotifications.filter((_, i) => i !== index)
        );
      })
      .catch((error) => {
        console.error("Failed to delete notification:", error);
      });
  };

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:5000/auth/customer/` + user.email, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((result) => {
          console.log(result);
          setNotifications(result.data.notification);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <CustomerLayout>
      <div>
        <div className="col-md-10 offset-md-1">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mt-5 mb-3 border-bottom">
            <h3>Notifications</h3>
          </div>

          {notifications.map((notification, index) => (
            <div key={index} className="card mb-4 mt-4">
              <div className="card-body">
                <h5 className="card-title">Feedback Reply</h5>
                <p className="card-text">{notification}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteNotification(index)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default NotificationPage;
