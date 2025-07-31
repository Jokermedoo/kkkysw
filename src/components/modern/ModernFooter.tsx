import React from 'react';
import { 
  Shield, MessageCircle, Phone, Mail, 
  ArrowUp, Heart, Star, Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const ModernFooter: React.FC = () => {
  const { t } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
      
      {/* خلفية ديناميكية مبسطة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full -translate-x-48 -translate-y-48 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full translate-x-48 translate-y-48 blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* القسم العلوي */}
          <div className="text-center mb-12">
            
            {/* الشعار والعنوان */}
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KYCtrust
                </h3>
                <p className="text-white/60 text-sm font-medium">منصة الخدمات المالية الموثوقة</p>
              </div>
            </div>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              نحن نقدم أفضل الخدمات المالية الرقمية بأمان وسرعة عالية مع ضمان مدى الحياة
            </p>

            {/* تقييم العملاء */}
            <div className="flex items-center justify-center space-x-3 space-x-reverse mb-8">
              <div className="flex items-center space-x-1 space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-white/80 font-semibold">5.0 من أصل 5</span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">+1000 مراجعة</span>
            </div>

            {/* أزرار التواصل */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                size="lg"
                icon={MessageCircle}
                glow={true}
                onClick={() => window.open('https://wa.me/201062453344?text=مرحباً، أريد الاستفسار ع�� خدماتكم', '_blank')}
                className="group"
              >
                تواصل عبر واتساب
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                icon={Phone}
                onClick={() => window.open('tel:+201062453344', '_blank')}
                className="text-white hover:text-blue-400"
              >
                اتصال مباشر
              </Button>
            </div>
          </div>

          {/* الإحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: '17+', label: 'خدمة مالية', icon: Shield },
              { number: '1000+', label: 'عميل راضي', icon: Heart },
              { number: '30', label: 'دقيقة تسليم', icon: Zap },
              { number: '24/7', label: 'دعم فني', icon: MessageCircle }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* القسم السفلي */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              
              <div className="flex items-center space-x-3 space-x-reverse text-white/60 mb-4 md:mb-0">
                <span>© 2024 KYCtrust.</span>
                <span>جميع الحقوق محفوظة</span>
                <span>•</span>
                <span className="flex items-center space-x-1 space-x-reverse">
                  <span>صنع بـ</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  <span>في مصر</span>
                </span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-white/60 text-sm">تواصل معنا:</span>
                <a
                  href="https://wa.me/201062453344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="واتساب"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="tel:+201062453344"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="هاتف"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
                <a
                  href="mailto:support@kyctrust.com"
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="بريد إلكتروني"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زر العودة للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        title="العودة للأعلى"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </footer>
  );
};

export default ModernFooter;
