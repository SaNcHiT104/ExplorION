/*import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");  // To store the file type (accounts or transactions)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    if (!fileType) {
      alert("Please select a file type (Account or Transaction).");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);  // Adding fileType to differentiate between account and transaction

    axios.post('http://localhost:3001/api/upload-excel', formData)
      .then(response => {
        alert("File uploaded and data inserted successfully.");
      })
      .catch(error => {
        console.error("There was an error uploading the file:", error);
        if (error.response && error.response.data.invalidRows) {
          alert(`Error: Some rows are invalid. Invalid rows:\n${JSON.stringify(error.response.data.invalidRows, null, 2)}`);
        } else {
          alert("Error uploading the file.");
        }
      });
  };

  return (
    <div className="App">
      <h1>Upload Excel File</h1>
      
      <div>
        <label>Select file type: </label>
        <select onChange={handleFileTypeChange}>
          <option value="">Select Type</option>
          <option value="account">Account Data</option>
          <option value="transaction">Transaction Data</option>
        </select>
      </div>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default App;*/
