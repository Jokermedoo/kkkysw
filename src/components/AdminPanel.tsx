import React, { useState } from 'react';
import LoginForm from './admin/LoginForm';
import EnhancedAdminPanel from './admin/EnhancedAdminPanel';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <EnhancedAdminPanel />;
};

export default AdminPanel;
