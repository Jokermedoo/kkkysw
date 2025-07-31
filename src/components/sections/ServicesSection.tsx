import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Star, ChevronRight, Filter, Search, 
  CreditCard, Banknote, Smartphone, TrendingUp,
  DollarSign, Euro, Bitcoin, Zap, Clock, Shield
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

const ServicesSection: React.FC = () => {
  const { t, language } = useTheme();
  const { services } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // تصنيف الخدمات
  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: CreditCard },
    { id: 'wallets', name: 'محافظ رقمي��', icon: Smartphone },
    { id: 'exchanges', name: 'منصات تداول', icon: Bitcoin },
    { id: 'traditional', name: 'خدمات تقليدية', icon: Banknote },
    { id: 'special', name: 'خدمات خاصة', icon: Star },
  ];

  // تصنيف الخدمات حسب النوع
  const categorizeService = (serviceName: string) => {
    const wallets = ['Payoneer', 'Wise', 'Skrill', 'Neteller', 'PayPal'];
    const exchanges = ['Okx', 'Bybit', 'Bitget', 'Kucoin', 'Mexc', 'Exness'];
    const traditional = ['شحن رصيد فودافون'];
    const special = ['سحب من TikTok', 'سحب من PayPal', 'Kast', 'Redotpay', 'World First'];
    
    if (wallets.some(w => serviceName.includes(w))) return 'wallets';
    if (exchanges.some(e => serviceName.includes(e))) return 'exchanges';
    if (traditional.some(t => serviceName.includes(t))) return 'traditional';
    if (special.some(s => serviceName.includes(s))) return 'special';
    return 'wallets';
  };

  // تصفية الخدمات
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || categorizeService(service.name) === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return service.active && matchesCategory && matchesSearch;
  });

  // تحديد أيقونة الخدمة
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return <CreditCard className="w-6 h-6" />;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return <Bitcoin className="w-6 h-6" />;
    if (serviceName.includes('فودافون')) return <Smartphone className="w-6 h-6" />;
    if (serviceName.includes('TikTok')) return <TrendingUp className="w-6 h-6" />;
    return <DollarSign className="w-6 h-6" />;
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">خدمات مميزة</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* شريط التصفية والبحث */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* تصنيفات الخدمات */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* شريط البحث */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 w-64"
              />
            </div>
          </div>
        </div>

        {/* شبكة الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                hoveredCard === service.id ? 'scale-105 -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              
              {/* خلفية متدرجة */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* شارة الفئة */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 space-x-reverse bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                {getServiceIcon(service.name)}
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {categories.find(c => c.id === categorizeService(service.name))?.name}
                </span>
              </div>

              <div className="relative p-6">
                
                {/* اسم الخدمة */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.name}
                </h3>

                {/* السعر */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {service.price}
                    </span>
                    {service.price.includes('$') && (
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  
                  {/* تقييم افتراضي */}
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">5.0</span>
                  </div>
                </div>

                {/* ميزات سريعة */}
                <div className="space-y-2 mb-6">
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
                <a
                  href={`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name} بسعر ${service.price}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative w-full flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center space-x-2 space-x-reverse">
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('services.order_now')}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                </a>
              </div>

              {/* تأثير الانعكاس */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* رسالة عدم وجود نتائج */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              لا توجد خدمات تطابق البحث
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              جرب تغيير مصطلح البحث أو التصنيف
            </p>
          </div>
        )}

        {/* دعوة للعمل */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              هل تحتاج خدمة مخصصة؟
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              نحن نقدم حلول مخصصة لجميع احتياجاتك المالية الرقمية. تواصل معنا للحصول على استشارة مجانية.
            </p>
            <a
              href="https://wa.me/201062453344?text=مرحباً، أريد استشارة مجانية حول الخدمات المخصصة"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 space-x-reverse bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل معنا الآن</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
