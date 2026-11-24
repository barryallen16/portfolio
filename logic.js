document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // If gsap failed to load, keep the site usable with static content
  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    setupFiltering();
    setupProofAnchors();
    setupAgentView();
    setupCopyEmail();
    return;
  }

  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // Des-Dev Image Animations (slide in from opposite sides if present)
  // ========================================

  const desContent = document.querySelector("#des-dev-content");
  if (desContent && document.querySelector(".des-img-left")) {
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
  }

  // ========================================
  // ========================================
  // T-Shaped Engineer - Scroll-driven diagram
  // ========================================

  const tSvg = document.querySelector("#t-svg");
  const barPath = document.querySelector("#t-bar-path");
  const stemPath = document.querySelector("#t-stem-path");

  if (tSvg && barPath && stemPath) {
    const barLen = barPath.getTotalLength();
    const stemLen = stemPath.getTotalLength();

    const barGhost = document.querySelector("#t-bar-ghost");
    const stemGhost = document.querySelector("#t-stem-ghost");
    const sparkBar = document.querySelector("#t-spark-bar");
    const sparkStem = document.querySelector("#t-spark-stem");
    const junction = document.querySelector("#t-junction");
    const replayBtn = document.querySelector("#replay-t-anim");

    // Prepared state: ink primed, markers and chips ready
    gsap.set(barPath, { strokeDasharray: barLen, strokeDashoffset: barLen });
    gsap.set(stemPath, { strokeDasharray: stemLen, strokeDashoffset: stemLen });
    gsap.set(".t-broad", { opacity: 0, y: -10 });
    gsap.set(".t-stem-badge", { opacity: 0, scale: 0.9 });
    gsap.set(".t-node-marker", { opacity: 0 });
    gsap.set("#t-deep", { opacity: 0, scale: 0.85 });

    // Ambient blueprint dots marching along guides
    if (barGhost && stemGhost) {
      gsap.to([barGhost, stemGhost], {
        strokeDashoffset: 120,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }

    // Choreographed diagram drawing timeline
    const tTl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });

    // 1. Draw horizontal bar & drop breadth chips
    tTl.to(barPath, { strokeDashoffset: 0, duration: 0.38 }, 0);

    if (sparkBar && typeof MotionPathPlugin !== "undefined") {
      gsap.registerPlugin(MotionPathPlugin);
      tTl.to(sparkBar, { opacity: 1, duration: 0.02 }, 0)
         .to(sparkBar, { motionPath: "#t-bar-path", duration: 0.38, ease: "power2.out" }, 0)
         .to(sparkBar, { opacity: 0, duration: 0.02 }, 0.38);
    }

    tTl.to(".t-broad", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.18,
      ease: "back.out(1.5)",
    }, 0.16);

    // 2. Center junction flash
    if (junction) {
      tTl.fromTo(junction, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.34)
         .to(junction, { opacity: 0, scale: 2.2, duration: 0.08 }, 0.40);
    }

    // 3. Draw stem downward & reveal depth milestones
    tTl.to(stemPath, { strokeDashoffset: 0, duration: 0.52 }, 0.40);

    if (sparkStem && typeof MotionPathPlugin !== "undefined") {
      tTl.to(sparkStem, { opacity: 1, duration: 0.02 }, 0.40)
         .to(sparkStem, { motionPath: "#t-stem-path", duration: 0.52, ease: "power2.out" }, 0.40)
         .to(sparkStem, { opacity: 0, duration: 0.02 }, 0.92);
    }

    tTl.to(["#node-1-svg", "#badge-1"], { opacity: 1, scale: 1, duration: 0.12 }, 0.52);
    tTl.to(["#node-2-svg", "#badge-2"], { opacity: 1, scale: 1, duration: 0.12 }, 0.64);
    tTl.to(["#node-3-svg", "#badge-3"], { opacity: 1, scale: 1, duration: 0.12 }, 0.76);
    tTl.to(["#node-4-svg", "#badge-4"], { opacity: 1, scale: 1, duration: 0.12 }, 0.86);

    // 4. Base anchor pill lands cleanly
    tTl.to("#t-deep", {
      opacity: 1,
      scale: 1,
      duration: 0.22,
      ease: "back.out(1.7)",
    }, 0.94);

    // ScrollTrigger: play when entering view, rewind on scrolling back up
    ScrollTrigger.create({
      trigger: "#t-shape",
      start: "top 65%",
      onEnter: () => tTl.play(),
      onLeaveBack: () => tTl.reverse(),
    });

    // Replay interaction
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        tTl.restart();
      });
    }
    tSvg.style.cursor = "pointer";
    tSvg.setAttribute("title", "Click diagram to replay animation");
    tSvg.addEventListener("click", () => {
      tTl.restart();
    });
  }

  // ========================================
  // Project card entrance + hover
  // ========================================

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 24,
      duration: 0.45,
      ease: "power2.out",
    });
  });

  if (window.matchMedia("(hover: hover)").matches) {
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
  }

  // Recalculate scroll positions once everything has loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  });

  setupFiltering();
  setupProofAnchors();
  setupAgentView();
  setupCopyEmail();

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
        const categories = (card.dataset.categories || "").split(",");
        const matchesCategory =
          category === "all" || categories.includes(category);
        const shouldShow =
          matchesCategory && (!card.dataset.extra || expanded);

        if (shouldShow) {
          visibleCount++;
          if (card.style.display === "none") {
            card.style.display = "";
            if (typeof gsap !== "undefined" && !prefersReducedMotion) {
              gsap.fromTo(
                card,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
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
                y: -6,
                duration: 0.18,
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

      const featuredTier = document.getElementById("featured-work-container");
      const secondaryTier = document.getElementById("secondary-work-container");
      const secondaryCountEl = document.getElementById("secondary-count");
      if (featuredTier) {
        const hasVisible = Array.from(featuredTier.querySelectorAll(".project-card")).some(
          (c) => c.style.display !== "none"
        );
        featuredTier.classList.toggle("hidden", !hasVisible);
      }
      if (secondaryTier) {
        const visibleSecondary = Array.from(secondaryTier.querySelectorAll(".project-card")).filter(
          (c) => c.style.display !== "none"
        );
        secondaryTier.classList.toggle("hidden", visibleSecondary.length === 0);
        if (secondaryCountEl) {
          secondaryCountEl.textContent = `${visibleSecondary.length} system${visibleSecondary.length === 1 ? "" : "s"}`;
        }
      }

      if (noResults) {
        noResults.classList.toggle("hidden", visibleCount > 0);
      }

      updateActiveButton(category);
      syncShowMore();
    }

    function updateActiveButton(category) {
      const colors = {
        all: { bg: "#09318D", border: "#fd91cc", text: "#ffffff" },
        ai: { bg: "rgba(9, 49, 141, 0.65)", border: "#fd91cc", text: "#fd91cc" },
        systems: { bg: "rgba(9, 49, 141, 0.5)", border: "#4978e8", text: "#bfdbfe" },
        agents: { bg: "rgba(253, 145, 204, 0.25)", border: "#fd91cc", text: "#ffffff" },
        apps: { bg: "rgba(9, 49, 141, 0.4)", border: "#fd91cc", text: "#ffffff" },
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

    window.showProjectCard = function (card) {
      if (!card) return;
      const categories = card.dataset.categories ? card.dataset.categories.split(",") : [];
      if (activeCategory !== "all" && !categories.includes(activeCategory)) {
        filterProjects("all");
      }
      if (card.dataset.extra && !expanded) {
        expanded = true;
        filterProjects(activeCategory);
      }
      card.style.display = "";
      card.style.opacity = "1";
    };
  }

  // ========================================
  // Proof Anchor Cards Navigation
  // ========================================

  function setupProofAnchors() {
    const proofCards = document.querySelectorAll(".proof-anchor-card");
    proofCards.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSlug = link.dataset.targetProject;
        if (!targetSlug) return;
        const targetCard = document.querySelector(`[data-project="${targetSlug}"]`);
        if (!targetCard) return;

        if (typeof window.showProjectCard === "function") {
          window.showProjectCard(targetCard);
        }

        const navOffset = 90;
        const cardRect = targetCard.getBoundingClientRect();
        const targetY = window.pageYOffset + cardRect.top - navOffset;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });

        targetCard.classList.remove("target-highlight-pulse");
        void targetCard.offsetWidth;
        targetCard.classList.add("target-highlight-pulse");

        setTimeout(() => {
          targetCard.classList.remove("target-highlight-pulse");
        }, 2600);

        targetCard.setAttribute("tabindex", "-1");
        targetCard.focus({ preventScroll: true });
      });
    });
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
        "fixed inset-0 overflow-y-auto bg-[#040817]/95 backdrop-blur-md px-4 sm:px-8 py-8 z-50 flex flex-col items-center";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "LLM Agent Instructions");

      const inner = document.createElement("div");
      inner.className = "w-full max-w-3xl mx-auto my-auto py-8";

      const back = document.createElement("button");
      back.className =
        "font-mono text-xs sm:text-sm text-[#fd91cc] hover:underline transition-colors mb-6 flex items-center gap-1 cursor-pointer min-h-[44px] min-w-[44px]";
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
        "font-mono text-white/85 text-xs sm:text-sm whitespace-pre-wrap break-words bg-[#081330] p-6 rounded-xl border border-[#09318D]/70";
      pre.textContent = text;

      inner.append(back, pre);
      overlay.appendChild(inner);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      back.focus();
    });
  }

  // ========================================
  // 1-Click Copy Email interaction
  // ========================================

  function setupCopyEmail() {
    const copyBtn = document.getElementById("copy-email-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", async () => {
      const email = "rjayadithya11@gmail.com";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = email;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }

        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `<span class="text-[#fd91cc] font-mono text-[11px] font-semibold">copied</span>`;
        copyBtn.setAttribute("aria-label", "email copied to clipboard");

        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
          copyBtn.setAttribute("aria-label", "copy email address");
        }, 2200);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  }
});
