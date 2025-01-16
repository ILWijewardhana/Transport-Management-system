import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DriverSideBar from './DriverSideBar';
import "./UpdateBreakdowns.scoped.css"

const UpdateBreakdown = () => {
  const { id } = useParams(); // Get the breakdown ID from URL parameters
  const [inputs, setInputs] = useState({
    vehicleNumber: '',
    date: '',
    partReplace: '',
    repairCost: '',
    employeeID: '',
    employeeName: ''
  }); // Initialize state with default empty values
  const navigate = useNavigate();

  // Function to format the date to 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  // Fetch breakdown data when the component mounts
  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/breakdown/${id}`);
        if (response.data && response.data.breakdown) {
          // Format the date before setting it in the state
          const breakdownData = {
            ...response.data.breakdown,
            date: formatDate(response.data.breakdown.date) // Format the date here
          };
          setInputs(breakdownData); // Set the response data in state
        }
      } catch (error) {
        console.error('Error fetching breakdown data:', error);
        alert('Failed to fetch breakdown details.');
      }
    };
    fetchBreakdown();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation rules

    // Vehicle Number validation: Must be alphanumeric and exactly 7-10 characters long
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
    const employeeIDRegex = /^E[A-Z0-9]{1,4}$/;
    if (!employeeIDRegex.test(inputs.employeeID)) {
      alert("Employee ID must be in the format EXXXX where X can be any alphanumeric character.");
      return;
    }

    // Employee Name validation: Only alphabetic characters allowed, with max 50 characters
    const employeeNameRegex = /^[A-Za-z\s]{1,50}$/;
    if (!employeeNameRegex.test(inputs.employeeName)) {
      alert("Employee name must only contain letters and cannot exceed 50 characters.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/breakdown/${id}`, inputs);
      alert('Breakdown updated successfully');
      navigate("/BreakdownDr"); // Redirect to Breakdown list or page after successful update
    } catch (error) {
      console.error('Error updating breakdown:', error);
      alert('Failed to update breakdown. Please try again.');
    }
  };

  return (
    <div>
      <DriverSideBar />
      <div className="form-container">
        <h2>Update Breakdown</h2>
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
          <button type="submit">Update Breakdown</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBreakdown;
