import { supabase, DatabaseService, DatabasePaymentMethod, DatabaseOrder, DatabaseSiteSettings, handleSupabaseError } from '../lib/supabase';
import { Service, PaymentMethod, Order, SiteSettings } from '../context/DataContext';

// خدمات الجدول الرئيسي
export const servicesService = {
  async getAll(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw new Error(handleSupabaseError(error));

      return data?.map((item: DatabaseService) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order: item.order_index,
        active: item.active
      })) || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  }
};

export const paymentMethodsService = {
  async getAll(): Promise<PaymentMethod[]> {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw new Error(handleSupabaseError(error));

      return data?.map((item: DatabasePaymentMethod) => ({
        id: item.id,
        name: item.name,
        details: item.details,
        active: item.active
      })) || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  }
};

export const ordersService = {
  async getAll(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(handleSupabaseError(error));

      return data?.map((item: DatabaseOrder) => ({
        id: item.id,
        customerName: item.customer_name,
        serviceName: item.service_name,
        notes: item.notes,
        timestamp: new Date(item.created_at),
        archived: item.archived
      })) || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(order: Omit<Order, 'id' | 'timestamp'>): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: order.customerName,
          service_name: order.serviceName,
          notes: order.notes,
          archived: order.archived
        })
        .select()
        .single();

      if (error) throw new Error(handleSupabaseError(error));

      return {
        id: data.id,
        customerName: data.customer_name,
        serviceName: data.service_name,
        notes: data.notes,
        timestamp: new Date(data.created_at),
        archived: data.archived
      };
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  }
};

export const siteSettingsService = {
  async get(): Promise<SiteSettings> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) throw new Error(handleSupabaseError(error));

      return {
        title: data.title,
        description: data.description,
        orderNotice: data.order_notice
      };
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  }
};
