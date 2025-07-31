import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, Play, Shield, Zap, Award, TrendingUp,
  Star, CheckCircle, Sparkles, Rocket 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const HeroSection: React.FC = () => {
  const { t, language } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // تتبع حركة الماوس للتأثيرات ثلاثية الأبعاد
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    >
      
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* شبكة نقطية متحركة */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* المحتوى النصي */}
          <div className="space-y-8">
            
            {/* شارة العلامة التجارية */}
            <div className="inline-flex items-center space-x-3 space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                منصة موثوقة 100%
              </span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                {t('hero.title')}
              </span>
              <br />
              <span className="text-gray-800 dark:text-white relative">
                {t('hero.subtitle')}
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-500 animate-spin" />
              </span>
            </h1>

            {/* الوصف */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">17+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">خدمة مالية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">دعم فني</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">أمان وضمان</div>
              </div>
            </div>

            {/* أزرار العمل */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#services"
                className="group relative inline-flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2 space-x-reverse">
                  <Rocket className="w-5 h-5" />
                  <span>{t('hero.cta')}</span>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </span>
              </a>
              
              <button className="group inline-flex items-center justify-center space-x-2 space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Play className="w-5 h-5 text-blue-600" />
                <span>{t('hero.learn_more')}</span>
              </button>
            </div>
          </div>

          {/* العناصر التفاعلية ثلاثية الأبعاد */}
          <div className="relative">
            <div 
              className="relative transform-gpu"
              style={{
                transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * 10}deg)`
              }}
            >
              
              {/* الكارت الرئيسي */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
                
                {/* أيقونات عائمة */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-45 hover:rotate-0 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-45 hover:rotate-0 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>

                {/* محتوى الكارت */}
                <div className="space-y-6 py-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      KYCtrust
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">
                      Professional Platform
                    </div>
                  </div>
                  
                  {/* ميزات سريعة */}
                  <div className="space-y-3">
                    {[
                      'تسليم فوري خلال 30 دقيقة',
                      'ضمان مدى الحياة',
                      'دعم فني 24/7',
                      'أمان وحماية عالية'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* عناصر إضافية متحركة */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
