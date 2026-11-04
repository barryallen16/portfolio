document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // If gsap failed to load, keep the site usable with static content
  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    setupFiltering();
    setupAgentView();
    return;
  }

  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // Pixel Animation for Hero Section
  // ========================================

  const pixelsContainer = document.querySelector("#pixelated-container");

  if (pixelsContainer) {
    for (let i = 0; i < 64; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel bg-[#0e0e0e]";
      pixelsContainer.appendChild(pixel);
    }

    const pixelTl = gsap.timeline({
      onComplete: () => {
        if (pixelsContainer && pixelsContainer.parentNode) {
          pixelsContainer.remove();
        }
      },
    });
    pixelTl.to(".pixel", {
      opacity: 0,
      duration: 0.1,
      stagger: { amount: 0.5, from: "random" },
    });
  }

  // ========================================
  // Des-Dev Image Animations (slide in from opposite sides)
  // ========================================

  gsap.set(".des-img-left", { xPercent: -130 });
  gsap.set(".des-img-right", { xPercent: 130 });

  const desTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#des-dev-content",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  desTl
    .to(".des-img-left", {
      xPercent: 0,
      duration: 0.9,
      ease: "power3.out",
    })
    .to(
      ".des-img-right",
      {
        xPercent: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.6"
    );

  // ========================================
  // T-Shaped Engineer - scroll-scrubbed pen draw
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
        end: () => "+=" + Math.round(Math.min(1100, tSvg.parentElement.offsetHeight * 1.15)),
        scrub: 1,
      },
    });

    // blueprint dots surface first
    tTl.to([barGhost, stemGhost], { opacity: 1, duration: 0.06 }, 0);

    // glowing tip traces the bar left to right
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

    // flash where the stem meets the bar
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

    // tip pulls the stem downward
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
      y: 30,
      duration: 0.4,
      delay: (index % 3) * 0.08,
      ease: "power2.out",
    });
  });

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (card.style.display !== "none") {
        gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" });
      }
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out" });
    });
  });

  // Recalculate scroll positions once everything has loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  });

  setupFiltering();
  setupAgentView();

  // ========================================
  // Project Filtering System
  // ========================================

  function setupFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const skillLinks = document.querySelectorAll(".skill-link");
    const noResults = document.getElementById("no-results");
    const showMoreBtn = document.getElementById("show-more-projects");

    const extraCards = Array.from(projectCards).filter((card) => card.dataset.extra);
    extraCards.forEach((card) => {
      card.classList.remove("hidden");
      card.style.display = "none";
    });

    let activeCategory = "all";
    let expanded = false;

    function syncShowMore() {
      if (!showMoreBtn) return;
      const matching = extraCards.filter(
        (card) =>
          activeCategory === "all" ||
          card.dataset.categories.split(",").includes(activeCategory)
      );
      showMoreBtn.textContent = expanded
        ? "show less"
        : `show more (${matching.length})`;
      showMoreBtn.classList.toggle("hidden", matching.length === 0);
      showMoreBtn.setAttribute("aria-expanded", String(expanded));
    }

    function filterProjects(category) {
      activeCategory = category;
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const categories = card.dataset.categories.split(",");
        const matchesCategory =
          category === "all" || categories.includes(category);
        const shouldShow =
          matchesCategory && (!card.dataset.extra || expanded);

        if (shouldShow) {
          visibleCount++;
          if (card.style.display === "none") {
            card.style.display = "flex";
            if (typeof gsap !== "undefined" && !prefersReducedMotion) {
              gsap.fromTo(
                card,
                { opacity: 0, scale: 0.96 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
              );
            } else {
              card.style.opacity = "1";
              card.style.transform = "none";
            }
          }
        } else {
          if (card.style.display !== "none") {
            if (typeof gsap !== "undefined" && !prefersReducedMotion) {
              gsap.to(card, {
                opacity: 0,
                scale: 0.96,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                  card.style.display = "none";
                },
              });
            } else {
              card.style.display = "none";
              card.style.opacity = "0";
            }
          }
        }
      });

      if (noResults) {
        noResults.classList.toggle("hidden", visibleCount > 0);
      }

      updateActiveButton(category);
      syncShowMore();
    }

    function updateActiveButton(category) {
      const colors = {
        all: { bg: "rgb(38, 38, 38)", border: "white", text: "white" },
        frontend: { bg: "rgba(236, 72, 153, 0.3)", border: "rgb(236, 72, 153)", text: "#f472b6" },
        backend: { bg: "rgba(59, 130, 246, 0.3)", border: "rgb(59, 130, 246)", text: "#60a5fa" },
        uiux: { bg: "rgba(132, 204, 22, 0.3)", border: "rgb(132, 204, 22)", text: "#a3e635" },
        ai: { bg: "rgba(234, 179, 8, 0.3)", border: "rgb(234, 179, 8)", text: "#facc15" },
      };

      filterButtons.forEach((btn) => {
        const btnFilter = btn.dataset.filter;
        const isActive = btnFilter === category;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");

        if (isActive && colors[category]) {
          btn.style.backgroundColor = colors[category].bg;
          btn.style.borderColor = colors[category].border;
          btn.style.color = colors[category].text;
        } else {
          btn.style.backgroundColor = "";
          btn.style.borderColor = "";
          btn.style.color = "";
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
      link.addEventListener("click", (e) => {
        const targetCategory = link.dataset.skillFilter;
        if (targetCategory) {
          filterProjects(targetCategory);
        }
      });
    });

    showMoreBtn?.addEventListener("click", () => {
      expanded = !expanded;
      filterProjects(activeCategory);
    });

    updateActiveButton("all");
    syncShowMore();
  }

  // ========================================
  // Agent view - accessible modal for llms.txt
  // ========================================

  function setupAgentView() {
    const agentLink = document.getElementById("agent-view-link");
    if (!agentLink) return;

    agentLink.addEventListener("click", async (e) => {
      e.preventDefault();
      let text = null;
      try {
        const res = await fetch("./llms.txt");
        if (res.ok) text = await res.text();
      } catch {
        text = null;
      }
      if (text === null) {
        window.location.href = "./llms.txt";
        return;
      }

      const y = window.scrollY;
      const overlay = document.createElement("div");
      overlay.className =
        "fixed inset-0 overflow-y-auto bg-[#0e0e0e]/95 backdrop-blur-md px-4 sm:px-8 py-8 z-50 flex flex-col items-center";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "LLM Agent Instructions");

      const inner = document.createElement("div");
      inner.className = "w-full max-w-3xl mx-auto my-auto py-8";

      const back = document.createElement("button");
      back.className =
        "font-mono text-xs sm:text-sm text-lime-400 hover:underline transition-colors mb-6 flex items-center gap-1 cursor-pointer min-h-[44px] min-w-[44px]";
      back.textContent = "< back to site";

      function closeOverlay() {
        overlay.remove();
        document.body.style.overflow = "";
        window.scrollTo(0, y);
        document.removeEventListener("keydown", handleKeydown);
        agentLink.focus();
      }

      function handleKeydown(evt) {
        if (evt.key === "Escape") {
          closeOverlay();
        }
      }

      back.addEventListener("click", closeOverlay);
      overlay.addEventListener("click", (evt) => {
        if (evt.target === overlay) {
          closeOverlay();
        }
      });
      document.addEventListener("keydown", handleKeydown);

      const pre = document.createElement("pre");
      pre.className =
        "font-mono text-white/80 text-xs sm:text-sm whitespace-pre-wrap break-words bg-neutral-900 p-6 rounded-xl border border-neutral-800";
      pre.textContent = text;

      inner.append(back, pre);
      overlay.appendChild(inner);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      back.focus();
    });
  }
});
