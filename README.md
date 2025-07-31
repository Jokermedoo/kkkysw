# 🚀 KYCtrust - منصة الخدمات المالية الرقمية

## 📋 الجداول المطلوبة في Supabase

### 1. جدول الخدمات (services)
```sql
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
CREATE POLICY "Enable all access for services" ON public.services FOR ALL USING (true);

INSERT INTO public.services (name, price, order_index, active, description, category) VALUES
('Payoneer', '30$', 1, true, 'حساب بايونير مفعل وجاهز للاستخدام', 'digital_wallets'),
('Wise', '30$', 2, true, 'حساب وايز للتحويلات الدولية', 'digital_wallets'),
('Skrill', '20$', 3, true, 'محفظة سكريل إلكترونية', 'digital_wallets'),
('Neteller', '20$', 4, true, 'محفظة نيتلر للمدفوعات', 'digital_wallets'),
('PayPal', '15$', 5, true, 'حساب باي بال مفعل', 'digital_wallets');
```

### 2. جدول طرق الدفع (payment_methods)
```sql
CREATE TABLE public.payment_methods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    type VARCHAR(50) DEFAULT 'bank',
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for payment_methods" ON public.payment_methods FOR ALL USING (true);

INSERT INTO public.payment_methods (name, details, active, type, instructions) VALUES
('Vodafone Cash', '01062453344', true, 'mobile_money', 'قم بالتحويل إلى الرقم المذكور وأرسل صورة الإيصال'),
('USDT (TRC20)', 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', true, 'cryptocurrency', 'أرسل USDT على شبكة TRC20 إلى العنوان المذكور');
```

### 3. جدول الطلبات (orders)
```sql
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
CREATE POLICY "Enable all access for orders" ON public.orders FOR ALL USING (true);
```

### 4. جدول إعدادات الموقع (site_settings)
```sql
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
CREATE POLICY "Enable all access for site_settings" ON public.site_settings FOR ALL USING (true);

INSERT INTO public.site_settings (title, description, order_notice) VALUES
('KYCtrust - خدمات مالية رقمية موثوقة', 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية', 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.');
```

## 🚀 التشغيل

```bash
npm install
npm run dev
```

## 🔧 إعداد متغيرات البيئة

إنشئ ملف `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🎯 الملفات الأساسية

```
src/
├── components/
│   ├── ErrorMessage.tsx
│   ├── FloatingWhatsApp.tsx
│   ├── LandingPage.tsx
│   ├── LoadingSpinner.tsx
│   ├── MarketingElements.tsx
│   ├── OrderModal.tsx
│   ├── StatsCard.tsx
│   └── TrustSection.tsx
├── context/
│   └── DataContext.tsx
├── lib/
│   └── supabase.ts
├── services/
│   └── database.ts
└── App.tsx
```

## 📞 الدعم

- هاتف: +20 106 245 3344
- البريد: support@kyctrust.com
