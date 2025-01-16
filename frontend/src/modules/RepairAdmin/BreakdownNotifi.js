import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './Notification.css'

function NotificationItem({ notification }) { // Use notification as the prop
  const navigate = useNavigate(); // Call useNavigate at the top level

  if (!notification) {
    return null;
  }

  const { _id, vehicleNumber, date, partReplace, repairCost } = notification;

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/notification/${_id}`);
      
      if (response.status === 200) { // Check if the deletion was successful
        alert('Notification deleted successfully!');
        navigate("/BreakdownNotification"); // Navigate to BreakdownNotification after successful deletion
      } else {
        console.error("Failed to delete the notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <tr>
      <td className='table-data1'>
        Part {partReplace} was replaced for Vehicle {vehicleNumber}. Total cost: {repairCost}.
        Date of repair: {new Date(date).toLocaleDateString()}.
      </td>
      <td>
        <button className='delete' onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default NotificationItem;
