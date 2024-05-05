import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const Update = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  useEffect(() => {
    axios.get(`http://localhost:5000/financial/incomeStatement/getIncomeDetails/` + id)
      .then((result) => {
        console.log(result);
        setOrderId(result.data._id);
        setCustomerName(result.data.customer);
        setOrderDate(result.data.createdAt);
        setProduct(result.data.products.product);
        setQuantity(result.data.products.additionalDetails.quantity);
        setUnitPrice(result.data.unitPrice);
        setAmount(result.data.amount);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const [error, setError] = useState(""); // Define setError function

  const validateForm = () => {
    if (!orderId || !customerName || !orderDate || !amount) {
      setError("Please fill out all fields."); // Use setError function
      return false;
    }
    setError(""); // Clear error if no validation issues
    return true;
  };

  const update = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios.put(`http://localhost:5000/financial/incomeStatement/updateIncomeDetails/${id}`, { // Corrected URL
      orderId,
      customerName,
      orderDate,
      product,
      quantity,
      unitPrice,
      amount,
    })
      .then((result) => {
        console.log(result);
        navigate("/admin/financial/incomes"); // Correct usage of navigate
      })
      .catch((err) => console.log(err));
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-center">
        <form onSubmit={update} className="w-50"> {/* Corrected onSubmit */}
          <div className="mb-3">
            <label htmlFor="orderId" className="form-label">Order ID</label>
            <input type="text" className="form-control" id="orderId" value={orderId}
              onChange={(e) => setOrderId(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">Customer Name</label>
            <input type="text" className="form-control" id="customerName" value={customerName}
              onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="orderDate" className="form-label">Order Date</label>
            <input type="date" className="form-control" id="orderDate" value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="product" className="form-label">Product</label>
            <input type="text" className="form-control" id="product" value={product}
              onChange={(e) => setProduct(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="quantity" value={quantity}
              onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="unitPrice" className="form-label">Unit Price</label>
            <input type="number" className="form-control" id="unitPrice" value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="totalAmount" className="form-label">Total Amount</label>
            <input type="number" className="form-control" id="totalAmount" value={amount}
              onChange={(e) => setAmount(e.target.value)} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error if exists */}
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default Update;
