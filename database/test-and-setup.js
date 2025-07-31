#!/usr/bin/env node

/**
 * KYCtrust Database Test and Setup Script
 * يقوم هذا السكريپت بفحص وإعداد قاعدة البيانات
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// بيانات الاتصال (يجب تحديثها)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://gpiffuofwjenizlufkgu.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaWZmdW9md2plbml6bHVma2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjUzOTMsImV4cCI6MjA2OTUwMTM5M30.UgKIvthpQEJ4UoDk-ouCciZJq74uIuHqEAwi0mlpnFI';

// إنشاء عميل Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// ألوان للطباعة
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// فحص الاتصال
async function testConnection() {
  log('\n🔍 Testing Supabase connection...', 'cyan');
  
  try {
    const startTime = Date.now();
    const { data, error } = await supabase
      .from('services')
      .select('count')
      .limit(1);
      
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    if (error) {
      log(`❌ Connection failed: ${error.message}`, 'red');
      return false;
    }
    
    log(`✅ Connection successful (${latency}ms)`, 'green');
    return true;
  } catch (err) {
    log(`❌ Connection error: ${err.message}`, 'red');
    return false;
  }
}

// فحص وجود جدول
async function checkTable(tableName) {
  try {
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      log(`  ❌ ${tableName}: ${error.message}`, 'red');
      return { name: tableName, exists: false, error: error.message };
    }

    log(`  ✅ ${tableName}: ${count} records`, 'green');
    return { name: tableName, exists: true, count: count || 0 };
  } catch (err) {
    log(`  ❌ ${tableName}: ${err.message}`, 'red');
    return { name: tableName, exists: false, error: err.message };
  }
}

// فحص جميع الجداول
async function checkAllTables() {
  log('\n📊 Checking database tables...', 'cyan');
  
  const results = [];
  for (const tableName of REQUIRED_TABLES) {
    const result = await checkTable(tableName);
    results.push(result);
  }
  
  const existing = results.filter(r => r.exists);
  const missing = results.filter(r => !r.exists);
  
  log(`\n📈 Summary: ${existing.length}/${REQUIRED_TABLES.length} tables exist`, 'blue');
  
  if (missing.length > 0) {
    log(`⚠️  Missing tables: ${missing.map(t => t.name).join(', ')}`, 'yellow');
  }
  
  return results;
}

// إنشاء جدول الخدمات
async function createServicesTable() {
  log('\n🔧 Creating services table...', 'cyan');
  
  try {
    // حذف الجدول إذا كان موجوداً
    await supabase.rpc('exec_sql', { 
      sql: 'DROP TABLE IF EXISTS public.services CASCADE;'
    });
    
    // إنشاء الجدول
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE public.services (
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
        
        ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow public access" ON public.services FOR ALL USING (true);
      `
    });

    if (error) {
      log(`❌ Failed to create services table: ${error.message}`, 'red');
      return false;
    }

    // إدراج البيانات الافتراضية
    const services = [
      { name: 'Payoneer', price: '30$', order_index: 1, active: true, category: 'digital_wallets' },
      { name: 'Wise', price: '30$', order_index: 2, active: true, category: 'digital_wallets' },
      { name: 'Skrill', price: '20$', order_index: 3, active: true, category: 'digital_wallets' },
      { name: 'PayPal', price: '15$', order_index: 4, active: true, category: 'digital_wallets' }
    ];

    const { error: insertError } = await supabase
      .from('services')
      .insert(services);

    if (insertError) {
      log(`⚠️ Warning inserting default services: ${insertError.message}`, 'yellow');
    } else {
      log(`✅ Services table created with ${services.length} default services`, 'green');
    }

    return true;
  } catch (err) {
    log(`❌ Error creating services table: ${err.message}`, 'red');
    return false;
  }
}

// إنشاء جدول طرق الدفع
async function createPaymentMethodsTable() {
  log('\n🔧 Creating payment_methods table...', 'cyan');
  
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TABLE IF EXISTS public.payment_methods CASCADE;
        
        CREATE TABLE public.payment_methods (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          details TEXT NOT NULL,
          active BOOLEAN DEFAULT true,
          type VARCHAR(50) DEFAULT 'bank',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow public access" ON public.payment_methods FOR ALL USING (true);
      `
    });

    if (error) {
      log(`❌ Failed to create payment_methods table: ${error.message}`, 'red');
      return false;
    }

    // إدراج البيانات الافتراضية
    const methods = [
      { name: 'Vodafone Cash', details: '01062453344', active: true, type: 'mobile_money' },
      { name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', active: true, type: 'cryptocurrency' }
    ];

    const { error: insertError } = await supabase
      .from('payment_methods')
      .insert(methods);

    if (insertError) {
      log(`⚠️ Warning inserting payment methods: ${insertError.message}`, 'yellow');
    } else {
      log(`✅ Payment methods table created with ${methods.length} default methods`, 'green');
    }

    return true;
  } catch (err) {
    log(`❌ Error creating payment_methods table: ${err.message}`, 'red');
    return false;
  }
}

// إنشاء جدول الإعدادات
async function createSiteSettingsTable() {
  log('\n🔧 Creating site_settings table...', 'cyan');
  
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TABLE IF EXISTS public.site_settings CASCADE;
        
        CREATE TABLE public.site_settings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title VARCHAR(500) NOT NULL DEFAULT 'KYCtrust - خدمات مالية رقمية موثوقة',
          description TEXT NOT NULL DEFAULT 'نقدم خدمات مالية رقمية احترافية وآمنة',
          order_notice TEXT DEFAULT 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب',
          whatsapp_number VARCHAR(50) DEFAULT '201062453344',
          email_address VARCHAR(255) DEFAULT 'support@kyctrust.com',
          primary_color VARCHAR(20) DEFAULT '#3B82F6',
          secondary_color VARCHAR(20) DEFAULT '#6366F1',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow public access" ON public.site_settings FOR ALL USING (true);
      `
    });

    if (error) {
      log(`❌ Failed to create site_settings table: ${error.message}`, 'red');
      return false;
    }

    // إدراج الإعدادات الافتراضية
    const { error: insertError } = await supabase
      .from('site_settings')
      .insert({
        title: 'KYCtrust - خدمات مالية رقمية موثوقة',
        description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
        order_notice: 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.'
      });

    if (insertError) {
      log(`⚠️ Warning inserting site settings: ${insertError.message}`, 'yellow');
    } else {
      log(`✅ Site settings table created with default settings`, 'green');
    }

    return true;
  } catch (err) {
    log(`❌ Error creating site_settings table: ${err.message}`, 'red');
    return false;
  }
}

// إنشاء جدول الطلبات
async function createOrdersTable() {
  log('\n🔧 Creating orders table...', 'cyan');
  
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TABLE IF EXISTS public.orders CASCADE;
        
        CREATE TABLE public.orders (
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
        CREATE POLICY "Allow public access" ON public.orders FOR ALL USING (true);
      `
    });

    if (error) {
      log(`❌ Failed to create orders table: ${error.message}`, 'red');
      return false;
    }

    log(`✅ Orders table created successfully`, 'green');
    return true;
  } catch (err) {
    log(`❌ Error creating orders table: ${err.message}`, 'red');
    return false;
  }
}

// إعداد قاعدة البيانات الكاملة
async function setupDatabase() {
  log('\n🚀 Setting up KYCtrust database...', 'magenta');
  
  const tasks = [
    { name: 'Services', func: createServicesTable },
    { name: 'Payment Methods', func: createPaymentMethodsTable },
    { name: 'Site Settings', func: createSiteSettingsTable },
    { name: 'Orders', func: createOrdersTable }
  ];
  
  let successCount = 0;
  
  for (const task of tasks) {
    const success = await task.func();
    if (success) successCount++;
  }
  
  log(`\n📊 Setup Summary: ${successCount}/${tasks.length} tables created successfully`, 'blue');
  
  if (successCount === tasks.length) {
    log('🎉 Database setup completed successfully!', 'green');
    return true;
  } else {
    log('⚠️ Some tables failed to create. Check the logs above.', 'yellow');
    return false;
  }
}

// الدالة الرئيسية
async function main() {
  log('='.repeat(50), 'cyan');
  log('KYCtrust Database Test & Setup Tool', 'bright');
  log('='.repeat(50), 'cyan');
  
  // فحص الاتصال
  const connected = await testConnection();
  if (!connected) {
    log('\n❌ Cannot proceed without database connection. Please check your credentials.', 'red');
    process.exit(1);
  }
  
  // فحص الجداول الحالية
  const tableResults = await checkAllTables();
  const missingTables = tableResults.filter(r => !r.exists);
  
  if (missingTables.length === 0) {
    log('\n✅ All required tables already exist. Database is ready!', 'green');
  } else {
    log(`\n🔧 Setting up ${missingTables.length} missing tables...`, 'yellow');
    await setupDatabase();
    
    // فحص نهائي
    log('\n🔍 Final verification...', 'cyan');
    await checkAllTables();
  }
  
  log('\n✨ Database setup process completed!', 'magenta');
}

// تشغيل الس��ريپت
if (require.main === module) {
  main().catch(err => {
    log(`\n💥 Unexpected error: ${err.message}`, 'red');
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  testConnection,
  checkAllTables,
  setupDatabase
};
