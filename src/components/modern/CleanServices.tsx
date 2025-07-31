import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, MessageCircle, Zap,
  CreditCard, Bitcoin, Smartphone, DollarSign, Star
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CleanServices: React.FC = () => {
  const { services } = useData();
  const { elementRef, isInView } = useInView(0.1);
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 8;
  
  const activeServices = services.filter(service => service.active);
  const totalPages = Math.ceil(activeServices.length / servicesPerPage);
  
  const getCurrentServices = () => {
    const start = currentPage * servicesPerPage;
    const end = start + servicesPerPage;
    return activeServices.slice(start, end);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // تحديد الأيقونة حسب نوع الخدمة
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise') || serviceName.includes('Skrill')) return CreditCard;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit') || serviceName.includes('Bitget')) return Bitcoin;
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return Smartphone;
    return DollarSign;
  };

  // تحديد اللون حسب نوع الخدمة
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise') || serviceName.includes('Skrill')) return 'from-blue-500 to-blue-600';
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit') || serviceName.includes('Bitget')) return 'from-yellow-500 to-orange-500';
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  const currentServices = getCurrentServices();

  return (
    <section 
      ref={elementRef}
      id="services" 
      className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/20 relative overflow-hidden"
    >
      
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان القسم */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">خدمات متاحة</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              اختر خدمتك
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            جميع الخدمات المالية متاحة الآن - اختر ما تحتاجه واطلبه مباشرة
          </p>
        </div>

        {/* شريط التنقل */}
        <div
          className={`flex items-center justify-between mb-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              عرض {currentServices.length} من {activeServices.length} خدمة
            </span>
            <div className="flex items-center space-x-1 space-x-reverse">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPage ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronRight}
              onClick={prevPage}
              disabled={totalPages <= 1}
              className="!p-2"
            />
            <Button
              variant="secondary"
              size="sm"
              icon={ChevronLeft}
              onClick={nextPage}
              disabled={totalPages <= 1}
              className="!p-2"
            />
          </div>
        </div>

        {/* عرض الخدمات */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          {currentServices.map((service, index) => {
            const ServiceIcon = getServiceIcon(service.name);
            const colorGradient = getServiceColor(service.name);
            
            return (
              <Card
                key={service.id}
                variant="glass"
                className="group p-5 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ transitionDelay: `${0.1 * index}s` }}
              >
                {/* أيقونة الخدمة */}
                <div className={`w-12 h-12 bg-gradient-to-r ${colorGradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <ServiceIcon className="w-6 h-6 text-white" />
                </div>

                {/* اسم الخدمة */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.name}
                </h3>
                
                {/* السعر */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xl font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* زر الطلب */}
                <Button
                  variant="gradient"
                  size="sm"
                  icon={MessageCircle}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                  onClick={() => window.open(`https://wa.me/201062453344?text=أريد طلب ${service.name} بسعر ${service.price}`, '_blank')}
                >
                  اطلب الآن
                </Button>

                {/* تأثير التوهج */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${colorGradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg -z-10`}></div>
              </Card>
            );
          })}
        </div>

        {/* معلومات إضافية */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          <Card variant="glass" className="inline-block p-6">
            <div className="flex items-center justify-center space-x-8 space-x-reverse">
              <div className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {activeServices.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">خدمة متاحة</div>
              </div>
              
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">خدمة عملاء</div>
              </div>
              
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  30
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">دقيقة تسليم</div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default CleanServices;
