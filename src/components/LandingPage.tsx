import React, { useState } from 'react';
import { Shield, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrderModal from './OrderModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import FloatingWhatsApp from './FloatingWhatsApp';

const LandingPage: React.FC = () => {
  const { services, paymentMethods, siteSettings, loading, error, refreshData } = useData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeServices = services.filter(service => service.active);

  const handleOrderClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{siteSettings.title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="tel:+201062453344" className="text-blue-600 hover:text-blue-700">
                <Phone className="h-5 w-5" />
              </a>
              <a href="mailto:support@kyctrust.com" className="text-blue-600 hover:text-blue-700">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {siteSettings.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {siteSettings.description}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{siteSettings.orderNotice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            خدماتنا المالية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {service.name}
                    </h4>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleOrderClick(service.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>اطلب الآن</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            طرق الدفع المتاحة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.filter(method => method.active).map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.name}
                </h4>
                <p className="text-gray-600 font-mono text-sm">
                  {method.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 KYCtrust. جميع الحقوق محفوظة.
          </p>
          <div className="mt-4 space-x-6">
            <a href="tel:+201062453344" className="text-gray-300 hover:text-white">
              هاتف: +20 106 245 3344
            </a>
            <a href="mailto:support@kyctrust.com" className="text-gray-300 hover:text-white">
              البريد: support@kyctrust.com
            </a>
          </div>
        </div>
      </footer>

      {/* Components */}
      <FloatingWhatsApp />
      
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService || ''}
        paymentMethods={paymentMethods.filter(method => method.active)}
      />
    </div>
  );
};

export default LandingPage;
