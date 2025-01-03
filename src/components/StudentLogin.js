import React, { useState } from 'react';
import axios from 'axios';

function StudentLogin({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    emis: '',
    cutoff: '',
    totalMarks: '',
    dob: '',
    phone: '',
    address: '',
    department: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      const file = files[0];
      if (file.size > 1000000) { // Limit file size to 1MB
        alert('Photo size should be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { name, aadhar, emis, cutoff, totalMarks, phone } = formData;

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert('Name must contain only alphabets');
      return false;
    }

    if (!/^\d+$/.test(aadhar) || !/^\d+$/.test(emis) || !/^\d+$/.test(phone) || !/^\d+$/.test(cutoff) || !/^\d+$/.test(totalMarks)) {
      alert('Aadhar, EMIS, Cutoff, Total Marks, and Phone must contain only numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/applications', formData);
      alert(response.data.message);

      setFormData({
        name: '',
        aadhar: '',
        emis: '',
        cutoff: '',
        totalMarks: '',
        dob: '',
        phone: '',
        address: '',
        department: '',
        photo: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting the application: ' + error.message);
    }
  };

  return (
    <div className="student-login">
      <button className="back-btn" onClick={onBack}>Back</button>
      <form onSubmit={handleSubmit} className="modern-application-form">
        <h2>Student Application Form</h2>

        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Aadhar Number:</label>
          <input 
            type="text" 
            name="aadhar" 
            value={formData.aadhar} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>EMIS Number:</label>
          <input 
            type="text" 
            name="emis" 
            value={formData.emis} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Cutoff Percentage:</label>
          <input 
            type="text" 
            name="cutoff" 
            value={formData.cutoff} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Total Marks:</label>
          <input 
            type="text" 
            name="totalMarks" 
            value={formData.totalMarks} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select your department</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="CSD">CSD</option>
            <option value="AIML">AIML</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input 
            type="file" 
            name="photo" 
            onChange={handleChange} 
            required 
          />
          {formData.photo && <img src={formData.photo} alt="preview" className="photo-preview" />}
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default StudentLogin;
