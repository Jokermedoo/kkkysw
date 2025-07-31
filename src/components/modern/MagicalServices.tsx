import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Zap, Star, ArrowRight, X, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Real Service Icons as SVG components
const PayPalIcon = () => (
  <svg viewBox="0 0 384 512" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.3 91.3H96.8c-10.9 0-18.6 10.5-21.3 19.6z"/>
  </svg>
);

const WiseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8 12l2.5 2.5L8 17l-2.5-2.5L8 12zm8 0l2.5 2.5L16 17l-2.5-2.5L16 12z"/>
  </svg>
);

const SkrillIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2L3 7v10l9 5 9-5V7l-9-5zM12 4.5L19 8v8l-7 3.9L5 16V8l7-3.5z"/>
    <circle fill="currentColor" cx="12" cy="12" r="3"/>
  </svg>
);

const BitcoinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14h-1v1.5h-1V16h-1v1.5h-1V16H8v-1h1.5V9H8V8h1.5V6.5h1V8h1V6.5h1V8h1.5v1H14v6h.5v1zm-3-6h2v2h-2v-2z"/>
  </svg>
);

const NetellerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-2 5v6h1.5V9.5L15 12v3h1.5V9h-1.5L11.5 11.5V9H10z"/>
  </svg>
);

const PayoneerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 4v8h2V8h-2zm-2 2v6h1.5v-6H9zm4 1v5h1.5v-5H13z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const VodafoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-3 4v8h2V8H9zm4 0v8h2V8h-2z"/>
  </svg>
);

const MagicalServices: React.FC = () => {
  const { services } = useData();
  const { elementRef, isInView } = useInView(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [animationStep, setAnimationStep] = useState(0);

  const activeServices = services.filter(service => service.active);

  // Service icon mapping
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal')) return PayPalIcon;
    if (serviceName.includes('Wise')) return WiseIcon;
    if (serviceName.includes('Skrill')) return SkrillIcon;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return BitcoinIcon;
    if (serviceName.includes('Neteller')) return NetellerIcon;
    if (serviceName.includes('Payoneer')) return PayoneerIcon;
    if (serviceName.includes('TikTok')) return TikTokIcon;
    if (serviceName.includes('فودافون')) return VodafoneIcon;
    return PayPalIcon; // Default
  };

  // Service colors
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal')) return 'from-blue-500 to-blue-700';
    if (serviceName.includes('Wise')) return 'from-green-500 to-green-700';
    if (serviceName.includes('Skrill')) return 'from-purple-500 to-purple-700';
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return 'from-yellow-500 to-orange-600';
    if (serviceName.includes('Neteller')) return 'from-green-600 to-green-800';
    if (serviceName.includes('Payoneer')) return 'from-orange-500 to-red-600';
    if (serviceName.includes('TikTok')) return 'from-pink-500 to-purple-600';
    if (serviceName.includes('فودافون')) return 'from-red-500 to-red-700';
    return 'from-gray-500 to-gray-700';
  };

  const filteredServices = activeServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => {
    setIsModalOpen(true);
    setAnimationStep(0);
    setTimeout(() => setAnimationStep(1), 100);
    setTimeout(() => setAnimationStep(2), 300);
  };

  const closeModal = () => {
    setAnimationStep(0);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const orderSelectedServices = () => {
    if (selectedServices.length === 0) return;
    
    const selectedServicesList = selectedServices.map(id => 
      services.find(s => s.id === id)?.name
    ).join(', ');
    
    const message = `مرحباً، أريد طلب الخدمات التالية: ${selectedServicesList}`;
    window.open(`https://wa.me/201062453344?text=${encodeURIComponent(message)}`, '_blank');
    closeModal();
  };

  return (
    <section 
      ref={elementRef}
      id="services" 
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-cyan-900/20 relative overflow-hidden"
    >
      
      {/* Magical Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 px-8 py-4 rounded-full mb-8 shadow-lg">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">خدمات سحرية</span>
            <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            <span className="block">اكتشف</span>
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
              عالم الخدمات
            </span>
            <span className="block">المالية</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            رحلة تفاعلية لاستكشاف جميع خدماتنا المالية المتاحة
          </p>

          {/* Magical Discover Button */}
          <div className="relative inline-block">
            <Button
              variant="gradient"
              size="xl"
              icon={Sparkles}
              iconPosition="right"
              glow={true}
              onClick={openModal}
              className="group relative overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl"
            >
              <span className="relative z-10">اكتشف الخدمات السحرية</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </Button>
            
            {/* Magical Particles around button */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-bounce"
                style={{
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 60}px`,
                  top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 60}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { number: `${activeServices.length}+`, label: 'خدمة متاحة', icon: Star },
              { number: '24/7', label: 'دعم مستمر', icon: MessageCircle },
              { number: '30 ثانية', label: 'وقت الاستجابة', icon: Zap }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  variant="glass" 
                  className="text-center p-6 group hover:scale-110 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
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

        {/* Magical Services Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
              style={{ opacity: animationStep >= 1 ? 1 : 0 }}
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <Card 
              variant="glass" 
              className={`relative w-full max-w-6xl max-h-[90vh] overflow-hidden transition-all duration-500 ${
                animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                        اختر خدماتك المفضلة
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedServices.length} خدمة محددة
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={X}
                    onClick={closeModal}
                    className="!p-3"
                  />
                </div>

                {/* Search Bar */}
                <div className="relative mt-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن الخدمة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg"
                  />
                </div>
              </div>

              {/* Services Grid */}
              <div className="p-6 overflow-y-auto max-h-96">
                <div 
                  className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 ${
                    animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  {filteredServices.map((service, index) => {
                    const ServiceIcon = getServiceIcon(service.name);
                    const colorGradient = getServiceColor(service.name);
                    const isSelected = selectedServices.includes(service.id);
                    
                    return (
                      <Card
                        key={service.id}
                        variant="glass"
                        className={`p-4 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                          isSelected 
                            ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/25 scale-105' 
                            : 'hover:shadow-xl'
                        }`}
                        style={{ transitionDelay: `${index * 0.05}s` }}
                        onClick={() => toggleService(service.id)}
                      >
                        {/* Service Icon */}
                        <div className={`w-12 h-12 bg-gradient-to-r ${colorGradient} rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'animate-pulse' : ''}`}>
                          <ServiceIcon />
                        </div>

                        {/* Service Name */}
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                          {service.name}
                        </h4>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                            {service.price}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Magical Selection Effect */}
                        {isSelected && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-ping"
                                style={{
                                  left: `${20 + Math.random() * 60}%`,
                                  top: `${20 + Math.random() * 60}%`,
                                  animationDelay: `${i * 0.2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    اختر الخدمات التي تحتاجها ثم اطلبها بنقرة واحدة
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setSelectedServices([])}
                      disabled={selectedServices.length === 0}
                    >
                      مسح الكل
                    </Button>
                    <Button
                      variant="gradient"
                      size="md"
                      icon={MessageCircle}
                      iconPosition="right"
                      glow={selectedServices.length > 0}
                      onClick={orderSelectedServices}
                      disabled={selectedServices.length === 0}
                      className="relative overflow-hidden"
                    >
                      اطلب عبر واتساب ({selectedServices.length})
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </section>
  );
};

export default MagicalServices;
