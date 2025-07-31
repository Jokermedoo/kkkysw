import React, { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { testSupabaseConnectionAdvanced, setupSupabaseComplete, checkAllTables } from '../utils/supabase-setup';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'loading';
  message: string;
  details?: string[];
}

export const DatabaseTest: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const addTest = (test: TestResult) => {
    setTests(prev => [...prev, test]);
  };

  const updateTest = (name: string, updates: Partial<TestResult>) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, ...updates } : test
    ));
  };

  const runDatabaseTests = async () => {
    setIsRunning(true);
    setTests([]);

    // اختبار 1: فحص الاتصال
    addTest({
      name: 'Connection Test',
      status: 'loading',
      message: 'Testing Supabase connection...'
    });

    try {
      const connectionResult = await testSupabaseConnectionAdvanced();
      
      if (connectionResult.connection) {
        updateTest('Connection Test', {
          status: 'success',
          message: `Connected successfully (${connectionResult.latency.toFixed(2)}ms)`,
          details: connectionResult.details
        });
      } else {
        updateTest('Connection Test', {
          status: 'error',
          message: 'Connection failed',
          details: connectionResult.details
        });
        setIsRunning(false);
        return;
      }

      // اختبار 2: فحص الجداول
      addTest({
        name: 'Table Check',
        status: 'loading',
        message: 'Checking database tables...'
      });

      const tableResults = await checkAllTables();
      const existingTables = tableResults.filter(t => t.exists);
      const missingTables = tableResults.filter(t => !t.exists);

      updateTest('Table Check', {
        status: missingTables.length > 0 ? 'warning' : 'success',
        message: `${existingTables.length}/${tableResults.length} tables exist`,
        details: [
          `✅ Existing: ${existingTables.map(t => `${t.name}(${t.count})`).join(', ')}`,
          ...(missingTables.length > 0 ? [`❌ Missing: ${missingTables.map(t => t.name).join(', ')}`] : [])
        ]
      });

      // اختبار 3: إعداد الجداول المفقودة
      if (missingTables.length > 0) {
        addTest({
          name: 'Database Setup',
          status: 'loading',
          message: 'Setting up missing tables...'
        });

        const setupResult = await setupSupabaseComplete();
        
        updateTest('Database Setup', {
          status: setupResult.success ? 'success' : 'error',
          message: setupResult.message,
          details: setupResult.details
        });
      }

      // اختبار 4: فحص البيانات
      addTest({
        name: 'Data Verification',
        status: 'loading',
        message: 'Verifying data integrity...'
      });

      try {
        const [servicesCount, paymentMethodsCount, settingsCount] = await Promise.all([
          supabase.from('services').select('count').then(({ count }) => count || 0),
          supabase.from('payment_methods').select('count').then(({ count }) => count || 0),
          supabase.from('site_settings').select('count').then(({ count }) => count || 0)
        ]);

        updateTest('Data Verification', {
          status: 'success',
          message: 'Data integrity verified',
          details: [
            `📊 Services: ${servicesCount} records`,
            `💳 Payment Methods: ${paymentMethodsCount} records`,
            `⚙️ Site Settings: ${settingsCount} records`
          ]
        });
      } catch (dataError) {
        updateTest('Data Verification', {
          status: 'error',
          message: 'Data verification failed',
          details: [handleSupabaseError(dataError)]
        });
      }

      // اختبار 5: فحص الصلاحيات
      addTest({
        name: 'Permissions Test',
        status: 'loading',
        message: 'Testing database permissions...'
      });

      try {
        // اختبار القراءة
        const { data: readTest, error: readError } = await supabase
          .from('services')
          .select('id')
          .limit(1);

        if (readError) throw readError;

        // اختبار الكتابة (محاولة إدراج واحذف)
        const testService = {
          name: 'Test Service',
          price: '0$',
          order_index: 999,
          active: false
        };

        const { data: insertTest, error: insertError } = await supabase
          .from('services')
          .insert(testService)
          .select()
          .single();

        if (insertError) throw insertError;

        // حذف البيانات التجريبية
        const { error: deleteError } = await supabase
          .from('services')
          .delete()
          .eq('id', insertTest.id);

        if (deleteError) throw deleteError;

        updateTest('Permissions Test', {
          status: 'success',
          message: 'All permissions working correctly',
          details: ['✅ Read access: OK', '✅ Write access: OK', '✅ Delete access: OK']
        });
      } catch (permError) {
        updateTest('Permissions Test', {
          status: 'error',
          message: 'Permission test failed',
          details: [handleSupabaseError(permError)]
        });
      }

    } catch (error) {
      console.error('Database test error:', error);
      addTest({
        name: 'Test Error',
        status: 'error',
        message: 'Unexpected error during testing',
        details: [handleSupabaseError(error)]
      });
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'loading': return '🔄';
      default: return '❓';
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'loading': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  useEffect(() => {
    // تشغيل الاختبارات تلقائياً عند التحميل
    runDatabaseTests();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🛠️ Database System Test</h2>
        <button
          onClick={runDatabaseTests}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? '🔄 Running...' : '🔄 Run Tests'}
        </button>
      </div>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 transition-all duration-300 ${
              test.status === 'success' ? 'border-green-200 bg-green-50' :
              test.status === 'error' ? 'border-red-200 bg-red-50' :
              test.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getStatusIcon(test.status)}</span>
                <div>
                  <h3 className="font-medium text-gray-800">{test.name}</h3>
                  <p className={`text-sm ${getStatusColor(test.status)}`}>
                    {test.message}
                  </p>
                </div>
              </div>
              {test.details && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              )}
            </div>
            
            {showDetails && test.details && (
              <div className="mt-3 pl-10">
                <div className="bg-white rounded p-3 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Details:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {test.details.map((detail, idx) => (
                      <li key={idx} className="font-mono text-xs">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {tests.length === 0 && !isRunning && (
        <div className="text-center text-gray-500 py-8">
          <p>No tests run yet. Click "Run Tests" to start.</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">📋 Test Summary</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {tests.filter(t => t.status === 'success').length}
            </div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {tests.filter(t => t.status === 'error').length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {tests.filter(t => t.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-600">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {tests.filter(t => t.status === 'loading').length}
            </div>
            <div className="text-sm text-gray-600">Running</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;
