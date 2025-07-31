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

// معالج أخطاء محسن ومحدث
export function handleSupabaseError(error: any): string {
  // التعامل مع القيم الفارغة
  if (!error) return 'خطأ غير محدد';

  // التعامل مع النصوص المباشرة
  if (typeof error === 'string') {
    return error;
  }

  // التعامل مع الأرقام
  if (typeof error === 'number') {
    return `خطأ رقم: ${error}`;
  }

  // التعامل مع الكائنات
  if (typeof error === 'object') {
    // إذا كان Error object
    if (error instanceof Error) {
      return error.message || 'خطأ في النظام';
    }

    // إذا كان له خاصية message
    if (error.message && typeof error.message === 'string') {
      return error.message;
    }

    // إذا كان له خاصية details
    if (error.details && typeof error.details === 'string') {
      return error.details;
    }

    // التعامل مع أكواد Supabase المحددة
    if (error.code) {
      const errorCodes: { [key: string]: string } = {
        'PGRST116': 'لا توجد بيانات متاحة',
        'PGRST301': 'غير مصرح بالوصول إلى هذا المورد',
        'PGRST204': 'لا توجد نتائج',
        '23505': 'هذه البيانات موجودة بالفعل',
        '23503': 'لا يمكن حذف هذا العنصر لوجود ارتباطات',
        '23502': 'قيمة مطلوبة مفقودة',
        '42P01': 'الجدول غير موجود',
        '42703': 'العمود غير موجود',
        'NETWORK_ERROR': 'خطأ في اتصال الشبكة',
        'TIMEOUT_ERROR': 'انتهت مهلة الانتظار',
        'AUTH_ERROR': 'خطأ في المصادقة'
      };

      return errorCodes[error.code] || `خطأ في قاعدة البيانات (${error.code})`;
    }

    // إذا كان له خاصية hint
    if (error.hint) {
      return `تلميح: ${error.hint}`;
    }

    // محاولة استخراج أي نص مفيد من الكائن
    const errorKeys = ['error', 'statusText', 'description', 'title'];
    for (const key of errorKeys) {
      if (error[key] && typeof error[key] === 'string') {
        return error[key];
      }
    }

    // كحل أخير، تحويل الكائن إلى نص JSON مقروء
    try {
      const errorString = JSON.stringify(error, null, 2);
      // إذا كان الكائن فارغ
      if (errorString === '{}' || errorString === 'null') {
        return 'خطأ غير معروف في قاعدة البيانات';
      }
      // قطع النص إذا كان طويلاً جداً
      return errorString.length > 200
        ? `خطأ في قاعدة ال��يانات: ${errorString.substring(0, 200)}...`
        : `خطأ في قاعدة البيانات: ${errorString}`;
    } catch {
      return 'خطأ غير قابل للقراءة في قاعدة البيانات';
    }
  }

  // التعامل مع أي نوع آخر
  try {
    return String(error) || 'خطأ غير معروف';
  } catch {
    return 'خطأ غير قابل للتحويل';
  }
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
