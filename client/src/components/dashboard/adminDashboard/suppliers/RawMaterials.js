import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";

const RawMaterials = () => {
  const [rawmaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/raw/")
      .then((result) => setRawMaterials(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/raw/deleteRawMaterials/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Raw materials</h3>

          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <Link to="/admin/suppliers/add-orders">
              <button className="btn btn-primary">+ Add Raw Materials</button>
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Discription</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rawmaterials.map((rawMaterial, index) => (
                <tr key={index}>
                  <th scope="row">{rawMaterial._id}</th>
                  <td>{rawMaterial.productId}</td>
                  <td>{rawMaterial.productName}</td>
                  <td>{rawMaterial.quantity}</td>
                  <td>{rawMaterial.unitPrice}</td>
                  <td>{rawMaterial.totalAmount}</td>
                  <td>{rawMaterial.date}</td>
                  <td>{rawMaterial.description}</td>

                  <td>
                    <Link
                      to={`/admin/suppliers/update-orders/${rawMaterial._id}`}
                    >
                      <button className="btn btn-dark me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(rawMaterial._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default RawMaterials;
