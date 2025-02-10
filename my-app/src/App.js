import React, { useState } from 'react';
import './App.css';

function App() {
  // State hooks to manage form data
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [meterType, setMeterType] = useState('');
  const [metersInstalled, setMetersInstalled] = useState('')
  const [ModelType, setModelType] = useState('')
  const [installationDate, setInstallationDate] = useState('');
; // This should be declared;

  // Format number with commas
  const formatNumber = (number) => {
    // Regular expression to add commas to the number for readability
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle input changes for meters installed and apply formatting
  const handleInputChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    // Set the formatted number with commas
    setMetersInstalled(formatNumber(value));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      projectType,
      meterType,
      metersInstalled,
      ModelType,
      installationDate

    };

    // Send POST request to backend
    fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Optionally, show a success message to the user
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, show an error message to the user
        alert('Error submitting the form. Please try again.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Project Type Dropdown */}
          <div>
            <label htmlFor="projectType">Project Type:</label>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="">Select a project type</option>
              <option value="Apraava APDCL">Apraava APDCL</option>
              <option value="Intelli PKG-07">Intelli PKG-07</option>
              <option value="NCC Nashik">NCC Nashik</option>
              <option value="NCC Aurangabad">NCC Aurangabad</option>
              <option value="MCL Nagpur">MCL Nagpur</option>
              <option value="Techno J&K">Techno J&K</option>
              <option value="Apraava HP">Apraava HP</option>
              <option value="GVPR">GVPR</option>
              <option value="Apraava WBSEDCL">Apraava WBSEDCL</option>
              <option value="Purbanchal AIIB">Purbanchal AIIB</option>
              <option value="Anvil AMI 1&2">Anvil AMI 1&2</option>
              <option value="Anvil Sikkim">Anvil Sikkim</option>
              <option value="Intelli PKG 1&2">Intelli PKG 1&2</option>
            </select>
          </div>

          {/* Model Type*/}
          <div>
            <label htmlFor="ModelType">Model Type:</label>
            <select
              id="ModelType"
              value={ModelType}
              onChange={(e) => setMeterType(e.target.value)}
              required
            >
              <option value="">Select a model type</option>
              <option value="Intelli">Intelli</option>
              <option value="Kushal">Kushal</option>
            </select>
          </div>

          {/* Meter Type Dropdown */}
          <div>
            <label htmlFor="meterType">Meter Type:</label>
            <select
              id="meterType"
              value={meterType}
              onChange={(e) => setMeterType(e.target.value)}
              required
            >
              <option value="">Select a meter type</option>
              <option value="Single Phase">Single Phase</option>
              <option value="Feeder">Feeder</option>
              <option value="Three Phase">Intelli</option>
              <option value="HTCT">HTCT</option>
              <option value="LTCT">LTCT</option>
            </select>
          </div>
          {/* Meters Installation Date*/}
          <div>
            <label htmlFor="installationDate">Installation Date:</label>
            <input
              type="date"
              id="installationDate"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              required
            />
          </div>

          {/* Meters Installed Field */}
          <div>
            <label htmlFor="metersInstalled">Meters Installed:</label>
            <input
              type="text" // Using text type to allow comma formatting
              id="metersInstalled"
              value={metersInstalled} // Controlled input
              onChange={handleInputChange} // Handles formatting on change
              placeholder="Enter number of meters installed"
              required
            />
          </div>

          

          {/* Submit Button */}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
