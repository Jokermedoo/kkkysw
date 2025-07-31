import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Zap, Star, ArrowRight, X, Search, Filter, ShoppingCart } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Real Service Icons as SVG components with better designs
const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#00457C" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28A.641.641 0 0 1 5.57 1.8h6.194c1.744 0 3.303.333 4.499 1.278 1.154.912 1.742 2.283 1.599 3.73-.292 2.934-1.889 4.78-4.916 5.676-.292.087-.584.167-.876.24l-.876.226a14.13 14.13 0 0 1-.876.185l-.867.155-.858.128-.849.094-.84.067-.831.034-.823.008h-2.332l-.314 1.98h3.832c.498 0 .924.348 1.05.854l.626 2.507a.641.641 0 0 1-.633.74z"/>
    <path fill="#009CDE" d="M18.6 2.8c0 .867-.183 1.734-.555 2.6-.372.867-.903 1.678-1.593 2.434-.69.756-1.539 1.457-2.547 2.102-1.008.645-2.175 1.234-3.501 1.768a22.58 22.58 0 0 1-4.11 1.323 26.275 26.275 0 0 1-4.719.445H.8l.314-1.98h2.332c.275 0 .55-.017.823-.051.274-.034.546-.085.817-.153.27-.068.539-.153.806-.255.267-.102.532-.221.795-.357.263-.136.524-.289.783-.459.259-.17.516-.357.771-.561.255-.204.508-.425.759-.663.251-.238.5-.493.747-.765.247-.272.492-.561.735-.867.243-.306.484-.629.723-.969.239-.34.476-.697.711-1.071.235-.374.468-.765.699-1.173.231-.408.46-.833.687-1.275.227-.442.452-.901.675-1.377.223-.476.444-.969.663-1.479.219-.51.436-1.037.651-1.581.215-.544.428-1.105.639-1.683.211-.578.42-1.173.627-1.785.207-.612.412-1.241.615-1.887L18.6 2.8z"/>
  </svg>
);

const WiseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#9FE870" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const SkrillIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#862165" width="24" height="24" rx="4"/>
    <path fill="white" d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
    <circle fill="white" cx="12" cy="12" r="2"/>
  </svg>
);

const BitcoinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle fill="#F7931A" cx="12" cy="12" r="12"/>
    <path fill="white" d="M17.154 10.55c.17-1.15-.705-1.77-1.906-2.183l.39-1.564-0.952-.238-.38 1.523c-.25-.062-.507-.121-.762-.18l.383-1.536-0.952-.238-.39 1.564c-.207-.047-.41-.093-.607-.142l.001-.004-1.313-.328-.253.985s.705.162.69.172c.385.096.454.35.443.553l-.443 1.776c.027.007.062.017.1.033l-.101-.025-.621 2.487c-.047.116-.166.291-.433.225.009.013-.69-.172-.69-.172l-.472 1.056 1.24.309c.23.058.456.118.679.175l-.393 1.58.951.238.39-1.566c.26.07.511.135.758.196l-.389 1.557.952.238.393-1.577c1.62.306 2.839.183 3.354-1.28.416-1.18-.02-1.857-.873-2.299.621-.143 1.088-.551 1.213-1.393zM14.669 14.72c-.294 1.18-2.278.542-2.922.382l.521-2.087c.644.161 2.708.479 2.401 1.705zm.294-4.71c-.268.067-1.93.33-1.93.33l.473-1.895s1.662-.367 1.93-.33c.982.138.982 1.51-.473 1.895z"/>
  </svg>
);

const NetellerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#689F38" width="24" height="24" rx="4"/>
    <path fill="white" d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
  </svg>
);

const PayoneerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#FF6600" width="24" height="24" rx="4"/>
    <path fill="white" d="M12 7l-5 5h3v5h4v-5h3l-5-5z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#000" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    <path fill="#FF0050" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const VodafoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle fill="#E60000" cx="12" cy="12" r="12"/>
    <path fill="white" d="M16.5 8.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5S9.5 4 12 4s4.5 2 4.5 4.5z"/>
    <ellipse fill="white" cx="12" cy="17" rx="3" ry="1.5"/>
  </svg>
);

const BinanceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#F3BA2F" width="24" height="24" rx="4"/>
    <path fill="black" d="M12 6l2.5 2.5L12 11 9.5 8.5 12 6zm-5 5l2.5-2.5L12 11l2.5-2.5L17 11l-2.5 2.5L12 16l-2.5-2.5L7 11z"/>
  </svg>
);

const ExnessIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#FFD700" width="24" height="24" rx="4"/>
    <path fill="black" d="M12 8l4 4-4 4-4-4 4-4zm0 2l-2 2 2 2 2-2-2-2z"/>
  </svg>
);

