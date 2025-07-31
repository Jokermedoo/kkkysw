import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, MessageCircle, Globe, Shield } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'واتساب',
      description: 'للدعم السريع والاستفسارات',
      value: '+20 106 245 3344',
      action: 'https://wa.me/201062453344',
      color: 'green'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'الهاتف',
      description: 'متاح 24/7 للطوارئ',
      value: '+20 106 245 3344',
      action: 'tel:+201062453344',
      color: 'blue'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'البريد الإلكتروني',
      description: 'للاستفسارات التفصيلية',
      value: 'support@kyctrust.com',
      action: 'mailto:support@kyctrust.com',
      color: 'purple'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'الموقع الإلكتروني',
      description: 'لتصفح جميع الخدمات',
      value: 'www.kyctrust.com',
      action: '#',
      color: 'indigo'
    }
  ];

  const workingHours = [
    { day: 'السبت - الخميس', hours: '9:00 ص - 11:00 م' },
    { day: 'الجمعة', hours: '2:00 م - 11:00 م' },
    { day: 'دعم الطوارئ', hours: '24/7 متاح دائماً' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            تواصل معنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا بأي طريقة تناسبك وسنكون سعداء بالرد على استفساراتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 ml-2" />
                طرق التواصل
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => {
                  const colorClasses = {
                    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                  };
                  
                  return (
                    <a
                      key={index}
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[method.color as keyof typeof colorClasses]} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        {method.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <p className="text-sm font-medium text-blue-600">{method.value}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-blue-600 ml-2" />
                أوقات العمل
              </h3>
              
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className="text-blue-600 font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <p className="text-green-800 text-sm font-medium">
                  💡 للحصول على استجابة أسرع، ننصح بالتواصل عبر واتساب
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              أرسل لنا رسالة
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع الرسالة *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">اختر موضوع الرسالة</option>
                  <option value="service-inquiry">استفسار عن خدمة</option>
                  <option value="order-status">حالة الطلب</option>
                  <option value="technical-support">دعم فني</option>
                  <option value="billing">الفوتر�� والدفع</option>
                  <option value="complaint">شكوى</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
