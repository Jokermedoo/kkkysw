import React, { useState, useMemo } from 'react';
import { Shield, CheckCircle, CreditCard, MessageCircle, Star, ArrowLeft, Clock, Users, Award, Zap, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrderModal from './OrderModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import StatsCard from './StatsCard';
import TrustSection from './TrustSection';

const LandingPage: React.FC = () => {
  const { services, paymentMethods, siteSettings, orders, loading, error, refreshData } = useData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">KYCtrust</h1>
            </div>
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="hidden md:flex items-center space-x-reverse space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+20 106 245 3344</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 font-medium">خدمات موثوقة ومضمونة</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 animate-fade-in">
              <Award className="h-4 w-4 ml-2" />
              <span>موثوق من قبل آلاف العملاء</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              {siteSettings.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto animate-fade-in">
              {siteSettings.description}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-reverse space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">آمن ومضمون 100%</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">سرعة في التنفيذ</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700 font-medium">دعم 24/7</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>اختر خدمتك الآن</span>
                <ArrowLeft className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/201062453344"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>تواصل مباشر</span>
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600 text-sm md:text-base">عميل راضٍ</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm md:text-base">دعم فني</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600 text-sm md:text-base">معدل النجاح</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600 text-sm md:text-base">دقيقة متوسط الرد</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خدماتنا المالية الرقمية
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المالية الرقمية بأسعار تنافسية وجودة عالية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service, index) => (
              <div
                key={service.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-reverse space-x-2 mb-4">
                    <div className="flex items-center space-x-reverse space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">متوفر الآن</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleOrderClick(service.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 group-button"
                  >
                    <span>اطلب الآن</span>
                    <ArrowLeft className="h-4 w-4 group-button-hover:transform group-button-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Service Categories */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="bg-blue-600 p-3 rounded-xl inline-block mb-4">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">المحافظ الرقمية</h3>
              <p className="text-sm text-gray-600">PayPal, Skrill, Neteller وأكثر</p>
            </div>

            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="bg-green-600 p-3 rounded-xl inline-block mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">منصات التداول</h3>
              <p className="text-sm text-gray-600">OKX, Bybit, KuCoin وغيرها</p>
            </div>

            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="bg-purple-600 p-3 rounded-xl inline-block mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">الخدمات المحلية</h3>
              <p className="text-sm text-gray-600">فودافون كاش وخدمات أخرى</p>
            </div>

            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <div className="bg-orange-600 p-3 rounded-xl inline-block mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">خدمات مميزة</h3>
              <p className="text-sm text-gray-600">سحب الأرباح والخدمات الخاصة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار KYCtrust؟
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم أفضل الخدمات المالية الرقمية بمعايير عالية من الجودة والأمان والسرعة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4 border border-gray-100">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">أمان عالي</h3>
                <p className="text-gray-600 text-sm leading-relaxed">حماية كاملة لبياناتك ومعاملاتك المالية مع أعلى معايير الأمان</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4 border border-gray-100">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">سرعة فائقة</h3>
                <p className="text-gray-600 text-sm leading-relaxed">معالجة سريعة للطلبات خلال دقائق مع ضمان الجودة والدقة</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4 border border-gray-100">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">دعم متميز</h3>
                <p className="text-gray-600 text-sm leading-relaxed">فريق دعم محترف متاح على مدار الساعة لمساعدتك في أي وقت</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4 border border-gray-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">جودة مضمونة</h3>
                <p className="text-gray-600 text-sm leading-relaxed">ضمان الجودة وإرجاع الأموال في حالة عدم الرضا التام</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              طرق الدفع المتاحة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نوفر طرق دفع متنوعة وآمنة لراحتك وسهولة التعامل
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activePaymentMethods.map((method, index) => (
              <div
                key={method.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-reverse space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{method.name}</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <p className="text-lg font-mono text-gray-800 break-all text-center mb-4">
                    {method.details}
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-reverse space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>نسخ</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 inline-block">
              <div className="flex items-center justify-center space-x-reverse space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <span className="text-green-800 font-medium">جميع المعاملات محمية بأعلى معايير الأمان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Contact Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <MessageCircle className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              تواصل معنا الآن
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              فريق الدعم متاح لمساعدتك في أي وقت. تواصل معنا لأي استفسار أو طلب خدمة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Phone className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">الهاتف</h3>
                <p className="text-blue-100">+20 106 245 3344</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <MessageCircle className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">واتساب</h3>
                <p className="text-blue-100">متاح 24/7</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Mail className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">البريد الإلكتروني</h3>
                <p className="text-blue-100">support@kyctrust.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400 mb-8">
            <p className="text-lg text-blue-100 text-center leading-relaxed">
              {siteSettings.orderNotice}
            </p>
          </div>
          
          <div className="text-center">
            <a
              href="https://wa.me/201062453344"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 space-x-reverse space-x-3 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <MessageCircle className="h-6 w-6" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">KYCtrust</h3>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                منصة الخدمات المالية الرقمية الأكثر أماناً وموثوقية في المنطقة. نقدم خدمات احترافية بأعلى معايير الجودة والأمان.
              </p>
              <div className="flex space-x-reverse space-x-4">
                <a href="https://wa.me/201062453344" className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="mailto:support@kyctrust.com" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="tel:+201062453344" className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">المحافظ الرقمية</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">منصات التداول</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">الخدمات المحلية</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">سحب الأرباح</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 KYCtrust. جميع الحقوق محفوظة
              </p>
              <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-400">
                <span>تصميم وتطوير بحب ❤️</span>
              </div>
            </div>
          </div>
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
