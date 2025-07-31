import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface StatusNotificationProps {
  type: 'success' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
}

const StatusNotification: React.FC<StatusNotificationProps> = ({
  type,
  message,
  onClose,
  autoClose = true
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full bg-white border-r-4 rounded-lg shadow-lg z-50 ${getStyles()} animate-slide-up`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="mr-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          {onClose && (
            <div className="flex-shrink-0">
              <button
                onClick={onClose}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusNotification;
