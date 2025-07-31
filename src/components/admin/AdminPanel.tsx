@@ .. @@
 import React, { useState } from 'react';
import { Shield, Settings, Package, CreditCard, Inbox, BarChart3, RefreshCw, Database } from 'lucide-react';
+import { Shield, Settings, Package, CreditCard, Inbox, BarChart3, RefreshCw } from 'lucide-react';
 import LoginForm from './LoginForm';
 import Dashboard from './Dashboard';
 import ServicesManager from './ServicesManager';
 import PaymentMethodsManager from './PaymentMethodsManager';
 import OrdersManager from './OrdersManager';
 import SiteSettingsManager from './SiteSettingsManager';
+import AnalyticsPanel from './AnalyticsPanel';
+import { useData } from '../../context/DataContext';

-type TabType = 'dashboard' | 'services' | 'payments' | 'orders' | 'settings';
+type TabType = 'dashboard' | 'services' | 'payments' | 'orders' | 'analytics' | 'settings';

 const AdminPanel: React.FC = () => {
 }
+  const { refreshData, loading } = useData();
   const [isAuthenticated, setIsAuthenticated] = useState(false);
@@ .. @@
   const tabs = [
     { id: 'dashboard' as TabType, name: 'لوحة التحكم', icon: Shield },
     { id: 'services' as TabType, name: 'إدارة الخدمات', icon: Package },
     { id: 'payments' as TabType, name: 'طرق الدفع', icon: CreditCard },
     { id: 'orders' as TabType, name: 'الطلبات', icon: Inbox },
   ]
+    { id: 'analytics' as TabType, name: 'التحليلات', icon: BarChart3 },
     { id: 'settings' as TabType, name: 'إعدادات الموقع', icon: Settings },
@@ .. @@
       case 'orders':
         return <OrdersManager />;
+      case 'analytics':
+        return <AnalyticsPanel />;
       case 'settings':
@@ .. @@
             <div className="flex items-center space-x-reverse space-x-3">
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                 <Shield className="h-6 w-6 text-white" />
               </div>
               <h1 className="text-xl font-bold text-gray-900">لوحة تحكم KYCtrust</h1>
             </div>
-            <button
-              onClick={handleLogout}
-              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
-            >
-              تسجيل الخروج
-            </button>
+            <div className="flex items-center space-x-reverse space-x-2">
+              <button
+                onClick={refreshData}
+                disabled={loading}
+                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
+                title="تحديث البيانات"
+              >
+                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
+              </button>
+              <button
+                onClick={handleLogout}
+                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
+              >
+                تسجيل الخروج
+              </button>
+            </div>
           </div>