import { createClient, SupabaseClient } from '@supabase/supabase-js';

// بيانات الاتصال - يجب تحديثها بالبيانات الصحيحة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// إنشاء عميل Supabase
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// معالج أخطاء مبسط
export function handleSupabaseError(error: any): string {
  if (!error) return 'خطأ غير محدد';
  
  if (typeof error === 'string') return error;
  
  if (error.message) return error.message;
  
  if (error.code === '42P01') return 'الجدول غير موجود في قاعدة البيانات';
  if (error.code === 'PGRST116') return 'لا توجد بيانات';
  
  return 'خطأ في الاتصال بقاعدة البيانات';
}

// Types للجداول
export interface DatabaseService {
  id: string;
  name: string;
  price: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabasePaymentMethod {
  id: string;
  name: string;
  details: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  service_name: string;
  notes: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSiteSettings {
  id: string;
  title: string;
  description: string;
  order_notice: string;
  created_at: string;
  updated_at: string;
}

export default supabase;
