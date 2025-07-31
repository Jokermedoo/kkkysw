import React, { useState } from 'react';
import { Database, RefreshCw, CheckCircle, AlertTriangle, XCircle, Download, Upload, Trash2 } from 'lucide-react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { testSupabaseConnectionAdvanced, setupSupabaseComplete, checkAllTables, checkTable } from '../utils/supabase-setup';
import DatabaseTest from './DatabaseTest';

interface TableInfo {
  name: string;
  exists: boolean;
  count?: number;
  error?: string;
  lastChecked?: Date;
}

const DatabaseManagement: React.FC = () => {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    latency?: number;
    lastCheck?: Date;
  }>({ connected: false });
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const checkConnection = async () => {
    setLoading(true);
    addLog('🔍 Testing database connection...');
    
    try {
      const result = await testSupabaseConnectionAdvanced();
      setConnectionStatus({
        connected: result.connection,
        latency: result.latency,
        lastCheck: new Date()
      });
      
      if (result.connection) {
        addLog(`✅ Connection successful (${result.latency.toFixed(2)}ms)`);
        setTables(result.tables.map(t => ({
          ...t,
          lastChecked: new Date()
        })));
      } else {
        addLog('❌ Connection failed');
      }
    } catch (error) {
      addLog(`❌ Connection error: ${handleSupabaseError(error)}`);
    }
    
    setLoading(false);
  };

  const setupDatabase = async () => {
    setLoading(true);
    addLog('🔧 Starting database setup...');
    
    try {
      const result = await setupSupabaseComplete();
      
      if (result.success) {
        addLog('✅ Database setup completed successfully');
        result.details.forEach(detail => addLog(detail));
        await checkConnection(); // إعادة فحص بعد الإعداد
      } else {
        addLog(`❌ Database setup failed: ${result.message}`);
      }
    } catch (error) {
      addLog(`❌ Setup error: ${handleSupabaseError(error)}`);
    }
    
    setLoading(false);
  };

  const checkSingleTable = async (tableName: string) => {
    addLog(`🔍 Checking table: ${tableName}`);
    
    try {
      const result = await checkTable(tableName);
      
      setTables(prev => prev.map(table => 
        table.name === tableName 
          ? { ...result, lastChecked: new Date() }
          : table
      ));
      
      if (result.exists) {
        addLog(`✅ Table ${tableName}: ${result.count} records`);
      } else {
        addLog(`❌ Table ${tableName}: Not found`);
      }
    } catch (error) {
      addLog(`❌ Error checking ${tableName}: ${handleSupabaseError(error)}`);
    }
  };

  const createTable = async (tableName: string) => {
    addLog(`🔧 Creating table: ${tableName}`);
    
    try {
      // هنا يمكن إضافة منطق إنشاء جداول محددة
      const sqlScripts = {
        services: `
          CREATE TABLE IF NOT EXISTS public.services (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(100) NOT NULL,
            order_index INTEGER NOT NULL DEFAULT 0,
            active BOOLEAN DEFAULT true,
            description TEXT,
            category VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
          DROP POLICY IF EXISTS "Allow public access" ON public.services;
          CREATE POLICY "Allow public access" ON public.services FOR ALL USING (true);
        `,
        payment_methods: `
          CREATE TABLE IF NOT EXISTS public.payment_methods (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            details TEXT NOT NULL,
            active BOOLEAN DEFAULT true,
            type VARCHAR(50) DEFAULT 'bank',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
          DROP POLICY IF EXISTS "Allow public access" ON public.payment_methods;
          CREATE POLICY "Allow public access" ON public.payment_methods FOR ALL USING (true);
        `,
        orders: `
          CREATE TABLE IF NOT EXISTS public.orders (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            customer_name VARCHAR(255) NOT NULL,
            customer_email VARCHAR(255),
            customer_phone VARCHAR(50),
            service_name VARCHAR(255) NOT NULL,
            notes TEXT,
            status VARCHAR(50) DEFAULT 'pending',
            archived BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
          DROP POLICY IF EXISTS "Allow public access" ON public.orders;
          CREATE POLICY "Allow public access" ON public.orders FOR ALL USING (true);
        `,
        site_settings: `
          CREATE TABLE IF NOT EXISTS public.site_settings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title VARCHAR(500) NOT NULL DEFAULT 'KYCtrust - خدمات مالية رقمية موثوقة',
            description TEXT NOT NULL DEFAULT 'نقدم خدمات مالية رقمية احترافية وآمنة',
            order_notice TEXT DEFAULT 'سيتم التواصل معك يدوياً عبر و��تساب بعد إرسال الطلب',
            whatsapp_number VARCHAR(50) DEFAULT '201062453344',
            email_address VARCHAR(255) DEFAULT 'support@kyctrust.com',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
          DROP POLICY IF EXISTS "Allow public access" ON public.site_settings;
          CREATE POLICY "Allow public access" ON public.site_settings FOR ALL USING (true);
        `
      };

      const sql = sqlScripts[tableName as keyof typeof sqlScripts];
      if (!sql) {
        throw new Error(`No SQL script found for table: ${tableName}`);
      }

      const { error } = await supabase.rpc('exec_sql', { sql });
      
      if (error) {
        throw error;
      }

      addLog(`✅ Table ${tableName} created successfully`);
      await checkSingleTable(tableName);
    } catch (error) {
      addLog(`❌ Error creating ${tableName}: ${handleSupabaseError(error)}`);
    }
  };

  const exportLogs = () => {
    const logContent = logs.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kyctrust-database-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('📝 Logs cleared');
  };

  const getTableStatusIcon = (table: TableInfo) => {
    if (table.exists) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (table.error) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Database Management</h1>
                <p className="text-gray-600">KYCtrust Database Administration Panel</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={checkConnection}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Check Connection</span>
              </button>
              
              <button
                onClick={setupDatabase}
                disabled={loading}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>Setup Database</span>
              </button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Connection Status</h3>
                <p className={`text-sm ${connectionStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                  {connectionStatus.connected ? '✅ Connected' : '❌ Disconnected'}
                </p>
              </div>
              {connectionStatus.connected && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">Latency</div>
                  <div className="text-lg font-bold text-blue-600">
                    {connectionStatus.latency?.toFixed(2)}ms
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800">Tables Status</h3>
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                {tables.filter(t => t.exists).length} / {tables.length} tables ready
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(tables.filter(t => t.exists).length / Math.max(tables.length, 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800">Last Check</h3>
            <p className="text-sm text-gray-600 mt-2">
              {connectionStatus.lastCheck ? 
                connectionStatus.lastCheck.toLocaleString() : 
                'Never'
              }
            </p>
          </div>
        </div>

        {/* Tables Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Database Tables</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table) => (
                <div key={table.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getTableStatusIcon(table)}
                      <span className="font-medium">{table.name}</span>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => checkSingleTable(table.name)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Check table"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      
                      {!table.exists && (
                        <button
                          onClick={() => createTable(table.name)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Create table"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    {table.exists ? (
                      <span className="text-green-600">
                        ✅ {table.count} records
                      </span>
                    ) : (
                      <span className="text-red-600">
                        ❌ Not found
                      </span>
                    )}
                  </div>
                  
                  {table.lastChecked && (
                    <div className="mt-1 text-xs text-gray-500">
                      Last checked: {table.lastChecked.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Test Component */}
        <DatabaseTest />

        {/* Logs Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">System Logs</h2>
              <div className="flex space-x-2">
                <button
                  onClick={exportLogs}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={clearLogs}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-gray-500">No logs yet...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;
