import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
export const AddEntries = () => {
  const [description, setDescription] = useState();
  const [entryType, setEntryType] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/financial/createLPSEntry", {
        description,
        entryType,
        date,
        amount,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin/financial/lostProfit");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <body>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Loss or Profit Statement Form</h2>
            <form
              onSubmit={Submit}
              id="lossProfitForm"
              className="container"
              onsubmit="return validateForm()"
            >
              <div className="mb-3">
                <label for="description" className="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div
                  id="descriptionFeedback"
                  className="invalid-feedback"
                  style={{ color: "red", fontSize: "12px" }}
                ></div>
              </div>

              <div className="mb-3">
                <label for="entry_type" className="form-label">
                  Entry Type:
                </label>
                <select
                  className="form-select"
                  id="entry_type"
                  name="entry_type"
                  required
                  onChange={(e) => setEntryType(e.target.value)}
                >
                  <option value="">Select the type of entry...</option>
                  <option value="revenue">Revenue</option>
                  <option value="expense">Expense</option>
                </select>
                <div
                  id="entryTypeFeedback"
                  className="invalid-feedback"
                  style={{ color: "red", fontSize: "12px" }}
                ></div>
                <small className="form-text">
                  Select whether the entry represents revenue or an expense.
                </small>
              </div>

              <div className="mb-3">
                <label for="date" className="form-label">
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
                <div
                  id="dateFeedback"
                  className="invalid-feedback"
                  style={{ color: "red", fontSize: "12px" }}
                ></div>
                <small className="form-text">
                  Select the date of the entry.
                </small>
              </div>

              <div className="mb-3">
                <label for="amount" className="form-label">
                  Amount:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="Enter the amount (e.g., 1000)..."
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div
                  id="amountFeedback"
                  className="invalid-feedback"
                  style={{ color: "red", fontSize: "12px" }}
                ></div>

              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </body>
      </AdminLayout>
    </>
  );
};

export default AddEntries;