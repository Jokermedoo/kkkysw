import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Clock, 
  Star, Award, Shield, Zap 
} from 'lucide-react';

interface StatsData {
  totalOrders: number;
  completedOrders: number;
  activeUsers: number;
  revenue: number;
  responseTime: number;
  satisfaction: number;
  uptime: number;
  services: number;
}

const AdvancedStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalOrders: 0,
    completedOrders: 0,
    activeUsers: 0,
    revenue: 0,
    responseTime: 0,
    satisfaction: 0,
    uptime: 0,
    services: 0
  });

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      setStats({
        totalOrders: 1247,
        completedOrders: 1189,
        activeUsers: 856,
        revenue: 45780,
        responseTime: 15,
        satisfaction: 98.5,
        uptime: 99.9,
        services: 17
      });
      setAnimationKey(1);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const animateNumber = (target: number, duration: number = 2000) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (animationKey === 0) return;

      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCurrent(target);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target, duration, animationKey]);

    return current;
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    suffix = '', 
    color, 
    description 
  }: {
    icon: any;
    title: string;
    value: number;
    suffix?: string;
    color: string;
    description: string;
  }) => {
    const animatedValue = animateNumber(value);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {animatedValue.toLocaleString('ar-EG')}{suffix}
            </div>
            <div className="text-sm text-gray-600">{title}</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 border-t pt-3">
          {description}
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            إحصائياتنا المتميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            أرقام حقيقية تعكس جودة خدماتنا وثقة عملائنا بنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Users}
            title="إجمالي الطلبات"
            value={stats.totalOrders}
            color="from-blue-500 to-blue-600"
            description="طلب مكتمل بنجاح"
          />
          
          <StatCard
            icon={Star}
            title="معدل الرضا"
            value={stats.satisfaction}
            suffix="%"
            color="from-green-500 to-green-600"
            description="من العملاء راضون عن خدماتنا"
          />
          
          <StatCard
            icon={Clock}
            title="سرعة الاستجابة"
            value={stats.responseTime}
            suffix=" دقيقة"
            color="from-purple-500 to-purple-600"
            description="متوسط وقت الرد على الطلبات"
          />
          
          <StatCard
            icon={Shield}
            title="وقت التشغيل"
            value={stats.uptime}
            suffix="%"
            color="from-orange-500 to-orange-600"
            description="موثوقية الخدمة على مدار الساعة"
          />
        </div>

        {/* إحصائيات تفصيلية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">الأداء الشهري</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الطلبات المكتملة</span>
                <div className="flex items-center space-x-reverse space-x-2">
                  <span className="font-semibold text-gray-900">{animateNumber(stats.completedOrders)}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(stats.completedOrders / stats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">العملاء النشطون</span>
                <div className="flex items-center space-x-reverse space-x-2">
                  <span className="font-semibold text-gray-900">{animateNumber(stats.activeUsers)}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الخدمات المتاحة</span>
                <div className="flex items-center space-x-reverse space-x-2">
                  <span className="font-semibold text-gray-900">{animateNumber(stats.services)}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">الإنجازات والجوائز</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">أفضل منصة خدمات مالية</h4>
                  <p className="text-sm text-gray-600">جائزة التميز التقني 2024</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">شهادة الأمان المعتمدة</h4>
                  <p className="text-sm text-gray-600">ISO 27001 معتمدة دولياً</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">أسرع منصة في المنطقة</h4>
                  <p className="text-sm text-gray-600">متوسط استجابة 15 دقيقة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* مؤشرات الثقة */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center space-x-reverse space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 mb-2">+{animateNumber(1000)}</div>
                <div className="text-green-700 text-sm">عميل سعيد</div>
              </div>
              <div className="w-px h-12 bg-green-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 mb-2">{animateNumber(24)}/7</div>
                <div className="text-green-700 text-sm">دعم مستمر</div>
              </div>
              <div className="w-px h-12 bg-green-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 mb-2">{animateNumber(99)}%</div>
                <div className="text-green-700 text-sm">معدل النجاح</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStats;
