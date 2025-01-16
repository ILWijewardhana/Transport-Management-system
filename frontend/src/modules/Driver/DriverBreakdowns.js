import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BreakdownD from './DriverBreakdown'; // The component that renders individual breakdowns
import './DriverBreakdowns.scoped.css';

import { Link } from "react-router-dom";
import NavBar from '../../common/Atoms/Navbar';
import Header from '../../common/Atoms/Header';
import Footer from '../../common/Atoms/Footer';

const URL = "http://localhost:8080/api/breakdown";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Breakdowns() {
  const [breakdowns, setBreakdowns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.breakdowns) {
        setBreakdowns(data.breakdowns);
      } else {
        console.error('API did not return expected data');
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredBreakdowns = breakdowns.filter((breakdown) =>
      Object.values(breakdown).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBreakdowns(filteredBreakdowns);
    setNoResults(filteredBreakdowns.length === 0);
  };

  return (
    <div className="page-container"> {/* Add page container for flexbox layout */}
      <div className="content-wrap"> {/* Content wrapper for the flex layout */}
        <Header />
        <NavBar />
        <br /><br />
        <div className="Search">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Breakdown Details..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {noResults ? (
          <div>
            <p>No Breakdowns Found</p>
          </div>
        ) : (
          <div className="table-container1">
            <h2>Breakdown Details......</h2>
            <br />
            {breakdowns.length > 0 ? (
              <table className="table-container2">
                <thead>
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Date</th>
                    <th>Part Replaced</th>
                    <th>Repair Cost</th>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdowns.map((breakdown, i) => (
                    <BreakdownD key={i} breakdown={breakdown} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No breakdown data available</h3>
            )}
            <br /><br />
            <Link to="/addBreakdown" className="model">
              <button>Add Breakdown</button>
            </Link>
            <br /><br />
          </div>
        )}
      </div>

      <Footer /> {/* The footer stays at the bottom of the page */}
    </div>
  );
}

export default Breakdowns;
