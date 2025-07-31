import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import NewLandingPage from './components/NewLandingPage';
import EnhancedAdminPanel from './components/admin/EnhancedAdminPanel';
import LoginForm from './components/admin/LoginForm';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // فحص حالة المصادقة من localStorage
  React.useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (success: boolean) => {
    setIsAdminAuthenticated(success);
    if (success) {
      localStorage.setItem('adminAuthenticated', 'true');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen">
          <Routes>
            {/* الصفحة الرئيسية */}
            <Route path="/" element={<NewLandingPage />} />
            
            {/* صفحة تسجيل دخول الادمن */}
            <Route 
              path="/admin/login" 
              element={
                isAdminAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <LoginForm onLogin={handleAdminLogin} />
                )
              } 
            />
            
            {/* لوحة تحكم الادمن */}
            <Route 
              path="/admin/*" 
              element={
                isAdminAuthenticated ? (
                  <EnhancedAdminPanel onLogout={handleAdminLogout} />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } 
            />
            
            {/* إعادة توجيه أي مسار غير معروف للصفحة الرئيسية */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
        </Router>

        {/* نظام التنبيهات */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
