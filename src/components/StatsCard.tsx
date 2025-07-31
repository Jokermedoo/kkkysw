import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  description?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  description,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      icon: 'bg-blue-100 text-blue-600',
      change: 'text-blue-600'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      icon: 'bg-green-100 text-green-600',
      change: 'text-green-600'
    },
    yellow: {
      bg: 'from-yellow-500 to-yellow-600',
      icon: 'bg-yellow-100 text-yellow-600',
      change: 'text-yellow-600'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      icon: 'bg-red-100 text-red-600',
      change: 'text-red-600'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      icon: 'bg-purple-100 text-purple-600',
      change: 'text-purple-600'
    },
    indigo: {
      bg: 'from-indigo-500 to-indigo-600',
      icon: 'bg-indigo-100 text-indigo-600',
      change: 'text-indigo-600'
    }
  };

  const getChangeColor = () => {
    if (!change) return '';
    switch (change.type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    if (!change) return null;
    switch (change.type) {
      case 'positive':
        return '↗️';
      case 'negative':
        return '↘️';
      default:
        return '➡️';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className={`bg-gradient-to-r ${colorClasses[color].bg} p-4`}>
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full ${colorClasses[color].icon}`}>
            <Icon className="h-6 w-6" />
          </div>
          {change && (
            <div className={`text-sm font-medium ${getChangeColor()} bg-white bg-opacity-20 px-2 py-1 rounded-full`}>
              {getChangeIcon()} {change.value}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
