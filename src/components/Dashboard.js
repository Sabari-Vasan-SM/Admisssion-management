import React,  { useEffect, useState } from 'react';
import axios from 'axios';
function Dashboard({onBack }) {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/applications')
          .then(response => {
            setApplications(response.data);
          })
          .catch(error => {
            console.error('Error fetching applications:', error);
          });
      }, []);
  return (
    <div>
      <h2>Applications Dashboard</h2>
      <button onClick={onBack} className="back-btn">Back</button>
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Aadhar</th>
              <th>EMIS</th>
              <th>Cutoff</th>
              <th>Total Marks</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Department</th>
              <th>Photo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.name}</td>
                <td>{application.aadhar}</td>
                <td>{application.emis}</td>
                <td>{application.cutoff}</td>
                <td>{application.totalMarks}</td>
                <td>{application.dob}</td>
                <td>{application.phone}</td>
                <td>{application.address}</td>
                <td>{application.department}</td>
                <td>
                  <img src={application.photo} alt="Student" className="photo-preview" />
                </td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications available</p>
      )}
    </div>
  );
}

export default Dashboard;







