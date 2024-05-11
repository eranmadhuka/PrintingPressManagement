import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import PieChart from "../../../charts/PieChart"; // Import the PieChart component

const Delivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [deliverySearchQuery, setDeliverySearchQuery] = useState("");
  const [productStatusDataForPieChart, setProductStatusDataForPieChart] =
    useState([]);
  const [contactDrivers, setContactDrivers] = useState([]);
  const [contactDriversSearchQuery, setContactDriversSearchQuery] =
    useState("");

  const [filteredDelivery, setFilteredDelivery] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverMessages, setDriverMessages] = useState([]);
  const [filteredContactDrivers, setFilteredContactDrivers] = useState([]);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const deliveryResponse = await axios.get(
          "http://localhost:5000/api/deliveries/"
        );
        setDelivery(deliveryResponse.data);
        prepareProductStatusDataForPieChart(deliveryResponse.data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };

    fetchDeliveryData();
  }, []);

  useEffect(() => {
    setFilteredDelivery(delivery);
  }, [delivery]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/employees/drivers/details"
        );
        setContactDrivers(response.data);
        // Assuming response.data is an array of drivers
        response.data.forEach((driver) => {
          console.log(driver._id); // Printing _id for each driver
        });
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers(); // Call the fetchDrivers function
  }, []); // Empty dependency array to ensure the effect runs only once

  const prepareProductStatusDataForPieChart = (data) => {
    const productStatusCounts = {};
    data.forEach((deliveryItem) => {
      const { productStatus } = deliveryItem;
      if (productStatus in productStatusCounts) {
        productStatusCounts[productStatus]++;
      } else {
        productStatusCounts[productStatus] = 1;
      }
    });
    const formattedData = Object.keys(productStatusCounts).map((status) => ({
      type: status,
      count: productStatusCounts[status],
    }));
    setProductStatusDataForPieChart(formattedData);
  };

  const handleDeliverySearchChange = (e) => {
    setDeliverySearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredDelivery(delivery);
    } else {
      const filteredData = delivery.filter(
        (item) =>
          (item.driverId &&
            item.driverId
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.vehicleId &&
            item.vehicleId
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.productId &&
            item.productId
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.customerId &&
            item.customerId
              .toLowerCase()
              .includes(e.target.value.toLowerCase()))
      );
      setFilteredDelivery(filteredData);
    }
  };

  // const handleContactDriversSearchChange = (e) => {
  //   const searchQuery = e.target.value.toLowerCase();
  //   setContactDriversSearchQuery(searchQuery);
  //   const filteredData = contactDrivers.filter(
  //     (driver) =>
  //       driver._id.toLowerCase().includes(searchQuery) ||
  //       `${driver.fname} ${driver.lname}`.toLowerCase().includes(searchQuery)
  //   );
  //   setFilteredContactDrivers(filteredData);
  // };

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
      prepareProductStatusDataForPieChart(updatedDelivery.data);
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

        // Refresh the delivery data in the state after deletion
        const updatedDelivery = await axios.get(
          "http://localhost:5000/api/deliveries/"
        );
        setDelivery(updatedDelivery.data);
        prepareProductStatusDataForPieChart(updatedDelivery.data);

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

  // const openPopup = async (driver) => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/messages/" + driver._id
  //     );
  //     console.log("Messages for the selected driver:", response.data);

  //     // Accumulate the text of each message into a single string

  //     Swal.fire({
  //       title: `${driver.fname} ${driver.lname}`,
  //       text: response.data,
  //       icon: "success",
  //       confirmButtonText: "Close",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //     Swal.fire("", "No messages. Please try again later.", "error");
  //   }
  // };

  // Function to close pop-up
  // const closePopup = () => {
  //   setSelectedDriver(null);
  //   setDriverMessages([]);
  // };

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
              <th scope="col">Customer Email</th>
              <th scope="col">Address</th>
              <th scope="col">Product status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDelivery.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.employeeId}</td>
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

      {/* Contact Drivers Table and Product Status Distribution Pie Chart */}
      <div
        className="bg-white p-3 mt-5 d-flex"
        style={{ justifyContent: "space-between" }}
      >
        {/* Contact Drivers Table */}
        <div style={{ width: "48%" }}>
          {" "}
          {/* Adjusted width */}
          <h3 className="fs-5 fw-bold">Contact Drivers</h3>
          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Drivers"
                aria-label="Search"
                value={contactDriversSearchQuery}
                onChange={handleContactDriversSearchChange}
              />
            </form> */}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                {/* <th scope="col">Messages</th> */}
              </tr>
            </thead>
            <tbody>
              {contactDrivers.map((driver, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{driver._id}</td>
                  <td>{`${driver.fname} ${driver.lname}`}</td>
                  <td>{driver.phone}</td>
                  {/* <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => openPopup(driver)}
                    >
                      View
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Status Distribution Pie Chart */}
        <div style={{ width: "48%" }}>
          {" "}
          {/* Adjusted width */}
          <div className="bg-white p-3">
            <h3 className="fs-5 fw-bold">Product Status Distribution</h3>
            <div className="mt-3 px-2">
              <PieChart data={productStatusDataForPieChart} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Delivery;
