import React from 'react';
import { 
  Shield, MessageCircle, Phone, Mail, MapPin, Clock,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowUp, Heart, Star, Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { t, language } = useTheme();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
  ];

  const quickLinks = [
    { title: 'الصفحة الرئيسية', href: '#home' },
    { title: 'خدماتنا', href: '#services' },
    { title: 'من نحن', href: '#about' },
    { title: 'تواصل معنا', href: '#contact' },
  ];

  const services = [
    'Payoneer', 'Wise', 'Skrill', 'Neteller', 'PayPal', 'Okx'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
      
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full translate-x-48 translate-y-48 animate-pulse animation-delay-2000"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10">
        
        {/* القسم العلوي */}
        <div className="border-b border-gray-800 dark:border-gray-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* معلومات الشركة */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">KYCtrust</h3>
                    <p className="text-sm text-gray-400">Trusted Platform</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  منصة الخدمات المالية الرقمية الأولى في المنطقة. نقدم أفضل الخدمات بأمان وسرعة عالية.
                </p>
                
                {/* تقييم العملاء */}
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-300 text-sm">5.0 (1000+ مراجعة)</span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse text-green-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">متاح الآن - خدمة فورية</span>
                </div>
              </div>

              {/* روابط سريعة */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">روابط سريعة</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 space-x-reverse group"
                      >
                        <span className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* الخدمات */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">خدماتنا المميزة</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <a 
                        href="#services"
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 space-x-reverse group"
                      >
                        <span className="w-2 h-2 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span>{service}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* معلومات التواصل */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">تواصل معنا</h4>
                <div className="space-y-4">
                  
                  <a 
                    href="https://wa.me/201062453344"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 space-x-reverse text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                  >
                    <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">واتساب</div>
                      <div className="text-xs text-gray-400">+20 106 245 3344</div>
                    </div>
                  </a>

                  <a 
                    href="tel:+201062453344"
                    className="flex items-center space-x-3 space-x-reverse text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">هاتف</div>
                      <div className="text-xs text-gray-400">+20 106 245 3344</div>
                    </div>
                  </a>

                  <a 
                    href="mailto:support@kyctrust.com"
                    className="flex items-center space-x-3 space-x-reverse text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                  >
                    <div className="bg-purple-600 p-2 rounded-lg group-hover:bg-purple-500 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">بريد إلكتروني</div>
                      <div className="text-xs text-gray-400">support@kyctrust.com</div>
                    </div>
                  </a>

                  <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                    <div className="bg-gray-600 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">ساعات العمل</div>
                      <div className="text-xs text-gray-400">24/7 - متاح دائماً</div>
                    </div>
                  </div>
                </div>

                {/* وسائل التواصل الاجتماعي */}
                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3 text-white">تابعنا</h5>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                          title={social.label}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* القسم السفلي */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              
              <div className="flex items-center space-x-2 space-x-reverse text-gray-400 mb-4 md:mb-0">
                <span>© 2024 KYCtrust.</span>
                <span>{t('footer.rights')}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 space-x-reverse">
                  <span>صنع بـ</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  <span>في مصر</span>
                </span>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  سياسة الخصوصية
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  شروط الاستخدام
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  اتفاقية الخدمة
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زر العودة للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        title="العودة للأعلى"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;
