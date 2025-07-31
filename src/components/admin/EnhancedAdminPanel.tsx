import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  Users, DollarSign, Package, TrendingUp, Eye, EyeOff, Plus, Edit,
  Trash2, Download, Upload, Search, Filter, Calendar, RefreshCw,
  Settings, Bell, Shield, Activity, Target, Award, Globe
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import CustomizationManager from './CustomizationManager';
import DatabaseManager from './DatabaseManager';

interface EnhancedAdminPanelProps {
  onLogout?: () => void;
}

const EnhancedAdminPanel: React.FC<EnhancedAdminPanelProps> = ({ onLogout }) => {
  const { 
    services, paymentMethods, orders, siteSettings, 
    updateService, addService, deleteService,
    updatePaymentMethod, addPaymentMethod, deletePaymentMethod,
    updateSiteSettings, refreshData
  } = useData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingPayment, setEditingPayment] = useState<any>(null);

  // حساب الإحصائيات
  const stats = {
    totalOrders: orders.length,
    activeServices: services.filter(s => s.active).length,
    totalRevenue: orders.length * 25, // متوسط السعر
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
    }).length
  };

  // بيانات الرسوم البيانية
  const chartData = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp).toLocaleDateString('ar-EG');
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.orders += 1;
    } else {
      acc.push({ date, orders: 1, revenue: 25 });
    }
    return acc;
  }, [] as any[]).slice(-7); // آخر 7 أيام

  const servicePopularity = services.map(service => ({
    name: service.name,
    orders: orders.filter(order => order.serviceName === service.name).length
  })).filter(item => item.orders > 0);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: BarChart },
    { id: 'services', name: 'إدارة الخدمات', icon: Package },
    { id: 'orders', name: 'إدارة الطلبات', icon: Users },
    { id: 'payments', name: 'طرق الدفع', icon: DollarSign },
    { id: 'settings', name: 'إعدادات الموقع', icon: Settings },
    { id: 'analytics', name: 'التحليلات', icon: TrendingUp },
    { id: 'customization', name: 'إدارة التخصيص', icon: Settings },
    { id: 'database', name: 'إدارة قاعدة البيانات', icon: Shield }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.value}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الطلبات"
          value={stats.totalOrders}
          icon={Users}
          color="from-blue-500 to-blue-600"
          change={{ positive: true, value: `+${stats.todayOrders} اليوم` }}
        />
        <StatCard
          title="الخدمات النشطة"
          value={stats.activeServices}
          icon={Package}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="الإيرادات المتوقعة"
          value={`$${stats.totalRevenue}`}
          icon={DollarSign}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="طرق الدفع"
          value={stats.activePaymentMethods}
          icon={Shield}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* ال��سوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">الطلبات خلال الأسبوع</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="orders" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">أشهر الخدمات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicePopularity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="orders"
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

      {/* الطلبات الحديثة */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">أحدث الطلبات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.archived 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.archived ? 'مكتمل' : 'جاري المعالجة'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">إدارة الطلبات</h3>
            <div className="flex space-x-reverse space-x-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="بحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع التواريخ</option>
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الملاحظات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders
                .filter(order =>
                  order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.serviceName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {order.notes || 'لا توجد ملاحظات'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.archived
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.archived ? 'مكتمل' : 'جاري المعالجة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-reverse space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        تم الإنجاز
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">إدارة طرق الدفع</h3>
          <button
            onClick={() => setShowNewPaymentForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-reverse space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة طريقة دفع</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{method.name}</h4>
                <button
                  onClick={() => updatePaymentMethod(method.id, { active: !method.active })}
                  className={`p-1 rounded-full ${
                    method.active
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-red-600 hover:bg-red-100'
                  } transition-colors`}
                >
                  {method.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-sm font-mono text-gray-800 break-all">{method.details}</p>
              </div>
              <div className="flex space-x-reverse space-x-2">
                <button
                  onClick={() => setEditingPayment(method)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  تعديل
                </button>
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">إعدادات الموقع</h3>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الموقع
            </label>
            <input
              type="text"
              value={siteSettings.title}
              onChange={(e) => updateSiteSettings({ ...siteSettings, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الموقع
            </label>
            <textarea
              value={siteSettings.description}
              onChange={(e) => updateSiteSettings({ ...siteSettings, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إشعار الطلبات
            </label>
            <textarea
              value={siteSettings.orderNotice}
              onChange={(e) => updateSiteSettings({ ...siteSettings, orderNotice: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">الإيرادات اليومية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع الطلبات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicePopularity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">تقرير شامل</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalOrders}</div>
            <div className="text-gray-600">إجمالي الطلبات</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">${stats.totalRevenue}</div>
            <div className="text-gray-600">إجمالي الإيرادات</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.thisWeekOrders}</div>
            <div className="text-gray-600">طلبات هذا الأسبوع</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.todayOrders}</div>
            <div className="text-gray-600">طلبات اليوم</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">إدارة الخدمات</h3>
          <button
            onClick={() => setShowNewServiceForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-reverse space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة خدمة جديدة</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم الخدمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الترتيب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => updateService(service.id, { active: !service.active })}
                      className={`flex items-center space-x-reverse space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                        service.active 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      } transition-colors`}
                    >
                      {service.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      <span>{service.active ? 'نشط' : 'معطل'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-reverse space-x-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        {/* الشريط الجانبي */}
        <aside className="w-64 bg-white shadow-lg border-l border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">لوحة التحكم</h2>
          </div>
          <nav className="mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 ml-3" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
              <button
                onClick={refreshData}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>تحديث البيانات</span>
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'customization' && <CustomizationManager />}
          {activeTab === 'database' && <DatabaseManager />}
        </main>
      </div>
    </div>
  );
};

export default EnhancedAdminPanel;
