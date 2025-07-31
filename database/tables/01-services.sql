-- ========================================
-- جدول الخدمات (Services Table)
-- ========================================

-- إنشاء الجدول
DROP TABLE IF EXISTS public.services CASCADE;

CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT true,
    description TEXT,
    icon VARCHAR(100),
    category VARCHAR(100),
    features JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(active);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(order_index);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);

-- إدراج البيانات الافتراضية
INSERT INTO public.services (name, price, order_index, active, description, category) VALUES
('Payoneer', '30$', 1, true, 'حساب بايونير مفعل وجاهز للاستخدام', 'digital_wallets'),
('Wise', '30$', 2, true, 'حساب وايز للتحويلات الدولية', 'digital_wallets'),
('Skrill', '20$', 3, true, 'محفظة سكريل إلكترونية', 'digital_wallets'),
('Neteller', '20$', 4, true, 'محفظة نيتلر للمدفوعات', 'digital_wallets'),
('Kast', '20$', 5, true, 'محفظة كاست الرقمية', 'digital_wallets'),
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
('سحب أرباح PayPal', 'حسب الاتفاق', 17, true, 'سحب الأرباح من باي بال', 'digital_wallets');

-- تفعيل Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- إنشاء السياسات
DROP POLICY IF EXISTS "Allow public read access to active services" ON public.services;
CREATE POLICY "Allow public read access to active services" ON public.services
    FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Allow all access to services" ON public.services;
CREATE POLICY "Allow all access to services" ON public.services
    FOR ALL USING (true);

-- إضافة trigger للتحديث التلقائي
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- تعليق على الجدول
COMMENT ON TABLE public.services IS 'جدول الخدمات المالية المتاحة';

-- اختبار البيانات
SELECT COUNT(*) as services_count FROM public.services;
