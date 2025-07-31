import { supabase, handleSupabaseError } from '../lib/supabase';

// نوع البيانات للتحقق من الجداول
interface TableCheckResult {
  name: string;
  exists: boolean;
  count?: number;
  error?: string;
}

// نوع البيانات لنتيجة الإعداد
interface SetupResult {
  success: boolean;
  message: string;
  details: string[];
  tables: TableCheckResult[];
}

// قائمة الجداول المطلوبة
const REQUIRED_TABLES = [
  'services',
  'payment_methods', 
  'site_settings',
  'orders',
  'admin_users',
  'activity_logs',
  'statistics'
];

// فحص وجود جدول معين
export async function checkTable(tableName: string): Promise<TableCheckResult> {
  try {
    console.log(`🔍 Checking table: ${tableName}`);
    
    // محاولة الوصول للجدول
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn(`⚠️ Table ${tableName} error:`, error.message);
      return {
        name: tableName,
        exists: false,
        error: handleSupabaseError(error)
      };
    }

    console.log(`✅ Table ${tableName} exists with ${count} records`);
    return {
      name: tableName,
      exists: true,
      count: count || 0
    };
  } catch (err) {
    console.error(`❌ Failed to check table ${tableName}:`, err);
    return {
      name: tableName,
      exists: false,
      error: handleSupabaseError(err)
    };
  }
}

