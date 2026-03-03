import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Tracking } from './pages/Tracking';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/tracking/:id" element={<Tracking />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
