import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Layouts/AdminLayout";
import Swal from "sweetalert2";
import PieChart from "../../../charts/PieChart"; // Import the PieChart component

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleDataForPieChart, setVehicleDataForPieChart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setVehicles(response.data);
        prepareDataForPieChart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles: ", error);
      });
  }, []);

  const prepareDataForPieChart = (data) => {
    const vehicleTypes = {};
    data.forEach((vehicle) => {
      if (vehicle.vehicleType in vehicleTypes) {
        vehicleTypes[vehicle.vehicleType]++;
      } else {
        vehicleTypes[vehicle.vehicleType] = 1;
      }
    });
    const formattedData = Object.keys(vehicleTypes).map((type) => ({
      type,
      count: vehicleTypes[type],
    }));
    setVehicleDataForPieChart(formattedData);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deleteVehicle/${id}`)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "The vehicle has been deleted.",
              icon: "success",
            });
            // Consider handling the UI update here instead of reloading.
            window.location.reload();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Failed to Delete",
              text: "There was a problem deleting the vehicle. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  // Construct URL for documents
  const getFileUrl = (filename) => {
    return `http://localhost:5000/files/${filename}`;
  };

  return (
    <>
      <AdminLayout>
        <div className="bg-white p-3 mt-2">
          <h3 className="fs-5 fw-bold">Vehicles List</h3>

          <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="search by VehicleNo "
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="../transport/AddNewVehicle" className="btn btn-primary">
              + Register New Vehicle
            </Link>
          </div>

          {/* Table */}
          <div className="mt-3 px-2">
            <table className="table">
              {/* Table header */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Vehicle Id</th>
                  <th scope="col">Vehicle Type</th>
                  <th scope="col">Vehicle Number</th>
                  <th scope="col">Vehicle Model</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {filteredVehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{vehicle._id}</td>
                    <td>{vehicle.vehicleType}</td>
                    <td>{vehicle.vehicleNumber}</td>
                    <td>{vehicle.vehicleName}</td>
                    <td>
                      <span className="badge bg-success">
                        {vehicle.vehicleStatus}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/transport/updateVehicle/${vehicle._id}`}
                        className="btn btn-dark me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() =>
                          window.open(
                            getFileUrl(vehicle.registrationDocument),
                            "_blank"
                          )
                        }
                        disabled={!vehicle.registrationDocument}
                      >
                        View Registration
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() =>
                          window.open(
                            getFileUrl(vehicle.proofOfInsurance),
                            "_blank"
                          )
                        }
                        disabled={!vehicle.proofOfInsurance}
                      >
                        View Insurance
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(vehicle._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Render Pie Chart */}
        <div className="row">
          <div className="col-lg-6">
            <div className="bg-white p-3 mt-2">
              <h3 className="fs-5 fw-bold">Vehicle Types Distribution</h3>
              <div className="mt-3 px-2">
                <PieChart data={vehicleDataForPieChart} />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Vehicles;
