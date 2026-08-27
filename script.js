(() => {
  const cfg = window.SITE_CONFIG || {};

  const escapeTel = (value = "") => value.replace(/[^+\d]/g, "");
  const waTel = escapeTel(cfg.phoneInternational || cfg.phoneDisplay || "").replace(/^\+/, "");
  const values = {
    ...cfg,
    whatsAppHref: waTel ? `https://wa.me/${waTel}` : "#contact",
    emailHref: cfg.email && !cfg.email.includes("[") ? `mailto:${cfg.email}` : "#contact",
    phoneHref: escapeTel(cfg.phoneInternational || cfg.phoneDisplay || "") ? `tel:${escapeTel(cfg.phoneInternational || cfg.phoneDisplay)}` : "#contact"
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (values[key] !== undefined) el.textContent = values[key];
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.dataset.bindHref;
    if (values[key] !== undefined) el.setAttribute("href", values[key]);
  });
  document.querySelectorAll("[data-bind-src]").forEach((el) => {
    const key = el.dataset.bindSrc;
    if (values[key]) el.setAttribute("src", values[key]);
  });

  const testimonials = Array.isArray(cfg.testimonials) ? cfg.testimonials.filter(t => t && t.quote) : [];
  const holder = document.getElementById("testimonials");
  const empty = document.getElementById("testimonials-empty");
  if (holder && testimonials.length) {
    empty?.remove();
    holder.innerHTML = testimonials.map(t => `
      <article class="testimonial">
        <blockquote>“${t.quote}”</blockquote>
        <cite>${t.author || "Leerling/student"}</cite>
      </article>`).join("");
  }

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
