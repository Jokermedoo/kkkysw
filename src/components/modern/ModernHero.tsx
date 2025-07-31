import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Star, Play, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useInView, useMousePosition } from '../../hooks/useInView';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ModernHero: React.FC = () => {
  const { t, language } = useTheme();
  const { elementRef, isInView } = useInView(0.1);
  const mousePosition = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // حساب parallax effect
  const parallaxX = mounted ? (mousePosition.x - window.innerWidth / 2) * 0.02 : 0;
  const parallaxY = mounted ? (mousePosition.y - window.innerHeight / 2) * 0.02 : 0;

  const features = [
    { icon: Zap, text: 'تسليم فوري', color: 'text-yellow-500' },
    { icon: Shield, text: 'أمان عالي', color: 'text-green-500' },
    { icon: Star, text: 'جودة مضمونة', color: 'text-purple-500' }
  ];

  return (
    <section 
      ref={elementRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/30"
    >
      
      {/* خلفية متحركة متطورة */}
      <div className="absolute inset-0">
        {/* شبكة الخلفية */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        {/* Floating Elements */}
        {mounted && [...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${parallaxX * (i + 1)}px, ${parallaxY * (i + 1)}px)`
            }}
          ></div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* المحتوى النصي */}
          <div className="space-y-8">
            
            {/* Badge */}
            <div 
              className={`inline-flex items-center space-x-3 space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-200/50 dark:border-blue-700/50 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="flex items-center space-x-1 space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                المنصة الأولى في المنطقة
              </span>
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            </div>

            {/* العنوان الرئيسي */}
            <div 
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block text-gray-900 dark:text-white">
                  منصة
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300% relative">
                  KYCtrust
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg opacity-20 blur-lg animate-pulse"></div>
                </span>
                <span className="block text-gray-900 dark:text-white">
                  المالية
                </span>
              </h1>
            </div>

            {/* الوصف */}
            <div 
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                احصل على{' '}
                <span className="text-blue-600 dark:text-blue-400 font-semibold">حساباتك المالية الرقمية</span>
                {' '}بسرعة وأمان من منصة واحدة موثوقة مع{' '}
                <span className="text-purple-600 dark:text-purple-400 font-semibold">ضمان مدى الحياة</span>
              </p>
            </div>

            {/* الميزات السريعة */}
            <div 
              className={`flex items-center space-x-8 space-x-reverse transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse group">
                    <div className={`p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* أزرار العمل */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <Button
                variant="gradient"
                size="xl"
                icon={ArrowRight}
                iconPosition="right"
                glow={true}
                className="group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ابدأ رحلتك الآن
              </Button>

              <Button
                variant="secondary"
                size="xl"
                icon={MessageCircle}
                className="group"
                onClick={() => window.open('https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم', '_blank')}
              >
                تواصل معنا مباشرة
              </Button>
            </div>

            {/* إحصائيات */}
            <div 
              className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              {[
                { number: '17+', label: 'خدمة مالية' },
                { number: '1000+', label: 'عميل راضي' },
                { number: '30', label: 'دقيقة تسليم' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* العناصر البصرية التفاعلية */}
          <div 
            className={`relative transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ 
              transitionDelay: '0.7s',
              transform: `translate(${parallaxX}px, ${parallaxY}px)`
            }}
          >
            <div className="relative">
              
              {/* Main Card */}
              <Card variant="glass" glow={true} className="p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">KYCtrust</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Premium Account</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { service: 'Payoneer', price: '30$', status: 'Active' },
                      { service: 'Wise', price: '30$', status: 'Active' },
                      { service: 'PayPal', price: '15$', status: 'Processing' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{item.service}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.status}</div>
                        </div>
                        <div className="text-lg font-bold text-green-600">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center space-x-2 space-x-reverse p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      متاح الآن - خدمة فورية
                    </span>
                  </div>
                </div>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white animate-pulse" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Star className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              {/* Glow Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1s' }}
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">اكتشف خدماتنا</span>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
