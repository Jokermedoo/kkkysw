import React, { useState } from 'react';
import { 
  MessageCircle, Search, Filter, ChevronDown, 
  DollarSign, Zap, Clock, Star, Grid3X3, List
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

const CompactServicesSection: React.FC = () => {
  const { t, language } = useTheme();
  const { services } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMore, setShowMore] = useState(false);

  // تصنيف الخدم��ت
  const categories = [
    { id: 'all', name: 'الكل', count: services.length },
    { id: 'popular', name: 'الأكثر طلباً', count: 6 },
    { id: 'crypto', name: 'العملات الرقمية', count: 8 },
    { id: 'traditional', name: 'الخدمات التقليدية', count: 3 },
  ];

  // تحديد الخدمات الشائعة
  const popularServices = ['Payoneer', 'Wise', 'PayPal', 'Skrill', 'Neteller', 'شحن رصيد فودافون'];
  const cryptoServices = ['Okx', 'Bybit', 'Bitget', 'Kucoin', 'Mexc', 'Exness', 'Redotpay', 'Kast'];

  // تصفية الخدمات
  const getFilteredServices = () => {
    let filtered = services.filter(service => service.active);
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory === 'popular') {
      filtered = filtered.filter(service => 
        popularServices.some(pop => service.name.includes(pop))
      );
    } else if (selectedCategory === 'crypto') {
      filtered = filtered.filter(service => 
        cryptoServices.some(crypto => service.name.includes(crypto))
      );
    } else if (selectedCategory === 'traditional') {
      filtered = filtered.filter(service => 
        service.name.includes('فودافون') || service.name.includes('TikTok') || service.name.includes('سحب')
      );
    }

    // إظهار أول 8 خدمات فقط إذا لم يتم الضغط على "عرض المزيد"
    return showMore ? filtered : filtered.slice(0, 8);
  };

  const filteredServices = getFilteredServices();
  const totalServices = services.filter(s => s.active).length;

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان مضغوط */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              خدماتنا المالية
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            احصل على حساباتك المالية الرقمية بسرعة وأمان من منصة واحدة موثوقة
          </p>
        </div>

        {/* شريط التحكم المضغوط */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* البحث */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* التصنيفات */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* تبديل العرض */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* عرض الخدمات */}
        {viewMode === 'grid' ? (
          /* عرض الشبكة المضغوط */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* اسم الخدمة والسعر */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate flex-1">
                    {service.name}
                  </h3>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
                    {service.price}
                  </span>
                </div>

                {/* ميزات مضغوطة */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock className="w-3 h-3" />
                    <span>30 دقيقة</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Zap className="w-3 h-3" />
                    <span>فوري</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* زر الطلب المضغوط */}
                <a
                  href={`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name} بسعر ${service.price}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 group-hover:shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>اطلب الآن</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* عرض القائمة المضغوط */
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  index !== filteredServices.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className="flex items-center space-x-4 space-x-reverse flex-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{service.name}</h3>
                    <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                      <span>تسليم فوري</span>
                      <span>•</span>
                      <span>ضمان مدى الحياة</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {service.price}
                  </span>
                  <a
                    href={`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    اطلب
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* زر عرض المزيد */}
        {!showMore && filteredServices.length >= 8 && (
          <div className="text-center">
            <button
              onClick={() => setShowMore(true)}
              className="inline-flex items-center space-x-2 space-x-reverse bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>عرض جميع الخدمات ({totalServices})</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { number: `${totalServices}+`, label: 'خدمة مالية' },
            { number: '30', label: 'دقيقة تسليم' },
            { number: '100%', label: 'ضمان' },
            { number: '24/7', label: 'دعم فني' }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompactServicesSection;
