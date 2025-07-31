import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import ModernHeader from './modern/ModernHeader';
import ModernFooter from './modern/ModernFooter';
import ModernHero from './modern/ModernHero';
import ImprovedServices from './modern/ImprovedServices';
import ModernCTA from './modern/ModernCTA';
import { useTheme } from '../context/ThemeContext';

const UltraModernLandingPage: React.FC = () => {
  const { theme } = useTheme();

  // تطبيق الثيم على الـ body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
      
      {/* Header متطور */}
      <ModernHeader />

      {/* Main Content */}
      <main className="relative">
        
        {/* Hero Section متطور */}
        <ModernHero />
        
        {/* Services Section محسن */}
        <ImprovedServices />
        
        {/* CTA Section متطور */}
        <ModernCTA />
      </main>

      {/* Footer مبسط */}
      <ModernFooter />

      {/* زر واتساب عائم متطور */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          {/* الزر الرئيسي */}
          <button
            onClick={() => window.open('https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم', '_blank')}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-500 flex items-center justify-center transform hover:scale-110 group relative overflow-hidden"
            title="تواصل عبر واتساب"
          >
            {/* تأثير التوهج */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* الأيقونة */}
            <MessageCircle className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* مؤشر الحالة */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </button>
          
          {/* تأثير النبضة */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          
          {/* تأثير التوهج الخارجي */}
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-30 blur-lg animate-pulse"></div>
          
          {/* نص تحفيزي */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            متاح الآن 24/7
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* تأثيرات خلفية عامة */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* عناصر عائمة */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float-y"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Cursor Trail Effect */}
      <div id="cursor-trail" className="fixed pointer-events-none z-50"></div>
    </div>
  );
};

export default UltraModernLandingPage;
