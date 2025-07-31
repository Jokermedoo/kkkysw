-- ========================================
-- جدول طرق الدفع (Payment Methods Table)
-- ========================================

-- إنشاء الجدول
DROP TABLE IF EXISTS public.payment_methods CASCADE;

CREATE TABLE public.payment_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    type VARCHAR(50) DEFAULT 'bank',
    icon VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس
CREATE INDEX IF NOT EXISTS idx_payment_methods_active ON public.payment_methods(active);
CREATE INDEX IF NOT EXISTS idx_payment_methods_type ON public.payment_methods(type);

-- إدراج البيانات الافتراضية
INSERT INTO public.payment_methods (name, details, active, type, instructions) VALUES
('Vodafone Cash', '01062453344', true, 'mobile_money', 'قم بالتحويل إلى الرقم المذكور وأرسل صورة الإيصال'),
('USDT (TRC20)', 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', true, 'cryptocurrency', 'أرسل USDT على شبكة TRC20 إلى العنوان المذكور'),
('البنك الأهلي المصري', '1234567890123456', true, 'bank', 'حوالة بنكية للحساب المذكور'),
('InstaPay', '01062453344', true, 'digital_payment', 'تحويل فوري عبر إنستا باي');

-- تفعيل Row Level Security
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- إنشاء السياسات
DROP POLICY IF EXISTS "Allow public read access to active payment methods" ON public.payment_methods;
CREATE POLICY "Allow public read access to active payment methods" ON public.payment_methods
    FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Allow all access to payment methods" ON public.payment_methods;
CREATE POLICY "Allow all access to payment methods" ON public.payment_methods
    FOR ALL USING (true);

-- إضافة trigger للتحديث التلقائي
DROP TRIGGER IF EXISTS update_payment_methods_updated_at ON public.payment_methods;
CREATE TRIGGER update_payment_methods_updated_at
    BEFORE UPDATE ON public.payment_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- تعليق على الجدول
COMMENT ON TABLE public.payment_methods IS 'جدول طرق الدفع المقبولة';

-- اختبار البيانات
SELECT COUNT(*) as payment_methods_count FROM public.payment_methods;
