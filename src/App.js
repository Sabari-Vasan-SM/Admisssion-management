import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // Tracks the current view
  const [authenticated, setAuthenticated] = useState(false); // Tracks student login success
  const [adminAuthenticated, setAdminAuthenticated] = useState(false); // Tracks admin login success
  const [applications, setApplications] = useState([]); // Stores applications
  const [users, setUsers] = useState([]); // Stores registered users

  // Handles adding a new application
  const handleAddApplication = (application) => {
    const newApplication = { ...application, status: 'Pending' };
    setApplications([...applications, newApplication]);
  };

  // Handles updating student status (accept/reject)
  const handleUpdateStatus = (index, status) => {
    const updatedApplications = applications.map((application, i) =>
      i === index ? { ...application, status } : application
    );
    setApplications(updatedApplications);
  };

  // Handles student login
  const handleStudentLogin = (username, password) => {
    const userExists = users.find(user => user.username === username && user.password === password);
    if (userExists) {
      setAuthenticated(true);
      setView('studentForm');
    } else {
      alert('Invalid credentials. Please check your username and password.');
    }
  };

  // Handles admin login
  const handleAdminLogin = (username, password) => {
    const validUsername = "admin";
    const validPassword = "admin";

    if (username === validUsername && password === validPassword) {
      setAdminAuthenticated(true);
      setView('adminLogin');
    } else {
      alert('Invalid credentials. Please check your username and password.');
    }
  };

  // Handles user registration
  const handleRegister = (username, password) => {
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      alert('Username already exists. Please choose a different one.');
    } else {
      setUsers([...users, { username, password }]);
      alert('Account created successfully! Please log in.');
      setView('studentAuth');
    }
  };

  return (
    <div className="App">
      {view === 'home' && (
        <div className="home">
          <h1>College Admission Management System</h1>
          <div className="buttons">
            <button onClick={() => setView('adminAuth')}>Admin Login</button>
            <button onClick={() => setView('studentAuth')}>Student Login</button>
            <button onClick={() => setView('register')}>Create Account</button>
            <button onClick={() => setView('dashboard')}>Dashboard</button>
          </div>
        </div>
      )}

      {/* Admin Authentication */}
      {view === 'adminAuth' && (
        <div className="auth-container">
          <h2 className="heading">Admin Login</h2>
          <div className="form-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdminLogin(e.target.username.value.trim(), e.target.password.value.trim());
              }}
            >
              <input type="text" name="username" placeholder="Admin ID" required /><br />
              <input type="password" name="password" placeholder="Password" required /><br />
              <button className="sl" type="submit">Login</button>
            </form>
            <button className="sb" onClick={() => setView('home')}>Back</button>
          </div>
        </div>
      )}

      {/* Student Authentication */}
      {view === 'studentAuth' && (
        <div className="auth-container">
          <h2>Student Login</h2>
          <div className="form-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStudentLogin(e.target.username.value.trim(), e.target.password.value.trim());
              }}
            >
              <input type="text" name="username" placeholder="Username" required /><br />
              <input type="password" name="password" placeholder="Password" required /><br />
              <button className="sl" type="submit">Login</button>
            </form>
            <button className="sb" onClick={() => setView('home')}>Back</button>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {view === 'register' && (
        <div className="auth-container">
          <h2>Create Account</h2>
          <div className="form-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister(e.target.username.value.trim(), e.target.password.value.trim());
              }}
            >
              <input type="text" name="username" placeholder="Choose a Username" required /><br />
              <input type="password" name="password" placeholder="Choose a Password" required /><br />
              <button className="sl" type="submit">Register</button>
            </form>
            <button className="sb" onClick={() => setView('home')}>Back</button>
          </div>
        </div>
      )}

      {/* Admin View */}
      {view === 'adminLogin' && adminAuthenticated && (
        <AdminLogin applications={applications} onBack={() => setView('home')} onUpdateStatus={handleUpdateStatus} />
      )}

      {/* Student Application Form */}
      {view === 'studentForm' && authenticated && (
        <StudentLogin onApply={handleAddApplication} onBack={() => setView('home')} />
      )}

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <Dashboard applications={applications} onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
