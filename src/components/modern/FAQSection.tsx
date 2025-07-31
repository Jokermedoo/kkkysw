import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Shield, Clock, CreditCard } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import Card from '../ui/Card';
import Button from '../ui/Button';

const FAQSection: React.FC = () => {
  const { elementRef, isInView } = useInView(0.1);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      category: 'عام',
      icon: HelpCircle,
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          question: 'ما هي منصة KYCtrust؟',
          answer: 'KYCtrust هي منصة موثوقة لتوفير الحسابات المالية الرقمية مثل PayPal، Wise، Skrill، وغير��ا من الخدمات المالية بأسعار تنافسية وجودة عالية.'
        },
        {
          question: 'هل خدماتكم آمنة وقانونية؟',
          answer: 'نعم، جميع خدماتنا آمنة ومطابقة للمعايير القانونية. نحن نعمل وفقاً لأعلى معايير الأمان والشفافية لحماية عملائنا.'
        },
        {
          question: 'في أي دول تتوفر خدماتكم؟',
          answer: 'خدماتنا متاحة في جميع أنحاء العالم. نخدم عملاء من أكثر من 190 دولة بدعم متعدد اللغات ومتعدد العملات.'
        }
      ]
    },
    {
      category: 'الطلب والتسليم',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      questions: [
        {
          question: 'كم يستغرق تسليم الحساب؟',
          answer: 'معظم الحسابات يتم تسليمها خلال 30 دقيقة من تأكيد الطلب والدفع. بعض الحسابات المعقدة قد تستغرق حتى 24 ساعة.'
        },
        {
          question: 'كيف أطلب الخدمة؟',
          answer: 'يمكنك الطلب مباشرة عبر الواتساب أو من خلال منصتنا. اختر الخدمة المطلوبة، أكد الطلب، وسنتواصل معك فوراً.'
        },
        {
          question: 'هل يمكنني طلب أكثر من خدمة؟',
          answer: 'بالطبع! يمكنك طلب عدة خدمات في طلب واحد وستحصل على خصم إضافي. استخدم سلة التسوق في منصتنا لإضافة عدة خدمات.'
        }
      ]
    },
    {
      category: 'الدفع والأمان',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          question: 'ما هي طرق الدفع المتاحة؟',
          answer: 'نقبل الدفع عبر التحويل البنكي، المحافظ الرقمية، العملات المشفرة، وبطاقات الائتمان. جميع المدفوعات آمنة ومشفرة.'
        },
        {
          question: 'هل بياناتي محمية؟',
          answer: 'نعم، نحن نستخدم أحدث تقنيات التشفير SSL 256-bit لحماية جميع بياناتك الشخصية والمالية. خصوصيتك أولويتنا.'
        },
        {
          question: 'ماذا لو لم أكن راضياً عن الخدمة؟',
          answer: 'نوفر ضمان استرداد كامل خلال 24 ساعة في حالة عدم الرضا. كما نقدم دعماً فنياً مجانياً لحل أي مشاكل.'
        }
      ]
    },
    {
      category: 'الحسابات والخدمات',
      icon: CreditCard,
      color: 'from-orange-500 to-red-600',
      questions: [
        {
          question: 'هل الحسابات مفعلة بالكامل؟',
          answer: 'نعم، جميع الحسابات التي نوفرها مفعلة بالكامل ومتاحة للاستخدام الفوري. تشمل جميع الميزات والحدود العادية.'
        },
        {
          question: 'هل يمكنني تغيير كلمة المرور؟',
          answer: 'بالطبع، يمكنك تغيير كلمة المرور فور استلام الحساب. ننصح بتغيير جميع بيانات الأمان لضمان الحماية الكاملة.'
        },
        {
          question: 'ما الفرق بين الحسابات المختلفة؟',
          answer: 'كل حساب له مميزاته الخاصة. PayPal للمدفوعات العالمية، Wise للتحويلات الدولية، Skrill للتداول، إلخ. يمكننا مساعدتك في الاختيار.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const globalIndex = categoryIndex * 100 + questionIndex;
    setOpenQuestion(openQuestion === globalIndex ? null : globalIndex);
  };

  return (
    <section 
      ref={elementRef}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden"
    >
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-8">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">الأسئلة الشائعة</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
            <span className="block">أسئلة</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              وإجابات
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            إجابات شاملة لأكثر الأسئلة شيوعاً حول خدماتنا ومنصتنا
          </p>
        </div>

        {/* FAQ Categories */}
        <div 
          className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          {faqs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card 
                key={categoryIndex}
                variant="glass"
                className="p-6 border border-gray-200/50 dark:border-gray-700/50"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openQuestion === globalIndex;
                    
                    return (
                      <div 
                        key={questionIndex}
                        className="border border-gray-200/30 dark:border-gray-700/30 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full p-4 text-right flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <div 
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <Card variant="glass" className="inline-block p-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/30 dark:border-blue-700/30">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  لم تجد إجابة لسؤالك؟
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  تواصل معنا مباشرة وسنجيب على جميع استفساراتك
                </p>
              </div>
            </div>
            
            <Button
              variant="gradient"
              size="lg"
              icon={MessageCircle}
              iconPosition="right"
              glow={true}
              onClick={() => window.open('https://wa.me/201062453344?text=مرحباً، لدي سؤال حول خدماتكم', '_blank')}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              تواصل معنا عبر الواتساب
            </Button>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
