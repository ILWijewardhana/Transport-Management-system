import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Repair(props) {
  const { _id, repairID, repairNumber, repairDate, partReplace, repairCost, repairStatus } = props.repairs;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/repair/${_id}`);
      navigate("/");
      navigate("/Repair");
    } catch (err) {
      console.error("Error deleting the repair record", err);
    }
  };

  return (
    <tr>
      <td>{repairID}</td>
      <td>{repairNumber}</td>
      <td>{new Date(repairDate).toLocaleDateString()}</td>
      <td>{partReplace}</td>
      <td>{repairCost}</td>
      <td>{repairStatus}</td>
      <td>
        <Link to={`/Repair/${_id}`} className="no-print">
          <button>Update</button>
        </Link>
        <button className="delete no-print" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Repair;
