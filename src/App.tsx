import React from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <DataProvider>
        <LandingPage />
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
