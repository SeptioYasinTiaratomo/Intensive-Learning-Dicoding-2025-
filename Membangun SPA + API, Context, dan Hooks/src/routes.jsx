import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNotePage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import ArchivePage from './pages/ArchivePage';


function AppRoutes() {
  const { authedUser } = React.useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={authedUser ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={authedUser ? <Navigate to="/" /> : <RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/" element={authedUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/add" element={authedUser ? <AddNotePage /> : <Navigate to="/login" />} />
      <Route path="/notes/:id" element={authedUser ? <DetailPage /> : <Navigate to="/login" />} />
      <Route path="/archives" element={<ArchivePage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
