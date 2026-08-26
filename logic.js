document.addEventListener("DOMContentLoaded", () => {
  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // Pixel Animation for Hero Section
  // ========================================

  const pixelsContainer = document.querySelector("#pixelated-container");

  if (pixelsContainer) {
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel bg-[#0e0e0e]";
      pixelsContainer.appendChild(pixel);
    }

    const pixelTl = gsap.timeline();
    pixelTl.to(".pixel", {
      opacity: 0,
      duration: 0.1,
      stagger: { amount: 1, from: "random" },
    });
  }

  // ========================================
  // Des-Dev Image Animations
  // ========================================

  gsap.set(".des-img-left", { x: "-100%" });
  gsap.set(".des-img-right", { x: "100%" });

  gsap.to(".des-img-left", {
    scrollTrigger: {
      trigger: "#des-dev",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
    x: "0%",
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".des-img-right", {
    scrollTrigger: {
      trigger: "#des-dev",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
    x: "0%",
    duration: 1,
    ease: "power2.out",
  });

  // ========================================
  // Project Filtering System
  // ========================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const skillLinks = document.querySelectorAll(".skill-link");
  const noResults = document.getElementById("no-results");

  function filterProjects(category) {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = card.dataset.categories.split(",");
      const shouldShow = category === "all" || categories.includes(category);

      if (shouldShow) {
        visibleCount++;
        card.style.display = "grid";
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
      }
    });

    if (noResults) {
      noResults.classList.toggle("hidden", visibleCount > 0);
    }

    updateActiveButton(category);
  }

  function updateActiveButton(category) {
    filterButtons.forEach((btn) => {
      const btnFilter = btn.dataset.filter;
      btn.style.backgroundColor = "";
      btn.style.borderColor = "";

      if (btnFilter === category) {
        const colors = {
          all: { bg: "rgb(38, 38, 38)", border: "white" },
          frontend: { bg: "rgba(236, 72, 153, 0.3)", border: "rgb(236, 72, 153)" },
          backend: { bg: "rgba(59, 130, 246, 0.3)", border: "rgb(59, 130, 246)" },
          uiux: { bg: "rgba(132, 204, 22, 0.3)", border: "rgb(132, 204, 22)" },
          ai: { bg: "rgba(234, 179, 8, 0.3)", border: "rgb(234, 179, 8)" },
        };
        btn.style.backgroundColor = colors[category].bg;
        btn.style.borderColor = colors[category].border;
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filterProjects(btn.dataset.filter);
    });
  });

  skillLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => filterProjects(link.dataset.skillFilter), 500);
    });
  });

  updateActiveButton("all");

  // ========================================
  // Animations
  // ========================================

  // Project cards entrance on scroll
  projectCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: "#projects-grid",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 0.5,
      delay: index * 0.08,
      ease: "power2.out",
    });
  });

  // Project card hover effects
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (card.style.display !== "none") {
        gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
      }
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  });
});
