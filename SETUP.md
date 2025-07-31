# دليل إعداد وتشغيل KYCtrust

## 🚀 البدء السريع

### الم��طلبات الأساسية
- Node.js 18+ 
- npm أو yarn
- Git
- حساب Supabase (للقاعدة البيانات)

### 1. تحميل المشروع
```bash
git clone https://github.com/your-username/kyctrust.git
cd kyctrust
```

### 2. تثبيت المكتبات
```bash
npm install
```

### 3. إعداد متغيرات البيئة
```bash
cp .env.example .env.local
```

ثم قم بتعديل `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. إعداد قاعدة البيانات

#### الطريقة الأولى: Supabase Dashboard
1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. أنشئ مشروع جديد
3. في SQL Editor، نفذ محتوى ملف `database/schema.sql`

#### الطريقة الثانية: Supabase CLI
```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# ربط المشروع
supabase link --project-ref your-project-ref

# تطبيق المخطط
supabase db push
```

### 5. تشغيل المشروع
```bash
npm run dev
```

الموقع سيكون متاح على: `http://localhost:5173`

## 🛠️ الأوامر المتاحة

### التطوير
```bash
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء المشروع للإنتاج
npm run preview      # معاينة البناء
npm run lint         # فحص جودة الكود
npm run test         # تشغيل الاختبارات
npm run test:ui      # واجهة الاختبارات
npm run test:coverage # تقرير التغطية
```

### قاعدة البيانات
```bash
# إنشاء migration جديد
supabase migration new migration-name

# تطبيق migrations
supabase db push

# إعادة تعيين قاعدة البيانات
supabase db reset

# عمل backup
npm run db:backup

# استعادة backup
npm run db:restore backup-file.sql
```

## 📁 هيكل المشروع

```
kyctrust/
├── database/
│   └── schema.sql              # مخطط قاعدة البيانات
├── src/
│   ├── components/             # مكونات React
│   │   ├── admin/             # مكونات لوحة التحكم
│   │   ├── LandingPage.tsx    # الصفحة الرئيسية
│   │   └── ...
│   ├── context/               # إدارة الحالة
│   ├── lib/                   # مكتبات مساعدة
│   ├── services/              # خدمات API
│   ├── styles/                # ملفات CSS
│   └── tests/                 # الاختبارات
├── public/                    # الملفات العامة
├── .env.example              # مثال متغيرات البيئة
├── docker-compose.yml        # إعداد Docker
├── Dockerfile               # ملف Docker
├── nginx.conf               # إعداد Nginx
└── deploy.sh               # سكريبت النشر
```

## 🔧 الإعدادات المتقدمة

### إعداد SSL/HTTPS
```bash
# إنشاء شهادة SSL مجانية
certbot --nginx -d yourdomain.com

# أو استخدام Let's Encrypt
docker run -it --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  certbot/certbot certonly --standalone \
  -d yourdomain.com
```

### إعداد Docker
```bash
# بناء الصورة
docker build -t kyctrust .

# تشغيل الحاوية
docker run -p 80:80 kyctrust

# أو استخدام docker-compose
docker-compose up -d
```

### إعداد Nginx للإنتاج
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔐 الأمان

### إعداد Row Level Security (RLS)
```sql
-- تفعيل RLS للجداول
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان
CREATE POLICY "public_services" ON services
  FOR SELECT USING (active = true);

CREATE POLICY "authenticated_orders" ON orders
  FOR ALL USING (auth.uid() = user_id);
```

### إعداد CORS
```javascript
// في Supabase Dashboard > Settings > API
{
  "cors": {
    "allowedOrigins": ["https://yourdomain.com"],
    "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
    "allowedHeaders": ["Content-Type", "Authorization"]
  }
}
```

## 📊 المراقبة والتحليلات

### إعداد Google Analytics
```html
<!-- في public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### مراقبة الأداء
```bash
# تحليل حجم الحزمة
npm run analyze

# فحص الأداء
npm run lighthouse

# مراقبة الذاكرة
npm run memory-test
```

## 🚀 النشر

### Netlify
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# نشر الموقع
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# تثبيت Vercel CLI
npm install -g vercel

# نشر الموقع
vercel --prod
```

### AWS S3 + CloudFront
```bash
# رفع الملفات إلى S3
aws s3 sync dist/ s3://your-bucket-name

# إنشاء توزيع CloudFront
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### خادم خاص
```bash
# استخدام سكريبت النشر
chmod +x deploy.sh
./deploy.sh

# أو النشر اليدوي
npm run build
scp -r dist/* user@server:/var/www/html/
```

## 🧪 الاختبارات

### اختبارات الوحدة
```bash
npm run test              # تشغيل جميع الاختبارات
npm run test:watch        # مراقبة التغييرات
npm run test:coverage     # تقرير التغطية
```

### اختبارات E2E
```bash
npm run test:e2e          # اختبارات شاملة
npm run test:e2e:headed   # مع واجهة ال��تصفح
```

### اختبارات الأداء
```bash
npm run test:performance  # اختبارات الأداء
npm run test:accessibility # اختبارات إمكانية الوصول
```

## 🐛 إصلاح المشاكل الشائعة

### مشكلة الاتصال بـ Supabase
```bash
# تحقق من متغيرات البيئة
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# تحقق من حالة الشبكة
curl -I $VITE_SUPABASE_URL/rest/v1/
```

### مشكلة في التبعيات
```bash
# مسح cache npm
npm cache clean --force

# إعادة تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install
```

### مشكلة في البناء
```bash
# تنظيف مجلد البناء
rm -rf dist

# إعادة البناء
npm run build
```

## 📞 الدعم الفني

- **البريد الإلكتروني**: support@kyctrust.com
- **واتساب**: +20 106 245 3344
- **الوثائق**: [docs.kyctrust.com](https://docs.kyctrust.com)
- **المجتمع**: [community.kyctrust.com](https://community.kyctrust.com)

## 📝 المساهمة

اقرأ [دليل المساهمة](CONTRIBUTING.md) لمعرفة كيفية المساهمة في تطوير المشروع.

## 📄 الترخيص

هذا المشروع محمي بموجب [��خصة MIT](LICENSE).
