import React from 'react';
import { TrendingUp, TrendingDown, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface StatsData {
  totalServices: number;
  activeServices: number;
  totalOrders: number;
  completedOrders: number;
  averageResponseTime: string;
  customerSatisfaction: number;
}

interface StatsCardProps {
  stats: StatsData;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'إجمالي الخدمات',
      value: stats.totalServices,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'blue',
      change: '+2 هذا الشهر'
    },
    {
      label: 'الخدمات النشطة',
      value: stats.activeServices,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'green',
      change: 'جميع الخدمات متاحة'
    },
    {
      label: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: <Users className="h-6 w-6" />,
      color: 'purple',
      change: '+15% هذا الأسبوع'
    },
    {
      label: 'متوسط الاستجابة',
      value: stats.averageResponseTime,
      icon: <Clock className="h-6 w-6" />,
      color: 'orange',
      change: 'تحسن بنسبة 20%'
    },
    {
      label: 'رضا العملاء',
      value: `${stats.customerSatisfaction}%`,
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'indigo',
      change: 'تقييم ممتاز'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50',
      green: 'from-green-500 to-green-600 text-green-600 bg-green-50',
      purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50',
      orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50',
      indigo: 'from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statItems.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        const [gradientColors, textColor, bgColor] = colorClasses.split(' ');

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${gradientColors}`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className={`px-2 py-1 ${bgColor} rounded-full`}>
                <TrendingUp className={`h-4 w-4 ${textColor}`} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-xs ${textColor} font-medium`}>{stat.change}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
