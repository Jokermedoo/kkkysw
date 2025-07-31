import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              direction: 'rtl',
              fontFamily: 'Arial, sans-serif'
            }
          }}
        />
      </DataProvider>
    </div>
  );
}

export default App;