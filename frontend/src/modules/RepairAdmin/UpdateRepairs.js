import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import './UpdateRepairs.css';

function UpdateRepairs() {
  const [inputs, setInputs] = useState({
    repairID: '',
    repairNumber: '',
    repairDate: '',
    partReplace: '',
    repairCost: '',
    repairStatus: '',
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/repair/${id}`);
        if (res.data && res.data.repair) {
          setInputs({
            repairID: res.data.repair.repairID || '',
            repairNumber: res.data.repair.repairNumber || '',
            repairDate: res.data.repair.repairDate ? res.data.repair.repairDate.split('T')[0] : '',
            partReplace: res.data.repair.partReplace || '',
            repairCost: res.data.repair.repairCost || '',
            repairStatus: res.data.repair.repairStatus || '',
          });
        } else {
          console.error('API did not return expected data');
        }
      } catch (error) {
        console.error('Error fetching repair data', error);
      }
    };

    fetchRepairData();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Repair ID validation: must start with 'R' and be exactly 5 characters long
    const repairIDRegex = /^R[A-Z0-9]{1,4}$/;
    if (!repairIDRegex.test(inputs.repairID)) {
      alert("Repair ID must start with 'R' and be exactly 5 characters long.");
      return;
    }

   // Repair Number validation: must be exactly 9 characters long, uppercase letters, digits, and optional dash
const repairNumberRegex = /^(?:[A-Z0-9]-?){2,8}[A-Z0-9]$/; 
if (!repairNumberRegex.test(inputs.repairNumber)) {
  alert("Repair number must be exactly 9 characters.");
  return;
}

        // Part Replace validation: must be letters, numbers, or both, with max 25 characters
const partReplaceRegex = /^[A-Za-z0-9]{1,25}$/;
if (!partReplaceRegex.test(inputs.partReplace)) {
  alert("Part replaced must only contain letters or numbers and not exceed 25 characters.");
  return;
}

    // Repair Cost validation: only decimals allowed with up to two decimal places (e.g., 10.00)
    const repairCostRegex = /^\d+(\.\d{1,2})?$/;
    if (!repairCostRegex.test(inputs.repairCost)) {
      alert("Repair cost must be a valid decimal number.");
      return;
    }

    updateRepairRequest().then(() => navigate('/Repair'));
  };

  const updateRepairRequest = async () => {
    await axios.put(`http://localhost:8080/api/repair/${id}`, {
      repairID: String(inputs.repairID),
      repairNumber: String(inputs.repairNumber),
      repairDate: new Date(inputs.repairDate).toISOString(),
      partReplace: String(inputs.partReplace),
      repairCost: Number(inputs.repairCost),
      repairStatus: String(inputs.repairStatus),
    }).then((res) => res.data);
  };

  return (
    <div>
      <SideBar />
      <div className="table-container1">
        <h2>Update Repair Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Repair ID</label>
          <br />
          <input
            type="text"
            name="repairID"
            onChange={handleChange}
            value={inputs.repairID}
            required
          />
          <br /><br />
          
          <label>Vehicle Number</label>
          <br />
          <input
            type="text"
            name="repairNumber"
            onChange={handleChange}
            value={inputs.repairNumber}
            required
          />
          <br /><br />
          
          <label>Repair Date</label>
          <br />
          <input
            type="date"
            name="repairDate"
            onChange={handleChange}
            value={inputs.repairDate}
            required
          />
          <br /><br />
          
          <label>Part Replaced</label>
          <br />
          <input
            type="text"
            name="partReplace"
            onChange={handleChange}
            value={inputs.partReplace}
            required
          />
          <br /><br />
          
          <label>Repair Cost</label>
          <br />
          <input
            type="number"
            name="repairCost"
            onChange={handleChange}
            value={inputs.repairCost}
            required
          />
          <br /><br />
          
          <label>Repair Status</label>
          <br />
          <select className='selectBar'
            name="repairStatus"
            onChange={handleChange}
            value={inputs.repairStatus}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
          <br /><br />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRepairs;
