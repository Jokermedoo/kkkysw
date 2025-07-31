import React, { useState, useEffect } from 'react';
import { 
  Shield, Menu, X, Sun, Moon, Globe, MessageCircle, 
  Phone, Zap, Star, ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollY } from '../../hooks/useInView';
import Button from '../ui/Button';

const ModernHeader: React.FC = () => {
  const { theme, language, toggleTheme, toggleLanguage, t } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollY();
  
  const isScrolled = scrollY > 50;

  const menuItems = [
    { key: 'nav.home', href: '#home', label: 'الرئيسية' },
    { key: 'nav.services', href: '#services', label: 'الخدمات' },
    { key: 'nav.about', href: '#about', label: 'من نحن' },
    { key: 'nav.contact', href: '#contact', label: 'تواصل معنا' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* شعار الموقع المتطور */}
          <div className="flex items-center space-x-4 space-x-reverse group">
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${
                isScrolled ? '' : 'shadow-2xl shadow-blue-500/25'
              }`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              
              {/* نقطة الحالة */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              {/* تأثير التوهج */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
            </div>
            
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                KYCtrust
              </h1>
              <div className="flex items-center space-x-1 space-x-reverse -mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Trusted Platform
                </p>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* قائمة التنقل - شاشات كبيرة */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="relative group px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-300"
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* خلفية تفاعلية */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* خط سفلي متحرك */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
              </a>
            ))}
          </nav>

          {/* أزرار التحكم المتطورة */}
          <div className="flex items-center space-x-4 space-x-reverse">
            
            {/* تبديل الثيم المحسن */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
              title={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع الفاتح'}
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-500 ${
                  theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-500 ${
                  theme === 'light' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
              </div>
              
              {/* تأثير التوهج */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* تبديل اللغة المحسن */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 space-x-reverse p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </button>

            {/* أزرار التواصل السريع - شاشات كبيرة */}
            <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                icon={Phone}
                onClick={() => window.open('tel:+201062453344', '_blank')}
                className="group"
              >
                <span className="hidden xl:inline">اتصال</span>
              </Button>
              
              <Button
                variant="gradient"
                size="sm"
                icon={MessageCircle}
                glow={true}
                onClick={() => window.open('https://wa.me/201062453344', '_blank')}
                className="group animate-pulse"
              >
                <span className="hidden xl:inline">واتساب</span>
              </Button>
            </div>

            {/* زر القائمة - الهاتف */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  !isOpen ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* قائمة الهاتف المتطورة */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 border-t border-gray-200/50 dark:border-gray-700/50">
            
            {/* عناصر التنقل */}
            <nav className="space-y-3 mb-6">
              {menuItems.map((item, index) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 font-semibold group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </a>
              ))}
            </nav>
            
            {/* أزرار التواصل - الهاتف */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <Button
                variant="ghost"
                size="md"
                icon={Phone}
                onClick={() => window.open('tel:+201062453344', '_blank')}
                className="w-full"
              >
                اتصال مباشر
              </Button>
              
              <Button
                variant="gradient"
                size="md"
                icon={MessageCircle}
                glow={true}
                onClick={() => window.open('https://wa.me/201062453344', '_blank')}
                className="w-full"
              >
                واتساب
              </Button>
            </div>

            {/* معلومات سريعة */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <div className="flex items-center justify-center space-x-6 space-x-reverse text-sm">
                <div className="flex items-center space-x-2 space-x-reverse text-blue-600 dark:text-blue-400">
                  <Zap className="w-4 h-4" />
                  <span>تسليم فوري</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-green-600 dark:text-green-400">
                  <Shield className="w-4 h-4" />
                  <span>أمان عالي</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-purple-600 dark:text-purple-400">
                  <Star className="w-4 h-4" />
                  <span>جودة مضمونة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
