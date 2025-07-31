import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Grid3X3, List, ChevronRight,
  Zap, Clock, Shield, Star, MessageCircle, TrendingUp,
  CreditCard, Bitcoin, Smartphone, DollarSign, Package,
  Eye, ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ServicesModal from './ServicesModal';

const ModernServices: React.FC = () => {
  const { t, language } = useTheme();
  const { services } = useData();
  const { elementRef, isInView } = useInView(0.1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تصنيف الخدمات المحسن
  const categories = [
    { 
      id: 'all', 
      name: 'جميع الخدمات', 
      icon: Grid3X3, 
      color: 'from-blue-500 to-blue-600',
      count: services.length 
    },
    { 
      id: 'popular', 
      name: 'الأكثر طلباً', 
      icon: TrendingUp, 
      color: 'from-green-500 to-green-600',
      count: 6 
    },
    { 
      id: 'wallets', 
      name: 'المحافظ الرقمية', 
      icon: CreditCard, 
      color: 'from-purple-500 to-purple-600',
      count: 5 
    },
    { 
      id: 'crypto', 
      name: 'العملات الرقمية', 
      icon: Bitcoin, 
      color: 'from-yellow-500 to-orange-500',
      count: 8 
    },
    { 
      id: 'mobile', 
      name: 'خدمات المحمول', 
      icon: Smartphone, 
      color: 'from-pink-500 to-rose-500',
      count: 2 
    }
  ];

  // تصنيف الخدمات
  const getFilteredServices = () => {
    let filtered = services.filter(service => service.active);
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      const popularServices = ['Payoneer', 'Wise', 'PayPal', 'Skrill', 'Neteller', 'شحن رصيد فودافون'];
      const walletServices = ['Payoneer', 'Wise', 'Skrill', 'Neteller', 'PayPal'];
      const cryptoServices = ['Okx', 'Bybit', 'Bitget', 'Kucoin', 'Mexc', 'Exness', 'Redotpay', 'Kast'];
      const mobileServices = ['شحن رصيد فودافون', 'سحب من TikTok'];

      switch (selectedCategory) {
        case 'popular':
          filtered = filtered.filter(service => 
            popularServices.some(pop => service.name.includes(pop))
          );
          break;
        case 'wallets':
          filtered = filtered.filter(service => 
            walletServices.some(wallet => service.name.includes(wallet))
          );
          break;
        case 'crypto':
          filtered = filtered.filter(service => 
            cryptoServices.some(crypto => service.name.includes(crypto))
          );
          break;
        case 'mobile':
          filtered = filtered.filter(service => 
            mobileServices.some(mobile => service.name.includes(mobile))
          );
          break;
      }
    }

    return filtered.slice(0, visibleCount);
  };

  const filteredServices = getFilteredServices();

  // تحديد الأيقونة حسب نوع الخدمة
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return CreditCard;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return Bitcoin;
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return Smartphone;
    return DollarSign;
  };

  // تحديد اللون حسب نوع الخدمة
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return 'from-blue-500 to-blue-600';
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return 'from-yellow-500 to-orange-500';
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  return (
    <section 
      ref={elementRef}
      id="services" 
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
    >
      
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان القسم */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">خدمات مميزة</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              خدماتنا المالية
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            احصل على حساباتك المالية الرقمية من منصة واحدة موثوقة مع أفضل الأسعار وأسرع خدمة
          </p>

          {/* زر عرض جميع الخدمات */}
          <Button
            variant="gradient"
            size="lg"
            icon={Package}
            iconPosition="right"
            glow={true}
            onClick={() => setIsModalOpen(true)}
            className="group mb-8"
          >
            عرض جميع الخدمات ({services.filter(s => s.active).length})
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* شريط التحكم المتطور */}
        <Card 
          variant="glass" 
          className={`p-6 mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* البحث المتطور */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابح�� عن خدمة مالية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
              />
            </div>

            {/* التصنيفات */}
            <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className="text-xs opacity-75">({category.count})</span>
                  </button>
                );
              })}
            </div>

            {/* تبديل العرض */}
            <div className="flex items-center bg-white/50 dark:bg-gray-800/50 rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* عرض الخدمات */}
        {viewMode === 'grid' ? (
          /* عرض الشبكة ال��تطور */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredServices.map((service, index) => {
              const ServiceIcon = getServiceIcon(service.name);
              const colorGradient = getServiceColor(service.name);
              
              return (
                <Card
                  key={service.id}
                  variant="glass"
                  glow={index < 3}
                  className={`group p-6 transition-all duration-700 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${0.1 * index}s` }}
                >
                  {/* أيقونة الخدمة */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${colorGradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <ServiceIcon className="w-8 h-8 text-white" />
                  </div>

                  {/* محتوى الكارت */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {service.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                          {service.price}
                        </span>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* الميزات */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>تسليم خلال 30 دقيقة</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>ضمان مدى الحياة</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>تفعيل فوري</span>
                      </div>
                    </div>

                    {/* زر الطلب */}
                    <Button
                      variant="gradient"
                      size="md"
                      icon={MessageCircle}
                      className="w-full group-hover:scale-105 transition-transform duration-300"
                      onClick={() => window.open(`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name} بسعر ${service.price}`, '_blank')}
                    >
                      اطلب الآن
                    </Button>
                  </div>

                  {/* تأثير التوهج */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${colorGradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg`}></div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* عرض القائمة المتطور */
          <Card variant="glass" className="mb-12">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredServices.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.name);
                const colorGradient = getServiceColor(service.name);
                
                return (
                  <div
                    key={service.id}
                    className={`p-6 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 group ${
                      isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-r ${colorGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <ServiceIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {service.name}
                          </h3>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-3 h-3" />
                              <span>30 دقيقة</span>
                            </span>
                            <span className="flex items-center space-x-1 space-x-reverse">
                              <Shield className="w-3 h-3" />
                              <span>ضمان</span>
                            </span>
                            <span className="flex items-center space-x-1 space-x-reverse">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <span className={`text-2xl font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                          {service.price}
                        </span>
                        <Button
                          variant="gradient"
                          size="md"
                          icon={ChevronRight}
                          iconPosition="right"
                          onClick={() => window.open(`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name}`, '_blank')}
                        >
                          اطلب
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* زر عرض المزيد */}
        {visibleCount < services.filter(s => s.active).length && (
          <div 
            className={`text-center transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <Button
              variant="secondary"
              size="lg"
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => setVisibleCount(prev => prev + 8)}
            >
              عرض المزيد من الخدمات ({services.filter(s => s.active).length - visibleCount})
            </Button>
          </div>
        )}

        {/* إحصائيات الخدمات */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          {[
            { number: `${services.filter(s => s.active).length}+`, label: 'خدمة مالية', icon: CreditCard },
            { number: '30', label: 'دقيقة تسليم', icon: Clock },
            { number: '100%', label: 'ضمان', icon: Shield },
            { number: '24/7', label: 'دعم فني', icon: MessageCircle }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} variant="glass" className="text-center p-6 group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
