import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const Update = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [entryType, setEntryType] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/financial/getdetails/' + id)
      .then((result) => {
        console.log(result);
        setDescription(result.data.description);
        setEntryType(result.data.entryType);
        setDate(result.data.date);
        setAmount(result.data.amount);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const validateForm = () => {
    if (!description || !entryType || !date || !amount) {
      setError("Please fill out all fields.");
      return false;
    }
    setError("");
    return true;
  };

  const update = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios
      .put('http://localhost:5000/financial/updateUser/' + id, {
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
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2>Loss or Profit Statement Form</h2>
          <form onSubmit={update} className="container">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="entry_type" className="form-label">
                Entry Type:
              </label>
              <select
                className="form-select"
                id="entry_type"
                name="entry_type"
                value={entryType}
                required
                onChange={(e) => setEntryType(e.target.value)}
              >
                <option value="">Select the type of entry...</option>
                <option value="revenue">Revenue</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount:
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Enter the amount (e.g., 1000)..."
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {error && <div className="text-danger">{error}</div>}

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default Update;