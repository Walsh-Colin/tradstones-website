(() => {
  "use strict";
  const config = window.BAND_CONFIG || {};
  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => {
    if (typeof value === "string" && value.trim()) byId(id).textContent = value;
  };
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };
  const makeLink = (label, url) => {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = url;
    return link;
  };
  const entries = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

  document.documentElement.classList.add("js");
  const menu = document.querySelector(".menu-toggle");
  const nav = byId("main-nav");
  menu.hidden = false;
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menu.focus();
    }
  });
  const name = typeof config.name === "string" && config.name.trim() ? config.name.trim() : "Tradstone";
  document.querySelectorAll("[data-band-name]").forEach((element) => { element.textContent = name; });
  document.title = `${name} — Music & Bookings`;
  document.querySelector('meta[name="description"]').content = `Meet ${name}. Discover our music and get in touch to book the band for your event.`;
  setText("tagline", config.tagline);
  setText("about-lead", config.aboutLead);
  setText("about-text", config.aboutText);
  setText("music-description", config.musicDescription);
  setText("contact-description", config.contactDescription);
  byId("year").textContent = String(new Date().getFullYear());

  for (const [key, id] of [["musicLinks", "music-links"], ["socialLinks", "social-links"]]) {
    if (!Array.isArray(config[key])) continue;
    byId(id).replaceChildren();
    entries(config[key]).forEach((item) => {
      const url = safeUrl(item.url);
      if (!url || !item.label) return;
      const link = makeLink(item.label, url);
      if (key === "musicLinks") {
        const arrow = document.createElement("span");
        arrow.textContent = "↗";
        arrow.setAttribute("aria-hidden", "true");
        link.append(arrow);
      }
      byId(id).append(link);
    });
  }
  byId("music-empty").hidden = byId("music-links").childElementCount > 0;

  const photos = entries(config.photos).filter((photo) => typeof photo.src === "string" && photo.src.trim() && typeof photo.alt === "string" && photo.alt.trim());
  if (photos.length) {
    byId("gallery-grid").replaceChildren();
    photos.forEach((photo) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = "lazy";
      image.decoding = "async";
      figure.append(image);
      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.append(caption);
      }
      byId("gallery-grid").append(figure);
    });
  }

  const email = typeof config.bookingEmail === "string" ? config.bookingEmail.trim() : "";
  const phone = typeof config.bookingPhone === "string" ? config.bookingPhone.replace(/[\s()-]/g, "") : "";
  const hasEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  const hasPhone = /^\+?[0-9]{7,15}$/.test(phone);
  if (Object.hasOwn(config, "bookingEmail")) {
    byId("booking-link").hidden = !hasEmail;
    byId("booking-email").hidden = !hasEmail;
    byId("booking-hint").hidden = !hasEmail;
    byId("contact-empty").hidden = hasEmail || hasPhone;
  }
  if (Object.hasOwn(config, "bookingPhone")) {
    byId("booking-phone").hidden = !hasPhone;
    if (hasPhone) {
      byId("booking-phone").href = `tel:${phone}`;
      byId("booking-phone").textContent = `Call ${config.bookingPhoneDisplay || config.bookingPhone}`;
    }
  }
  if (hasEmail) {
    const link = byId("booking-link");
    link.href = `mailto:${email}?subject=${encodeURIComponent(`Booking enquiry — ${name}`)}`;
    link.hidden = false;
    byId("booking-email").href = `mailto:${email}`;
    byId("booking-email").textContent = email;
    byId("booking-hint").hidden = false;
    byId("contact-empty").hidden = true;
  }
})();
