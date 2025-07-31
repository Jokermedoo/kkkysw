-- إنشاء قاعدة البيانات لموقع KYCtrust
-- Database Schema for KYCtrust Platform

-- تفعيل Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-super-secret-jwt-token-here';

-- إنشاء جدول الخدمات
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT true,
    description TEXT,
    icon VARCHAR(100),
    category VARCHAR(100),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول طرق الدفع
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    type VARCHAR(50) DEFAULT 'bank',
    icon VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول الطلبات
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    service_name VARCHAR(255) NOT NULL,
    service_id UUID REFERENCES public.services(id),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    archived BOOLEAN DEFAULT false,
    priority VARCHAR(20) DEFAULT 'normal',
    amount DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    payment_method VARCHAR(100),
    tracking_number VARCHAR(100),
    completion_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL DEFAULT 'KYCtrust - خدمات مالية رقمية موثوقة',
    description TEXT NOT NULL DEFAULT 'نقدم خدمات مالية رقمية احترافية وآمنة',
    order_notice TEXT DEFAULT 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب',
    logo_url TEXT,
    favicon_url TEXT,
    primary_color VARCHAR(20) DEFAULT '#3B82F6',
    secondary_color VARCHAR(20) DEFAULT '#6366F1',
    accent_color VARCHAR(20) DEFAULT '#10B981',
    background_color VARCHAR(20) DEFAULT '#F8FAFC',
    whatsapp_number VARCHAR(50) DEFAULT '201062453344',
    telegram_username VARCHAR(100),
    email_address VARCHAR(255) DEFAULT 'support@kyctrust.com',
    website_url VARCHAR(255) DEFAULT 'www.kyctrust.com',
    business_hours JSONB DEFAULT '{"saturday_thursday": "9:00 AM - 11:00 PM", "friday": "2:00 PM - 11:00 PM", "emergency": "24/7 Available"}',
    social_media JSONB DEFAULT '{}',
    customization JSONB DEFAULT '{}',
    seo_keywords TEXT,
    seo_description TEXT,
    analytics_code TEXT,
    maintenance_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول المستخدمين الإداريين
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول سجل الأنشطة
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.admin_users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول الإحصائيات
CREATE TABLE IF NOT EXISTS public.statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    completed_orders INTEGER DEFAULT 0,
    pending_orders INTEGER DEFAULT 0,
    cancelled_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    unique_customers INTEGER DEFAULT 0,
    avg_response_time INTEGER DEFAULT 0,
    popular_services JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(date)
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(active);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(order_index);
CREATE INDEX IF NOT EXISTS idx_payment_methods_active ON public.payment_methods(active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_archived ON public.orders(archived);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_statistics_date ON public.statistics(date);

-- إنشاء دوال التحديث التلقائي للوقت
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إضافة triggers للتحديث التلقائي
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_methods_updated_at ON public.payment_methods;
CREATE TRIGGER update_payment_methods_updated_at
    BEFORE UPDATE ON public.payment_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- إدراج البيانات الافتراضية للخدمات
INSERT INTO public.services (name, price, order_index, active, description, category) VALUES
('Payoneer', '30$', 1, true, 'حساب بايونير مفعل وجاهز للاستخدام', 'digital_wallets'),
('Wise', '30$', 2, true, 'حساب وايز للتحويلات الدولية', 'digital_wallets'),
('Skrill', '20$', 3, true, 'محفظة سكريل إلكترونية', 'digital_wallets'),
('Neteller', '20$', 4, true, 'محفظة نيتلر للمدفوعات', 'digital_wallets'),
('Kast', '20$', 5, true, 'محفظة كاس�� الرقمية', 'digital_wallets'),
('Redotpay', '20$', 6, true, 'محفظة ريدوت باي', 'digital_wallets'),
('OKX', '20$', 7, true, 'حساب OKX للعملات الرقمية', 'crypto_exchanges'),
('World First', '20$', 8, true, 'حساب ورلد فيرست', 'banks'),
('Bybit', '20$', 9, true, 'حساب بايبت للتداول', 'crypto_exchanges'),
('Bitget', '20$', 10, true, 'حساب بت جت', 'crypto_exchanges'),
('KuCoin', '20$', 11, true, 'حساب كوكوين', 'crypto_exchanges'),
('PayPal', '15$', 12, true, 'حساب باي بال مفعل', 'digital_wallets'),
('MEXC', '20$', 13, true, 'حساب MEXC للتداول', 'crypto_exchanges'),
('Exness', '20$', 14, true, 'حساب إكسنس للفوركس', 'forex'),
('شحن رصيد فودافون', '100 جنيه = 120 جنيه', 15, true, 'خدمة شحن رصيد فودافون كاش', 'local_services'),
('سحب أرباح TikTok', 'حسب الاتفاق', 16, true, 'سحب الأرباح من تيك توك', 'social_media'),
('سحب أرباح PayPal', 'حسب الاتفاق', 17, true, 'سحب الأرباح من باي بال', 'digital_wallets')
ON CONFLICT DO NOTHING;

-- إدراج البيانات الافتراضية لطرق الدفع
INSERT INTO public.payment_methods (name, details, active, type, instructions) VALUES
('Vodafone Cash', '01062453344', true, 'mobile_money', 'قم بالتحويل إلى الرقم المذكور وأرسل صورة الإيصال'),
('USDT (TRC20)', 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', true, 'cryptocurrency', 'أرسل USDT على شبكة TRC20 إلى العنوان المذكور'),
('البنك الأهلي المصري', '1234567890123456', true, 'bank', 'حوالة بنكية للحساب المذكور'),
('InstaPay', '01062453344', true, 'digital_payment', 'تحويل فوري عبر إنستا باي')
ON CONFLICT DO NOTHING;

-- إدراج الإعدادات الافتراضية
INSERT INTO public.site_settings (id, title, description, order_notice) VALUES
(gen_random_uuid(), 'KYCtrust - خدمات مالية رقمية موثوقة', 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية', 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.')
ON CONFLICT DO NOTHING;

-- إنشاء مستخدم إداري افتراضي (كلمة المرور: admin123)
INSERT INTO public.admin_users (email, password_hash, name, role) VALUES
('admin@kyctrust.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مدير النظام', 'super_admin')
ON CONFLICT DO NOTHING;

-- تفعيل Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان
-- السماح للجميع بقراءة الخدمات النشطة
CREATE POLICY "Allow public read access to active services" ON public.services
    FOR SELECT USING (active = true);

-- السماح للجميع بقراءة طرق الدفع النشطة
CREATE POLICY "Allow public read access to active payment methods" ON public.payment_methods
    FOR SELECT USING (active = true);

-- السماح للجميع بقراءة إعدادات الموقع
CREATE POLICY "Allow public read access to site settings" ON public.site_settings
    FOR SELECT USING (true);

-- السماح للجميع بإنشاء طلبات جديدة
CREATE POLICY "Allow public insert access to orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- تعليق: لإدارة الصلاحيات بشكل كامل، ستحتاج إلى إعداد JWT وسياسات RLS أكثر تفصيلاً

-- إنشاء وظائف مساعدة
CREATE OR REPLACE FUNCTION get_active_services()
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    price VARCHAR(100),
    order_index INTEGER,
    description TEXT,
    category VARCHAR(100)
) 
LANGUAGE sql
AS $$
    SELECT id, name, price, order_index, description, category
    FROM public.services 
    WHERE active = true 
    ORDER BY order_index ASC;
$$;

CREATE OR REPLACE FUNCTION get_order_statistics(start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days')
RETURNS TABLE (
    total_orders BIGINT,
    completed_orders BIGINT,
    pending_orders BIGINT,
    total_revenue NUMERIC
)
LANGUAGE sql
AS $$
    SELECT 
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
        COALESCE(SUM(amount), 0) as total_revenue
    FROM public.orders 
    WHERE created_at >= start_date;
$$;

-- إنشاء view للإحصائيات السريعة
CREATE OR REPLACE VIEW public.dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM public.services WHERE active = true) as active_services,
    (SELECT COUNT(*) FROM public.orders WHERE created_at >= CURRENT_DATE) as today_orders,
    (SELECT COUNT(*) FROM public.orders WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_orders,
    (SELECT COUNT(*) FROM public.orders WHERE status = 'pending') as pending_orders,
    (SELECT COALESCE(AVG(amount), 0) FROM public.orders WHERE status = 'completed') as avg_order_value;

-- إنشاء دالة للنسخ الاحتياطي
CREATE OR REPLACE FUNCTION create_backup_data()
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
    backup_data JSON;
BEGIN
    SELECT json_build_object(
        'services', (SELECT json_agg(row_to_json(s)) FROM public.services s),
        'payment_methods', (SELECT json_agg(row_to_json(pm)) FROM public.payment_methods pm),
        'orders', (SELECT json_agg(row_to_json(o)) FROM public.orders o),
        'site_settings', (SELECT json_agg(row_to_json(ss)) FROM public.site_settings ss),
        'backup_date', CURRENT_TIMESTAMP,
        'version', '1.0.0'
    ) INTO backup_data;
    
    RETURN backup_data;
END;
$$;

-- إضافة تعليقات على الجداول
COMMENT ON TABLE public.services IS 'جدول الخدمات المالية المتاحة';
COMMENT ON TABLE public.payment_methods IS 'جدول طرق الدفع المقبولة';
COMMENT ON TABLE public.orders IS 'جدول طلبات العملاء';
COMMENT ON TABLE public.site_settings IS 'جدول إعدادات الموقع العامة';
COMMENT ON TABLE public.admin_users IS 'جدول المستخدمين الإداريين';
COMMENT ON TABLE public.activity_logs IS 'جدول سجل الأنشطة والعمليات';
COMMENT ON TABLE public.statistics IS 'جدول الإحصائيات اليومية';

-- انتهاء إعداد قاعدة البيانات
