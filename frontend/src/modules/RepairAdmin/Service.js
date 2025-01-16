import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Service(props) {
  const {_id, serviceID, vehicleNumber, serviceDate, serviceType, serviceStatus } = props.maintenances;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/maintain/${_id}`);
      navigate("/");
      navigate("/Service");
    } catch (err) {
      console.error("Error deleting the service record", err);
    }
  };

  return (
    <tr>
      <td>{serviceID}</td>
      <td>{vehicleNumber}</td>
      <td>{new Date(serviceDate).toLocaleDateString()}</td>
      <td>{serviceType}</td>
      <td>{serviceStatus}</td>
      <td>
        <Link to={`/Service/${_id}`} className="no-print">
          <button>Update</button>
        </Link>
        <button className="delete no-print" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Service;
