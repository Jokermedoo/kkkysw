import React from 'react';
import { 
  Clock, Shield, Star, Zap, CheckCircle,
  CreditCard, Bitcoin, Smartphone, DollarSign
} from 'lucide-react';
import Card from '../ui/Card';

interface Service {
  id: string;
  name: string;
  price: string;
  order: number;
  active: boolean;
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onToggle }) => {
  
  // تحديد الأيقونة حسب نوع الخدمة
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return CreditCard;
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return Bitcoin;
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return Smartphone;
    return DollarSign;
  };

  // تحديد اللون حسب نوع الخدمة
  const getServiceColor = (serviceName: string) => {
    if (serviceName.includes('PayPal') || serviceName.includes('Wise')) return 'from-blue-500 to-blue-600';
    if (serviceName.includes('Bitcoin') || serviceName.includes('Okx') || serviceName.includes('Bybit')) return 'from-yellow-500 to-orange-500';
    if (serviceName.includes('فودافون') || serviceName.includes('TikTok')) return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  const ServiceIcon = getServiceIcon(service.name);
  const colorGradient = getServiceColor(service.name);

  return (
    <div
      onClick={() => onToggle(service.id)}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-105' : 'hover:scale-102'
      }`}
    >
      <Card
        variant="default"
        className={`p-4 border-2 transition-all duration-300 ${
          isSelected 
            ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
        }`}
      >
        {/* الأيقونة والحالة */}
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${colorGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <ServiceIcon className="w-5 h-5 text-white" />
          </div>
          
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected 
              ? 'bg-blue-500 border-blue-500' 
              : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'
          }`}>
            {isSelected && (
              <CheckCircle className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* محتوى الخدمة */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-sm">
            {service.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className={`text-lg font-black bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent`}>
              {service.price}
            </span>
            <div className="flex items-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          {/* الميزات مضغوطة */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Clock className="w-3 h-3" />
              <span>30د</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Shield className="w-3 h-3" />
              <span>ضمان</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Zap className="w-3 h-3" />
              <span>فوري</span>
            </div>
          </div>
        </div>

        {/* تأثير الاختيار */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-xl pointer-events-none"></div>
        )}
      </Card>
    </div>
  );
};

export default ServiceCard;
