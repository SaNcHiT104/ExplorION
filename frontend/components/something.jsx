/*import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // Account or Transaction

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleFileTypeChange = (e) => setFileType(e.target.value);

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file.');
    if (!fileType) return alert('Please select a file type.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);

    try {
      const response = await axios.post('http://localhost:3001/api/upload-excel', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading the file. Please check the console for more details.');
    }
  };

  return (
    <div className="App">
      <h1>Upload CSV File</h1>

      <div>
        <label>Select file type:</label>
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

export default App;
*/