import React, { useState } from 'react';
import { Shield, Zap, Clock, Star, Globe, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

const InteractiveFeatures: React.FC = () => {
  const { elementRef, isInView } = useInView(0.1);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: 'أمان عالي المستوى',
      description: 'نحمي بياناتك وأموالك بأحدث تقنيات الأمان والتشفير',
      details: 'تشفير SSL 256-bit، مصادقة ثنائية، حماية من الاحتيال',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      icon: Zap,
      title: 'سرعة خارقة',
      description: 'معالجة فورية لجميع طلباتك خلال دقائق معدودة',
      details: 'تسليم خلال 30 دقيقة، معالجة آلية، دعم 24/7',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    },
    {
      icon: Globe,
      title: 'تغطية عالمية',
      description: 'خدماتنا متاحة في جميع أنحاء العالم بلا استثناء',
      details: 'أكثر من 190 دولة، دعم متعدد العملات، فرق عمل محلية',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    {
      icon: Award,
      title: 'جودة مضمونة',
      description: 'التزامنا بالجودة والتميز في كل تفصيلة',
      details: 'ضمان الجودة، استرداد مجاني، مراجعة مستمرة',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    }
  ];

  const stats = [
    { icon: Users, number: '50,000+', label: 'عميل راضي', color: 'from-blue-500 to-blue-600' },
    { icon: CheckCircle, number: '99.9%', label: 'معدل النجاح', color: 'from-green-500 to-green-600' },
    { icon: Clock, number: '24/7', label: 'دعم مستمر', color: 'from-purple-500 to-purple-600' },
    { icon: Star, number: '4.9/5', label: 'تقييم العملاء', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <section 
      ref={elementRef}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 relative overflow-hidden"
    >
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-8">
            <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">مميزات استثنائية</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8">
            <span className="block">لماذا نحن</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              الأفضل؟
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            اكتشف الأسباب التي تجعل آلاف العملاء يثقون بنا كشريك مالي موثوق
          </p>
        </div>

        {/* Interactive Features */}
        <div 
          className={`grid lg:grid-cols-2 gap-16 items-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          
          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <Card
                  key={index}
                  variant="glass"
                  className={`p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    isActive 
                      ? `bg-gradient-to-r ${feature.bgColor} border-2 border-blue-300/50 dark:border-blue-700/50 shadow-xl` 
                      : 'hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {feature.description}
                      </p>
                      {isActive && (
                        <div className="animate-fade-in">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {feature.details}
                          </p>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={ArrowRight}
                            iconPosition="right"
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            اكتشف المزيد
                          </Button>
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Visual Representation */}
          <div className="relative">
            <div className={`transition-all duration-700 transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
              <Card 
                variant="glass" 
                className={`p-8 bg-gradient-to-br ${features[activeFeature].bgColor} border-2 border-white/20 dark:border-gray-700/20`}
              >
                <div className="text-center">
                  <div className={`w-24 h-24 bg-gradient-to-r ${features[activeFeature].color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse`}>
                    {React.createElement(features[activeFeature].icon, { className: "w-12 h-12 text-white" })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                    {features[activeFeature].description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {features[activeFeature].details.split('�� ').map((detail, i) => (
                      <div key={i} className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce animation-delay-1000"></div>
          </div>
        </div>

        {/* Statistics */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                variant="glass" 
                className="text-center p-6 group hover:scale-110 transition-all duration-500 border border-white/20 dark:border-gray-700/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
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

export default InteractiveFeatures;
