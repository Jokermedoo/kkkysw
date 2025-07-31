import React, { useState } from 'react';
import { 
  Save, Upload, Download, Palette, Type, Image, 
  Globe, DollarSign, Star, Award, Users, Shield 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CustomizationSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    primaryFont: string;
    secondaryFont: string;
    fontSize: string;
  };
  branding: {
    logoUrl: string;
    faviconUrl: string;
    companyName: string;
    tagline: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
  };
  features: {
    feature1: { title: string; description: string; icon: string; };
    feature2: { title: string; description: string; icon: string; };
    feature3: { title: string; description: string; icon: string; };
    feature4: { title: string; description: string; icon: string; };
  };
  social: {
    whatsapp: string;
    telegram: string;
    email: string;
    website: string;
  };
}

const CustomizationManager: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [activeTab, setActiveTab] = useState('branding');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [customSettings, setCustomSettings] = useState<CustomizationSettings>({
    colors: {
      primary: '#3B82F6',
      secondary: '#6366F1', 
      accent: '#10B981',
      background: '#F8FAFC'
    },
    typography: {
      primaryFont: 'Arial',
      secondaryFont: 'Cairo',
      fontSize: 'medium'
    },
    branding: {
      logoUrl: '',
      faviconUrl: '',
      companyName: 'KYCtrust',
      tagline: 'خدمات مالية رقمية موثوقة'
    },
    hero: {
      title: 'KYCtrust - خدمات مالية رقمية موثوقة',
      subtitle: 'نقدم خدمات مالية رقمية احترافية وآم��ة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
      backgroundImage: '',
      ctaText: 'اختر خدمتك الآن'
    },
    features: {
      feature1: { 
        title: 'أمان عالي', 
        description: 'حماية كاملة لبياناتك ومعاملاتك المالية',
        icon: 'Shield'
      },
      feature2: { 
        title: 'سرعة فائقة', 
        description: 'معالجة سريعة للطلبات خلال دقائق',
        icon: 'Zap'
      },
      feature3: { 
        title: 'دعم متميز', 
        description: 'فريق دعم محترف متاح على مدار الساعة',
        icon: 'Users'
      },
      feature4: { 
        title: 'جودة مضمونة', 
        description: 'ضمان الجودة وإرجاع الأموال في حالة عدم الرضا',
        icon: 'Award'
      }
    },
    social: {
      whatsapp: '+201062453344',
      telegram: '@kyctrust',
      email: 'support@kyctrust.com',
      website: 'www.kyctrust.com'
    }
  });

  const tabs = [
    { id: 'branding', name: 'العلامة التجارية', icon: Palette },
    { id: 'hero', name: 'القسم الرئيسي', icon: Globe },
    { id: 'features', name: 'المميزات', icon: Star },
    { id: 'colors', name: 'الألوان', icon: Palette },
    { id: 'typography', name: 'الخطوط', icon: Type },
    { id: 'social', name: 'وسائل التواصل', icon: Users }
  ];

  const handleSave = async () => {
    try {
      await updateSiteSettings({
        ...siteSettings,
        title: customSettings.hero.title,
        description: customSettings.hero.subtitle,
        customization: JSON.stringify(customSettings)
      });
      alert('تم حفظ الإعدادات بنجاح!');
    } catch (error) {
      alert('حدث خطأ في حفظ الإعدادات');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(customSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kyctrust-customization.json';
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setCustomSettings(imported);
          alert('تم استيراد الإعدادات بنجاح!');
        } catch (error) {
          alert('ملف الإعدادات غير صحيح');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderBrandingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الشركة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
            <input
              type="text"
              value={customSettings.branding.companyName}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                branding: { ...customSettings.branding, companyName: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الشعار</label>
            <input
              type="text"
              value={customSettings.branding.tagline}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                branding: { ...customSettings.branding, tagline: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
            <input
              type="url"
              value={customSettings.branding.logoUrl}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                branding: { ...customSettings.branding, logoUrl: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رابط الأيقونة</label>
            <input
              type="url"
              value={customSettings.branding.faviconUrl}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                branding: { ...customSettings.branding, faviconUrl: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/favicon.ico"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHeroTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">القسم الرئيسي</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الرئيسي</label>
            <input
              type="text"
              value={customSettings.hero.title}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                hero: { ...customSettings.hero, title: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">النص الفرعي</label>
            <textarea
              value={customSettings.hero.subtitle}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                hero: { ...customSettings.hero, subtitle: e.target.value }
              })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نص الزر الرئيسي</label>
            <input
              type="text"
              value={customSettings.hero.ctaText}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                hero: { ...customSettings.hero, ctaText: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الخلفية</label>
            <input
              type="url"
              value={customSettings.hero.backgroundImage}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                hero: { ...customSettings.hero, backgroundImage: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/bg-image.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderColorsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">نظام الألوان</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
            <div className="flex items-center space-x-reverse space-x-2">
              <input
                type="color"
                value={customSettings.colors.primary}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, primary: e.target.value }
                })}
                className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customSettings.colors.primary}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, primary: e.target.value }
                })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
            <div className="flex items-center space-x-reverse space-x-2">
              <input
                type="color"
                value={customSettings.colors.secondary}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, secondary: e.target.value }
                })}
                className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customSettings.colors.secondary}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, secondary: e.target.value }
                })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">لون التمييز</label>
            <div className="flex items-center space-x-reverse space-x-2">
              <input
                type="color"
                value={customSettings.colors.accent}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, accent: e.target.value }
                })}
                className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customSettings.colors.accent}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, accent: e.target.value }
                })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">لون الخلفية</label>
            <div className="flex items-center space-x-reverse space-x-2">
              <input
                type="color"
                value={customSettings.colors.background}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, background: e.target.value }
                })}
                className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={customSettings.colors.background}
                onChange={(e) => setCustomSettings({
                  ...customSettings,
                  colors: { ...customSettings.colors, background: e.target.value }
                })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">وسائل التواصل الاجتماعي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الواتساب</label>
            <input
              type="text"
              value={customSettings.social.whatsapp}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                social: { ...customSettings.social, whatsapp: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+201234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تليجرام</label>
            <input
              type="text"
              value={customSettings.social.telegram}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                social: { ...customSettings.social, telegram: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="@username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={customSettings.social.email}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                social: { ...customSettings.social, email: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="support@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
            <input
              type="url"
              value={customSettings.social.website}
              onChange={(e) => setCustomSettings({
                ...customSettings,
                social: { ...customSettings.social, website: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="www.example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'branding': return renderBrandingTab();
      case 'hero': return renderHeroTab();
      case 'colors': return renderColorsTab();
      case 'social': return renderSocialTab();
      default: return renderBrandingTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">إدارة التخصيص</h2>
          <div className="flex space-x-reverse space-x-4">
            <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center space-x-reverse space-x-2">
              <Upload className="h-4 w-4" />
              <span>استيراد</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleExport}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-reverse space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>تصدير</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-reverse space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>حفظ التغييرات</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-reverse overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-reverse space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default CustomizationManager;
