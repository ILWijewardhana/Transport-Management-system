import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function Breakdown({ breakdown }) {
  const navigate = useNavigate(); // Call useNavigate at the top level

  if (!breakdown) {
    return null;
  }

  const { _id, vehicleNumber, date, partReplace, repairCost, employeeID, employeeName } = breakdown;

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:8080/api/breakdown/${_id}`)
      .then(res => res.data)
      .then(() => navigate("/")) // After deleting, navigate back to the list
      .then(() => navigate("/Breakdown")); // Or redirect to the breakdown page
  };

  return (
    <tr>
      <td>{vehicleNumber}</td>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{partReplace}</td>
      <td>{repairCost}</td>
      <td>{employeeID}</td>
      <td>{employeeName}</td>
      <td>
        
        <button className='delete' onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Breakdown;
