import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { servicesService, paymentMethodsService, ordersService, siteSettingsService } from '../services/database';

export interface Service {
  id: string;
  name: string;
  price: string;
  order: number;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  details: string;
  active: boolean;
}

export interface SiteSettings {
  title: string;
  description: string;
  orderNotice: string;
  customization?: string; // JSON string for custom settings
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  whatsappNumber?: string;
  emailAddress?: string;
}

export interface Order {
  id: string;
  customerName: string;
  serviceName: string;
  notes: string;
  timestamp: Date;
  archived: boolean;
}

interface DataContextType {
  services: Service[];
  paymentMethods: PaymentMethod[];
  siteSettings: SiteSettings;
  orders: Order[];
  loading: boolean;
  error: string | null;
  updateService: (id: string, updates: Partial<Service>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  deletePaymentMethod: (id: string) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
  archiveOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultServices: Service[] = [
  { id: '1', name: 'Payoneer', price: '30$', order: 1, active: true },
  { id: '2', name: 'Wise', price: '30$', order: 2, active: true },
  { id: '3', name: 'Skrill', price: '20$', order: 3, active: true },
  { id: '4', name: 'Neteller', price: '20$', order: 4, active: true },
  { id: '5', name: 'Kast', price: '20$', order: 5, active: true },
  { id: '6', name: 'Redotpay', price: '20$', order: 6, active: true },
  { id: '7', name: 'Okx', price: '20$', order: 7, active: true },
  { id: '8', name: 'World First', price: '20$', order: 8, active: true },
  { id: '9', name: 'Bybit', price: '20$', order: 9, active: true },
  { id: '10', name: 'Bitget', price: '20$', order: 10, active: true },
  { id: '11', name: 'Kucoin', price: '20$', order: 11, active: true },
  { id: '12', name: 'PayPal', price: '15$', order: 12, active: true },
  { id: '13', name: 'Mexc', price: '20$', order: 13, active: true },
  { id: '14', name: 'Exness', price: '20$', order: 14, active: true },
  { id: '15', name: 'شحن رصيد فودافون', price: '100 جنيه = 120 جنيه', order: 15, active: true },
  { id: '16', name: 'سحب أرباح من TikTok', price: 'حسب الاتفاق', order: 16, active: true },
  { id: '17', name: 'سحب أرباح من PayPal', price: 'حسب الاتفاق', order: 17, active: true },
];

const defaultPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Vodafone Cash', details: '01062453344', active: true },
  { id: '2', name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', active: true },
];

const defaultSiteSettings: SiteSettings = {
  title: 'KYCtrust - خدمات مالية رقمية موثوقة',
  description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
  orderNotice: 'سيتم التواصل معك يدويًا عبر واتساب بعد إرسال الطلب.',
  primaryColor: '#3B82F6',
  secondaryColor: '#6366F1',
  whatsappNumber: '201062453344',
  emailAddress: 'support@kyctrust.com'
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      // جرب تحميل البيانات من قاعدة البيانات مع timeout
      const loadDataWithTimeout = (promise: Promise<any>, timeout = 5000) => {
        return Promise.race([
          promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Database timeout')), timeout)
          )
        ]);
      };

      try {
        const [servicesData, paymentMethodsData, ordersData, siteSettingsData] = await Promise.all([
          loadDataWithTimeout(servicesService.getAll()),
          loadDataWithTimeout(paymentMethodsService.getAll()),
          loadDataWithTimeout(ordersService.getAll()),
          loadDataWithTimeout(siteSettingsService.get()).catch(() => defaultSiteSettings)
        ]);

        setServices(servicesData);
        setPaymentMethods(paymentMethodsData);
        setOrders(ordersData);
        setSiteSettings(siteSettingsData);
        setError(null);
      } catch (dbError) {
        console.warn('Database not available, using fallback data:', dbError);
        throw dbError;
      }
    } catch (err) {
      console.error('Using fallback data due to error:', err);

      // استخدم البيانات الاحتياطية من localStorage أو البيانات الافتراضية
      const savedServices = localStorage.getItem('kyctrust_services');
      const savedPaymentMethods = localStorage.getItem('kyctrust_payment_methods');
      const savedSiteSettings = localStorage.getItem('kyctrust_site_settings');
      const savedOrders = localStorage.getItem('kyctrust_orders');

      setServices(savedServices ? JSON.parse(savedServices) : defaultServices);
      setPaymentMethods(savedPaymentMethods ? JSON.parse(savedPaymentMethods) : defaultPaymentMethods);
      setSiteSettings(savedSiteSettings ? JSON.parse(savedSiteSettings) : defaultSiteSettings);

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        })));
      } else {
        setOrders([]);
      }

      // اعرض تحذيراً بدلاً من خطأ إذا كانت البيانات الاحتياطية متوفرة
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      // حاول التحديث في قاعدة البيانات أولاً
      let updatedService;
      try {
        updatedService = await servicesService.update(id, updates);
      } catch (dbError) {
        // إذا فشل، استخدم البيانات المحلية
        const service = services.find(s => s.id === id);
        if (!service) throw new Error('Service not found');
        updatedService = { ...service, ...updates };
      }

      const updatedServices = services.map(service =>
        service.id === id ? updatedService : service
      );
      setServices(updatedServices);
      saveToStorage('kyctrust_services', updatedServices);
      toast.success('تم تحديث الخدمة بنجاح');
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('حدث خطأ في تحديث الخدمة');
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      let newService;
      try {
        newService = await servicesService.create(service);
      } catch (dbError) {
        // إذا فشل، أنشئ معرف محلي
        newService = {
          ...service,
          id: Date.now().toString()
        };
      }

      const updatedServices = [...services, newService];
      setServices(updatedServices);
      saveToStorage('kyctrust_services', updatedServices);
      toast.success('تم إضافة الخدمة بنجاح');
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('حدث خطأ في إضافة الخدمة');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await servicesService.delete(id);
      const updatedServices = services.filter(service => service.id !== id);
      setServices(updatedServices);
      saveToStorage('kyctrust_services', updatedServices);
      toast.success('تم حذف الخدمة بنجاح');
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('حدث خطأ في حذف الخدمة');
    }
  };

  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    try {
      const updatedMethod = await paymentMethodsService.update(id, updates);
      const updatedMethods = paymentMethods.map(method =>
        method.id === id ? updatedMethod : method
      );
      setPaymentMethods(updatedMethods);
      saveToStorage('kyctrust_payment_methods', updatedMethods);
      toast.success('تم تحديث طريقة الدفع بنجاح');
    } catch (err) {
      console.error('Error updating payment method:', err);
      toast.error('حدث خطأ في تحديث طريقة الدفع');
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    try {
      const newMethod = await paymentMethodsService.create(method);
      const updatedMethods = [...paymentMethods, newMethod];
      setPaymentMethods(updatedMethods);
      saveToStorage('kyctrust_payment_methods', updatedMethods);
      toast.success('تم إضافة طريقة الدفع بنجاح');
    } catch (err) {
      console.error('Error adding payment method:', err);
      toast.error('حدث خطأ في إضافة طريقة الدفع');
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await paymentMethodsService.delete(id);
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
      setPaymentMethods(updatedMethods);
      saveToStorage('kyctrust_payment_methods', updatedMethods);
      toast.success('تم حذف طريقة الدفع بنجاح');
    } catch (err) {
      console.error('Error deleting payment method:', err);
      toast.error('حدث خطأ في حذف طريقة الدفع');
    }
  };

  const updateSiteSettings = async (settings: SiteSettings) => {
    try {
      const updatedSettings = await siteSettingsService.update(settings);
      setSiteSettings(updatedSettings);
      saveToStorage('kyctrust_site_settings', updatedSettings);
      toast.success('تم تحديث إعدادات الموق�� بنجاح');
    } catch (err) {
      console.error('Error updating site settings:', err);
      toast.error('حدث خطأ في تحديث إعدادات الموقع');
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'timestamp'>) => {
    try {
      let newOrder;
      try {
        newOrder = await ordersService.create(order);
      } catch (dbError) {
        // إذا فشل، أنشئ طلب محلي
        newOrder = {
          ...order,
          id: Date.now().toString(),
          timestamp: new Date()
        };
      }

      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      saveToStorage('kyctrust_orders', updatedOrders);
      toast.success('تم إرسال الطلب بنجاح! سيتم التواصل معك قريباً');
    } catch (err) {
      console.error('Error adding order:', err);
      toast.error('حدث خطأ في إرسال الطلب');
    }
  };

  const archiveOrder = async (id: string) => {
    try {
      const updatedOrder = await ordersService.update(id, { archived: true });
      const updatedOrders = orders.map(order =>
        order.id === id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      saveToStorage('kyctrust_orders', updatedOrders);
      toast.success('تم أ��شفة الطلب بنجاح');
    } catch (err) {
      console.error('Error archiving order:', err);
      toast.error('حدث خطأ في أرشفة الطلب');
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await ordersService.delete(id);
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);
      saveToStorage('kyctrust_orders', updatedOrders);
      toast.success('تم حذف الطلب بنجاح');
    } catch (err) {
      console.error('Error deleting order:', err);
      toast.error('حدث خطأ في حذف الطلب');
    }
  };

  const value: DataContextType = {
    services,
    paymentMethods,
    siteSettings,
    orders,
    loading,
    error,
    updateService,
    addService,
    deleteService,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
    updateSiteSettings,
    addOrder,
    archiveOrder,
    deleteOrder,
    refreshData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
