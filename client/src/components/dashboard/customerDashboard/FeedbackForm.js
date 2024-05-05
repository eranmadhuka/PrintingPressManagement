import React, { useEffect, useState } from "react";
import "./customer.css";
import CustomerLayout from "../../Layouts/CustomerLayout";
import Axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FeedbackForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:5000/auth/customer/` + user.email, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Pass JWT token in the Authorization header
        },
      })
        .then((result) => {
          console.log(result);
          setUsername(result.data.username);
          setEmail(result.data.email);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    let errors = {};
    if (!feedback.trim()) {
      errors.feedback = "Feedback is required";
    }

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      if (!user || !user.token) {
        console.error("User not authenticated");
        return;
      }
      Axios.post(
        `http://localhost:5000/auth/feedbacks/` + user.email,
        {
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Pass JWT token in the Authorization header
          },
        }
      )
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Feedback submitted successfully!",
          });
          navigate("/user/" + user.email); // Navigate to the appropriate route after successful update
        })
        .catch((error) => {
          console.error("Error submitting feedback:", error);
          // Handle error
        });
    } else {
      // Display validation errors
      setErrors(errors);
    }
  };

  return (
    <CustomerLayout>
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center ms-2 pt-3 pb-2 mt-3 mb-3 border-bottom">
          <h3>Feedback</h3>
        </div>
        {/* Your dashboard content goes here */}
        <div className="container">
          <div className="row">
            <div className="col-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={username}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">
                    Feedback:
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.feedback ? "is-invalid" : ""
                    }`}
                    id="feedback"
                    rows="4"
                    placeholder="Enter your feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                  ></textarea>
                  {errors.feedback && (
                    <div className="invalid-feedback">{errors.feedback}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default FeedbackForm;
