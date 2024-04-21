import React from 'react'
import AdminLayout from '../../../Layouts/AdminLayout';

const EmployeeForm = () => {
  return (
    <AdminLayout>
        <div className="d-flex justify-content-center">
        <div>
          <h2>Employee Details Form</h2>
          <div className="border p-3">
            
            <form id="employeeForm" onSubmit={validateForm}>
              <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                <input type="text" className="form-control" id="employeeId" name="employeeId" required />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">Name:</label>
                <input type="text" className="form-control" id="employeeName" name="employeeName" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="tel" className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                <small className="form-text">Format: 123-456-7890</small>
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">Position:</label>
                <input type="text" className="form-control" id="position" name="position" required />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department:</label>
                <input type="text" className="form-control" id="department" name="department" required />
              </div>
              <div className="mb-3">
                <label htmlFor="grossSalary" className="form-label">Gross Salary:</label>
                <input type="number" className="form-control" id="grossSalary" name="grossSalary" required />
              </div>
              <div className="mb-3">
                <label htmlFor="netSalary" className="form-label">Net Salary:</label>
                <input type="number" className="form-control" id="netSalary" name="netSalary" required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
const validateForm = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Validation logic can be added here
    
    // For demonstration purposes, just log a success message
    console.log('Form submitted successfully!');
  }
  
export default EmployeeForm;
