import { createClient, SupabaseClient } from '@supabase/supabase-js';

// بيانات الاتصال
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpiffuofwjenizlufkgu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaWZmdW9md2plbml6bHVma2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjUzOTMsImV4cCI6MjA2OTUwMTM5M30.UgKIvthpQEJ4UoDk-ouCciZJq74uIuHqEAwi0mlpnFI';

// فحص بيانات الاتصال
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
}

// إنشاء عميل Supabase مع إعدادات محسنة
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'kyctrust-web@1.0.0'
    }
  }
});

// فحص الاتصال عند بدء التطبيق
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  error?: string;
  latency?: number;
}> {
  try {
    const startTime = performance.now();
    
    // محاولة قراءة بسيطة لاختبار الاتصال
    const { data, error } = await supabase
      .from('services')
      .select('count')
      .limit(1)
      .maybeSingle();
    
    const endTime = performance.now();
    const latency = endTime - startTime;
    
    if (error) {
      console.warn('⚠️ Supabase connection warning:', error.message);
      return {
        success: false,
        error: error.message,
        latency
      };
    }
    
    console.log('✅ Supabase connected successfully', `(${latency.toFixed(2)}ms)`);
    return {
      success: true,
      latency
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
    console.error('❌ Supabase connection failed:', errorMessage);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// معالج أخطاء محسن
export function handleSupabaseError(error: any): string {
  if (!error) return '';

  // تحويل الكائن إلى نص مفهوم
  if (typeof error === 'object') {
    if (error.message) {
      return error.message;
    }
    if (error.code) {
      switch (error.code) {
        case 'PGRST116':
          return 'لا توجد بيانات';
        case 'PGRST301':
          return 'غير مصرح بالوصول';
        case '23505':
          return 'البيانات موجودة بالفعل';
        case '23503':
          return 'لا يمكن حذف هذا العنصر';
        case 'NETWORK_ERROR':
          return 'خطأ في الشبكة';
        case 'TIMEOUT_ERROR':
          return 'انتهت مهلة الاتصال';
        default:
          return `خطأ قاعدة البيانات: ${error.code}`;
      }
    }
    // تحويل الكائن إلى JSON مقروء
    try {
      return JSON.stringify(error);
    } catch {
      return 'خطأ غير معروف في قاعدة البيانات';
    }
  }

  return String(error) || 'خطأ غير معروف';
}

// Types for database tables
export interface DatabaseService {
  id: string;
  name: string;
  price: string;
  order_index: number;
  active: boolean;
  description?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabasePaymentMethod {
  id: string;
  name: string;
  details: string;
  active: boolean;
  type?: string;
  instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  service_name: string;
  service_id?: string;
  notes: string;
  status: string;
  archived: boolean;
  priority?: string;
  amount?: number;
  currency?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSiteSettings {
  id: string;
  title: string;
  description: string;
  order_notice: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  whatsapp_number?: string;
  email_address?: string;
  customization?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseAdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

// تشغيل فحص الاتصال عند التحميل
testSupabaseConnection().catch(error => {
  console.error('Initial connection test failed:', error);
});

export default supabase;
