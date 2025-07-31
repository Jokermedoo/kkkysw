import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-blue-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          🚀 KYCtrust - منصة الخدمات المالية الرقمية
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            نقدم خدمات مالية رقمية موثوقة وآمنة
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            احصل على حساباتك المالية الرقمية بسرعة وأم��ن. نحن نقدم أفضل الخدمات بأسعار تنافسية وضمان مدى الحياة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { name: 'Payoneer', price: '30$' },
            { name: 'Wise', price: '30$' },
            { name: 'Skrill', price: '20$' },
            { name: 'PayPal', price: '15$' },
            { name: 'Neteller', price: '20$' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <div className="text-2xl font-bold text-green-600 mb-4">{service.price}</div>
              <a
                href={`https://wa.me/201062453344?text=مرحباً، أريد طلب خدمة ${service.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
              >
                اطلب الآن عبر واتساب
              </a>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-green-900 mb-4">
            🎯 لماذا تختارنا؟
          </h3>
          <ul className="space-y-2 text-green-800">
            <li>✅ تسليم سريع خلال 30 دقيقة</li>
            <li>✅ ضمان مدى الحياة</li>
            <li>✅ دعم فني 24/7</li>
            <li>✅ أسعار تنافسية</li>
            <li>✅ أمان وموثوقية عالية</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📞 تواصل معنا
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://wa.me/201062453344"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>📱 واتساب: 01062453344</span>
            </a>
            <a
              href="mailto:support@kyctrust.com"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>📧 البريد: support@kyctrust.com</span>
            </a>
          </div>
        </div>

        <footer className="text-center text-gray-600 mt-8 py-4 border-t border-gray-200">
          <p>© 2024 KYCtrust - جميع الحقوق محفوظة</p>
          <p className="text-sm mt-2">منصة الخدمات المالية الرقمية الأولى في المنطقة</p>
        </footer>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-colors z-50"
        title="تواصل عبر واتساب"
      >
        📱
      </a>
    </div>
  );
}

export default App;
