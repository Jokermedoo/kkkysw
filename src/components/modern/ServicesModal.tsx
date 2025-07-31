import React, { useState, useEffect } from 'react';
import { 
  X, Search, Filter, MessageCircle, Clock, Shield, 
  Star, Zap, ChevronRight, CreditCard, Bitcoin, 
  Smartphone, DollarSign, CheckCircle, ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ServiceCard from './ServiceCard';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  const { services } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // إغلاق المودال بالضغط على Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // التصنيفات
  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: CreditCard, color: 'from-blue-500 to-blue-600' },
    { id: 'popular', name: 'الأكثر طلباً', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'wallets', name: 'المحافظ الرقمية', icon: CreditCard, color: 'from-green-500 to-green-600' },
    { id: 'crypto', name: 'العملات الرقمية', icon: Bitcoin, color: 'from-purple-500 to-purple-600' },
    { id: 'mobile', name: 'خدمات المحمول', icon: Smartphone, color: 'from-pink-500 to-rose-500' }
  ];

  // تصفية الخدمات
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

    return filtered;
  };

  const filteredServices = getFilteredServices();

  // تحديد الأيقونة حسب نوع الخدمة
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return CreditCard;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return Bitcoin;
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return Smartphone;
    return DollarSign;
  };

  // تحديد ��للون حسب نوع الخدمة
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return 'from-blue-500 to-blue-600';
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return 'from-yellow-500 to-orange-500';
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  // إضافة/إزالة خدمة من المختارة
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // إرسال الطلب
  const handleOrder = () => {
    if (selectedServices.length === 0) return;
    
    const selectedServiceNames = selectedServices.map(id => 
      services.find(s => s.id === id)?.name
    ).join(', ');
    
    const message = `مرحباً، أريد طلب الخدمات التالية: ${selectedServiceNames}`;
    window.open(`https://wa.me/201062453344?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card 
          variant="glass" 
          className="w-full max-w-6xl h-[90vh] bg-white/95 dark:bg-gray-900/95 border-white/20 dark:border-gray-700/20 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                جميع خدماتنا المالية
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                اختر الخدمات التي تحتاجها واطلبها دفعة واحدة
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* الفلاتر والبحث */}
          <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* البحث */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن خدمة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                      className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* محتوى الخدمات */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const ServiceIcon = getServiceIcon(service.name);
                const colorGradient = getServiceColor(service.name);
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      isSelected ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    <Card
                      variant="default"
                      className={`p-4 border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      {/* الأيقونة والحالة */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${colorGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <ServiceIcon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'
                        }`}>
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      {/* محتوى الخدمة */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {service.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                            {service.price}
                          </span>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* الميزات */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Clock className="w-3 h-3" />
                            <span>30 دقيقة</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Shield className="w-3 h-3" />
                            <span>ضمان</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Zap className="w-3 h-3" />
                            <span>فوري</span>
                          </div>
                        </div>
                      </div>

                      {/* تأثير الاختيار */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl pointer-events-none"></div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  لا توجد خدمات
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  جرب تغيير مصطلح البحث أو التصنيف
                </p>
              </div>
            )}
          </div>

          {/* Footer - أزرار العمل */}
          <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-900/50 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                تم اختيار {selectedServices.length} خدمة من أصل {services.filter(s => s.active).length}
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onClose}
                >
                  ��لغاء
                </Button>
                
                <Button
                  variant="gradient"
                  size="md"
                  icon={MessageCircle}
                  disabled={selectedServices.length === 0}
                  onClick={handleOrder}
                  glow={selectedServices.length > 0}
                >
                  اطلب المختارة ({selectedServices.length})
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServicesModal;
