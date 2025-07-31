import React, { useState, useMemo } from 'react';
import { Shield, CheckCircle, CreditCard, MessageCircle, Star, ArrowLeft, Clock, Users, Award, Zap, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrderModal from './OrderModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import SearchAndFilter from './SearchAndFilter';
import StatsCard from './StatsCard';
import ContactSection from './ContactSection';

const LandingPage: React.FC = () => {
  const { services, paymentMethods, siteSettings, orders, loading, error, refreshData } = useData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState(services);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeServices = services
    .filter(service => service.active)
    .sort((a, b) => a.order - b.order);

  const activePaymentMethods = paymentMethods.filter(method => method.active);

  const stats = useMemo(() => ({
    totalServices: services.length,
    activeServices: activeServices.length,
    totalOrders: orders.length,
    completedOrders: orders.filter(order => !order.archived).length,
    averageResponseTime: '15 دقيقة',
    customerSatisfaction: 98
  }), [services, activeServices, orders]);

  const handleOrderClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="جاري تحميل البيانات..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">KYCtrust</h1>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">خدمات موثوقة ومضمونة</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Award className="h-4 w-4 ml-2" />
              <span>موثوق من قبل آلاف العملاء</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {siteSettings.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {siteSettings.description}
            </p>
          </div>
          <div className="flex justify-center space-x-reverse space-x-6 mb-12">
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">آمن ومضمون</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">سرعة في التنفيذ</span>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="p-2 bg-purple-100 rounded-full">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">دعم 24/7</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم فني</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">معدل النجاح</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <StatsCard stats={stats} />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خدماتنا المالية الرقمية
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              نقدم مجموعة شاملة من الخدمات المالية الرقمية بأسعار تنافسية
            </p>
          </div>

          <SearchAndFilter
            services={activeServices}
            onFilteredServices={setFilteredServices}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
              >
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : 'mb-4'}`}>
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-reverse space-x-4' : ''}`}>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                        {service.price}
                      </div>
                    </div>

                    {viewMode === 'list' && (
                      <button
                        onClick={() => handleOrderClick(service.name)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-reverse space-x-2"
                      >
                        <span>اطلب الآن</span>
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {viewMode === 'grid' && (
                    <>
                      <div className="flex items-center space-x-reverse space-x-2 mb-4">
                        <div className="flex items-center space-x-reverse space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">متوفر الآن</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOrderClick(service.name)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 group"
                      >
                        <span>اطلب الآن</span>
                        <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد خدمات متطابقة</h3>
                <p className="text-gray-600">جرب تغيير معايير البحث أو الفلترة</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار KYCtrust؟
            </h2>
            <p className="text-lg text-gray-600">
              نقدم أفضل الخدمات المالية الرقمية بمعايير عالية من الجودة والأمان
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-xl inline-block mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">أمان عالي</h3>
                <p className="text-gray-600 text-sm">حماية كاملة لبياناتك ومعاملاتك المالية</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl inline-block mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">سرعة فائقة</h3>
                <p className="text-gray-600 text-sm">معالجة سريعة للطلبات خلال دقائق</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4 rounded-xl inline-block mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">دعم متميز</h3>
                <p className="text-gray-600 text-sm">فريق دعم محترف متاح على مدار الساعة</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl inline-block mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">جودة مضمونة</h3>
                <p className="text-gray-600 text-sm">ضمان الجودة وإرجاع الأموال في حالة عدم الرضا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              طرق الدفع المتاحة
            </h2>
            <p className="text-lg text-gray-600">
              نوفر طرق دفع متنوعة وآمنة لراحتك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePaymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105"
              >
                <div className="flex items-center space-x-reverse space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{method.name}</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <p className="text-lg font-mono text-gray-800 break-all text-center">
                    {method.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              آراء عملائنا
            </h2>
            <p className="text-lg text-gray-600">
              تجارب حقيقية من عملاء راضين عن خدماتنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "خدمة ممتازة وسريعة، تم إنجاز طلبي خلال دقائق معدودة. أنصح بشدة!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  أ
                </div>
                <div className="mr-3">
                  <p className="font-semibold text-gray-900">أحمد محمد</p>
                  <p className="text-sm text-gray-600">عميل منذ 2024</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "موثوقية عالية وأسعار منافسة. فريق الدعم متعاون جداً ومتاح دائماً."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  س
                </div>
                <div className="mr-3">
                  <p className="font-semibold text-gray-900">سارة أحمد</p>
                  <p className="text-sm text-gray-600">عميلة منذ 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "أفضل موقع للخدمات المالية الرقمية. جودة عالية وأمان مضمون."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                  م
                </div>
                <div className="mr-3">
                  <p className="font-semibold text-gray-900">محمد علي</p>
                  <p className="text-sm text-gray-600">عميل منذ 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-reverse space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">KYCtrust</h3>
          </div>
          <div className="flex justify-center space-x-reverse space-x-6 mb-4 text-sm text-gray-400">
            <span>الخصوصية</span>
            <span>الشروط والأحكام</span>
            <span>اتصل بنا</span>
            <span>الأسئلة الشائعة</span>
          </div>
          <p className="text-gray-400">
            © 2025 KYCtrust. جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceName={selectedService || ''}
      />
    </div>
  );
};

export default LandingPage;
