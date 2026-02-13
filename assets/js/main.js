// WhatsApp routing (per department)
// Programming: 0590478098 -> 966590478098
// Design + General: 0555175322 -> 966555175322
const WA_NUMBERS = {
  design: "966555175322",
  general: "966555175322",
  programming: "966590478098"
};

function waUrl(dept, msg) {
  const phone = WA_NUMBERS[dept] || WA_NUMBERS.design;
  const text = encodeURIComponent(msg || "السلام عليكم، أبغى استفسار من MSH7.");
  return `https://wa.me/${phone}?text=${text}`;
}

function bindWaButtons() {
  document.querySelectorAll("[data-wa-dept]").forEach(btn => {
    btn.addEventListener("click", () => {
      const dept = btn.dataset.waDept;
      const msg = btn.dataset.waMsg || "السلام عليكم، أبغى استفسار من MSH7.";
      window.open(waUrl(dept, msg), "_blank", "noopener");
    });
  });
}

// Mobile nav
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
burger?.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "block";
  mobileNav.style.display = isOpen ? "none" : "block";
  mobileNav.setAttribute("aria-hidden", isOpen ? "true" : "false");
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Floating WhatsApp panel
const waFloatBtn = document.getElementById("waFloatBtn");
const waFloatPanel = document.getElementById("waFloatPanel");
waFloatBtn?.addEventListener("click", () => {
  const open = waFloatPanel.classList.toggle("is-open");
  waFloatPanel.setAttribute("aria-hidden", open ? "false" : "true");
});
document.addEventListener("click", (e) => {
  if (!waFloatPanel || !waFloatBtn) return;
  const inside = waFloatPanel.contains(e.target) || waFloatBtn.contains(e.target);
  if (!inside && waFloatPanel.classList.contains("is-open")) {
    waFloatPanel.classList.remove("is-open");
    waFloatPanel.setAttribute("aria-hidden", "true");
  }
});

// Quick request modal
const quickModal = document.getElementById("quickModal");
const quickForm = document.getElementById("quickForm");

function openQuickModal() {
  quickModal?.classList.add("is-open");
  quickModal?.setAttribute("aria-hidden", "false");
  setTimeout(() => quickForm?.querySelector("input[name='name']")?.focus(), 30);
}
function closeQuickModal() {
  quickModal?.classList.remove("is-open");
  quickModal?.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-open='quick']").forEach(b => b.addEventListener("click", openQuickModal));
quickModal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeQuickModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && quickModal?.classList.contains("is-open")) closeQuickModal();
});

quickForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(quickForm);

  const dept = fd.get("dept");
  const priority = fd.get("priority");
  const name = String(fd.get("name") || "").trim();
  const phone = String(fd.get("phone") || "").trim();
  const details = String(fd.get("details") || "").trim();

  const deptLabel = dept === "design" ? "تصميم" : dept === "programming" ? "برمجة" : "خدمات عامة";

  const msg = [
    "السلام عليكم،",
    "أبغى طلب خدمة عبر منصة MSH7 👇",
    "",
    `• القسم: ${deptLabel}`,
    `• الاسم: ${name}`,
    `• الجوال: ${phone}`,
    `• الأولوية: ${priority}`,
    "",
    "تفاصيل الطلب:",
    details,
    "",
    "وشكرًا لكم 🌟"
  ].join("\n");

  window.open(waUrl(dept, msg), "_blank", "noopener");
  closeQuickModal();
});

// Init
bindWaButtons();
