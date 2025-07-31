-- ========================================
-- جدول إعدادات الموقع (Site Settings Table)
-- ========================================

-- إنشاء الجدول
DROP TABLE IF EXISTS public.site_settings CASCADE;

CREATE TABLE public.site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج الإعدادات الافتراضية
INSERT INTO public.site_settings (title, description, order_notice) VALUES
('KYCtrust - خدمات مالية رقمية موثوقة', 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية', 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.');

-- تفعيل Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- إنشاء السياسات
DROP POLICY IF EXISTS "Allow public read access to site settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all access to site settings" ON public.site_settings;
CREATE POLICY "Allow all access to site settings" ON public.site_settings
    FOR ALL USING (true);

-- إضافة trigger للتحديث التلقائي
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- تعليق على الجدول
COMMENT ON TABLE public.site_settings IS 'جدول إعدادات الموقع العامة';

-- اختبار البيانات
SELECT COUNT(*) as site_settings_count FROM public.site_settings;
