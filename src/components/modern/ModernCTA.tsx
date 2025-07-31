import React from 'react';
import { MessageCircle, ArrowRight, Sparkles, Zap, Clock, Shield } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ModernCTA: React.FC = () => {
  const { elementRef, isInView } = useInView(0.1);

  return (
    <section 
      ref={elementRef}
      className="py-32 relative overflow-hidden"
    >
      
      {/* خلفية متدرجة متحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* تأثيرات الخلفية */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping"></div>
        </div>

        {/* شبكة ديناميكية */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.05}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* المحتوى الرئيسي */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* العنوان */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-sm font-medium text-white/90">ابدأ الآن</span>
              <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              هل أنت مستعد
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-gradient-x bg-300%">
                للبدء؟
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              انضم إلى آلاف العملاء الراضين واحصل على خدماتك المالية الرقمية 
              <span className="text-yellow-300 font-semibold"> بأسرع وقت وأفضل سعر</span>
            </p>
          </div>

          {/* أزرار العمل */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <Button
              variant="secondary"
              size="xl"
              icon={MessageCircle}
              glow={true}
              className="group text-lg font-bold"
              onClick={() => window.open('https://wa.me/201062453344?text=مرحباً، أريد البدء مع خدمات KYCtrust', '_blank')}
            >
              ابدأ الآن - مجاناً
            </Button>
            
            <div className="flex items-center space-x-6 space-x-reverse text-white/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">متاح الآن</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">100% آمن</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">30 دقيقة</span>
              </div>
            </div>
          </div>

          {/* الميزات السريعة */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            {[
              {
                icon: Zap,
                title: 'تسليم فوري',
                description: 'احصل على حسابك خلال 30 دقيقة فقط',
                color: 'from-yellow-400 to-orange-400'
              },
              {
                icon: Shield,
                title: 'أمان عالي',
                description: 'حماية كاملة وأمان متقدم لجميع خدماتنا',
                color: 'from-green-400 to-blue-400'
              },
              {
                icon: MessageCircle,
                title: 'دعم 24/7',
                description: 'فريق دعم متاح على مدار الساعة لمساعدتك',
                color: 'from-purple-400 to-pink-400'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  variant="glass" 
                  className="p-6 text-center text-white border-white/20 group hover:scale-105 transition-transform duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          {/* إحصائيات مباشرة */}
          <div 
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            {[
              { number: '1000+', label: 'عميل راضي' },
              { number: '17+', label: 'خدمة مالية' },
              { number: '30', label: 'دقيقة تسليم' },
              { number: '100%', label: 'نسبة النجاح' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* تحفيز إضافي */}
          <div 
            className={`mt-16 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.8s' }}
          >
            <Card variant="glass" className="p-8 border-white/20 inline-block">
              <div className="flex items-center justify-center space-x-4 space-x-reverse text-white">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">متاح الآن</span>
                </div>
                <span className="text-white/60">•</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">عرض محدود لفترة قصيرة</span>
                </div>
                <span className="text-white/60">•</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-sm font-medium">خصومات حصرية</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
