import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Users, Clock } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  position?: 'left' | 'right';
  showPopup?: boolean;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '201062453344',
  message = 'السلام عليكم، أريد الاستفسار عن خدماتكم',
  position = 'right',
  showPopup = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // إظهار الزر بعد 2 ثانية من تحميل الصفحة
    const timer = setTimeout(() => {
      setIsVisible(true);
      // إظهار popup الترحيب بعد 5 ثوان
      if (showPopup) {
        setTimeout(() => {
          setShowChatPopup(true);
          setHasAnimated(true);
          // إخفاء popup بعد 10 ثوان
          setTimeout(() => {
            setShowChatPopup(false);
          }, 10000);
        }, 3000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // إخفاء popup عند النقر
    setShowChatPopup(false);
  };

  const handlePopupClose = () => {
    setShowChatPopup(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* زر واتساب العائم */}
      <div
        className={`fixed bottom-6 z-50 ${
          position === 'right' ? 'right-6' : 'left-6'
        } transition-all duration-500 ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0'
        }`}
      >
        <div className="relative">
          {/* مؤشر الرسائل الجديدة */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          
          {/* الزر الرئيسي */}
          <button
            onClick={handleWhatsAppClick}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-bounce"
            aria-label="تواصل عبر واتساب"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </button>
          
          {/* تأثير النبضة */}
          <div className="absolute inset-0 w-16 h-16 bg-green-400 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>

      {/* نافذة الدردشة المنبثقة */}
      {showChatPopup && (
        <div
          className={`fixed bottom-28 z-40 ${
            position === 'right' ? 'right-6' : 'left-6'
          } w-80 max-w-sm animate-slide-up`}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* رأس النافذة */}
            <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">دعم KYCtrust</h3>
                  <div className="flex items-center space-x-reverse space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-green-100 text-xs">متصل الآن</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePopupClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* محتوى النافذ�� */}
            <div className="p-4">
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex items-start space-x-reverse space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      👋 أهلاً وسهلاً بك في KYCtrust!
                      <br />
                      كيف يمكننا مساعدتك اليوم؟
                    </p>
                  </div>
                </div>
              </div>

              {/* معلومات سريعة */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-reverse space-x-2 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>نجيب خلال دقائق</span>
                </div>
                <div className="flex items-center space-x-reverse space-x-2 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span>دعم 24/7 متاح</span>
                </div>
              </div>

              {/* زر البدء */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-reverse space-x-2 font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ابدأ المحادثة</span>
              </button>

              {/* رسائل سريعة */}
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    const quickMessage = encodeURIComponent('أريد الاستفسار عن الأسعار');
                    window.open(`https://wa.me/${phoneNumber}?text=${quickMessage}`, '_blank');
                  }}
                  className="w-full text-left text-xs text-gray-600 hover:text-green-600 py-1 px-2 rounded hover:bg-green-50 transition-colors"
                >
                  💰 استفسار عن الأسعار
                </button>
                <button
                  onClick={() => {
                    const quickMessage = encodeURIComponent('أريد طلب خدمة جديدة');
                    window.open(`https://wa.me/${phoneNumber}?text=${quickMessage}`, '_blank');
                  }}
                  className="w-full text-left text-xs text-gray-600 hover:text-green-600 py-1 px-2 rounded hover:bg-green-50 transition-colors"
                >
                  🛒 طلب خدمة جديدة
                </button>
                <button
                  onClick={() => {
                    const quickMessage = encodeURIComponent('أريد الدعم الفني');
                    window.open(`https://wa.me/${phoneNumber}?text=${quickMessage}`, '_blank');
                  }}
                  className="w-full text-left text-xs text-gray-600 hover:text-green-600 py-1 px-2 rounded hover:bg-green-50 transition-colors"
                >
                  🔧 دعم فني
                </button>
              </div>
            </div>

            {/* مؤشر الكتابة */}
            <div className="px-4 pb-3">
              <div className="flex items-center space-x-reverse space-x-2 text-xs text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>فريق الدعم يكتب...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* أنيميشن CSS */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
