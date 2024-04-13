import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Layouts/AdminLayout";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000")
            .then((response) => {
                setVehicles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching vehicles: ", error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:5000/deleteVehicle/" + id)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => console.log(err));
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
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        <Link to="../transport/AddNewVehicle" className="btn btn-primary">
                            + Register New Vehicle
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="mt-3 px-2">
                        <table className="table">
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
                            <tbody>
                                {filteredVehicles.map((vehicle, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{vehicle.vehicleId}</td>
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
            </AdminLayout>
        </>
    );
};

export default Vehicles;
