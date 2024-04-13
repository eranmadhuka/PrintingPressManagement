import React from 'react'
import EmployeeLayout from '../../Layouts/EmployeeLayout'
import proImg from "../../../assets/images/users/user1.jpg";

const EmployeeDashboard = () => {
    return (
        <>
            <EmployeeLayout>
                <div className="bg-white p-3 mt-2">
                    <h3 className='fs-5 fw-bold'>My Profile</h3>
                    <div className="row mt-4">
                        <div className="col-lg-2">
                            <img
                                src={proImg}
                                alt="Profile"
                                className="img-fluid rounded-circle"
                                style={{ width: "120px", height: "120px" }}
                            />
                        </div>
                        <div className="col-lg-10">
                            <h3 className='fs-6 fw-bold mb-0'>Employee Name</h3>
                            <p className='mt-0'>Employee Manager</p>

                            <h3 className='fs-6 fw-bold'>Employee Id: <span className='fs-6'>FT-0012</span></h3>
                            <h3 className='fs-6 fw-bold'>Date of Join: <span className='fs-6'>1st Jan 2013</span></h3>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className="col-lg-6">
                            <h3 className='fs-6 fw-bold'>Personal Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">NIC Number: 200156832965</li>
                                <li className="list-group-item">Tel: 0765689868</li>
                                <li className="list-group-item">Nationality: Sri Lankan</li>
                                <li className="list-group-item">Marital status: Unmarried</li>
                                <li className="list-group-item">Address: Horana, Kaluthara</li>
                                <li className="list-group-item">Gender: Female</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <h3 className='fs-6 fw-bold'>Bank information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">Bank name: DFCC Bank</li>
                                <li className="list-group-item">Bank account No: 159843014641</li>
                                <li className="list-group-item">IFSC Code: ICI24504</li>
                                <li className="list-group-item">PAN No: TC000Y56</li>
                                <li className="list-group-item">Branch: Horana</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </EmployeeLayout>
        </>
    )
}

export default EmployeeDashboard
