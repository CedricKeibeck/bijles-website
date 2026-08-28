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
      <article class="fan-card testimonial">
        <div class="testimonial-topline">
          <span class="testimonial-score" aria-label="Score ${t.score || 10} op 10"><span>${t.score || 10}</span><small>/10</small></span>
          <strong class="testimonial-author">${t.author || "Leerling/student"}</strong>
        </div>
        ${t.subject ? `<div class="testimonial-subject">${t.subject}</div>` : ""}
        <blockquote>“${t.quote}”</blockquote>
      </article>`).join("");
  } else {
    if (section) section.hidden = true;
    if (navLink) navLink.hidden = true;
  }

  function initFanCarousel(root) {
    const stage = root.querySelector("[data-fan-stage]");
    const cards = Array.from(stage?.querySelectorAll(".fan-card") || []);
    const prev = root.querySelector("[data-fan-prev]");
    const next = root.querySelector("[data-fan-next]");
    const dots = root.querySelector("[data-fan-dots]");
    if (!stage || cards.length === 0) return;

    let active = 0;
    let startX = 0;
    let dragX = 0;
    let dragging = false;
    let pointerId = null;

    if (dots) {
      dots.innerHTML = cards.map((_, i) => `<button type="button" class="carousel-dot" aria-label="Ga naar kaart ${i + 1}" data-fan-dot="${i}"></button>`).join("");
    }
    const dotButtons = Array.from(root.querySelectorAll("[data-fan-dot]"));

    const signedDistance = (index) => {
      const n = cards.length;
      let d = (index - active + n) % n;
      if (d > n / 2) d -= n;
      return d;
    };

    const render = () => {
      root.style.setProperty("--drag-x", "0px");
      cards.forEach((card, index) => {
        const distance = signedDistance(index);
        const visibleDistance = Math.abs(distance) <= 2 ? String(distance) : "hidden";
        card.dataset.offset = visibleDistance;
        card.setAttribute("aria-hidden", index === active ? "false" : "true");
        card.setAttribute("aria-current", index === active ? "true" : "false");
      });
      dotButtons.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === active);
        dot.setAttribute("aria-current", index === active ? "true" : "false");
      });
    };

    const go = (index) => {
      active = (index + cards.length) % cards.length;
      render();
    };

    prev?.addEventListener("click", () => go(active - 1));
    next?.addEventListener("click", () => go(active + 1));
    dotButtons.forEach((dot, index) => dot.addEventListener("click", () => go(index)));
    cards.forEach((card, index) => card.addEventListener("click", () => {
      if (!dragging && index !== active) go(index);
    }));

    stage.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); go(active - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); go(active + 1); }
    });

    stage.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      dragX = 0;
      dragging = false;
      stage.setPointerCapture(pointerId);
      stage.classList.add("is-dragging");
    });

    stage.addEventListener("pointermove", (event) => {
      if (pointerId !== event.pointerId) return;
      dragX = event.clientX - startX;
      if (Math.abs(dragX) > 4) dragging = true;
      const limited = Math.max(-115, Math.min(115, dragX));
      root.style.setProperty("--drag-x", `${limited}px`);
    });

    const endDrag = (event) => {
      if (pointerId !== event.pointerId) return;
      if (stage.hasPointerCapture(pointerId)) stage.releasePointerCapture(pointerId);
      stage.classList.remove("is-dragging");
      root.style.setProperty("--drag-x", "0px");
      if (Math.abs(dragX) > 48) {
        go(dragX < 0 ? active + 1 : active - 1);
      } else {
        render();
      }
      window.setTimeout(() => { dragging = false; }, 0);
      pointerId = null;
    };

    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    render();
  }

  document.querySelectorAll("[data-fan-carousel]").forEach(initFanCarousel);

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
