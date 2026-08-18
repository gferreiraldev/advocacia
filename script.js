/*
  Peres Martines Advogado — interações discretas para a direção Soberania Contemporânea.
  Menu responsivo, cabeçalho adaptativo, ano dinâmico e revelações acessíveis.
*/

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const year = document.querySelector("#current-year");

  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => {
    if (header && window.scrollY > 28 && !header.classList.contains("menu-active")) {
      header.classList.add("scrolled");
    } else if (header) {
      header.classList.remove("scrolled");
    }
  };

  const closeMenu = () => {
    if (!toggle || !nav || !header) return;
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu de navegação");
    nav.classList.remove("is-open");
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    updateHeader();
  };

  if (toggle && nav && header) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      nav.classList.toggle("is-open", isOpen);
      header.classList.toggle("menu-active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth >= 960) closeMenu(); });
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
