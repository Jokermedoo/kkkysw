import React, { useState, useEffect } from 'react';
import { 
  Zap, Shield, Award, Users, Clock, Star, 
  TrendingUp, CheckCircle, AlertCircle, Gift,
  Timer, Flame, Crown, Sparkles
} from 'lucide-react';

const MarketingElements: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // العروض المتناوبة
  const offers = [
    {
      title: 'عرض خاص لفترة محدودة!',
      description: 'خصم 20% على جميع الخدمات',
      color: 'from-red-500 to-pink-500',
      icon: <Flame className="h-5 w-5" />
    },
    {
      title: 'أول 100 عميل',
      description: 'خدمة مجانية إضافية',
      color: 'from-purple-500 to-indigo-500',
      icon: <Crown className="h-5 w-5" />
    },
    {
      title: 'خدمة سريعة',
      description: 'تنفيذ خلال 10 دقائق',
      color: 'from-green-500 to-emerald-500',
      icon: <Zap className="h-5 w-5" />
    }
  ];

  // تبديل العروض كل 5 ثوان
  useEffect(() => {
    const offerTimer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(offerTimer);
  }, [offers.length]);

  // العد التنازلي
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const currentOfferData = offers[currentOffer];

  return (
    <div className="space-y-6">
      {/* شريط العروض المتحرك */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8 inline-flex items-center space-x-reverse space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>🔥 عرض حصري: خصم 25% على الخدمات الرقمية - لفترة محدودة!</span>
          </span>
          <span className="mx-8 inline-flex items-center space-x-reverse space-x-2">
            <Award className="h-4 w-4" />
            <span>⭐ أكثر من 1000 عميل راضٍ عن خدماتنا</span>
          </span>
          <span className="mx-8 inline-flex items-center space-x-reverse space-x-2">
            <Clock className="h-4 w-4" />
            <span>⚡ خدمة سريعة خلال 15 دقيقة</span>
          </span>
        </div>
      </div>

      {/* بانر العرض الرئيسي */}
      <div className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${currentOfferData.color} rounded-2xl p-6 text-white relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  {currentOfferData.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{currentOfferData.title}</h3>
                  <p className="text-white/90">{currentOfferData.description}</p>
                </div>
              </div>
              
              {/* العد التنازلي */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-xs text-white/80 mb-1">ينتهي خلال</div>
                <div className="flex space-x-1">
                  <div className="bg-white/30 rounded px-2 py-1 min-w-[2rem]">
                    <span className="text-sm font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-white/60">:</span>
                  <div className="bg-white/30 rounded px-2 py-1 min-w-[2rem]">
                    <span className="text-sm font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-white/60">:</span>
                  <div className="bg-white/30 rounded px-2 py-1 min-w-[2rem]">
                    <span className="text-sm font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="text-xs text-white/60 mt-1">س : د : ث</div>
              </div>
            </div>
          </div>
          
          {/* مؤشرات العروض */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {offers.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentOffer ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* مؤشرات الثقة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">100%</div>
          <div className="text-xs text-gray-600">آمان مضمون</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">15</div>
          <div className="text-xs text-gray-600">دقيقة تنفيذ</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">1K+</div>
          <div className="text-xs text-gray-600">عميل راضٍ</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4.9</div>
          <div className="text-xs text-gray-600">تقييم العملاء</div>
        </div>
      </div>

      {/* شارات الأمان والجودة */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center space-x-reverse space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">حماية SSL</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Award className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">ضمان الجودة</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">معتمد دولياً</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">الأسرع نمواً</span>
          </div>
        </div>
      </div>

      {/* تحذير العرض المحدود */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 ml-2" />
          <div>
            <p className="text-sm font-medium text-red-800">
              ⚠️ عرض محدود: متبقي 15 مقعد فقط بالسعر الخاص!
            </p>
            <p className="text-xs text-red-600 mt-1">
              احجز مكانك الآن قبل انتهاء العرض
            </p>
          </div>
        </div>
      </div>

      {/* أنيميشن CSS للنص المتحرك */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketingElements;
