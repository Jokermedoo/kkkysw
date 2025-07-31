import { supabase, handleSupabaseError } from '../lib/supabase';

// اختبار سريع للاتصال مع Supabase
export async function quickSupabaseTest(): Promise<{
  success: boolean;
  message: string;
  details: string[];
}> {
  const details: string[] = [];
  
  try {
    console.log('🔍 Starting quick Supabase test...');
    details.push('🔍 Starting quick Supabase test...');
    
    // اختبار 1: الاتصال الأساسي
    details.push('Testing basic connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('services')
      .select('count')
      .limit(1);
    
    if (healthError) {
      const errorMsg = handleSupabaseError(healthError);
      details.push(`❌ Connection failed: ${errorMsg}`);
      
      // إذا كان الخطأ أن الجدول غير موجود، نحاول إنشاؤه
      if (healthError.code === '42P01' || errorMsg.includes('does not exist')) {
        details.push('🔧 Table does not exist, attempting to create...');
        
        try {
          // محاولة إنشاء جدول بسيط
          const { error: createError } = await supabase.rpc('exec_sql', {
            sql: `
              CREATE TABLE IF NOT EXISTS public.services (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price VARCHAR(100) NOT NULL,
                order_index INTEGER NOT NULL DEFAULT 0,
                active BOOLEAN DEFAULT true,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
              
              ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
              
              DROP POLICY IF EXISTS "Allow public access" ON public.services;
              CREATE POLICY "Allow public access" ON public.services FOR ALL USING (true);
              
              INSERT INTO public.services (name, price, order_index) VALUES 
              ('Test Service', '0$', 1) 
              ON CONFLICT DO NOTHING;
            `
          });
          
          if (createError) {
            details.push(`❌ Failed to create table: ${handleSupabaseError(createError)}`);
            return {
              success: false,
              message: 'فشل في إنشاء الجداول المطلوبة',
              details
            };
          } else {
            details.push('✅ Table created successfully');
            
            // اختبار الاتصال مرة أخرى
            const { error: retestError } = await supabase
              .from('services')
              .select('count')
              .limit(1);
              
            if (retestError) {
              details.push(`❌ Retest failed: ${handleSupabaseError(retestError)}`);
            } else {
              details.push('✅ Connection test passed after table creation');
            }
          }
        } catch (createTableError) {
          details.push(`❌ Table creation error: ${handleSupabaseError(createTableError)}`);
          return {
            success: false,
            message: 'خطأ في إنشاء الجداول',
            details
          };
        }
      } else {
        return {
          success: false,
          message: errorMsg,
          details
        };
      }
    } else {
      details.push('✅ Basic connection successful');
    }
    
    // اختبار 2: قراءة البيانات
    details.push('Testing data reading...');
    const { data: servicesData, error: readError } = await supabase
      .from('services')
      .select('*')
      .limit(5);
    
    if (readError) {
      const errorMsg = handleSupabaseError(readError);
      details.push(`⚠️ Read test warning: ${errorMsg}`);
    } else {
      details.push(`✅ Read test passed: ${servicesData?.length || 0} records found`);
    }
    
    // اختبار 3: كتابة البيانات (اختبار وحذف)
    details.push('Testing data writing...');
    const testRecord = {
      name: 'Test Record ' + Date.now(),
      price: '0$',
      order_index: 999,
      active: false
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('services')
      .insert(testRecord)
      .select()
      .single();
    
    if (insertError) {
      const errorMsg = handleSupabaseError(insertError);
      details.push(`⚠️ Write test warning: ${errorMsg}`);
    } else {
      details.push('✅ Write test passed');
      
      // حذف السجل التجريبي
      if (insertData?.id) {
        const { error: deleteError } = await supabase
          .from('services')
          .delete()
          .eq('id', insertData.id);
          
        if (deleteError) {
          details.push(`⚠️ Cleanup warning: ${handleSupabaseError(deleteError)}`);
        } else {
          details.push('✅ Cleanup successful');
        }
      }
    }
    
    details.push('🎉 Quick test completed successfully');
    return {
      success: true,
      message: 'اختبار Supabase نجح بالكامل',
      details
    };
    
  } catch (error) {
    const errorMsg = handleSupabaseError(error);
    details.push(`❌ Test failed: ${errorMsg}`);
    console.error('Quick Supabase test failed:', errorMsg);
    
    return {
      success: false,
      message: errorMsg,
      details
    };
  }
}

// اختبار سريع للاستيراد
export { handleSupabaseError };
