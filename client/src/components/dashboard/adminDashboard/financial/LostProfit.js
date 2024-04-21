import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const LostProfit = () => {
  // Initialize state for entries
  const [entries, setEntries] = useState([]); // Fix: Change setUsers to setEntries

  // Function to fetch entries from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/getdetails")
      .then((result) => {
        setEntries(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to delete an entry
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/deleteaccount/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <div>
          <h2>Lost or Profit Statement</h2>
          <Link to="/admin/financial/entry">
            <button className="btn btn-primary">Add Entry</button>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description Type</th>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry._id}</td>
                  <td>{entry.description}</td>
                  <td>{entry.date}</td>
                  <td>{entry.entryType}</td>
                  <td>{entry.amount}</td>
                  <td>
                    <Link
                      to={`/admin/financial/updatentry/${entry._id}`}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(entry._id)}
                    >
                      Delete
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

export default LostProfit;
