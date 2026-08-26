document.addEventListener("DOMContentLoaded", () => {
  // If gsap failed to load for any reason, keep the site usable
  // with everything visible and just skip animation.
  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    setupFiltering();
    return;
  }

  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // Reduced motion: never skip animation entirely (that makes the page
  // look frozen/broken) — run every effect much faster instead.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(3);
  }

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
  // Des-Dev Image Animations (slide in from opposite sides)
  // ========================================

  gsap.set(".des-img-left", { xPercent: -120 });
  gsap.set(".des-img-right", { xPercent: 120 });

  const desTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#des-dev",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  desTl
    .to(".des-img-left", {
      xPercent: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".des-img-right",
      {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );

  // ========================================
  // T-Shaped Engineer — scroll-scrubbed pen draw.
  // Scrolling down traces the T stroke by stroke; scrolling up
  // un-draws it; scrolling down again redraws it. Fully reversible.
  // ========================================

  const tSvg = document.querySelector("#t-svg");
  const barPath = document.querySelector("#t-bar-path");
  const stemPath = document.querySelector("#t-stem-path");

  if (tSvg && barPath && stemPath) {
    const barLen = barPath.getTotalLength();
    const stemLen = stemPath.getTotalLength();

    // ink hidden, waiting to be traced by scroll
    gsap.set(barPath, { strokeDasharray: barLen, strokeDashoffset: barLen });
    gsap.set(stemPath, { strokeDasharray: stemLen, strokeDashoffset: stemLen });

    const barGhost = document.querySelector("#t-bar-ghost");
    const stemGhost = document.querySelector("#t-stem-ghost");
    const sparkBar = document.querySelector("#t-spark-bar");
    const sparkStem = document.querySelector("#t-spark-stem");
    const junction = document.querySelector("#t-junction");

    // ambient: blueprint dots slowly march along their guides
    if (barGhost && stemGhost) {
      gsap.to([barGhost, stemGhost], {
        strokeDashoffset: 120,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }

    const tTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#t-shape",
        start: "top 65%",
        end: "+=1100", // the full draw unfolds across ~1100px of scroll
        scrub: 1,
      },
    });

    // faint blueprint dots surface first...
    tTl.to([barGhost, stemGhost], { opacity: 1, duration: 0.06 }, 0);

    // ...the glowing tip traces the bar left -> right at constant speed
    tTl.to(barPath, {
      strokeDashoffset: 0,
      duration: 0.36,
    }, 0.06);

    if (sparkBar && typeof MotionPathPlugin !== "undefined") {
      gsap.registerPlugin(MotionPathPlugin);
      tTl
        .to(sparkBar, { opacity: 1, duration: 0.02 }, 0.06)
        .to(sparkBar, {
          motionPath: "#t-bar-path",
          duration: 0.36,
        }, 0.06)
        .to(sparkBar, { opacity: 0, duration: 0.03 }, 0.42);
    }

    // breadth chips drop onto the bar as it passes under them
    tTl.from(".t-broad", {
      opacity: 0,
      y: -14,
      stagger: 0.04,
      duration: 0.08,
      ease: "back.out(1.7)",
    }, 0.38);

    // flash where the stem meets the bar...
    if (junction) {
      tTl
        .fromTo(junction, {
          opacity: 0,
          scale: 0.3,
          transformOrigin: "50% 50%",
        }, {
          opacity: 0.9,
          scale: 1,
          duration: 0.04,
          ease: "power2.out",
        }, 0.44)
        .to(junction, {
          opacity: 0,
          scale: 2.4,
          duration: 0.08,
          ease: "power2.out",
        }, 0.48);
    }

    // ...then the tip pulls the stem downward
    tTl.to(stemPath, {
      strokeDashoffset: 0,
      duration: 0.4,
    }, 0.46);

    if (sparkStem && typeof MotionPathPlugin !== "undefined") {
      tTl
        .to(sparkStem, { opacity: 1, duration: 0.02 }, 0.46)
        .to(sparkStem, {
          motionPath: "#t-stem-path",
          duration: 0.4,
        }, 0.46)
        .to(sparkStem, { opacity: 0, duration: 0.03 }, 0.86);
    }

    // deep expertise lands at the tip of the stem
    tTl.from("#t-deep", {
      opacity: 0,
      scale: 0.5,
      duration: 0.12,
      ease: "back.out(2)",
    }, 0.88);
  }

  // ========================================
  // Project card entrance + hover
  // ========================================

  const projectCards = document.querySelectorAll(".project-card");

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

  // Recalculate scroll positions once everything (fonts, images) has loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());

  setupFiltering();

  // ========================================
  // Project Filtering System
  // ========================================

  function setupFiltering() {
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
  }
});
