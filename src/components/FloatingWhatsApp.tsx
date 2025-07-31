import React, { useState } from 'react';
import { MessageCircle, X, Phone, Send } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const whatsappNumber = '201062453344';
  const defaultMessage = 'مرحباً، أريد الاستفسار عن خدماتكم المالية';

  const sendMessage = (customMessage?: string) => {
    const messageText = customMessage || message || defaultMessage;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  const quickMessages = [
    'أريد الاستفسار عن خدمة Payoneer',
    'ما هي طرق الدفع المتاحة؟',
    'كم يستغرق وقت التسليم؟',
    'هل ي��جد ضمان على الخدمات؟'
  ];

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">KYCtrust Support</h3>
                  <p className="text-sm opacity-90">متاح الآن للمساعدة</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                👋 مرحباً! كيف يمكننا مساعدتك اليوم؟
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                رسائل سريعة
              </p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(msg)}
                  className="w-full text-left p-2 text-sm bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-800"
                >
                  {msg}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                أو اكتب رسالتك
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={() => sendMessage()}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => sendMessage()}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>فتح واتساب</span>
              </button>
              <button
                onClick={() => window.open(`tel:+${whatsappNumber}`, '_self')}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40 animate-bounce-slow"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Notification Dot */}
      {!isOpen && (
        <div className="fixed bottom-[72px] left-[72px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-50 animate-pulse">
          1
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;
