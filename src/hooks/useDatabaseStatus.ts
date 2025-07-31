import { useState, useEffect, useCallback } from 'react';
import { testSupabaseConnectionAdvanced, setupSupabaseComplete } from '../utils/supabase-setup';

interface DatabaseStatus {
  isConnected: boolean;
  isReady: boolean;
  latency?: number;
  missingTables: string[];
  isSetupRunning: boolean;
  lastCheck?: Date;
  error?: string;
}

export const useDatabaseStatus = () => {
  const [status, setStatus] = useState<DatabaseStatus>({
    isConnected: false,
    isReady: false,
    missingTables: [],
    isSetupRunning: false
  });

  const checkDatabaseStatus = useCallback(async (autoSetup = false) => {
    try {
      console.log('🔍 Checking database status...');
      
      setStatus(prev => ({ ...prev, error: undefined }));
      
      const connectionResult = await testSupabaseConnectionAdvanced();
      
      const missingTables = connectionResult.tables
        .filter(table => !table.exists)
        .map(table => table.name);
      
      const newStatus: DatabaseStatus = {
        isConnected: connectionResult.connection,
        isReady: connectionResult.connection && missingTables.length === 0,
        latency: connectionResult.latency,
        missingTables,
        isSetupRunning: false,
        lastCheck: new Date()
      };
      
      setStatus(newStatus);
      
      // إعداد تلقائي إذا كان مطلوباً
      if (autoSetup && connectionResult.connection && missingTables.length > 0) {
        console.log(`🔧 Auto-setting up ${missingTables.length} missing tables...`);
        await runSetup();
      }
      
      return newStatus;
    } catch (error) {
      console.error('❌ Database status check failed:', error);
      const errorStatus: DatabaseStatus = {
        isConnected: false,
        isReady: false,
        missingTables: [],
        isSetupRunning: false,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      setStatus(errorStatus);
      return errorStatus;
    }
  }, []);

  const runSetup = useCallback(async () => {
    try {
      console.log('🔧 Running database setup...');
      
      setStatus(prev => ({ ...prev, isSetupRunning: true }));
      
      const setupResult = await setupSupabaseComplete();
      
      if (setupResult.success) {
        console.log('✅ Database setup completed successfully');
        // إعادة فحص الحالة بعد الإعداد
        await checkDatabaseStatus(false);
      } else {
        console.error('❌ Database setup failed:', setupResult.message);
        setStatus(prev => ({ 
          ...prev, 
          isSetupRunning: false,
          error: setupResult.message 
        }));
      }
    } catch (error) {
      console.error('❌ Database setup error:', error);
      setStatus(prev => ({ 
        ...prev, 
        isSetupRunning: false,
        error: error instanceof Error ? error.message : 'Setup failed'
      }));
    }
  }, [checkDatabaseStatus]);

  // فحص أولي عند تحميل الـ hook
  useEffect(() => {
    let mounted = true;
    
    const initialCheck = async () => {
      if (mounted) {
        // فحص مع إعداد تلقائي
        await checkDatabaseStatus(true);
      }
    };
    
    initialCheck();
    
    return () => {
      mounted = false;
    };
  }, [checkDatabaseStatus]);

  // فحص دوري كل 30 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      checkDatabaseStatus(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [checkDatabaseStatus]);

  return {
    status,
    checkDatabaseStatus,
    runSetup,
    refresh: () => checkDatabaseStatus(false)
  };
};

export default useDatabaseStatus;