const EnhancedMagicalServices: React.FC = () => {
  const { services } = useData();
  const { elementRef, isInView } = useInView(0.1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [animationStep, setAnimationStep] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');

  const activeServices = services.filter(service => service.active);

  // Enhanced service icon mapping
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal')) return PayPalIcon;
    if (serviceName.includes('Wise')) return WiseIcon;
    if (serviceName.includes('Skrill')) return SkrillIcon;
    if (serviceName.includes('Bitcoin') || serviceName.includes('BTC')) return BitcoinIcon;
    if (serviceName.includes('Neteller')) return NetellerIcon;
    if (serviceName.includes('Payoneer')) return PayoneerIcon;
    if (serviceName.includes('TikTok')) return TikTokIcon;
    if (serviceName.includes('فودافون')) return VodafoneIcon;
    if (serviceName.includes('Binance') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return BinanceIcon;
    if (serviceName.includes('Exness')) return ExnessIcon;
    return PayPalIcon;
  };

  // Service colors based on real brand colors
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal')) return 'from-blue-600 to-blue-800';
    if (serviceName.includes('Wise')) return 'from-green-500 to-green-700';
    if (serviceName.includes('Skrill')) return 'from-purple-600 to-purple-800';
    if (serviceName.includes('Bitcoin') || serviceName.includes('BTC')) return 'from-orange-500 to-yellow-600';
    if (serviceName.includes('Neteller')) return 'from-green-600 to-green-800';
    if (serviceName.includes('Payoneer')) return 'from-orange-600 to-red-600';
    if (serviceName.includes('TikTok')) return 'from-black to-pink-600';
    if (serviceName.includes('فودافون')) return 'from-red-600 to-red-800';
    if (serviceName.includes('Binance') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return 'from-yellow-500 to-orange-600';
    if (serviceName.includes('Exness')) return 'from-yellow-400 to-yellow-600';
    return 'from-gray-600 to-gray-800';
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'الكل', count: activeServices.length },
    { id: 'wallets', name: 'المحافظ', count: activeServices.filter(s => s.name.includes('PayPal') || s.name.includes('Wise') || s.name.includes('Skrill') || s.name.includes('Neteller') || s.name.includes('Payoneer')).length },
    { id: 'crypto', name: 'العملات الرقمية', count: activeServices.filter(s => s.name.includes('Bitcoin') || s.name.includes('Okx') || s.name.includes('Bybit') || s.name.includes('Binance') || s.name.includes('Exness')).length },
    { id: 'mobile', name: 'الهاتف', count: activeServices.filter(s => s.name.includes('فودافون') || s.name.includes('TikTok')).length }
  ];

  const filteredServices = activeServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'wallets') return matchesSearch && (service.name.includes('PayPal') || service.name.includes('Wise') || service.name.includes('Skrill') || service.name.includes('Neteller') || service.name.includes('Payoneer'));
    if (filterCategory === 'crypto') return matchesSearch && (service.name.includes('Bitcoin') || service.name.includes('Okx') || service.name.includes('Bybit') || service.name.includes('Binance') || service.name.includes('Exness'));
    if (filterCategory === 'mobile') return matchesSearch && (service.name.includes('فودافون') || service.name.includes('TikTok'));
    
    return matchesSearch;
  });

  const openModal = () => {
    setIsModalOpen(true);
    setAnimationStep(0);
    document.body.style.overflow = 'hidden';
    setTimeout(() => setAnimationStep(1), 100);
    setTimeout(() => setAnimationStep(2), 300);
  };

  const closeModal = () => {
    setAnimationStep(0);
    document.body.style.overflow = 'auto';
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
    ).join('\n• ');
    
    const totalPrice = selectedServices.reduce((sum, id) => {
      const service = services.find(s => s.id === id);
      const price = service?.price?.replace('$', '') || '0';
      return sum + parseFloat(price);
    }, 0);
    
    const message = `🛒 طلب جديد من موقع KYCtrust\n\n📋 الخدمات المطلوبة:\n• ${selectedServicesList}\n\n💰 إجمالي السعر: $${totalPrice}\n\nأرجو التواصل لإتمام الطلب، شكراً`;
    
    window.open(`https://wa.me/201062453344?text=${encodeURIComponent(message)}`, '_blank');
    closeModal();
    setSelectedServices([]);
  };

  return (
    <section 
      ref={elementRef}
      id="services" 
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900/20 relative overflow-hidden"
    >
      
      {/* Enhanced Magical Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Enhanced Floating Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float ${i % 2 === 0 ? 'animate-pulse' : 'animate-ping'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-4 space-x-reverse bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm px-8 py-4 rounded-full mb-8 shadow-lg border border-blue-200/30 dark:border-blue-700/30">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">خدمات مالية حصرية</span>
            <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            <span className="block transform hover:scale-105 transition-transform duration-500">استكشف</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x bg-300% transform hover:scale-110 transition-transform duration-500">
              عالمنا المالي
            </span>
            <span className="block transform hover:scale-105 transition-transform duration-500">الرقمي</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            تجربة تفاعلية استثنائية لاكتشاف وطلب جميع خدماتنا المالية المتميزة بضغطة زر واحدة
          </p>

          {/* Enhanced Magical Discover Button */}
          <div className="relative inline-block group">
            <Button
              variant="gradient"
              size="xl"
              icon={Sparkles}
              iconPosition="right"
              glow={true}
              onClick={openModal}
              className="group relative overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl text-xl px-12 py-5"
            >
              <span className="relative z-10 flex items-center space-x-3 space-x-reverse">
                <ShoppingCart className="w-6 h-6" />
                <span>افتح متجر الخدمات</span>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </Button>
            
            {/* Enhanced Magical Particles around button */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce opacity-60"
                style={{
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 80}px`,
                  top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 80}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s'
                }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Enhanced Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { number: `${activeServices.length}+`, label: 'خدمة متاحة', icon: Star, color: 'from-blue-500 to-blue-600' },
              { number: '1000+', label: 'عميل سعيد', icon: MessageCircle, color: 'from-green-500 to-green-600' },
              { number: '24/7', label: 'دعم مستمر', icon: Zap, color: 'from-purple-500 to-purple-600' },
              { number: '30s', label: 'استجابة فورية', icon: ArrowRight, color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  variant="glass" 
                  className="text-center p-6 group hover:scale-110 hover:-rotate-1 transition-all duration-500 border border-white/20 dark:border-gray-700/20"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
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

        {/* Enhanced Magical Services Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced Backdrop */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/20 to-purple-900/20 backdrop-blur-xl transition-all duration-500"
              style={{ opacity: animationStep >= 1 ? 1 : 0 }}
              onClick={closeModal}
            ></div>

            {/* Enhanced Modal */}
            <Card 
              variant="glass" 
              className={`relative w-full max-w-7xl max-h-[95vh] overflow-hidden transition-all duration-700 border border-white/20 dark:border-gray-700/20 ${
                animationStep >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-3'
              }`}
            >
              {/* Enhanced Header */}
              <div className="p-8 border-b border-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-700/20 dark:to-purple-700/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6 space-x-reverse">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <ShoppingCart className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                        متجر الخدمات المالية
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {selectedServices.length > 0 ? `${selectedServices.length} خدمة في السلة` : 'اختر خدماتك المفضلة'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={X}
                    onClick={closeModal}
                    className="!p-4 hover:rotate-90 transition-transform duration-300"
                  />
                </div>

                {/* Enhanced Search and Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن خدمتك المفضلة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Filter className="w-5 h-5 text-gray-400" />
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setFilterCategory(category.id)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                          filterCategory === category.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Services Grid */}
              <div className="p-8 overflow-y-auto max-h-[60vh] bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10">
                <div 
                  className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-700 ${
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
                        className={`p-5 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border ${
                          isSelected 
                            ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/25 scale-105 border-blue-300/50' 
                            : 'hover:shadow-xl border-white/20 dark:border-gray-700/20'
                        }`}
                        style={{ transitionDelay: `${index * 0.03}s` }}
                        onClick={() => toggleService(service.id)}
                      >
                        {/* Enhanced Service Icon */}
                        <div className={`w-14 h-14 bg-gradient-to-r ${colorGradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${isSelected ? 'animate-pulse scale-110' : 'group-hover:scale-110'} transition-all duration-300`}>
                          <ServiceIcon />
                        </div>

                        {/* Service Name */}
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm leading-tight">
                          {service.name}
                        </h4>

                        {/* Price and Selection */}
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-lg font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
                            {service.price}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Quick Order Button */}
                        <Button
                          variant={isSelected ? "gradient" : "secondary"}
                          size="sm"
                          className="w-full text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isSelected) {
                              const message = `مرحباً، أريد طلب خدمة ${service.name} بسعر ${service.price}`;
                              window.open(`https://wa.me/201062453344?text=${encodeURIComponent(message)}`, '_blank');
                            }
                          }}
                        >
                          {isSelected ? 'مضاف للسلة' : 'طلب سريع'}
                        </Button>

                        {/* Enhanced Selection Effect */}
                        {isSelected && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"
                                style={{
                                  left: `${15 + Math.random() * 70}%`,
                                  top: `${15 + Math.random() * 70}%`,
                                  animationDelay: `${i * 0.15}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد نتائج</h3>
                    <p className="text-gray-600 dark:text-gray-300">جرب البحث بكلمات أخرى أو غير الفلتر</p>
                  </div>
                )}
              </div>

              {/* Enhanced Footer */}
              <div className="p-8 border-t border-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-700/20 dark:to-purple-700/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-right">
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                      اختر خدماتك واطلبها جميعاً بنقرة واحدة
                    </p>
                    {selectedServices.length > 0 && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        إجمالي السعر: ${selectedServices.reduce((sum, id) => {
                          const service = services.find(s => s.id === id);
                          const price = service?.price?.replace('$', '') || '0';
                          return sum + parseFloat(price);
                        }, 0)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setSelectedServices([])}
                      disabled={selectedServices.length === 0}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      إفراغ السلة
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      icon={MessageCircle}
                      iconPosition="right"
                      glow={selectedServices.length > 0}
                      onClick={orderSelectedServices}
                      disabled={selectedServices.length === 0}
                      className="relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span className="flex items-center space-x-2 space-x-reverse">
                        <ShoppingCart className="w-5 h-5" />
                        <span>طلب عبر واتساب</span>
                        {selectedServices.length > 0 && (
                          <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                            {selectedServices.length}
                          </span>
                        )}
                      </span>
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

export default EnhancedMagicalServices;
