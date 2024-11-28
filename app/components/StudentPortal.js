import axios from "axios";
import React, { useState } from "react";

const StudentPortal = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificateId}`
      );
      setCertificate(response.data);
      setError("");
    } catch (error) {
      setCertificate(null);
      setError("Certificate not found");
    }
  };

  return (
    <div>
      <h2>Student Portal</h2>
      <input
        type="text"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        placeholder="Enter Certificate ID"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {certificate && (
        <div>
          <h3>Certificate Details</h3>
          <p>Student Name: {certificate.studentName}</p>
          <p>Internship Domain: {certificate.internshipDomain}</p>
          <p>
            Start Date: {new Date(certificate.startDate).toLocaleDateString()}
          </p>
          <p>End Date: {new Date(certificate.endDate).toLocaleDateString()}</p>
          <button>Download Certificate</button>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
