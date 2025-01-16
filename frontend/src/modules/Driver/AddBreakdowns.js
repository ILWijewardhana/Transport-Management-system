import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DriverSideBar from './DriverSideBar';

const AddBreakdown = () => {
  const [inputs, setInputs] = useState({
    vehicleNumber: '',
    date: '',
    partReplace: '',
    repairCost: '',
    employeeID: '',
    employeeName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation rules

    // Vehicle Number validation: Must be alphanumeric and exactly 7-10 characters long (based on common vehicle plate formats)
    const vehicleNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
    if (!vehicleNumberRegex.test(inputs.vehicleNumber)) {
      alert("Vehicle number must be between 2 and 8 alphanumeric characters.");
      return;
    }

   // Date validation: Ensure date is not in the future
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

const selectedDate = new Date(inputs.date);
selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

if (selectedDate > currentDate) {
  alert("Date cannot be in the future.");
  return;
}

    // Part Replace validation: Letters and numbers allowed, max length of 25 characters
    const partReplaceRegex = /^[A-Za-z0-9\s]{1,25}$/;
    if (!partReplaceRegex.test(inputs.partReplace)) {
      alert("Part replaced must only contain letters or numbers and not exceed 25 characters.");
      return;
    }

    // Repair Cost validation: Must be a valid decimal with up to 2 decimal places
    const repairCostRegex = /^\d+(\.\d{1,2})?$/;
    if (!repairCostRegex.test(inputs.repairCost)) {
      alert("Repair cost must be a valid decimal number.");
      return;
    }

    // Employee ID validation: Alphanumeric string, exactly 5-8 characters
    const employeeIDRegex =  /^E[A-Z0-9]{1,4}$/;
    if (!employeeIDRegex.test(inputs.employeeID)) {
      alert("Employee ID must be between 5 and 8 alphanumeric characters.");
      return;
    }

    // Employee Name validation: Only alphabetic characters allowed, with max 50 characters
    const employeeNameRegex = /^[A-Za-z\s]{1,25}$/;
    if (!employeeNameRegex.test(inputs.employeeName)) {
      alert("Employee name must only contain letters and cannot exceed 50 characters.");
      return;
    }

    try {
      // Post the breakdown and notification data to the backend
      const response = await axios.post("http://localhost:8080/api/breakdown", inputs);
      
      alert("Breakdown and notification successfully added!");

      // Reset the form after submission
      setInputs({
        vehicleNumber: '',
        date: '',
        partReplace: '',
        repairCost: '',
        employeeID: '',
        employeeName: ''
      });

      // Navigate to the breakdown list page
      navigate("/BreakdownDr");

    } catch (err) {
      console.error(err);
      alert("Failed to add breakdown, please try again.");
    }
  };

  return (
    <div>
      <DriverSideBar />
      <div className="table-container1">
        <h2>Add Breakdown</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Vehicle Number:</label>
            <input
              type="text"
              name="vehicleNumber"
              value={inputs.vehicleNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Part Replaced:</label>
            <input
              type="text"
              name="partReplace"
              value={inputs.partReplace}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Repair Cost:</label>
            <input
              type="number"
              name="repairCost"
              value={inputs.repairCost}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeID"
              value={inputs.employeeID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Employee Name:</label>
            <input
              type="text"
              name="employeeName"
              value={inputs.employeeName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Breakdown</button>
        </form>
      </div>
    </div>
  );
};

export default AddBreakdown;
