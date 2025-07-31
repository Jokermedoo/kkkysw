import React, { useState } from 'react';
import { 
  Save, RefreshCw, Globe, MessageSquare, Phone, 
  Mail, MapPin, Clock, Settings, Eye, EyeOff
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const SiteSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [settings, setSettings] = useState({
    title: siteSettings.title,
    description: siteSettings.description,
    orderNotice: siteSettings.orderNotice,
  });
  
  const [contactInfo, setContactInfo] = useState({
    phone: '+20 106 245 3344',
    whatsapp: '201062453344',
    email: 'support@kyctrust.com',
    address: 'مصر، القاهرة',
    workingHours: '24/7 - متاح دائماً',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (updateSiteSettings) {
        await updateSiteSettings(settings);
      }
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('فشل في حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      title: siteSettings.title,
      description: siteSettings.description,
      orderNotice: siteSettings.orderNotice,
    });
    toast.info('تم إعادة تعيين الإعدادات');
  };

  return (
    <div className="space-y-6">
      
      {/* عنوان القسم */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                إعدادات الموقع
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                إدارة المعلومات الأساسية للموقع
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPreview ? 'إخفاء المعاينة' : 'معاينة'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* إعدادات الموقع الأساسية */}
        <div className="space-y-6">
          
          {/* معلومات الموقع */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 ml-2 text-blue-600" />
              معلومات الموقع
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان الموقع
                </label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => setSettings({...settings, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="عنوان الموقع"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وصف الموقع
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({...settings, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="وصف موجز للموقع"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  إشعار الطلبات
                </label>
                <textarea
                  value={settings.orderNotice}
                  onChange={(e) => setSettings({...settings, orderNotice: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="رسالة تظهر للعملاء عند الطلب"
                />
              </div>
            </div>
          </div>

          {/* معلومات التواصل */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Phone className="w-5 h-5 ml-2 text-green-600" />
              معلومات التواصل
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    واتساب
                  </label>
                  <input
                    type="text"
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  العنوان
                </label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ساعات العمل
                </label>
                <input
                  type="text"
                  value={contactInfo.workingHours}
                  onChange={(e) => setContactInfo({...contactInfo, workingHours: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* معاينة الإعدادات */}
        {showPreview && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Eye className="w-5 h-5 ml-2 text-purple-600" />
                معاينة النتيج��
              </h3>
              
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {settings.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {settings.description}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      <MessageSquare className="w-4 h-4 inline ml-1" />
                      {settings.orderNotice}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">معلومات التواصل:</h5>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 ml-2 text-blue-600" />
                      {contactInfo.phone}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 ml-2 text-green-600" />
                      {contactInfo.whatsapp}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 ml-2 text-purple-600" />
                      {contactInfo.email}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 ml-2 text-red-600" />
                      {contactInfo.address}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 ml-2 text-yellow-600" />
                      {contactInfo.workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                إحصائيات الموقع
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {settings.title.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">أحرف العنوان</div>
                </div>

                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {settings.description.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">أحرف الوصف</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* أزرار الحفظ */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة تعيين</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;
