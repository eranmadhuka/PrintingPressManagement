import React, { useState } from "react";
// import "./customer.css";
import CustomerLayout from "../../Layouts/CustomerLayout";
import Axios from "axios";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});

  const submitFeedback = async (feedbackData) => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/auth/feedback",
        feedbackData,
        {
          headers: {
            /* Authorization: `Bearer ${token}`,*/
            // Include user authentication token
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to submit feedback:", error.response.data.error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    let errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!feedback.trim()) {
      errors.feedback = "Feedback is required";
    }

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // Perform form submission or further actions here
      console.log("Submitting feedback:", { name, email, feedback });
    } else {
      // Display validation errors
      setErrors(errors);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
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
                    Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""
                      }`}
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">
                    Feedback:
                  </label>
                  <textarea
                    className={`form-control ${errors.feedback ? "is-invalid" : ""
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
