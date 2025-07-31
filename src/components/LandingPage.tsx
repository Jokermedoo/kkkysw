import React, { useState, useMemo } from 'react';
import { Shield, CheckCircle, Phone, Mail, MessageCircle, Star, Award, Clock, Users, Zap, Globe, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrderModal from './OrderModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import FloatingWhatsApp from './FloatingWhatsApp';
import MarketingElements from './MarketingElements';
import StatsCard from './StatsCard';
import TrustSection from './TrustSection';

const LandingPage: React.FC = () => {
  const { services, paymentMethods, siteSettings, orders, loading, error, refreshData } = useData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeServices = services.filter(service => service.active);
  const activePaymentMethods = paymentMethods.filter(method => method.active);

  // تصنيف الخدمات
  const serviceCategories = useMemo(() => {
    const categories = new Set(activeServices.map(service => 'digital_wallets'));
    return ['all', ...Array.from(categories)];
  }, [activeServices]);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return activeServices;
    return activeServices.filter(service => service.category === selectedCategory);
  }, [activeServices, selectedCategory]);

  // إحصائيات الموقع
  const stats = useMemo(() => ({
    totalServices: activeServices.length,
    totalOrders: orders.length,
    completedOrders: orders.filter(order => !order.archived).length,
    customerSatisfaction: 98.5
  }), [activeServices, orders]);

  const handleOrderClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="جاري تحميل البيانات..." showLogo />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Marketing Elements */}
      <MarketingElements />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{siteSettings.title}</h1>
                <p className="text-xs text-gray-500">خدمات مالية رقمية موثوقة</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>+10K عميل راضٍ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>تسليم خلال 30 دقيقة</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <a 
                  href="tel:+201062453344" 
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">اتصل الآن</span>
                </a>
                <a 
                  href="mailto:support@kyctrust.com" 
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            <span>الموقع الأول للخدمات المالية الرقمية في المنطقة</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {siteSettings.title}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {siteSettings.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Zap className="h-5 w-5" />
              <span>تصفح الخدمات</span>
            </button>
            <a
              href="https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>تواصل مباشر</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <StatsCard
              title="خدمة متاحة"
              value={stats.totalServices}
              icon={Globe}
              color="blue"
            />
            <StatsCard
              title="طلب مكتمل"
              value={`${stats.completedOrders}+`}
              icon={CheckCircle}
              color="green"
            />
            <StatsCard
              title="عميل راضٍ"
              value="10K+"
              icon={Users}
              color="purple"
            />
            <StatsCard
              title="نسبة الرضا"
              value={`${stats.customerSatisfaction}%`}
              icon={Star}
              color="yellow"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-blue-800">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium text-lg">{siteSettings.orderNotice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              خدماتنا المالية المتميزة
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم أفضل الخدمات المالية الرقمية بأسعار تنافسية وجودة عالية
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow-lg p-2 flex space-x-2">
              {['الكل', 'المحافظ الرقمية', 'منصات التداول', 'الفوركس'].map((category, index) => {
                const categoryKey = ['all', 'digital_wallets', 'crypto_exchanges', 'forex'][index];
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(categoryKey)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === categoryKey
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500">تقييم ممتاز</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-lg font-bold px-4 py-2 rounded-xl">
                      {service.price}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">ضمان مدى الحياة</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">تسليم خلال 30 دقيقة</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">حماية كاملة</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleOrderClick(service.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>اطلب الآن</span>
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Payment Methods */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              طرق الدفع الآمنة والمتنوعة
            </h3>
            <p className="text-xl text-gray-600">
              ندعم جميع طرق الدفع الشائعة لراحتك وأمانك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activePaymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {method.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">آمن ومضمون</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 font-mono text-lg">
                    {method.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">
            ابدأ رحلتك المالية الرقمية اليوم
          </h3>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف العملاء الراضين واحصل على خدماتك المالية بسرعة وأمان
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة مالية"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              <span>تواصل عبر واتساب</span>
            </a>
            <a
              href="tel:+201062453344"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>اتصل مباشرة</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">KYCtrust</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                منصة الخدمات المالية الرقمية الأولى في المنطقة. نقدم حلول مالية آمنة وسريعة لجميع احتياجاتك.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-gray-300">
                <li>محافظ رقمية</li>
                <li>منصات تداول</li>
                <li>خدمات الفوركس</li>
                <li>حلول الدفع</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400" />
                  <span>+20 106 245 3344</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>support@kyctrust.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-purple-400" />
                  <span>www.kyctrust.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2024 KYCtrust. جميع الحقوق محفوظة.</p>
            <p className="text-sm mt-2">خدمات مالية رقمية آمنة وموثوقة</p>
          </div>
        </div>
      </footer>

      {/* Components */}
      <FloatingWhatsApp />
      
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService || ''}
        paymentMethods={activePaymentMethods}
      />
    </div>
  );
};

export default LandingPage;
