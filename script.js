(() => {
  const cfg = window.SITE_CONFIG || {};

  const escapeTel = (value = "") => value.replace(/[^+\d]/g, "");
  const tel = escapeTel(cfg.phoneInternational || cfg.phoneDisplay || "");
  const waTel = tel.replace(/^\+/, "");
  const values = {
    ...cfg,
    whatsAppHref: waTel ? `https://wa.me/${waTel}` : "#contact",
    emailHref: cfg.email ? `mailto:${cfg.email}` : "#contact",
    phoneHref: tel ? `tel:${tel}` : "#contact"
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (values[key] !== undefined && values[key] !== null) el.textContent = values[key];
  });

  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.dataset.bindHref;
    if (values[key]) el.setAttribute("href", values[key]);
  });

  document.querySelectorAll("[data-bind-src]").forEach((el) => {
    const key = el.dataset.bindSrc;
    if (values[key]) el.setAttribute("src", values[key]);
  });

  const portrait = document.querySelector(".portrait");
  const portraitShell = document.querySelector(".portrait-shell");
  const showPortraitFallback = () => portraitShell?.classList.add("is-fallback");
  portrait?.addEventListener("error", showPortraitFallback);
  if (portrait && portrait.complete && portrait.naturalWidth === 0) showPortraitFallback();

  const testimonials = Array.isArray(cfg.testimonials) ? cfg.testimonials.filter((t) => t && t.quote) : [];
  const holder = document.getElementById("testimonials");
  const section = document.querySelector("[data-testimonials-section]");
  const navLink = document.querySelector("[data-testimonials-nav]");

  if (testimonials.length && holder) {
    document.getElementById("testimonials-empty")?.remove();
    holder.innerHTML = testimonials.map((t) => `
      <article class="testimonial">
        <blockquote>“${t.quote}”</blockquote>
        <cite>${t.author || "Leerling/student"}</cite>
      </article>`).join("");
  } else {
    if (section?.previousElementSibling?.matches(".wrap")) section.previousElementSibling.hidden = true;
    if (section) section.hidden = true;
    if (navLink) navLink.hidden = true;
  }

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
