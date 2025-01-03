import React, { useEffect, useState } from 'react';
import axios from 'axios';


function AdminLogin({ onBack, onUpdateStatus }) {
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

  const handleUpdateStatus = (id, status) => {
    axios.put(`http://localhost:5000/applications/${id}/status`, { status })
      .then(response => {
        setApplications(prevApps => prevApps.map(app => app._id === id ? { ...app, status } : app));
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div className="admin-view">
      <h2>Admin Panel</h2>
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
              <th>Department</th>
              <th>Photo</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td>{application.name}</td>
                <td>{application.aadhar}</td>
                <td>{application.emis}</td>
                <td>{application.cutoff}</td>
                <td>{application.totalMarks}</td>
                <td>{application.department}</td>
                <td>
                  <img src={application.photo} alt="Student" className="photo-preview" />
                </td>
                <td>{application.status}</td>
                <td>
                  {application.status === 'Pending' ? (
                    <>
                      <button onClick={() => handleUpdateStatus(application._id, 'Accepted')}>Accept</button>
                      <button onClick={() => handleUpdateStatus(application._id, 'Rejected')}>Reject</button>
                    </>
                  ) : (
                    <span>{application.status}</span>
                  )}
                </td>
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

export default AdminLogin;
