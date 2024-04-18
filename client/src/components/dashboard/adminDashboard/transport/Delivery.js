import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const Delivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [deliverySearchQuery, setDeliverySearchQuery] = useState("");
  const [contactDrivers, setContactDrivers] = useState([
    { DriverId: 1, DriverName: "John Doe", Contactnumber: "123-456-7890" },
    { DriverId: 2, DriverName: "Jane Smith", Contactnumber: "987-654-3210" },
    {
      DriverId: 3,
      DriverName: "Michael Johnson",
      Contactnumber: "456-789-0123",
    },
  ]);
  const [contactDriversSearchQuery, setContactDriversSearchQuery] =
    useState("");

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const deliveryResponse = await axios.get(
          "http://localhost:5000/api/deliveries/"
        );
        setDelivery(deliveryResponse.data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };

    fetchDeliveryData();
  }, []);

  const handleDeliverySearchChange = (e) => {
    setDeliverySearchQuery(e.target.value);
  };

  const handleContactDriversSearchChange = (e) => {
    setContactDriversSearchQuery(e.target.value);
  };

  const updateProductStatus = async (newStatus, id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/deliveries/${id}`,
        { productStatus: newStatus }
      );

      Swal.fire("Success", "Product status updated successfully!", "success");

      const updatedDelivery = await axios.get(
        "http://localhost:5000/api/deliveries/"
      );
      setDelivery(updatedDelivery.data);
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to update product status. Please try again.",
        "error"
      );
    }
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(delivery);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deliveries");
    XLSX.writeFile(workbook, "DeliveryData.xlsx");
  };
  const clearDeliveredData = async () => {
    try {
      const result = await Swal.fire({
        title: "Confirm",
        text: "Make sure you have a table report. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          "http://localhost:5000/api/deliveries/"
        );
        console.log(response.data);

        // Refresh the delivery data in the state after deletion
        const updatedDelivery = await axios.get(
          "http://localhost:5000/api/deliveries/"
        );
        setDelivery(updatedDelivery.data);

        Swal.fire(
          "Success",
          "Delivered items have been successfully deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error("Failed to delete delivered items:", error);
      Swal.fire(
        "Error",
        "Error deleting delivered items. Please try again later.",
        "error"
      );
    }
  };
  return (
    <AdminLayout>
      <div className="bg-white p-3 mt-2">
        <h3 className="fs-5 fw-bold">Transportation</h3>

        <div className="d-flex align-items-center justify-content-between border-bottom py-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Deliveries"
              aria-label="Search"
              value={deliverySearchQuery}
              onChange={handleDeliverySearchChange}
            />
          </form>
          <div>
            <button
              className="btn btn-warning me-2"
              onClick={clearDeliveredData}
            >
              Clear Delivered
            </button>
            <button className="btn btn-success me-2" onClick={exportToExcel}>
              Export to Excel
            </button>
            <a href="../transport/UpdateDelivery" className="btn btn-primary">
              + Add Delivery
            </a>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Driver Id</th>
              <th scope="col">Vehicle Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Address</th>
              <th scope="col">Product status</th>
            </tr>
          </thead>
          <tbody>
            {delivery.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.driverId}</td>
                <td>{item.vehicleId}</td>
                <td>{item.productId}</td>
                <td>{item.customerId}</td>
                <td>{item.address}</td>
                <td>
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id={`productStatus${index}`}
                      aria-label="Floating label select example"
                      value={item.productStatus}
                      onChange={(e) =>
                        updateProductStatus(e.target.value, item._id)
                      }
                    >
                      <option value="Pending Delivery">Pending Delivery</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-3 mt-5">
        <h3 className="fs-5 fw-bold">Contact Drivers</h3>

        <div className="d-flex align-items-center justify-content-between border-bottom py-3">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Drivers"
              aria-label="Search"
              value={contactDriversSearchQuery}
              onChange={handleContactDriversSearchChange}
            />
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Driver Id</th>
              <th scope="col">Driver Name</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {contactDrivers.map((driver, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{driver.DriverId}</td>
                <td>{driver.DriverName}</td>
                <td>{driver.Contactnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Delivery;
