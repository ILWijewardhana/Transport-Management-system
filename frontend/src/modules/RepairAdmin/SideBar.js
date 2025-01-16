import React from "react";
import './SideBar.css';
import { Link } from "react-router-dom";

function SideBar() {
  return (

    <div className="sidebar">
       <Link to="/admin/*"className="model"> 
      <h2>Maintenance and Repair management</h2>
      </Link>
      <ul>
      <Link to="/Service"className="model">
        <li>Service Management</li>
        </Link>
        <Link to="/Repair"className="model">
        <li>Repair Management</li>
        </Link>
        <Link to="/Breakdown"className="model">
        <li>Breakdown Management</li>
        </Link>
        <Link to="/BreakdownNotification"className="model">
        <li>Notifications</li>
        </Link>
      </ul>
    </div>
  )
}

export default SideBar
