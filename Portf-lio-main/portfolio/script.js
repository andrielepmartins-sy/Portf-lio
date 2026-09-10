document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTOS
  // =========================

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const backToTop = document.getElementById("back-to-top");
  const year = document.getElementById("year");
  const particles = document.getElementById("particles");


  // =========================
  // ANO AUTOMÁTICO
  // =========================

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // MENU MOBILE
  // =========================

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

    });


    // Fecha o menu ao clicar em um link

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menu"
        );

      });

    });

  }


  // =========================
  // EFEITOS AO ROLAR
  // =========================

  const handleScroll = () => {

    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle(
        "scrolled",
        scrollPosition > 20
      );
    }

    if (backToTop) {
      backToTop.classList.toggle(
        "show",
        scrollPosition > 500
      );
    }

  };

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  handleScroll();


  // =========================
  // VOLTAR AO TOPO
  // =========================

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // =========================
  // ANIMAÇÃO DE ENTRADA
  // =========================

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observerInstance.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    // Fallback para navegadores antigos

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // =========================
  // PARTÍCULAS
  // =========================

  if (particles) {

    const particleCount = 45;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.animationDuration =
        `${8 + Math.random() * 14}s`;

      particle.style.animationDelay =
        `${Math.random() * -20}s`;

      particle.style.opacity =
        `${0.15 + Math.random() * 0.35}`;

      fragment.appendChild(particle);

    }

    particles.appendChild(fragment);

  }


  // =========================
  // FECHAR MENU COM ESC
  // =========================

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navLinks &&
      navLinks.classList.contains("open")
    ) {

      navLinks.classList.remove("open");

      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menu"
        );

      }

    }

  });


  // =========================
  // REDUZIR ANIMAÇÕES
  // =========================

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document.documentElement.style.scrollBehavior =
      "auto";

    document
      .querySelectorAll(".reveal")
      .forEach((element) => {

        element.classList.add("visible");

      });

  }

});