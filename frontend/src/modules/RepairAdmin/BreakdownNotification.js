import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from './BreakdownNotifi'; // Correct component name
// import SideBar from '../Admin/SideBar';
import { Link } from "react-router-dom";
import './Notification.css'
import SideBar from './SideBar';
// import DriverSideBar from '../Driver/DriverSideBar';

const URL = "http://localhost:8080/api/notification";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function BreakdownNotification() {
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [originalNotifications, setOriginalNotifications] = useState([]); // Keep original notifications for search
  
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.notifications) {
        setNotifications(data.notifications);
        setOriginalNotifications(data.notifications); // Save original notifications for search filtering
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

 
  
  return (
    <div>
           <SideBar />
     

      
        <div className="table-container1">
          <h2>Notification Details</h2>
          <br />
          {notifications.length > 0 ? (
            <table className="table-conts">
             
              <tbody>
                {notifications.map((notification, i) => (
                  <NotificationItem key={i} notification={notification} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No notification data available</h3>
          )}
          
        </div>
  
    </div>
  );
}

export default BreakdownNotification;
