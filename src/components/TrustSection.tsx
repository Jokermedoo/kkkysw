import React, { useState, useEffect } from 'react';
import { Star, Shield, Award, CheckCircle, Quote, Users, Calendar, Globe } from 'lucide-react';

const TrustSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'رجل أعمال',
      rating: 5,
      text: 'خدمة استثنائية! تم إنجاز طلبي بسرعة ودقة عالية. فريق محترف جداً ويستحق الثقة.',
      avatar: 'أ',
      date: '2024-12-15',
      service: 'PayPal'
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      role: 'مصممة جرافيك',
      rating: 5,
      text: 'أفضل موقع تعاملت معه! السرعة والأمان والدعم الفني الممتاز. أنصح الجميع بالتعامل معهم.',
      avatar: 'ف',
      date: '2024-12-10',
      service: 'Wise'
    },
    {
      id: 3,
      name: 'خالد عبدالرحمن',
      role: 'مطور ويب',
      rating: 5,
      text: 'موثوقية عالية وأسعار منافسة. تم التواصل معي خلال دقائق وإنجاز الطلب في نفس اليوم.',
      avatar: 'خ',
      date: '2024-12-08',
      service: 'Payoneer'
    },
    {
      id: 4,
      name: 'منى السيد',
      role: 'مترجمة',
      rating: 5,
      text: 'خدمة احترافية بامتياز! شكراً لكم على السرعة والجودة العالية في الخدمة.',
      avatar: 'م',
      date: '2024-12-05',
      service: 'Skrill'
    }
  ];

  const certifications = [
    {
      title: 'شهادة الأمان والحماية',
      description: 'معتمد من أفضل الشركات العالمية',
      icon: <Shield className="h-8 w-8" />,
      color: 'blue'
    },
    {
      title: 'جائزة أفضل خدمة',
      description: 'حاصل على جائزة الخدمة المتميزة لعام 2024',
      icon: <Award className="h-8 w-8" />,
      color: 'gold'
    },
    {
      title: 'موثوق عالمياً',
      description: 'شراكات مع أكثر من 50 شركة عالمية',
      icon: <Globe className="h-8 w-8" />,
      color: 'green'
    },
    {
      title: 'دعم على مدار الساعة',
      description: 'فريق دعم متخصص متاح 24/7',
      icon: <Users className="h-8 w-8" />,
      color: 'purple'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'عميل راضٍ', icon: <Users className="h-6 w-6" /> },
    { number: '99.9%', label: 'معدل النجاح', icon: <CheckCircle className="h-6 w-6" /> },
    { number: '24/7', label: 'دعم فني', icon: <Shield className="h-6 w-6" /> },
    { number: '2+', label: 'سنوات خبرة', icon: <Calendar className="h-6 w-6" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      gold: 'from-yellow-500 to-orange-500',
      green: 'from-green-500 to-emerald-600',
      purple: 'from-purple-500 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Award className="h-4 w-4 ml-2" />
            <span>موثوق من آلاف العملاء حول العالم</span>
          </div>\n          <h2 className=\"text-4xl md:text-5xl font-bold text-gray-900 mb-6\">\n            لماذا يثق بنا العملاء؟\n          </h2>\n          <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">\n            نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل الخدمات مع ضمان الجودة والأمان\n          </p>\n        </div>\n\n        {/* الإحصائيات */}\n        <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8 mb-16\">\n          {stats.map((stat, index) => (\n            <div key={index} className=\"text-center\">\n              <div className=\"bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105\">\n                <div className=\"bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl inline-block mb-4\">\n                  <div className=\"text-white\">\n                    {stat.icon}\n                  </div>\n                </div>\n                <div className=\"text-3xl font-bold text-gray-900 mb-2\">{stat.number}</div>\n                <div className=\"text-gray-600 font-medium\">{stat.label}</div>\n              </div>\n            </div>\n          ))}\n        </div>\n\n        {/* الشهادات والأمان */}\n        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16\">\n          {certifications.map((cert, index) => (\n            <div key={index} className=\"bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105\">\n              <div className={`bg-gradient-to-r ${getColorClasses(cert.color)} p-4 rounded-xl inline-block mb-4`}>\n                <div className=\"text-white\">\n                  {cert.icon}\n                </div>\n              </div>\n              <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">{cert.title}</h3>\n              <p className=\"text-gray-600 text-sm\">{cert.description}</p>\n            </div>\n          ))}\n        </div>\n\n        {/* شهادات العملاء */}\n        <div className=\"bg-white rounded-3xl shadow-2xl p-8 md:p-12\">\n          <div className=\"text-center mb-12\">\n            <Quote className=\"h-12 w-12 text-blue-600 mx-auto mb-4\" />\n            <h3 className=\"text-3xl font-bold text-gray-900 mb-4\">ماذا يقول عملاؤنا</h3>\n            <p className=\"text-lg text-gray-600\">تجارب حقيقية من عملاء راضين عن خدماتنا</p>\n          </div>\n\n          <div className=\"relative\">\n            <div className=\"overflow-hidden\">\n              <div \n                className=\"flex transition-transform duration-500 ease-in-out\"\n                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}\n              >\n                {testimonials.map((testimonial) => (\n                  <div key={testimonial.id} className=\"w-full flex-shrink-0 px-4\">\n                    <div className=\"max-w-4xl mx-auto text-center\">\n                      <div className=\"mb-8\">\n                        <div className=\"flex justify-center mb-4\">\n                          {[...Array(testimonial.rating)].map((_, i) => (\n                            <Star key={i} className=\"h-6 w-6 text-yellow-400 fill-current\" />\n                          ))}\n                        </div>\n                        <blockquote className=\"text-xl md:text-2xl text-gray-700 leading-relaxed mb-8\">\n                          \"{testimonial.text}\"\n                        </blockquote>\n                      </div>\n                      \n                      <div className=\"flex items-center justify-center space-x-reverse space-x-4\">\n                        <div className=\"w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold\">\n                          {testimonial.avatar}\n                        </div>\n                        <div className=\"text-right\">\n                          <div className=\"font-semibold text-gray-900 text-lg\">{testimonial.name}</div>\n                          <div className=\"text-gray-600\">{testimonial.role}</div>\n                          <div className=\"text-sm text-blue-600 font-medium\">\n                            خدمة {testimonial.service} • {new Date(testimonial.date).toLocaleDateString('ar-EG')}\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                ))}\n              </div>\n            </div>\n\n            {/* مؤشرات التنقل */}\n            <div className=\"flex justify-center mt-8 space-x-reverse space-x-2\">\n              {testimonials.map((_, index) => (\n                <button\n                  key={index}\n                  onClick={() => setCurrentTestimonial(index)}\n                  className={`w-3 h-3 rounded-full transition-all duration-300 ${\n                    currentTestimonial === index\n                      ? 'bg-blue-600 scale-125'\n                      : 'bg-gray-300 hover:bg-gray-400'\n                  }`}\n                />\n              ))}\n            </div>\n          </div>\n        </div>\n\n        {/* ضمان الجودة */}\n        <div className=\"mt-16 text-center\">\n          <div className=\"bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 md:p-12\">\n            <div className=\"bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl inline-block mb-6\">\n              <CheckCircle className=\"h-12 w-12 text-white\" />\n            </div>\n            <h3 className=\"text-2xl md:text-3xl font-bold text-gray-900 mb-4\">\n              ضمان الجودة والأمان\n            </h3>\n            <p className=\"text-lg text-gray-700 mb-6 max-w-2xl mx-auto\">\n              نضمن لك أعلى مستويات الأمان والجودة في جميع خدماتنا مع إمكانية استرداد الأموال في حالة عدم الرضا\n            </p>\n            <div className=\"flex flex-wrap justify-center gap-4\">\n              <div className=\"flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm\">\n                <Shield className=\"h-5 w-5 text-green-600\" />\n                <span className=\"text-sm font-medium text-gray-700\">حماية كاملة للبيانات</span>\n              </div>\n              <div className=\"flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm\">\n                <Award className=\"h-5 w-5 text-green-600\" />\n                <span className=\"text-sm font-medium text-gray-700\">ضمان الجودة</span>\n              </div>\n              <div className=\"flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm\">\n                <Users className=\"h-5 w-5 text-green-600\" />\n                <span className=\"text-sm font-medium text-gray-700\">دعم متميز</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default TrustSection;\n