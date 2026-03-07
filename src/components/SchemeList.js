import React, { useState, useEffect } from "react";

const SchemeList = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/schemes")
      .then((res) => res.json())
      .then((data) => setSchemes(data))
      .catch((error) => console.error("Error fetching schemes:", error));
  }, []);

  return (
    <div>
      <h2>Active Schemes</h2>
      {schemes.map((scheme, index) => (
        <div key={index} className="scheme-card">
          <h3>{scheme.name}</h3>
          <p>Status: <strong>{scheme.status}</strong></p>
          <p>Beneficiaries: {scheme.beneficiaries}</p>
          <p>Budget: {scheme.budget}</p>
          <p>Pending Applications: {scheme.pendingApplications}</p>
        </div>
      ))}
    </div>
  );
};

export default SchemeList;
