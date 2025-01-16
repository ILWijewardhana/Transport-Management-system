import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import './Services.css';
import axios from "axios";
import Service from './Service';
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/api/maintain";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Services() {
  const [maintenances, setMaintenances] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.maintenances) {
        setMaintenances(data.maintenances);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
    documentTitle: "Service Report",
    onAfterPrint: () => alert("Service Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    const filteredServices = maintenances.filter((service) =>
      Object.values(service).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setMaintenances(filteredServices);
    setNoResults(filteredServices.length === 0);
  };

  return (
    <div>
      <SideBar />
      <div className="Search">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Service Details............"
        />
        <button className="no-print" onClick={handleSearch}>Search</button>
      </div>

      {noResults ? (
        <div>
          <p>No Services Found</p>
        </div>
      ) : (
        <div ref={ComponentRef} className="table-container1">
          <h2>Service Management</h2>
          <br />
          {maintenances.length > 0 ? (
            <table className="table-container2">
              <thead>
                <tr>
                  <th>Service ID</th>
                  <th>Vehicle Number</th>
                  <th>Service Date</th>
                  <th>Service Type</th>
                  <th>Service Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenances.map((maintenance, i) => (
                  <Service key={i} maintenances={maintenance} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No service data available</h3>
          )}

          <div>
            <br />
            <Link to="/addServices" className="model no-print">
              <button>Add</button>
            </Link>
            <button className="report no-print" onClick={handlePrint}>
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
