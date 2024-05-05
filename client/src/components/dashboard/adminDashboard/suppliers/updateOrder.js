import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

const UpdateOrder = () => {
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(""); // State to hold selected supplier email

  const { id } = useParams();
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/raw/getRawMaterials/" + id)
      .then((result) => {
        const data = result.data;
        setProductID(data.productID);
        setProductName(data.productName);
        setSelectedSupplier(data.selectedSupplier);
        setQuantity(parseFloat(data.quantity));
        setUnitPrice(parseFloat(data.unitPrice));
        setTotalAmount(parseFloat(data.totalAmount));
        setDate(data.date);
        setDescription(data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier")
      .then((result) => setSupplier(result.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTotalAmount(parseFloat(quantity) * parseFloat(unitPrice));
  }, [quantity, unitPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    const numberPattern = /^[0-9]+$/;

    if (!productID.trim()) {
      errors.productID = "Product ID is required";
    }
    if (!productName.trim()) {
      errors.productName = "Product Name is required";
    }
    if (!quantity.toString().trim()) {
      errors.quantity = "Quantity is required";
    } else if (!quantity.toString().match(numberPattern)) {
      errors.quantity = "Quantity must be a number";
    }
    if (!unitPrice.toString().trim()) {
      errors.unitPrice = "Unit Price is required";
    } else if (!unitPrice.toString().match(numberPattern)) {
      errors.unitPrice = "Unit Price must be a number";
    }
    if (!totalAmount.toString().trim()) {
      errors.totalAmount = "Total Amount is required";
    } else if (!totalAmount.toString().match(numberPattern)) {
      errors.totalAmount = "Total Amount must be a number";
    }
    if (!date.trim()) {
      errors.date = "Date is required";
    } else {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!date.match(datePattern)) {
        errors.date = "Invalid date format. Please use YYYY-MM-DD format";
      }
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    alert(`The order has been updated!`);

    axios
      .put("http://localhost:5000/raw/updateRawMaterials/" + id, {
        productID,
        productName,
        quantity,
        unitPrice,
        totalAmount,
        date,
        description,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin/suppliers/raw-materials");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Update Order</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="PID" className="form-label">
                Product ID
              </label>
              <input
                type="text"
                className="form-control"
                id="PID"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              {errors.productID && (
                <div className="text-danger">{errors.productID}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PName" className="form-label">
                Product Name
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="PName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              >
                <option value="">Select a product</option>
                <option value="Paper">Paper</option>
                <option value="Card Stocks">Card Stocks</option>
                <option value="Ink">Ink</option>
                <option value="Binding Materials">Binding Materials</option>
                <option value="Chemicals and Solutions">
                  Chemicals and Solutions
                </option>
              </select>
              {errors.productName && (
                <div className="text-danger">{errors.productName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PSupplier" className="form-label">
                Supplier Email
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="PSupplier"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Select a supplier</option>
                {supplier.map((item) => (
                  <option key={item.id} value={item.emailAddress}>
                    {item.emailAddress}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="PQuantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="PQuantity"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
              />
              {errors.quantity && (
                <div className="text-danger">{errors.quantity}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PUnit" className="form-label">
                Unit Price
              </label>
              <input
                type="number"
                className="form-control"
                id="PUnit"
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
              />
              {errors.unitPrice && (
                <div className="text-danger">{errors.unitPrice}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PTotal" className="form-label">
                Total Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="PTotal"
                value={totalAmount}
                readOnly
              />
              {errors.totalAmount && (
                <div className="text-danger">{errors.totalAmount}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PDate" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="PDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <div className="text-danger">{errors.date}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="PDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="PDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Update Order
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default UpdateOrder;
