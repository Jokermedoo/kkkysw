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
    
    // محاكاة إرسال النموذج
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
    <section className=\"py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50\">
      <div className=\"max-w-7xl mx-auto\">
        <div className=\"text-center mb-16\">
          <h2 className=\"text-4xl md:text-5xl font-bold text-gray-900 mb-6\">
            تواصل معنا
          </h2>\n          <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
            نحن هنا لمساعدتك! تواصل معنا بأي طريقة تناسبك وسنكون سعداء بالرد على استفساراتك
          </p>\n        </div>\n\n        <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12\">\n          {/* معلومات الاتصال */}\n          <div className=\"space-y-8\">\n            <div className=\"bg-white rounded-2xl shadow-xl p-8 border border-gray-100\">\n              <h3 className=\"text-2xl font-bold text-gray-900 mb-6 flex items-center\">\n                <Shield className=\"h-6 w-6 text-blue-600 ml-2\" />\n                طرق التواصل\n              </h3>\n              \n              <div className=\"grid grid-cols-1 sm:grid-cols-2 gap-6\">\n                {contactMethods.map((method, index) => {\n                  const colorClasses = {\n                    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',\n                    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',\n                    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',\n                    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'\n                  };\n                  \n                  return (\n                    <a\n                      key={index}\n                      href={method.action}\n                      target=\"_blank\"\n                      rel=\"noopener noreferrer\"\n                      className=\"block bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group\"\n                    >\n                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[method.color as keyof typeof colorClasses]} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>\n                        {method.icon}\n                      </div>\n                      <h4 className=\"font-semibold text-gray-900 mb-2\">{method.title}</h4>\n                      <p className=\"text-sm text-gray-600 mb-2\">{method.description}</p>\n                      <p className=\"text-sm font-medium text-blue-600\">{method.value}</p>\n                    </a>\n                  );\n                })}\n              </div>\n            </div>\n\n            {/* أوقات العمل */}\n            <div className=\"bg-white rounded-2xl shadow-xl p-8 border border-gray-100\">\n              <h3 className=\"text-2xl font-bold text-gray-900 mb-6 flex items-center\">\n                <Clock className=\"h-6 w-6 text-blue-600 ml-2\" />\n                أوقات العمل\n              </h3>\n              \n              <div className=\"space-y-4\">\n                {workingHours.map((schedule, index) => (\n                  <div key={index} className=\"flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0\">\n                    <span className=\"font-medium text-gray-900\">{schedule.day}</span>\n                    <span className=\"text-blue-600 font-semibold\">{schedule.hours}</span>\n                  </div>\n                ))}\n              </div>\n              \n              <div className=\"mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl\">\n                <p className=\"text-green-800 text-sm font-medium\">\n                  💡 للحصول على استجابة أسرع، ننصح بالتواصل عبر واتساب\n                </p>\n              </div>\n            </div>\n          </div>\n\n          {/* نموذج الاتصال */}\n          <div className=\"bg-white rounded-2xl shadow-xl p-8 border border-gray-100\">\n            <h3 className=\"text-2xl font-bold text-gray-900 mb-6\">\n              أرسل لنا رسالة\n            </h3>\n            \n            <form onSubmit={handleSubmit} className=\"space-y-6\">\n              <div>\n                <label htmlFor=\"name\" className=\"block text-sm font-medium text-gray-700 mb-2\">\n                  الاسم الكامل *\n                </label>\n                <input\n                  type=\"text\"\n                  id=\"name\"\n                  name=\"name\"\n                  value={formData.name}\n                  onChange={handleInputChange}\n                  required\n                  className=\"w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all\"\n                  placeholder=\"أدخل اسمك الكامل\"\n                />\n              </div>\n\n              <div>\n                <label htmlFor=\"email\" className=\"block text-sm font-medium text-gray-700 mb-2\">\n                  البريد الإلكتروني *\n                </label>\n                <input\n                  type=\"email\"\n                  id=\"email\"\n                  name=\"email\"\n                  value={formData.email}\n                  onChange={handleInputChange}\n                  required\n                  className=\"w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all\"\n                  placeholder=\"example@email.com\"\n                  dir=\"ltr\"\n                />\n              </div>\n\n              <div>\n                <label htmlFor=\"subject\" className=\"block text-sm font-medium text-gray-700 mb-2\">\n                  موضوع الرسالة *\n                </label>\n                <select\n                  id=\"subject\"\n                  name=\"subject\"\n                  value={formData.subject}\n                  onChange={handleInputChange}\n                  required\n                  className=\"w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all\"\n                >\n                  <option value=\"\">اختر موضوع الرسالة</option>\n                  <option value=\"service-inquiry\">استفسار عن خدمة</option>\n                  <option value=\"order-status\">حالة الطلب</option>\n                  <option value=\"technical-support\">دعم فني</option>\n                  <option value=\"billing\">الفوترة والدفع</option>\n                  <option value=\"complaint\">شكوى</option>\n                  <option value=\"suggestion\">اقتراح</option>\n                  <option value=\"other\">أخرى</option>\n                </select>\n              </div>\n\n              <div>\n                <label htmlFor=\"message\" className=\"block text-sm font-medium text-gray-700 mb-2\">\n                  الرسالة *\n                </label>\n                <textarea\n                  id=\"message\"\n                  name=\"message\"\n                  value={formData.message}\n                  onChange={handleInputChange}\n                  rows={6}\n                  required\n                  className=\"w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none\"\n                  placeholder=\"اكتب رسالتك هنا...\"\n                />\n              </div>\n\n              <button\n                type=\"submit\"\n                disabled={isSubmitting}\n                className=\"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2\"\n              >\n                {isSubmitting ? (\n                  <div className=\"animate-spin rounded-full h-5 w-5 border-b-2 border-white\"></div>\n                ) : (\n                  <>\n                    <Send className=\"h-5 w-5\" />\n                    <span>إرسال الرسالة</span>\n                  </>\n                )}\n              </button>\n            </form>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default ContactSection;\n