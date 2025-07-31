import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock, Award, Zap, TrendingUp, Users, CheckCircle } from 'lucide-react';

const MarketingElements: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  const offers = [
    '🔥 خصم 20% على جميع الخدمات - عرض محدود!',
    '⚡ توصيل فوري خلال 30 دقيقة',
    '🎁 خدمة مجانية عند طلب 3 خدمات',
    '🏆 أكثر من 10,000 عميل راضٍ'
  ];

  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(offerInterval);
  }, [offers.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const trustIndicators = [
    { icon: Shield, text: 'آمان 100%', color: 'text-green-600' },
    { icon: Clock, text: 'سرعة في التسليم', color: 'text-blue-600' },
    { icon: Award, text: 'جودة مضمونة', color: 'text-yellow-600' },
    { icon: Users, text: '+10K عميل', color: 'text-purple-600' }
  ];

  const stats = [
    { number: '10,432', label: 'عميل راضٍ', icon: Users },
    { number: '99.9%', label: 'نسبة النجاح', icon: TrendingUp },
    { number: '24/7', label: 'دعم متواصل', icon: Clock },
    { number: '5⭐', label: 'تقييم العملاء', icon: Star }
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-2 sticky top-0 z-50 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium px-4">
            {offers[currentOffer]} | اتصل الآن: 01062453344 | 
          </span>
          <span className="text-sm font-medium px-4">
            {offers[(currentOffer + 1) % offers.length]} | 
          </span>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="font-bold">العرض ينتهي خلال:</span>
          </div>
          <div className="flex space-x-2">
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 p-2">
                <indicator.icon className={`h-5 w-5 ${indicator.color}`} />
                <span className="text-sm font-medium text-gray-700">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            أرقام تتحدث عن نفسها
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            ماذا يقول عملاؤنا
          </h3>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">أحمد محمد</h4>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "خدمة ممتازة وسريعة! ��صلت على حساب Payoneer الخاص بي خلال 30 دقيقة فقط. أنصح بشدة!"
            </p>
          </div>
        </div>
      </div>

      {/* Urgent Action */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="animate-pulse bg-white rounded-full p-1">
              <CheckCircle className="h-4 w-4 text-red-500" />
            </div>
            <span className="font-bold">عرض خاص - لفترة محدودة!</span>
          </div>
          <p className="text-sm opacity-90">
            احصل على خصم 20% على أول طلب + خدمة إضافية مجاناً
          </p>
        </div>
      </div>
    </>
  );
};

// User icon component (since it's not imported)
const User: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default MarketingElements;
