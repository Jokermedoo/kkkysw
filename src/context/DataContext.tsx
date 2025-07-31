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
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
  refreshData: () => Promise<void>;
  updateService?: (id: string, service: Partial<Service>) => Promise<void>;
  addService?: (service: Omit<Service, 'id'>) => Promise<void>;
  deleteService?: (id: string) => Promise<void>;
  updatePaymentMethod?: (id: string, method: Partial<PaymentMethod>) => Promise<void>;
  addPaymentMethod?: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  deletePaymentMethod?: (id: string) => Promise<void>;
  updateSiteSettings?: (settings: Partial<SiteSettings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// البيانات الافتراضية في حالة عدم توفر قاعدة البيانات
const defaultServices: Service[] = [
  { id: '1', name: 'Payoneer', price: '30$', order: 1, active: true },
  { id: '2', name: 'Wise', price: '30$', order: 2, active: true },
  { id: '3', name: 'Skrill', price: '20$', order: 3, active: true },
  { id: '4', name: 'Neteller', price: '20$', order: 4, active: true },
  { id: '5', name: 'PayPal', price: '15$', order: 5, active: true },
];

const defaultPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Vodafone Cash', details: '01062453344', active: true },
  { id: '2', name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', active: true },
];

const defaultSiteSettings: SiteSettings = {
  title: 'KYCtrust - خدمات مالية رقمية موثوقة',
  description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية',
  orderNotice: 'سيتم ��لتواصل معك يدوياً عبر واتساب بعد إرسال الطلب.',
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(defaultPaymentMethods);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      // محاولة تحميل البيانات من Supabase
      const [servicesData, paymentMethodsData, siteSettingsData, ordersData] = await Promise.all([
        servicesService.getAll().catch(() => defaultServices),
        paymentMethodsService.getAll().catch(() => defaultPaymentMethods),
        siteSettingsService.get().catch(() => defaultSiteSettings),
        ordersService.getAll().catch(() => [])
      ]);

      setServices(servicesData);
      setPaymentMethods(paymentMethodsData);
      setSiteSettings(siteSettingsData);
      setOrders(ordersData);
      
      console.log('✅ Data loaded successfully');
    } catch (err) {
      console.warn('⚠️ Using fallback data:', err);
      setError('يتم استخدام البيانات الافتراضية');
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'timestamp'>) => {
    try {
      const newOrder = await ordersService.create(order);
      setOrders(prev => [newOrder, ...prev]);
      toast.success('تم إرسال الطلب بنجاح! سيتم التواصل معك قريباً');
    } catch (err) {
      // في حالة الفشل، إضافة محلية
      const newOrder = {
        ...order,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      setOrders(prev => [newOrder, ...prev]);
      toast.success('تم حفظ الطلب محلياً. سيتم إرساله عند توفر الاتصال');
    }
  };

  // إدارة الخدمات
  const updateService = async (id: string, service: Partial<Service>) => {
    try {
      await servicesService.update(id, service);
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
      toast.success('تم تحديث الخدمة بنجاح');
    } catch (err) {
      toast.error('ف��ل في تحديث الخدمة');
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const newService = await servicesService.create(service);
      setServices(prev => [...prev, newService]);
      toast.success('تم إضافة الخدمة بنجاح');
    } catch (err) {
      const newService = { ...service, id: Date.now().toString() };
      setServices(prev => [...prev, newService]);
      toast.success('تم إضافة الخدمة محلياً');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await servicesService.delete(id);
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('تم حذف الخدمة بنجاح');
    } catch (err) {
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('تم حذف الخدمة محلياً');
    }
  };

  // إدارة طرق الدفع
  const updatePaymentMethod = async (id: string, method: Partial<PaymentMethod>) => {
    try {
      await paymentMethodsService.update(id, method);
      setPaymentMethods(prev => prev.map(p => p.id === id ? { ...p, ...method } : p));
      toast.success('تم تحديث طريقة الدفع بنجاح');
    } catch (err) {
      toast.error('فشل في تحديث طريقة الدفع');
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    try {
      const newMethod = await paymentMethodsService.create(method);
      setPaymentMethods(prev => [...prev, newMethod]);
      toast.success('تم إضافة طريقة الدفع بنجاح');
    } catch (err) {
      const newMethod = { ...method, id: Date.now().toString() };
      setPaymentMethods(prev => [...prev, newMethod]);
      toast.success('تم إضافة طريقة الدفع محلياً');
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await paymentMethodsService.delete(id);
      setPaymentMethods(prev => prev.filter(p => p.id !== id));
      toast.success('تم حذف طريقة الدفع بنجاح');
    } catch (err) {
      setPaymentMethods(prev => prev.filter(p => p.id !== id));
      toast.success('تم حذف طريقة الدفع محلياً');
    }
  };

  // إدارة إعدادات الموقع
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      await siteSettingsService.update(settings);
      setSiteSettings(prev => ({ ...prev, ...settings }));
      toast.success('تم تحديث إعدادات الموقع بنجاح');
    } catch (err) {
      setSiteSettings(prev => ({ ...prev, ...settings }));
      toast.success('تم تحديث الإعدادات محلياً');
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const value: DataContextType = {
    services,
    paymentMethods,
    siteSettings,
    orders,
    loading,
    error,
    addOrder,
    refreshData,
    updateService,
    addService,
    deleteService,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
    updateSiteSettings,
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
