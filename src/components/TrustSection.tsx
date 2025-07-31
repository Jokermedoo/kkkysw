import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Star, Lock, Zap } from 'lucide-react';

const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'أمان مضمون',
      description: 'جميع المعاملات محمية بأعلى معايير الأمان العالمية',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'تسليم سريع',
      description: 'نضمن تسليم خدماتك خلال 30 دقيقة أو نعيد لك أموالك',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      title: 'جودة عالية',
      description: 'حسابات أصلية ومفعلة بضمان مدى الحياة',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'دعم 24/7',
      description: 'فريق دعم متخصص متاح على مدار الساعة لمساعدتك',
      color: 'text-purple-600'
    }
  ];

  const certifications = [
    {
      icon: Lock,
      text: 'SSL Secured',
      subtext: 'تشفير عالي'
    },
    {
      icon: CheckCircle,
      text: 'Verified Business',
      subtext: 'نشاط معتمد'
    },
    {
      icon: Star,
      text: '5 Star Rating',
      subtext: 'تقييم ممتاز'
    },
    {
      icon: Zap,
      text: 'Fast Delivery',
      subtext: 'تسليم فوري'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      rating: 5,
      text: 'خدمة ممتازة وسريعة! حصلت على حسابي خلال 20 دقيقة فقط',
      service: 'Payoneer'
    },
    {
      name: 'فاطمة أحمد',
      rating: 5,
      text: 'صدق في التعامل وجودة عالية. أنصح الجميع بالتعامل معهم',
      service: 'Wise'
    },
    {
      name: 'محمد علي',
      rating: 5,
      text: 'فريق محترف وأسعار مناسبة. تجربة رائعة من البداية للنهاية',
      service: 'Skrill'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            لماذا يثق بنا آلاف العملاء؟
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نقدم خدمات مالية رقمية بأعلى معايير الجودة والأمان
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            شهادات الجودة والأمان
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                <cert.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 text-sm">{cert.text}</div>
                <div className="text-xs text-gray-600">{cert.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            آراء عملائنا الكرام
          </h3>
          <p className="text-gray-600">
            أكثر من 10,000 عميل راضٍ عن خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2 ml-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                "{testimonial.text}"
              </p>
              <div className="bg-blue-50 rounded-lg px-3 py-1 inline-block">
                <span className="text-blue-800 text-xs font-medium">
                  خدمة: {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10,432</div>
              <div className="text-blue-100">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">معدل النجاح</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">دعم فني</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">30</div>
              <div className="text-blue-100">دقيقة تسليم</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
