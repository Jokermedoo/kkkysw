import React from 'react';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import { DataProvider } from './context/DataContext';

function App() {
  try {
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
                fontFamily: 'Cairo, Arial, sans-serif'
              }
            }}
          />
        </DataProvider>
      </div>
    );
  } catch (error) {
    console.error('App Error:', error);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">خطأ في التطبيق</h1>
          <p className="text-gray-600 mb-4">
            حدث خطأ في تحميل التطبيق. يرجى إعادة تحميل الصفحة.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة تحميل
          </button>
        </div>
      </div>
    );
  }
}

export default App;
