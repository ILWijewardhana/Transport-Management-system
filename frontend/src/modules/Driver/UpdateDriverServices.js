import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateServices.scoped.css';
import DriverSideBar from './DriverSideBar';

function UpdateServicesD() {
  const [inputs, setInputs] = useState({
    serviceStatus: '', // Only include serviceStatus
  });

  const { id } = useParams(); // Get the service ID from route params
  const navigate = useNavigate(); // Used to redirect after successful update

  // Fetch the current service status when the component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/maintain/${id}`);
        if (res.data && res.data.maintenances) {
          setInputs({
            serviceStatus: res.data.maintenances.serviceStatus || '', // Only fetch the serviceStatus
          });
          console.log('Fetched service status:', res.data.maintenances.serviceStatus);
        }
      } catch (err) {
        console.error('Error fetching service status:', err);
      }
    };

    fetchServiceData();
  }, [id]);

  // Handle the change in service status
  const handleChange = (e) => {
    setInputs({
      serviceStatus: e.target.value,
    });
  };

  // Send PUT request to update the service status
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log('Submitting form with service status:', inputs.serviceStatus); // Log the service status

    try {
      const response = await axios.put(`http://localhost:8080/api/maintain/${id}`, {
        serviceStatus: inputs.serviceStatus, // Only send the serviceStatus in the request
      });

      console.log('Response from server:', response); // Log the response from the server

      // Check if the request was successful
      if (response.status === 200 || response.status === 202) {
        console.log('Update successful, navigating to /ServiceDr');
        navigate('/ServiceDr'); // Redirect to the service list page after successful update
      } else {
        console.error('Failed to update service status');
        alert('Error: Failed to update service status. Please try again.'); // Show error message to the user
      }

    } catch (err) {
      console.error('Error updating service status:', err);
      alert('Error: Unable to update service status. Check console for details.'); // Alert user of error
    }
  };

  return (
    <div>
      <DriverSideBar />
      <div className="table-container1">
        <h2>Update Service Status</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateServicesD;
