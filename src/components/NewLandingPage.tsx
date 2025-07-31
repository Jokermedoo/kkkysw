import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import FeaturesSection from './sections/FeaturesSection';
import { useTheme } from '../context/ThemeContext';

const NewLandingPage: React.FC = () => {
  const { theme } = useTheme();

  // تطبيق الثيم على الـ body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          
          {/* خلفية ديناميكية */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full animate-ping"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              هل أنت مستعد للبدء؟
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف العملاء الراضين واحصل على خدماتك المالية الرقمية بسرعة وأمان
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/201062453344?text=مرحباً، أريد البدء مع خدمات KYCtrust"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-3 space-x-reverse bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ابدأ الآن عبر واتساب</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </a>
              
              <div className="flex items-center space-x-4 space-x-reverse text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">30</div>
                  <div className="text-xs">دقيقة تسليم</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs">ضمان</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs">دعم</div>
                </div>
              </div>
            </div>

            {/* شهادات العملاء السريعة */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'أحمد محمد', text: 'خدمة ممتازة وسريعة' },
                { name: 'فاطمة علي', text: 'أمان وثقة في التعامل' },
                { name: 'محمود حسن', text: 'أفضل منصة للخدمات المالية' }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-100 mb-2">"{testimonial.text}"</p>
                  <div className="text-xs font-medium">- {testimonial.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* زر واتساب عائم */}
      <a
        href="https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110 group"
        title="تواصل عبر واتساب"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        
        {/* نقطة إشعار */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* تأثير النبضة */}
        <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-20"></div>
      </a>

      {/* Loading Overlay للتأثيرات */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="loading-overlay">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">جاري التحميل...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLandingPage;
