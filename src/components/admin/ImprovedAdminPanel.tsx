import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  Users, DollarSign, Package, TrendingUp, Eye, EyeOff, Plus, Edit,
  Trash2, Download, Upload, Search, Filter, Calendar, RefreshCw,
  Settings, Bell, Shield, Activity, Target, Award, Globe, LogOut,
  Menu, X, Home, MessageCircle, Clock, CheckCircle, AlertTriangle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

interface ImprovedAdminPanelProps {
  onLogout?: () => void;
}

const ImprovedAdminPanel: React.FC<ImprovedAdminPanelProps> = ({ onLogout }) => {
  const { 
    services, paymentMethods, orders, siteSettings, 
    updateService, addService, deleteService,
    updatePaymentMethod, addPaymentMethod, deletePaymentMethod,
    updateSiteSettings, refreshData
  } = useData();

  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'طلب جديد من أحمد محمد', time: '5 دقائق' },
    { id: 2, type: 'success', message: 'تم تسليم خدمة Payoneer بنجاح', time: '10 دقائق' },
    { id: 3, type: 'warning', message: 'انخفاض رصيد فودافون كاش', time: '30 دقيقة' }
  ]);

  // حساب الإحصائيات المحسنة
  const stats = {
    totalOrders: orders.length,
    activeServices: services.filter(s => s.active).length,
    totalRevenue: orders.length * 25,
    activePaymentMethods: paymentMethods.filter(p => p.active).length,
    todayOrders: orders.filter(order => {
      const today = new Date();
      const orderDate = new Date(order.timestamp);
      return orderDate.toDateString() === today.toDateString();
    }).length,
    thisWeekOrders: orders.filter(order => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(order.timestamp) > weekAgo;
    }).length,
    conversionRate: orders.length > 0 ? ((orders.length / (orders.length + 50)) * 100).toFixed(1) : '0.0',
    avgOrderValue: orders.length > 0 ? Math.round((orders.length * 25) / orders.length) : 0
  };

  // بيانات الرسوم البيانية المحسنة
  const chartData = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp).toLocaleDateString('ar-EG');
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.orders += 1;
      existing.revenue += 25;
    } else {
      acc.push({ date, orders: 1, revenue: 25 });
    }
    return acc;
  }, [] as any[]).slice(-7);

  const servicePopularity = services.map(service => ({
    name: service.name,
    orders: orders.filter(order => order.serviceName === service.name).length,
    revenue: orders.filter(order => order.serviceName === service.name).length * 25
  })).filter(item => item.orders > 0).sort((a, b) => b.orders - a.orders).slice(0, 5);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: BarChart, color: 'bg-blue-500' },
    { id: 'services', name: 'إدارة الخدمات', icon: Package, color: 'bg-green-500' },
    { id: 'orders', name: 'إدارة الطلبات', icon: Users, color: 'bg-purple-500' },
    { id: 'payments', name: 'طرق الدفع', icon: DollarSign, color: 'bg-yellow-500' },
    { id: 'settings', name: 'إعدادات الموقع', icon: Settings, color: 'bg-gray-500' },
    { id: 'analytics', name: 'التحليلات', icon: TrendingUp, color: 'bg-indigo-500' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, subtitle }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm mt-2 flex items-center ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${change.positive ? '' : 'rotate-180'}`} />
              {change.value}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 flex flex-col`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">KYCtrust</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة التحكم</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{tab.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {theme === 'dark' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              {sidebarOpen && <span>تبديل الوضع</span>}
            </button>
            
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 space-x-reverse px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                {sidebarOpen && <span>تسجيل الخروج</span>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                إدارة شاملة لمنصة KYCtrust
              </p>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* إشعارات */}
              <div className="relative">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </div>
                  )}
                </button>
              </div>

              {/* تحديث البيانات */}
              <button
                onClick={refreshData}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>تحديث</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-full">
          
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="إجمالي الطلبات"
                  value={stats.totalOrders}
                  icon={Users}
                  color="from-blue-500 to-blue-600"
                  change={{ positive: true, value: '+12% من الأسبوع الماضي' }}
                />
                
                <StatCard
                  title="إجمالي الإيرادات"
                  value={`${stats.totalRevenue}$`}
                  icon={DollarSign}
                  color="from-green-500 to-green-600"
                  change={{ positive: true, value: '+8% من الأسبوع الماضي' }}
                />
                
                <StatCard
                  title="الخدمات النشطة"
                  value={stats.activeServices}
                  icon={Package}
                  color="from-purple-500 to-purple-600"
                  subtitle={`من إجمالي ${services.length} خدمة`}
                />
                
                <StatCard
                  title="معدل التحويل"
                  value={`${stats.conversionRate}%`}
                  icon={TrendingUp}
                  color="from-indigo-500 to-indigo-600"
                  change={{ positive: true, value: '+2.1% من الشهر الماضي' }}
                />
              </div>

              {/* رسوم بيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* إحصائيات الطلبات */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    إحصائيات الطلبات (آخر 7 أيام)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '12px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#3B82F6" 
                        fill="url(#colorOrders)" 
                      />
                      <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* أكثر الخدمات طلباً */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    أكثر الخدمات طلباً
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={servicePopularity}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="orders"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {servicePopularity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* أحدث الطلبات */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    أحدث الطلبات
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          العميل
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          الخدمة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          التاريخ
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          الحالة
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {order.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.serviceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.timestamp).toLocaleDateString('ar-EG')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              مكتمل
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* المحتوى لباقي التبويبات سيتم إضافته لاحقاً */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-gray-100 dark:border-gray-700">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                قريباً - {tabs.find(tab => tab.id === activeTab)?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                هذا القسم قيد التطوير وسيكون متاحاً قريباً
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovedAdminPanel;
