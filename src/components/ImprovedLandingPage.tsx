import React, { useEffect } from 'react';
import { MessageCircle, Shield, Star, Award, Users, TrendingUp } from 'lucide-react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HeroSection from './sections/HeroSection';
import CompactServicesSection from './sections/CompactServicesSection';
import { useTheme } from '../context/ThemeContext';

const ImprovedLandingPage: React.FC = () => {
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
        
        {/* Services Section المحسن */}
        <CompactServicesSection />
        
        {/* Trust Indicators Section - بديل مضغوط لقسم الميزات */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              
              {/* مؤشرات الثقة */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">أمان عالي</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">حماية SSL</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">ضمان مدى الحياة</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">حماية كاملة</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">دعم 24/7</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">مساعدة مستمرة</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">تسليم سريع</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">خلال 30 دقيقة</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">تقييم 5 نجوم</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">رضا العملاء</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">تواصل فوري</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">واتساب مباشر</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section مضغوط */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ماذا يقول عملاؤنا
              </h2>
              <div className="flex items-center justify-center space-x-1 space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 dark:text-gray-400 mr-2">4.9 من 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'أحمد محمد',
                  role: 'مطور ويب',
                  text: 'خدمة ممتازة وسريعة، حصلت على حساب Payoneer في 20 دقيقة فقط!',
                  rating: 5
                },
                {
                  name: 'فاطمة علي',
                  role: 'مصممة جرافيك',
                  text: 'أمان وثقة في التعامل، أنصح الجميع بالتعامل مع هذه المنصة.',
                  rating: 5
                },
                {
                  name: 'محمود حسن',
                  role: 'رجل أعمال',
                  text: 'أفضل منصة للخدمات المالية، دعم فني ممتاز ومتابعة مستمرة.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section مضغوط */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          
          {/* خلفية ديناميكية مبسطة */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-bounce"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ابدأ رحلتك المالية الرقمية اليوم
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف العملاء الراضين واحصل على خدماتك المالية بأسرع وقت
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://wa.me/201062453344?text=مرحباً، أريد البدء مع خدمات KYCtrust"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-3 space-x-reverse bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ابدأ الآن - مجاناً</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </a>
              
              <div className="text-blue-100 text-sm">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span>✓ بدون رسوم إضافية</span>
                  <span>✓ ضمان مدى الحياة</span>
                  <span>✓ دعم مجاني</span>
                </div>
              </div>
            </div>

            {/* إحصائيات مبسطة */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-blue-200 text-sm">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-blue-200 text-sm">دقيقة تسليم</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">دعم فني</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* زر واتساب عائم محسن */}
      <a
        href="https://wa.me/201062453344?text=مرحباً، أريد الاستفسار عن خدماتكم"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110 group"
        title="تواصل عبر واتساب"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        
        {/* مؤشر الاتصال */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* تأثير النبضة */}
        <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-20"></div>
      </a>
    </div>
  );
};

export default ImprovedLandingPage;
