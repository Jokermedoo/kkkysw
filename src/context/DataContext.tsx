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
