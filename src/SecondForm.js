// SecondForm.js
import React, { useState } from 'react';
import './SecondForm.css'; // Import the CSS file

const SecondForm = ({ onSubmit, onToggleTable, onBack }) => { // Update props to include onBack function
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, bloodGroup });
    setAddress('');
    setBloodGroup('');
  };

  return (
    <div>
      <button className="back-button" onClick={onBack}>Back</button>
    <div className="form-container">
      {/* Add Back button */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={handleAddressChange} />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <input type="text" value={bloodGroup} onChange={handleBloodGroupChange} />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={onToggleTable}>View Employees</button> {/* Add View Employees button */}
    </div>
    </div>
  );
};

export default SecondForm;
