import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, Shield, Headphones, DollarSign, Award, Users,
  Zap, CheckCircle, Star, Sparkles, TrendingUp, Lock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const FeaturesSection: React.FC = () => {
  const { t } = useTheme();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // مراقبة ظهور القسم لتفعيل الأنيميشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Clock,
      title: t('features.fast_delivery'),
      description: t('features.fast_delivery_desc'),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBgGradient: 'from-blue-900/20 to-cyan-900/20',
      stat: '30',
      statLabel: 'دقيقة',
      delay: 0
    },
    {
      icon: Shield,
      title: t('features.lifetime_warranty'),
      description: t('features.lifetime_warranty_desc'),
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      darkBgGradient: 'from-green-900/20 to-emerald-900/20',
      stat: '100%',
      statLabel: 'ضمان',
      delay: 0.1
    },
    {
      icon: Headphones,
      title: t('features.support'),
      description: t('features.support_desc'),
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      darkBgGradient: 'from-purple-900/20 to-violet-900/20',
      stat: '24/7',
      statLabel: 'دعم',
      delay: 0.2
    },
    {
      icon: DollarSign,
      title: t('features.competitive_prices'),
      description: t('features.competitive_prices_desc'),
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      darkBgGradient: 'from-yellow-900/20 to-orange-900/20',
      stat: '50%',
      statLabel: 'توفير',
      delay: 0.3
    },
    {
      icon: Lock,
      title: t('features.security'),
      description: t('features.security_desc'),
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      darkBgGradient: 'from-red-900/20 to-pink-900/20',
      stat: 'SSL',
      statLabel: 'تشفير',
      delay: 0.4
    },
    {
      icon: Award,
      title: t('features.trust'),
      description: t('features.trust_desc'),
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      darkBgGradient: 'from-indigo-900/20 to-purple-900/20',
      stat: '5.0',
      statLabel: 'تقييم',
      delay: 0.5
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">لماذا نحن مميزون</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('features.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            نحن نقدم أفضل تجربة في عالم الخدمات المالية الرقمية مع الحفاظ على أعلى معايير الجودة والأمان
          </p>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              { number: '1000+', label: 'عميل راضي' },
              { number: '17+', label: 'خدمة مالية' },
              { number: '99.9%', label: 'وقت التشغيل' },
              { number: '24/7', label: 'دعم فني' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* شبكة الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl cursor-pointer transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } ${hoveredFeature === index ? 'scale-105 -translate-y-2' : ''}`}
                style={{ 
                  transitionDelay: `${feature.delay}s`,
                  animationDelay: `${feature.delay}s`
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                
                {/* خلفية متدرجة للكارت */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} dark:${feature.darkBgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* محتوى الكارت */}
                <div className="relative z-10">
                  
                  {/* الأيقونة والإحصائية */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stat}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {feature.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* العنوان */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* عناصر إضافية */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    
                    <CheckCircle className={`w-6 h-6 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110`} />
                  </div>
                </div>

                {/* تأثير الانعكاس */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
                
                {/* نقاط متحركة */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
              </div>
            );
          })}
        </div>

        {/* قسم الشهادات والتقييمات */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            
            {/* خلفية ديناميكية */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                عملاؤن�� يثقون بنا
              </h3>
              
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
                "منصة KYCtrust غيرت طريقة تعاملي مع الخدمات المالية الرقمية. سرعة في التنفيذ وأمان في التعامل."
              </p>
              
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">محمد أحمد</div>
                  <div className="text-blue-200 text-sm">رجل أعمال</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
