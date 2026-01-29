/* ==========
  MSH7 Site JS
  - Pricing rendered from data
  - Modal order builder + WhatsApp/Mailto links
========== */

const PACKAGES = {
  programming: [
    {
      name: "باقة الانطلاق (Landing Page)",
      price: "399 ر.س",
      desc: "صفحة هبوط قوية تقنع العميل وتحوّل الزيارة لتواصل.",
      bullets: ["تصميم متجاوب", "CTA احترافي", "نموذج طلب ذكي", "تحسين سرعة أساسي"],
      highlight: "الأكثر طلبًا"
    },
    {
      name: "باقة موقع أعمال (Multi-Page)",
      price: "899 ر.س",
      desc: "موقع متكامل يرفع قيمة مشروعك ويعطي انطباع عالمي.",
      bullets: ["حتى 5 صفحات", "نصوص تسويقية قوية", "SEO أساسي", "رفع على GitHub Pages"],
      highlight: "احترافي"
    },
    {
      name: "تطوير خاص (حسب الطلب)",
      price: "يبدأ من 149 ر.س",
      desc: "ميزة/تعديل/لوحة تحكم/تكامل API — حسب احتياجك.",
      bullets: ["تحليل سريع", "تنفيذ مرحلي", "تسليم منظم", "قابلية توسع"],
      highlight: "مرن"
    }
  ],
  design: [
    {
      name: "باقة شعار احترافي",
      price: "249 ر.س",
      desc: "شعار نظيف يليق بالسوق السعودي وبصورة براند عالمية.",
      bullets: ["2–3 أفكار", "تعديلات معقولة", "تسليم PNG/SVG", "ألوان/أبيض وأسود"],
      highlight: "سريع"
    },
    {
      name: "باقة هوية مصغرة",
      price: "699 ر.س",
      desc: "هوية ترفع ثقة العميل وتوحّد حضورك في كل المنصات.",
      bullets: ["ألوان + خطوط", "قوالب سوشيال", "نمط بصري", "ملفات جاهزة"],
      highlight: "هوية"
    },
    {
      name: "تعاون محتوى شهري",
      price: "ابتداءً من 799 ر.س",
      desc: "تصاميم شهرية بخطة واضحة ونتيجة ثابتة.",
      bullets: ["خطة محتوى", "تصاميم منشورات", "قصص/ستوري", "تحسين مستمر"],
      highlight: "اشتراك"
    }
  ],
  general: [
    {
      name: "باقة تنظيم خدمات (ضمن الأنظمة)",
      price: "199 ر.س",
      desc: "نرتّب لك المتطلبات والخطوات ونختصر عليك الوقت.",
      bullets: ["تجهيز مستندات", "تنظيم نماذج", "مراجعة متطلبات", "إرشاد خطوة بخطوة"],
      highlight: "منظم"
    },
    {
      name: "باقة طالب (تلخيص/تنظيم)",
      price: "149 ر.س",
      desc: "تلخيص ذكي + تنظيم مشروع/عرض — بدون مخالفات أكاديمية.",
      bullets: ["تلخيص منظم", "أفكار عرض", "تنسيق Word/PDF", "جدولة مهام"],
      highlight: "طلاب"
    },
    {
      name: "باقة تقرير/بحث احترافي",
      price: "299 ر.س",
      desc: "صياغة وترتيب محتوى بشكل احترافي حسب متطلباتك.",
      bullets: ["هيكلة محتوى", "لغة احترافية", "تنسيق (حسب المطلوب)", "تسليم مرتب"],
      highlight: "جودة"
    }
  ]
};

const CATEGORY_LABELS = {
  programming: "البرمجة",
  design: "التصميم",
  general: "الخدمات العامة"
};

// ✅ تم ضبطه حسب بياناتك:
const DEFAULT_WHATSAPP = "966590478098";   // كان 0590478098 -> الصيغة الدولية الصحيحة
const DEFAULT_EMAIL = "MSH7@gmail.com";

// ---------- Helpers
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

function escapeText(str = "") {
  return String(str).replace(/[<>&"]/g, s => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", '"':"&quot;" }[s]));
}

// ---------- Reveal animation
const reveals = $$(".reveal");
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) e.target.classList.add("is-in");
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// ---------- Mobile nav
const burger = $("#burger");
const mobileNav = $("#mobileNav");
burger?.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "block";
  mobileNav.style.display = isOpen ? "none" : "block";
  mobileNav.setAttribute("aria-hidden", isOpen ? "true" : "false");
});
$$(".mobileNav a").forEach(a => a.addEventListener("click", () => {
  mobileNav.style.display = "none";
  mobileNav.setAttribute("aria-hidden", "true");
}));

// ---------- Theme toggle
const themeToggle = $("#themeToggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("msh7_theme", document.body.classList.contains("light") ? "light" : "dark");
});
(() => {
  const saved = localStorage.getItem("msh7_theme");
  if (saved === "light") document.body.classList.add("light");
})();

