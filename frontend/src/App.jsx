import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Workouts from './pages/Workouts.jsx';
import ExerciseDetail from './pages/ExerciseDetail.jsx';
import Diet from './pages/Diet.jsx';
import BmiCalculator from './pages/BmiCalculator.jsx';
import Progress from './pages/Progress.jsx';
import Profile from './pages/Profile.jsx';
import FitTheForm from './pages/FitTheForm.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Landing Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Landing />} />
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Protected Dashboard/App Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/workouts/:id" element={<ExerciseDetail />} />
              <Route path="/fit-the-form" element={<FitTheForm />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/bmi" element={<BmiCalculator />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
