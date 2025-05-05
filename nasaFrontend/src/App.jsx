import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage/homePage';
import AuthPage from './pages/authPage/authPage';
import RegisterPage from './pages/registerPage/registerPage';

import { useSelector } from 'react-redux';
import ProtectedRoute from './components/organisms/protectedRoute/protectedRoutes';

function App() {
  const user = useSelector(state => state?.auth?.user);
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <AuthPage /> : <Navigate to="/nasa" replace />} 
        />
        <Route 
          path="/register" 
          element={!user ? <RegisterPage /> : <Navigate to="/nasa" replace />} 
        />
        <Route
          path="/nasa"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="*" 
          element={!user ? <Navigate to="/login" replace /> : <Navigate to="/nasa" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;