// ---------- Year
$("#year").textContent = new Date().getFullYear();

// ---------- Pricing render
const pricingGrid = $("#pricingGrid");
const tabs = $$(".tab");
let activeTab = "programming";

function renderPricing(key) {
  activeTab = key;
  tabs.forEach(t => {
    const on = t.dataset.tab === key;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });

  const list = PACKAGES[key] || [];
  pricingGrid.innerHTML = list.map(pkg => `
    <article class="priceCard">
      <div class="priceTop">
        <div>
          <h3 class="priceTitle">${escapeText(pkg.name)}</h3>
          <p class="priceDesc">${escapeText(pkg.desc)}</p>
        </div>
        <div class="priceTag">${escapeText(pkg.price)}</div>
      </div>

      <ul class="priceList">
        ${pkg.bullets.map(b => `<li>${escapeText(b)}</li>`).join("")}
      </ul>

      <div class="priceActions">
        <button class="btn btn--primary" type="button"
          data-order="true"
          data-category="${key}"
          data-package="${escapeText(pkg.name)}"
          >طلب الباقة</button>

        <button class="btn btn--ghost" type="button"
          data-quick="true"
          data-category="${key}"
          data-package="${escapeText(pkg.name)}"
          >تفاصيل سريعة</button>
      </div>

      <div class="muted tiny" style="margin-top:10px">
        شارة: <strong>${escapeText(pkg.highlight || "مميز")}</strong>
      </div>
    </article>
  `).join("");

  $$("[data-order='true']", pricingGrid).forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.category, btn.dataset.package));
  });

  $$("[data-quick='true']", pricingGrid).forEach(btn => {
    btn.addEventListener("click", () => {
      alert(`القسم: ${CATEGORY_LABELS[btn.dataset.category]}\nالباقة: ${btn.dataset.package}\n\nاكتب تفاصيلك داخل نموذج الطلب — ونجهز لك رسالة احترافية 👍`);
    });
  });
}

tabs.forEach(t => t.addEventListener("click", () => renderPricing(t.dataset.tab)));
renderPricing(activeTab);

// ---------- Modal order
const modal = $("#modal");
const closeModalBtn = $("#closeModal");
const fCategory = $("#fCategory");
const fPackage = $("#fPackage");
const form = $("#orderForm");
const resultBox = $("#resultBox");
const resultText = $("#resultText");
const waLink = $("#waLink");
const mailLink = $("#mailLink");
const copyBtn = $("#copyMsg");

function openModal(categoryKey, packageName) {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  fCategory.value = CATEGORY_LABELS[categoryKey] || categoryKey;
  fPackage.value = packageName || "";

  resultBox.hidden = true;
  resultText.value = "";
  waLink.href = "#";
  mailLink.href = "#";

  setTimeout(() => form.querySelector("input[name='name']")?.focus(), 50);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

$("#openContact")?.addEventListener("click", () => openModal("general", "تواصل سريع (استفسار)"));

function buildMessage(data) {
  const lines = [
    "السلام عليكم،",
    "أبغى طلب خدمة عبر منصة MSH7 👇",
    "",
    `• القسم: ${data.category}`,
    `• الباقة: ${data.package}`,
    `• الاسم: ${data.name}`,
    `• الجوال: ${data.phone}`,
    data.email ? `• الإيميل: ${data.email}` : null,
    `• الأولوية: ${data.priority}`,
    "",
    "تفاصيل الطلب:",
    data.details,
    "",
    "وشكرًا لكم 🌟"
  ].filter(Boolean);

  return lines.join("\n");
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const data = {
    category: fd.get("category") || fCategory.value,
    package: fd.get("package") || fPackage.value,
    name: fd.get("name")?.toString().trim(),
    phone: fd.get("phone")?.toString().trim(),
    email: fd.get("email")?.toString().trim(),
    priority: fd.get("priority")?.toString().trim(),
    details: fd.get("details")?.toString().trim()
  };

  const msg = buildMessage(data);
  resultText.value = msg;
  resultBox.hidden = false;

  const waText = encodeURIComponent(msg);
  waLink.href = `https://wa.me/${DEFAULT_WHATSAPP}?text=${waText}`;

  const subject = encodeURIComponent(`طلب خدمة: ${data.category} - ${data.package}`);
  const body = encodeURIComponent(msg);
  mailLink.href = `mailto:${DEFAULT_EMAIL}?subject=${subject}&body=${body}`;

  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyBtn?.addEventListener("click", async () => {
  if (!resultText.value) return alert("اضغط “تجهيز رسالة الطلب” أولاً 👍");
  try {
    await navigator.clipboard.writeText(resultText.value);
    alert("تم نسخ الرسالة ✅");
  } catch {
    resultText.select();
    document.execCommand("copy");
    alert("تم نسخ الرسالة ✅");
  }
});
