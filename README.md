# MSH7 — موقع خدمات (برمجة / تصميم / خدمات عامة)

منصة سعودية بواجهة معاصرة، 3 أقسام رئيسية + باقات + نموذج طلب يحول بياناتك إلى رسالة جاهزة للإرسال عبر واتساب أو الإيميل.

## المميزات
- تصميم حديث بخلفية إبداعية
- 3 أقسام بتجربة مختلفة لكل قسم
- الباقات تُعرض تلقائياً من ملف JavaScript (سهل التعديل)
- نموذج طلب يجهز رسالة احترافية (WhatsApp / Email)
- صفحة سياسات: policy.html (استخدام + خصوصية)

---

## تشغيل محلياً
افتح `index.html` مباشرة أو استخدم Live Server في VS Code.

### VS Code (مستحسن)
1) ثبّت إضافة: Live Server
2) افتح المشروع
3) كلك يمين على `index.html` → Open with Live Server

---

## تعديل الباقات / الواتساب / الإيميل
اذهب إلى:
`assets/js/main.js`

- تعديل الباقات داخل `PACKAGES`
- واتساب: `DEFAULT_WHATSAPP`
- إيميل: `DEFAULT_EMAIL`

---

## النشر على GitHub Pages
1) أنشئ Repository جديد في GitHub
2) ارفع الملفات كما هي (index.html + policy.html + assets/)
3) GitHub → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
4) ستحصل على رابط الموقع (Project Pages):
   https://USERNAME.github.io/REPO/

---

## الروابط
- الصفحة الرئيسية: `index.html`
- السياسات: `policy.html`
