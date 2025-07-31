import React from 'react';
import { MessageCircle, Star, Users, Clock, Shield, Phone } from 'lucide-react';

const SimpleWhatsAppLanding: React.FC = () => {
  const whatsappNumber = "201062453344";
  const message = "مرحباً، أريد الاستفسار عن خدماتكم المالية";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const services = [
    "حسابات PayPal جاهزة",
    "محافظ Wise مفعلة",
    "حسابات Skrill آمنة",
    "محافظ Neteller موثقة",
    "شحن رصيد فودافون",
    "سحب من TikTok"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      
      {/* Header بسيط */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">خدمات مالية</div>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2 space-x-reverse"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل معنا</span>
          </button>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section مبسط */}
        <section className="text-center mb-16">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <MessageCircle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            احصل على حساباتك المالية
            <br />
            <span className="text-green-600">عبر الواتساب</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            خدمة سريعة وموثوقة للحصول على حساباتك في المحافظ الرقمية والمنصات المالية
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3 space-x-reverse"
            >
              <MessageCircle className="w-6 h-6" />
              <span>اطلب خدمتك الآن</span>
            </button>
            
            <a
              href={`tel:+${whatsappNumber}`}
              className="bg-white hover:bg-gray-50 text-gray-800 text-xl font-bold px-8 py-4 rounded-full transition-all border-2 border-gray-200 flex items-center space-x-3 space-x-reverse"
            >
              <Phone className="w-6 h-6" />
              <span>اتصل بنا</span>
            </a>
          </div>
        </section>

        {/* الخدمات المتاحة */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">خدماتنا المتاحة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service}</h3>
                <p className="text-gray-600 text-sm mb-4">خدمة سريعة وموثوقة</p>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                  اطلب عبر واتساب
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* المميزات */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">سرعة في التنفيذ</h3>
              <p className="text-gray-600">تسليم الحسابات خلال 30 دقيقة</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">أمان وضمان</h3>
              <p className="text-gray-600">جميع الحسابات مضمونة 100%</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">دعم مستمر</h3>
              <p className="text-gray-600">خدمة عملاء 24/7 عبر واتساب</p>
            </div>
          </div>
        </section>

        {/* CTA نهائي */}
        <section className="bg-green-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-6 opacity-90">
            تواصل معنا الآن عبر الواتساب واحصل على حسابك خلال دقائق
          </p>
          
          <button
            onClick={handleWhatsAppClick}
            className="bg-white text-green-600 text-xl font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            ابدأ المحادثة الآن
          </button>
          
          <div className="mt-6 flex justify-center items-center space-x-4 space-x-reverse text-green-100">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span>تقييم ممتاز من عملائنا</span>
          </div>
        </section>

      </main>

      {/* زر واتساب عائم */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>

    </div>
  );
};

export default SimpleWhatsAppLanding;
