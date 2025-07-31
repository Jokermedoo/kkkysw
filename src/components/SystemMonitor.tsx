import React, { useState, useEffect } from 'react';
import { 
  Activity, AlertCircle, CheckCircle, Clock, 
  Database, Globe, Shield, Zap, TrendingUp,
  FileText, Settings, RefreshCw, Download
} from 'lucide-react';
import { useSupabaseConnection } from '../hooks/useSupabase';
import { useDatabaseStatus } from '../hooks/useDatabaseStatus';
import { PerformanceMonitor, getMemoryUsage, getConnectionSpeed } from '../utils/performance';

interface SystemHealth {
  database: 'healthy' | 'warning' | 'error';
  performance: 'good' | 'fair' | 'poor';
  memory: 'normal' | 'high' | 'critical';
  network: 'fast' | 'slow' | 'offline';
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: any;
  networkSpeed: string;
  bundleSize: string;
  dbLatency: number | null;
}

const SystemMonitor: React.FC = () => {
  const { isConnected, latency } = useSupabaseConnection();
  const { status: dbStatus, refresh: refreshDatabase } = useDatabaseStatus();
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: 'healthy',
    performance: 'good',
    memory: 'normal',
    network: 'fast'
  });
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: null,
    networkSpeed: 'unknown',
    bundleSize: '~2.5MB',
    dbLatency: null
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // قياس وقت التحميل
    PerformanceMonitor.start('initial-load');
    
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    const renderTime = Date.now() - window.performance.timing.navigationStart;
    
    setMetrics(prev => ({
      ...prev,
      loadTime,
      renderTime,
      memoryUsage: getMemoryUsage(),
      networkSpeed: getConnectionSpeed(),
      dbLatency: latency
    }));

    PerformanceMonitor.end('initial-load');
  }, [latency]);

  useEffect(() => {
    // تحديث حالة النظام
    const newHealth: SystemHealth = {
      database: isConnected === null ? 'warning' : isConnected ? 'healthy' : 'error',
      performance: metrics.loadTime > 3000 ? 'poor' : metrics.loadTime > 1500 ? 'fair' : 'good',
      memory: metrics.memoryUsage?.usedJSHeapSize > 50000000 ? 'critical' : 
               metrics.memoryUsage?.usedJSHeapSize > 25000000 ? 'high' : 'normal',
      network: metrics.networkSpeed === 'slow-2g' ? 'slow' : 
               metrics.networkSpeed === 'offline' ? 'offline' : 'fast'
    };

    setSystemHealth(newHealth);
  }, [isConnected, metrics]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('ar-EG');
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    addLog('بدء مراقبة النظام');
    
    const interval = setInterval(() => {
      const memory = getMemoryUsage();
      const networkSpeed = getConnectionSpeed();
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory,
        networkSpeed,
        dbLatency: latency
      }));

      // فحص التحذيرات
      if (memory?.usedJSHeapSize > 50000000) {
        addLog('تحذير: استخدام عالي للذاكرة');
      }
      
      if (!isConnected) {
        addLog('خطأ: انقطاع الاتصال بقاعدة البيانات');
      }
      
      if (latency && latency > 1000) {
        addLog('تحذير: بطء في الاستجابة من قاعدة البيانات');
      }
    }, 5000);

    // إيقاف المراقبة بعد 5 دقائق
    setTimeout(() => {
      setIsMonitoring(false);
      clearInterval(interval);
      addLog('توقف مراقبة النظام');
    }, 300000);
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
      case 'normal':
      case 'fast':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'fair':
      case 'high':
      case 'slow':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
      case 'poor':
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      systemHealth,
      metrics,
      logs: logs.slice(0, 20)
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // إخفاء المراقب في الإنتاج
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-reverse space-x-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">مراقب النظام</span>
            </div>
            <div className="flex space-x-reverse space-x-1">
              <button
                onClick={startMonitoring}
                disabled={isMonitoring}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${isMonitoring ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportReport}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Download className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.database)}`}>
              <div className="flex items-center space-x-reverse space-x-1">
                <Database className="h-3 w-3" />
                <span className="text-xs font-medium">قاعدة البيانات</span>
              </div>
              <div className="text-xs mt-1">
                {isConnected ? `${latency}ms` : 'منقطع'}
              </div>
            </div>
            
            <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.performance)}`}>
              <div className="flex items-center space-x-reverse space-x-1">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-medium">الأداء</span>
              </div>
              <div className="text-xs mt-1">
                {metrics.loadTime}ms
              </div>
            </div>
            
            <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.memory)}`}>
              <div className="flex items-center space-x-reverse space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">الذاكرة</span>
              </div>
              <div className="text-xs mt-1">
                {metrics.memoryUsage ? 
                  `${(metrics.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB` : 
                  'غير متاح'
                }
              </div>
            </div>
            
            <div className={`p-2 rounded-lg ${getHealthColor(systemHealth.network)}`}>
              <div className="flex items-center space-x-reverse space-x-1">
                <Globe className="h-3 w-3" />
                <span className="text-xs font-medium">الشبكة</span>
              </div>
              <div className="text-xs mt-1">
                {metrics.networkSpeed}
              </div>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs font-medium text-gray-700 mb-1">ملخص الأد��ء</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>التحميل: {metrics.loadTime}ms</div>
              <div>العرض: {metrics.renderTime}ms</div>
              <div>الحزمة: {metrics.bundleSize}</div>
              <div>DB: {metrics.dbLatency || 'N/A'}ms</div>
            </div>
          </div>

          {/* Logs */}
          {logs.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-2 max-h-24 overflow-y-auto">
              <div className="text-xs font-medium text-green-400 mb-1">سجل النظام</div>
              {logs.slice(0, 5).map((log, index) => (
                <div key={index} className="text-xs text-gray-300 font-mono">
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-reverse space-x-1">
              {Object.values(systemHealth).every(status => 
                ['healthy', 'good', 'normal', 'fast'].includes(status)
              ) ? (
                <>
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-green-700">النظام يعمل بشكل طبيعي</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 text-yellow-600" />
                  <span className="text-yellow-700">توجد تحذيرات</span>
                </>
              )}
            </div>
            {isMonitoring && (
              <div className="flex items-center space-x-reverse space-x-1 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>مراقبة نشطة</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
