import React, { useState } from 'react';
// import SideBar from '../Admin/SideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddServices.css';
import SideBar from './SideBar';

function AddServices() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    serviceID: "",
    vehicleNumber: "",
    serviceDate: "",
    serviceType: "",
    serviceStatus: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    // Service ID validation: must start with 'S' and be exactly 5 characters long
    const serviceIDRegex = /^S[A-Z0-9]{1,4}$/; // Fixed to require exactly 5 characters
    if (!serviceIDRegex.test(inputs.serviceID)) {
      alert("Service ID must start with 'S' and be exactly 5 characters long.");
      return;
    }

    // Vehicle Number validation: must be exactly 9 characters long
    const vehicleNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
    if (!vehicleNumberRegex.test(inputs.vehicleNumber)) {
      alert("Vehicle number must be exactly 9 characters.");
      return;
    }

    // Service Type validation: must be letters, numbers, or both, with max 25 characters
    const serviceTypeRegex = /^[A-Za-z0-9\s]{1,25}$/; // Adjusted regex to allow spaces
    if (!serviceTypeRegex.test(inputs.serviceType)) {
      alert("Service type must only contain letters, numbers, and not exceed 25 characters.");
      return;
    }

    window.alert("Service added successfully");
    // Send request to add service
    await sendRequest();
    navigate('/Service'); // Redirect to '/Service' after successful submission
  };

  // Send POST request to backend
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/api/maintain", {
      serviceID: String(inputs.serviceID),
      vehicleNumber: String(inputs.vehicleNumber),
      serviceDate: new Date(inputs.serviceDate).toISOString(),
      serviceType: String(inputs.serviceType),
      serviceStatus: String(inputs.serviceStatus),
    }).then((res) => res.data);
  };

  return (
    <div>
      <SideBar />
      <div className="table-container1">
        <h2>Add Services</h2>
        <form onSubmit={handleSubmit}>
          <label>Service ID</label>
          <br />
          <input
            type="text"
            name="serviceID" // Use 'name' attribute
            onChange={handleChange}
            value={inputs.serviceID}
            required
          />
          <br /><br />

          <label>Vehicle Number</label>
          <br />
          <input
            type="text"
            name="vehicleNumber" // Use 'name' attribute
            onChange={handleChange}
            value={inputs.vehicleNumber}
            required
          />
          <br /><br />

          <label>Service Date</label>
          <br />
          <input
            type="date"
            name="serviceDate" // Use 'name' attribute
            onChange={handleChange}
            value={inputs.serviceDate}
            required
          />
          <br /><br />

          <label>Service Type</label>
          <br />
          <input
            type="text"
            name="serviceType" // Use 'name' attribute
            onChange={handleChange}
            value={inputs.serviceType}
            required
          />
          <br /><br />

          <label>Service Status</label>
          <br />
          <select 
            name="serviceStatus" 
            onChange={handleChange} 
            value={inputs.serviceStatus} 
            required
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Process">In Process</option>
          </select>
          <br /><br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddServices;
