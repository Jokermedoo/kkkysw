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
      text: 'أفضل موقع تعاملت ��عه! السرعة والأمان والدعم الفني الممتاز. أنصح الجميع بالتعامل معهم.',
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Award className="h-4 w-4 ml-2" />
            <span>موثوق من آلاف العملاء حول العالم</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            لماذا يثق بنا العملاء؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل الخدمات مع ضمان الجودة والأمان
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl inline-block mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`bg-gradient-to-r ${getColorClasses(cert.color)} p-4 rounded-xl inline-block mb-4`}>
                <div className="text-white">
                  {cert.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <Quote className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">ماذا يقول عملاؤنا</h3>
            <p className="text-lg text-gray-600">تجارب حقيقية من عملاء راضين عن خدماتنا</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                      <div className="mb-8">
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                          "{testimonial.text}"
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-reverse space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {testimonial.avatar}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                          <div className="text-gray-600">{testimonial.role}</div>
                          <div className="text-sm text-blue-600 font-medium">
                            خدمة {testimonial.service} • {new Date(testimonial.date).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-reverse space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 md:p-12">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl inline-block mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ضمان الجودة والأمان
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              نضمن لك أعلى مستويات الأمان والجودة في جميع خدماتنا مع إمكانية استرداد الأموال في حالة عدم الرضا
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">حماية كاملة للبيانات</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Award className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">ضمان الجودة</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">دعم متميز</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
