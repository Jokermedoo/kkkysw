import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ترجمات التطبيق
const translations = {
  ar: {
    // Header
    'site.title': 'KYCtrust - خدمات مالية رقمية موثوقة',
    'site.subtitle': 'منصة الخدمات المالية الرقمية الأولى في المنطقة',
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'حولنا',
    'nav.contact': 'تواصل معنا',
    
    // Hero Section
    'hero.title': 'منصة KYCtrust',
    'hero.subtitle': 'خدمات مالية رقمية موثوقة وآمنة',
    'hero.description': 'احصل على حساباتك المالية الرقمية بسرعة وأمان. نحن نقدم أفضل الخدمات بأسعار تنافسية وضمان مدى الحياة.',
    'hero.cta': 'ابدأ الآن',
    'hero.learn_more': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا المالية',
    'services.subtitle': 'نقدم مجموعة شاملة من الخدمات المالية الرقمية',
    'services.order_now': 'اطلب الآن',
    'services.via_whatsapp': 'عبر واتساب',
    
    // Features
    'features.title': 'لماذا تختارنا؟',
    'features.fast_delivery': 'تسليم سريع',
    'features.fast_delivery_desc': 'خلال 30 دقيقة',
    'features.lifetime_warranty': 'ضمان مدى الحياة',
    'features.lifetime_warranty_desc': 'حماية كاملة',
    'features.support': 'دعم فني 24/7',
    'features.support_desc': 'مساعدة مستمرة',
    'features.competitive_prices': 'أسعار تنافسية',
    'features.competitive_prices_desc': 'أفضل العروض',
    'features.security': 'أمان عالي',
    'features.security_desc': 'حماية متطورة',
    'features.trust': 'موثوقية',
    'features.trust_desc': 'سمعة ممتازة',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.whatsapp': 'واتساب',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.company': 'KYCtrust',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح',
  },
  en: {
    // Header
    'site.title': 'KYCtrust - Trusted Digital Financial Services',
    'site.subtitle': 'The leading digital financial services platform in the region',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'KYCtrust Platform',
    'hero.subtitle': 'Trusted and Secure Digital Financial Services',
    'hero.description': 'Get your digital financial accounts quickly and securely. We offer the best services at competitive prices with lifetime warranty.',
    'hero.cta': 'Get Started',
    'hero.learn_more': 'Learn More',
    
    // Services
    'services.title': 'Our Financial Services',
    'services.subtitle': 'We provide a comprehensive range of digital financial services',
    'services.order_now': 'Order Now',
    'services.via_whatsapp': 'via WhatsApp',
    
    // Features
    'features.title': 'Why Choose Us?',
    'features.fast_delivery': 'Fast Delivery',
    'features.fast_delivery_desc': 'Within 30 minutes',
    'features.lifetime_warranty': 'Lifetime Warranty',
    'features.lifetime_warranty_desc': 'Complete protection',
    'features.support': '24/7 Support',
    'features.support_desc': 'Continuous assistance',
    'features.competitive_prices': 'Competitive Prices',
    'features.competitive_prices_desc': 'Best offers',
    'features.security': 'High Security',
    'features.security_desc': 'Advanced protection',
    'features.trust': 'Reliability',
    'features.trust_desc': 'Excellent reputation',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.company': 'KYCtrust',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('ar');

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    
    // إعداد اتجاه النص
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage || 'ar';
  }, []);

  // تطبيق الثيم على الـ HTML
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // تطبيق اللغة
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // دالة الترجمة
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: ThemeContextType = {
    theme,
    language,
    toggleTheme,
    toggleLanguage,
    t,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
