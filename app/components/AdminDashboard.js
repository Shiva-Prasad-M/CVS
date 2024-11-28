import axios from "axios";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/certificates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.message);
    } catch (error) {
      setUploadStatus("Error uploading file");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default AdminDashboard;
