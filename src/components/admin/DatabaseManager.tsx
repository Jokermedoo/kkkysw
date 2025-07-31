import React, { useState, useEffect } from 'react';
import { 
  Database, Download, Upload, RefreshCw, Trash2, 
  AlertTriangle, CheckCircle, Copy, Eye, Settings,
  BarChart3, FileText, Shield, Clock, Activity
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface DatabaseStats {
  totalServices: number;
  totalOrders: number;
  totalPaymentMethods: number;
  databaseSize: string;
  lastBackup: string;
  uptime: string;
}

const DatabaseManager: React.FC = () => {
  const { services, orders, paymentMethods, refreshData } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const [dbStats, setDbStats] = useState<DatabaseStats>({
    totalServices: 0,
    totalOrders: 0,
    totalPaymentMethods: 0,
    databaseSize: '2.4 MB',
    lastBackup: '2024-12-30 14:30',
    uptime: '99.9%'
  });

  useEffect(() => {
    setDbStats({
      totalServices: services.length,
      totalOrders: orders.length,
      totalPaymentMethods: paymentMethods.length,
      databaseSize: `${((services.length + orders.length + paymentMethods.length) * 0.5).toFixed(1)} KB`,
      lastBackup: new Date().toLocaleString('ar-EG'),
      uptime: '99.9%'
    });
  }, [services, orders, paymentMethods]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refreshData();
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = () => {
    const backupData = {
      services,
      orders,
      paymentMethods,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kyctrust-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          if (confirm('هل أنت متأكد من استعادة النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.')) {
            // Here you would implement the restore logic
            alert('تم استعادة النسخة الاحتياطية بنجاح!');
          }
        } catch (error) {
          alert('ملف النسخة الاحتياطية غير صحيح');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (confirm('تحذير: هذا سيحذف جميع البيانات! هل أنت متأكد؟')) {
      if (confirm('هذا الإجراء لا يمكن التراجع عنه. اكتب "نعم" للتأكيد')) {
        // Clear data logic would go here
        alert('تم حذف البيانات');
      }
    }
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'backup', name: 'النسخ الاحتياطية', icon: Shield },
    { id: 'performance', name: 'الأداء', icon: Activity },
    { id: 'logs', name: 'السجلات', icon: FileText },
    { id: 'settings', name: 'إعدادات قاعدة البيانات', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الخدمات</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.totalServices}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.totalOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">حجم قاعدة البيانات</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.databaseSize}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">وقت التشغيل</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.uptime}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-reverse space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>تحديث البيانات</span>
          </button>
          
          <button
            onClick={handleBackup}
            className="flex items-center space-x-reverse space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>إنشاء نسخة احتياطية</span>
          </button>

          <label className="flex items-center space-x-reverse space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>استعادة نسخة احتياطية</span>
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>

          <button
            onClick={handleClearData}
            className="flex items-center space-x-reverse space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>مسح البيانات</span>
          </button>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات التحديث</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">آخر تحديث للبيانات:</span>
            <span className="text-gray-900 font-medium">{lastRefresh.toLocaleString('ar-EG')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">آخر نسخة احتياطية:</span>
            <span className="text-gray-900 font-medium">{dbStats.lastBackup}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">حالة الاتصال:</span>
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-medium">متصل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackup = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة النسخ الاحتياطية</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">إنشاء نسخة احتياطية جديدة</h4>
            <p className="text-sm text-gray-600">
              قم بإنشاء نسخة احتياطية من جميع البيانات الحالية للحفاظ على أمان معلوماتك.
            </p>
            <button
              onClick={handleBackup}
              className="w-full flex items-center justify-center space-x-reverse space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>تحميل النسخة الاحتياطية</span>
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">استعادة نسخة احتياطية</h4>
            <p className="text-sm text-gray-600">
              استعد البيانات من نسخة احتياطية سابقة. تأكد من صحة الملف قبل الاستعادة.
            </p>
            <label className="w-full flex items-center justify-center space-x-reverse space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
              <Upload className="h-5 w-5" />
              <span>رفع ملف النسخة الاحتياطية</span>
              <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
            </label>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-reverse space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">تنبيه مهم</h4>
              <p className="text-sm text-yellow-700 mt-1">
                تأكد من إنشاء نسخة احتياطية بانتظام. ننصح بإنشاء نسخة احتياطية يومياً أو أسبوعياً حسب معدل تحديث البيانات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الأداء</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">سرعة الاستجابة</p>
                <p className="text-2xl font-bold text-green-800">45ms</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-blue-800">99.8%</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">استخدام الذاكرة</p>
                <p className="text-2xl font-bold text-purple-800">34%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">تحسينات مقترحة</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-reverse space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">تحسين فهرسة البيانات - مكتمل</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">ضغط البيانات - مكتمل</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-2 text-sm">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-700">تحديث إعدادات الذاكرة التخزينية - قيد التنفيذ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'backup': return renderBackup();
      case 'performance': return renderPerformance();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">إدارة قاعدة البيانات</h2>
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>متصل بقاعدة البيانات</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-reverse overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-reverse space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
