import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import './RepairVeh.css';
import axios from "axios";
import Repair from './RepairV';
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/api/repair";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function RepairVeh() {
  const [repairs, setRepairs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.repairs) {
        setRepairs(data.repairs);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
    documentTitle: "Repair Report",
    onAfterPrint: () => alert("Repair Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredRepairs = repairs.filter((repair) =>
      Object.values(repair).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRepairs(filteredRepairs);
    setNoResults(filteredRepairs.length === 0);
  };

  return (
    <div>
      <SideBar />
      <div className="Search">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Repair Details............"
        />
        <button className="no-print" onClick={handleSearch}>Search</button>
      </div>

      {noResults ? (
        <div>
          <p>No Repairs Found</p>
        </div>
      ) : (
        <div ref={ComponentRef} className="table-container1">
          <h2>Repair Management</h2>
          <br />
          {repairs.length > 0 ? (
            <table className="table-container2">
              <thead>
                <tr>
                  <th>Repair ID</th>
                  <th>Vehicle Number</th>
                  <th>Repair Date</th>
                  <th>Part Replaced</th>
                  <th>Repair Cost</th>
                  <th>Repair Status</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, i) => (
                  <Repair key={i} repairs={repair} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No repair data available</h3>
          )}
 <Link to="/addRepairs" className="model no-print">
              <button>Add</button>
            </Link>
          <button className="report no-print" onClick={handlePrint}>
            Generate Report
          </button>

          <div>
            <br />
           
          </div>
        </div>
      )}
    </div>
  );
}

export default RepairVeh;
