import React, { useState } from 'react';
import { X, Send, User, MessageSquare, Phone, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import StatusNotification from './StatusNotification';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, serviceName }) => {
  const { addOrder } = useData();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsSubmitting(true);
    
    try {
      await addOrder({
        customerName: customerName.trim(),
        serviceName,
        notes: `${notes}\n\nتفاصيل الاتصال:\nالهاتف: ${phone}\nالإيميل: ${email}`.trim(),
        archived: false
      });

      setShowSuccess(true);
      
      // إعادة تعيين النموذج
      setCustomerName('');
      setPhone('');
      setEmail('');
      setNotes('');
      
      // إغلاق النافذة بعد 2 ثانية
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">طلب خدمة جديدة</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الخدمة المطلوبة
              </label>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3">
                <p className="text-blue-800 font-semibold">{serviceName}</p>
              </div>
            </div>

            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline ml-1" />
                الاسم الكامل *
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline ml-1" />
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="01XXXXXXXXX"
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline ml-1" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline ml-1" />
                ملاحظات إضافية
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="أي تفاصيل إضافية تود إضافتها..."
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 سيتم التواصل معك عبر واتساب خلال 30 دقيقة لتأكيد الطلب وإرسال التفاصيل.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !customerName.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>إرسال الطلب</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <StatusNotification
          type="success"
          message="تم إرسال طلبك بنجاح! سنتواصل معك قريباً."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
};

export default OrderModal;
