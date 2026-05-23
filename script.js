(function () {
  // Update your contact number here (E.164 for calls, digits only for WhatsApp)
  const CONTACT = {
    phones: [
      { tel: "+447404197447", display: "+44 7404 197447" },
      { tel: "+447466620928", display: "+44 7466 620928" },
    ],
    whatsapp: [
      { number: "447404197447", display: "+44 7404 197447" },
      { number: "447466620928", display: "+44 7466 620928" },
    ],
    whatsappMessage:
      "Hello Sky Cars Gatewick, I would like to enquire about a transfer.",
    emails: [
      { href: "mailto:skycarsvip@yahoo.com", display: "skycarsvip@yahoo.com" },
      { href: "mailto:skycarsgatwick11@gmail.com", display: "skycarsgatwick11@gmail.com" },
    ],
  };

  document.querySelectorAll("[data-mail]").forEach((el) => {
    const index = Math.max(0, Number(el.getAttribute("data-mail") || 1) - 1);
    const email = CONTACT.emails[index] || CONTACT.emails[0];
    el.setAttribute("href", email.href);
    if (el.hasAttribute("data-mail-display")) {
      el.textContent = email.display;
    }
  });

  document.querySelectorAll("[data-tel]").forEach((el) => {
    const index = Math.max(0, Number(el.getAttribute("data-tel") || 1) - 1);
    const phone = CONTACT.phones[index] || CONTACT.phones[0];
    el.setAttribute("href", `tel:${phone.tel}`);
    if (el.hasAttribute("data-tel-display")) {
      el.textContent = phone.display;
    }
    if (el.hasAttribute("data-tel-menu")) {
      el.textContent = phone.display;
    }
    const label = el.getAttribute("aria-label");
    if (label && label.includes("Call")) {
      el.setAttribute("aria-label", `Call ${phone.display}`);
    }
  });
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const index = Math.max(0, Number(el.getAttribute("data-wa") || 1) - 1);
    const wa = CONTACT.whatsapp[index] || CONTACT.whatsapp[0];
    const href = `https://wa.me/${wa.number}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
    el.setAttribute("href", href);
    if (el.hasAttribute("data-wa-display")) {
      el.textContent = `WhatsApp ${wa.display}`;
    }
    if (el.hasAttribute("data-wa-menu")) {
      el.textContent = wa.display;
    }
    const label = el.getAttribute("aria-label");
    if (label && label.toLowerCase().includes("whatsapp")) {
      el.setAttribute("aria-label", `Chat on WhatsApp ${wa.display}`);
    }
  });

  function closeAllFloatPickers() {
    document.querySelectorAll(".contact-float-picker-menu").forEach((menu) => {
      menu.hidden = true;
      menu.classList.remove("is-open");
    });
    document.querySelectorAll(".contact-float-picker-toggle").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  function setupFloatPicker(toggle, menu) {
    if (!toggle || !menu) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = menu.hidden;
      closeAllFloatPickers();
      if (willOpen) {
        menu.hidden = false;
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeAllFloatPickers());
    });
  }

  setupFloatPicker(
    document.getElementById("floatPhoneToggle"),
    document.getElementById("floatPhoneMenu")
  );
  setupFloatPicker(
    document.getElementById("floatWaToggle"),
    document.getElementById("floatWaMenu")
  );

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".contact-float-picker-group")) {
      closeAllFloatPickers();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllFloatPickers();
  });

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");
  const cursorGlow = document.getElementById("cursorGlow");
  const particlesEl = document.getElementById("particles");

  const animated = document.querySelectorAll(
    ".reveal, .reveal-scale, .step"
  );

  // Sticky header
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  animated.forEach((el) => observer.observe(el));

  // Hero content visible on load
  requestAnimationFrame(() => {
    document.querySelectorAll(".hero-content .reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 150 + i * 120);
    });
  });

  // Floating particles
  if (particlesEl) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = 60 + Math.random() * 40 + "%";
      p.style.setProperty("--dur", 4 + Math.random() * 6 + "s");
      p.style.setProperty("--delay", Math.random() * 5 + "s");
      particlesEl.appendChild(p);
    }
  }

  // Cursor glow (desktop)
  if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  // Parallax on hero glows
  const glows = document.querySelectorAll(".hero-glow");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY * 0.15;
      glows.forEach((g, i) => {
        g.style.transform = `translateY(${y * (i + 1) * 0.3}px)`;
      });
    },
    { passive: true }
  );

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
