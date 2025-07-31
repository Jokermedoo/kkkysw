import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User, MapPin } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

const TestimonialsSection: React.FC = () => {
  const { elementRef, isInView } = useInView(0.1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'أحمد محمد',
      location: 'القاهرة، مصر',
      rating: 5,
      text: 'خدمة ممتازة وسريعة! حصلت على حساب Payoneer خلال 20 دقيقة فقط. الفريق محترف جداً والأسعار معقولة.',
      service: 'Payoneer Account',
      avatar: '👨🏻‍💼',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'سارة أحمد',
      location: 'دبي، الإمارات',
      rating: 5,
      text: 'أفضل منصة للحصول على الحسابات المالية! تعاملت معهم عدة مرات وكل مرة الخدمة تفوق التوقعات.',
      service: 'Wise + PayPal',
      avatar: '👩🏻‍💻',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'محمد علي',
      location: 'الرياض، السعودية',
      rating: 5,
      text: 'سرعة في التنفيذ وأمان في التعامل. حصلت على 3 حسابات مختلفة بجودة عالية وضمان مدى الحياة.',
      service: 'Multiple Services',
      avatar: '👨🏻‍🚀',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'نور الهدى',
      location: 'عمان، الأردن',
      rating: 5,
      text: 'فريق عمل رائع ودعم فني مستمر. التعامل معهم آمن وموثوق، أنصح بهم بشدة لكل من يحتاج خدمات مالية.',
      service: 'Skrill Account',
      avatar: '👩🏻‍💼',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: 'عبد الرحمن خالد',
      location: 'بغداد، العراق',
      rating: 5,
      text: 'تجربة رائعة من البداية للنهاية. الموقع سهل الاستخدام والخدمة سريعة. حصلت على ما أحتاجه بدون أي مشاكل.',
      service: 'Bitcoin Wallet',
      avatar: '👨🏻‍💻',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      name: 'ريم محمود',
      location: 'تونس، تونس',
      rating: 5,
      text: 'خدمة عملاء ممتازة ومتابعة مستمرة. شكراً لكم على الاحترافية والسرعة في تلبية احتياجاتي المالية.',
      service: 'Neteller Account',
      avatar: '👩🏻‍🎨',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length;
      visible.push({ ...testimonials[index], index });
    }
    return visible;
  };

  return (
    <section 
      ref={elementRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium text-white">آراء عملائنا</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
            <span className="block">ماذا يقول</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              عملاؤنا؟
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            اكتشف تجارب عملائنا الحقيقية وكيف ساعدناهم في تحقيق أهدافهم المالية
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, displayIndex) => (
              <Card
                key={testimonial.index}
                variant="glass"
                className={`p-8 transition-all duration-700 transform ${
                  displayIndex === 1 
                    ? 'scale-110 z-10 border-2 border-yellow-400/50 shadow-2xl shadow-yellow-400/25' 
                    : 'scale-95 opacity-75 hover:scale-100 hover:opacity-100'
                } bg-white/10 backdrop-blur-sm border border-white/20`}
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1 space-x-reverse mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-white text-lg leading-relaxed mb-6 text-center">
                  "{testimonial.text}"
                </blockquote>

                {/* Service */}
                <div className="text-center mb-6">
                  <span className={`inline-block bg-gradient-to-r ${testimonial.gradient} px-4 py-2 rounded-full text-white text-sm font-medium`}>
                    {testimonial.service}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div className="text-center">
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <div className="flex items-center space-x-1 space-x-reverse text-gray-300 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 space-x-reverse mt-12">
            <Button
              variant="secondary"
              size="md"
              icon={ChevronRight}
              onClick={prevTestimonial}
              className="!p-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
            />
            
            {/* Pagination Dots */}
            <div className="flex space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-yellow-400 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="secondary"
              size="md"
              icon={ChevronLeft}
              onClick={nextTestimonial}
              className="!p-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
            />
          </div>
        </div>

        {/* Trust Indicators */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          {[
            { icon: Star, number: '4.9/5', label: 'متوسط التقييم', color: 'from-yellow-400 to-orange-500' },
            { icon: User, number: '10,000+', label: 'عميل سعيد', color: 'from-blue-400 to-blue-600' },
            { icon: Quote, number: '500+', label: 'مراجعة إيجابية', color: 'from-green-400 to-green-600' },
            { icon: MapPin, number: '50+', label: 'دولة', color: 'from-purple-400 to-purple-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                variant="glass" 
                className="text-center p-6 group hover:scale-110 transition-all duration-500 bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