// فحص جميع الجداول
export async function checkAllTables(): Promise<TableCheckResult[]> {
  console.log('🔍 Checking all required tables...');
  
  const results: TableCheckResult[] = [];
  
  for (const tableName of REQUIRED_TABLES) {
    const result = await checkTable(tableName);
    results.push(result);
    
    // انتظار قصير لتجنب تحميل الخادم
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

// إنشاء الجداول الأ��اسية باستخدام SQL
export async function createBasicTables(): Promise<SetupResult> {
  const details: string[] = [];
  
  try {
    console.log('🔧 Creating basic tables...');
    
    // إنشاء جدول الخدمات
    const servicesSQL = `
      CREATE TABLE IF NOT EXISTS public.services (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        active BOOLEAN DEFAULT true,
        description TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- تفعيل RLS
      ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
      
      -- إنشاء سياسة للقراءة العامة
      DROP POLICY IF EXISTS "Allow public read access" ON public.services;
      CREATE POLICY "Allow public read access" ON public.services
        FOR ALL USING (true);
    `;
    
    const { error: servicesError } = await supabase.rpc('exec_sql', { sql: servicesSQL });
    if (servicesError) {
      console.warn('⚠️ Services table creation warning:', servicesError);
    } else {
      details.push('✅ Services table created');
    }
    
    // إنشاء جدول طرق الدفع
    const paymentMethodsSQL = `
      CREATE TABLE IF NOT EXISTS public.payment_methods (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        active BOOLEAN DEFAULT true,
        type VARCHAR(50) DEFAULT 'bank',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read access" ON public.payment_methods;
      CREATE POLICY "Allow public read access" ON public.payment_methods
        FOR ALL USING (true);
    `;
    
    const { error: paymentError } = await supabase.rpc('exec_sql', { sql: paymentMethodsSQL });
    if (paymentError) {
      console.warn('⚠️ Payment methods table creation warning:', paymentError);
    } else {
      details.push('✅ Payment methods table created');
    }
    
    // إنشاء جدول الإعدادات
    const settingsSQL = `
      CREATE TABLE IF NOT EXISTS public.site_settings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(500) NOT NULL DEFAULT 'KYCtrust - خدمات مالية رقمية موثو��ة',
        description TEXT NOT NULL DEFAULT 'نقدم خدمات مالية رقمية احترافية وآمنة',
        order_notice TEXT DEFAULT 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب',
        whatsapp_number VARCHAR(50) DEFAULT '201062453344',
        email_address VARCHAR(255) DEFAULT 'support@kyctrust.com',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public read access" ON public.site_settings;
      CREATE POLICY "Allow public read access" ON public.site_settings
        FOR ALL USING (true);
    `;
    
    const { error: settingsError } = await supabase.rpc('exec_sql', { sql: settingsSQL });
    if (settingsError) {
      console.warn('⚠️ Site settings table creation warning:', settingsError);
    } else {
      details.push('✅ Site settings table created');
    }
    
    // إنشاء جدول الطلبات
    const ordersSQL = `
      CREATE TABLE IF NOT EXISTS public.orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        service_name VARCHAR(255) NOT NULL,
        notes TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        archived BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public access" ON public.orders;
      CREATE POLICY "Allow public access" ON public.orders
        FOR ALL USING (true);
    `;
    
    const { error: ordersError } = await supabase.rpc('exec_sql', { sql: ordersSQL });
    if (ordersError) {
      console.warn('⚠️ Orders table creation warning:', ordersError);
    } else {
      details.push('✅ Orders table created');
    }
    
    return {
      success: true,
      message: 'تم إنشاء الجداول الأساسية بنجاح',
      details,
      tables: await checkAllTables()
    };
    
  } catch (error) {
    console.error('❌ Failed to create basic tables:', error);
    return {
      success: false,
      message: `فشل في إنشاء الجداول: ${handleSupabaseError(error)}`,
      details,
      tables: []
    };
  }
}

// إدراج البيانات الافتراضية
export async function insertDefaultData(): Promise<SetupResult> {
  const details: string[] = [];
  
  try {
    console.log('📝 Inserting default data...');
    
    // إدراج الخدمات الافتراضية
    const defaultServices = [
      { name: 'Payoneer', price: '30$', order_index: 1, active: true, category: 'digital_wallets' },
      { name: 'Wise', price: '30$', order_index: 2, active: true, category: 'digital_wallets' },
      { name: 'Skrill', price: '20$', order_index: 3, active: true, category: 'digital_wallets' },
      { name: 'PayPal', price: '15$', order_index: 4, active: true, category: 'digital_wallets' },
    ];
    
    for (const service of defaultServices) {
      const { error } = await supabase
        .from('services')
        .upsert(service, { onConflict: 'name' });
        
      if (error) {
        console.warn(`⚠️ Service ${service.name} insertion warning:`, error);
      } else {
        details.push(`✅ Service ${service.name} added`);
      }
    }
    
    // إدراج طرق الدفع الافتراضية
    const defaultPaymentMethods = [
      { name: 'Vodafone Cash', details: '01062453344', active: true, type: 'mobile_money' },
      { name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', active: true, type: 'cryptocurrency' },
    ];
    
    for (const method of defaultPaymentMethods) {
      const { error } = await supabase
        .from('payment_methods')
        .upsert(method, { onConflict: 'name' });
        
      if (error) {
        console.warn(`⚠️ Payment method ${method.name} insertion warning:`, error);
      } else {
        details.push(`✅ Payment method ${method.name} added`);
      }
    }
    
    // إدراج الإعدادات الافتراضية
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);
      
    if (!existingSettings || existingSettings.length === 0) {
      const { error } = await supabase
        .from('site_settings')
        .insert({
          title: 'KYCtrust - خدمات مالية رقمية موثوقة',
          description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية',
          order_notice: 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب'
        });
        
      if (error) {
        console.warn('⚠️ Site settings insertion warning:', error);
      } else {
        details.push('✅ Site settings added');
      }
    }
    
    return {
      success: true,
      message: 'تم إدراج ال��يانات الافتراضية بنجاح',
      details,
      tables: await checkAllTables()
    };
    
  } catch (error) {
    console.error('❌ Failed to insert default data:', error);
    return {
      success: false,
      message: `فشل في إدراج البيانات: ${handleSupabaseError(error)}`,
      details,
      tables: []
    };
  }
}

// الإعداد الكامل للنظام
export async function setupSupabaseComplete(): Promise<SetupResult> {
  console.log('🚀 Starting complete Supabase setup...');
  
  try {
    // فحص الجداول الحالية
    const initialCheck = await checkAllTables();
    const missingTables = initialCheck.filter(t => !t.exists);
    
    if (missingTables.length === 0) {
      console.log('✅ All tables already exist');
      return {
        success: true,
        message: 'جميع الجداول موجودة ومهيأة',
        details: ['✅ جميع الجداول متوفرة'],
        tables: initialCheck
      };
    }
    
    // إنشاء الجداول المفقودة
    console.log(`📋 Missing tables: ${missingTables.map(t => t.name).join(', ')}`);
    const createResult = await createBasicTables();
    
    if (!createResult.success) {
      return createResult;
    }
    
    // إدراج ا��بيانات الافتراضية
    const dataResult = await insertDefaultData();
    
    // فحص نهائي
    const finalCheck = await checkAllTables();
    
    return {
      success: true,
      message: 'تم إعداد Supabase بنجاح وجميع الجداول جاهزة',
      details: [
        ...createResult.details,
        ...dataResult.details,
        '🎉 النظام جاهز للاستخدام'
      ],
      tables: finalCheck
    };
    
  } catch (error) {
    console.error('❌ Complete setup failed:', error);
    return {
      success: false,
      message: `فشل في الإعداد الكامل: ${handleSupabaseError(error)}`,
      details: [],
      tables: []
    };
  }
}

// اختبار الاتصال المتقدم
export async function testSupabaseConnectionAdvanced(): Promise<{
  connection: boolean;
  tables: TableCheckResult[];
  latency: number;
  details: string[];
}> {
  const startTime = performance.now();
  const details: string[] = [];
  
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // اختبار الاتصال الأساسي
    const { data, error } = await supabase
      .from('services')
      .select('count')
      .limit(1);
      
    const endTime = performance.now();
    const latency = endTime - startTime;
    
    if (error) {
      details.push(`❌ Connection failed: ${handleSupabaseError(error)}`);
      return {
        connection: false,
        tables: [],
        latency,
        details
      };
    }
    
    details.push('✅ Connection successful');
    
    // فحص الجداول
    const tables = await checkAllTables();
    const existingTables = tables.filter(t => t.exists);
    const missingTables = tables.filter(t => !t.exists);
    
    details.push(`📊 Existing tables: ${existingTables.length}/${REQUIRED_TABLES.length}`);
    
    if (missingTables.length > 0) {
      details.push(`⚠️ Missing tables: ${missingTables.map(t => t.name).join(', ')}`);
    }
    
    return {
      connection: true,
      tables,
      latency,
      details
    };
    
  } catch (err) {
    const endTime = performance.now();
    const latency = endTime - startTime;
    
    details.push(`❌ Connection test failed: ${handleSupabaseError(err)}`);
    
    return {
      connection: false,
      tables: [],
      latency,
      details
    };
  }
}
