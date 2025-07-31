import { supabase, DatabaseService, DatabasePaymentMethod, DatabaseOrder, DatabaseSiteSettings, handleSupabaseError } from '../lib/supabase';
import { Service, PaymentMethod, Order, SiteSettings } from '../context/DataContext';

// خدمات قاعدة البيانات للخدمات
export const servicesService = {
  async getAll(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Services fetch error:', error);
        throw new Error(handleSupabaseError(error));
      }

      if (!data) {
        console.warn('No services data returned');
        return [];
      }

      return data.map((item: DatabaseService) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order: item.order_index,
        active: item.active
      }));
    } catch (error) {
      console.error('Error in servicesService.getAll:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(service: Omit<Service, 'id'>): Promise<Service> {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          name: service.name,
          price: service.price,
          order_index: service.order,
          active: service.active
        })
        .select()
        .single();

      if (error) {
        console.error('Service create error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        order: data.order_index,
        active: data.active
      };
    } catch (error) {
      console.error('Error in servicesService.create:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(id: string, updates: Partial<Service>): Promise<Service> {
    try {
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.order !== undefined) updateData.order_index = updates.order;
      if (updates.active !== undefined) updateData.active = updates.active;

      const { data, error } = await supabase
        .from('services')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Service update error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        order: data.order_index,
        active: data.active
      };
    } catch (error) {
      console.error('Error in servicesService.update:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Service delete error:', error);
        throw new Error(handleSupabaseError(error));
      }
    } catch (error) {
      console.error('Error in servicesService.delete:', error);
      throw new Error(handleSupabaseError(error));
    }
  }
};

// خدمات قاعدة البي��نات لطرق الدفع
export const paymentMethodsService = {
  async getAll(): Promise<PaymentMethod[]> {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Payment methods fetch error:', error);
        throw new Error(handleSupabaseError(error));
      }

      if (!data) {
        console.warn('No payment methods data returned');
        return [];
      }

      return data.map((item: DatabasePaymentMethod) => ({
        id: item.id,
        name: item.name,
        details: item.details,
        active: item.active
      }));
    } catch (error) {
      console.error('Error in paymentMethodsService.getAll:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(method: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .insert({
          name: method.name,
          details: method.details,
          active: method.active
        })
        .select()
        .single();

      if (error) {
        console.error('Payment method create error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        name: data.name,
        details: data.details,
        active: data.active
      };
    } catch (error) {
      console.error('Error in paymentMethodsService.create:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Payment method update error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        name: data.name,
        details: data.details,
        active: data.active
      };
    } catch (error) {
      console.error('Error in paymentMethodsService.update:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Payment method delete error:', error);
        throw new Error(handleSupabaseError(error));
      }
    } catch (error) {
      console.error('Error in paymentMethodsService.delete:', error);
      throw new Error(handleSupabaseError(error));
    }
  }
};

// خدمات قاعدة البيانات للطلبات
export const ordersService = {
  async getAll(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Orders fetch error:', error);
        throw new Error(handleSupabaseError(error));
      }

      if (!data) {
        console.warn('No orders data returned');
        return [];
      }

      return data.map((item: DatabaseOrder) => ({
        id: item.id,
        customerName: item.customer_name,
        serviceName: item.service_name,
        notes: item.notes,
        timestamp: new Date(item.created_at),
        archived: item.archived
      }));
    } catch (error) {
      console.error('Error in ordersService.getAll:', error);
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

      if (error) {
        console.error('Order create error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        customerName: data.customer_name,
        serviceName: data.service_name,
        notes: data.notes,
        timestamp: new Date(data.created_at),
        archived: data.archived
      };
    } catch (error) {
      console.error('Error in ordersService.create:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(id: string, updates: Partial<Order>): Promise<Order> {
    try {
      const updateData: any = {};
      if (updates.customerName !== undefined) updateData.customer_name = updates.customerName;
      if (updates.serviceName !== undefined) updateData.service_name = updates.serviceName;
      if (updates.notes !== undefined) updateData.notes = updates.notes;
      if (updates.archived !== undefined) updateData.archived = updates.archived;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Order update error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        id: data.id,
        customerName: data.customer_name,
        serviceName: data.service_name,
        notes: data.notes,
        timestamp: new Date(data.created_at),
        archived: data.archived
      };
    } catch (error) {
      console.error('Error in ordersService.update:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Order delete error:', error);
        throw new Error(handleSupabaseError(error));
      }
    } catch (error) {
      console.error('Error in ordersService.delete:', error);
      throw new Error(handleSupabaseError(error));
    }
  }
};

// خدمات قاعدة البيانات لإعدادات الموقع
export const siteSettingsService = {
  async get(): Promise<SiteSettings> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Site settings fetch error:', error);
        throw new Error(handleSupabaseError(error));
      }

      return {
        title: data.title,
        description: data.description,
        orderNotice: data.order_notice
      };
    } catch (error) {
      console.error('Error in siteSettingsService.get:', error);
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(settings: SiteSettings): Promise<SiteSettings> {
    try {
      // أولاً نحاول الحصول على الإعدادات الحالية
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .single();

      let result;
      if (existing) {
        // تحديث الإعدادات الموجودة
        const { data, error } = await supabase
          .from('site_settings')
          .update({
            title: settings.title,
            description: settings.description,
            order_notice: settings.orderNotice
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          console.error('Site settings update error:', error);
          throw new Error(handleSupabaseError(error));
        }
        result = data;
      } else {
        // إنشاء إعدادات جديدة
        const { data, error } = await supabase
          .from('site_settings')
          .insert({
            title: settings.title,
            description: settings.description,
            order_notice: settings.orderNotice
          })
          .select()
          .single();

        if (error) {
          console.error('Site settings create error:', error);
          throw new Error(handleSupabaseError(error));
        }
        result = data;
      }

      return {
        title: result.title,
        description: result.description,
        orderNotice: result.order_notice
      };
    } catch (error) {
      console.error('Error in siteSettingsService.update:', error);
      throw new Error(handleSupabaseError(error));
    }
  }
};
