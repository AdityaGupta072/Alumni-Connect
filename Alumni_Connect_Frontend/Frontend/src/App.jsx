import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import Home from './components/home';  // 
import FacultyDashboard from './components/FacultyDashboard';
import AlumniDashboard from './components/AlumniDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        {/*Role based dashboard */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
