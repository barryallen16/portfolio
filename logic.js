document.addEventListener("DOMContentLoaded", () => {
  // Register plugins
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // Blog Posts Configuration
  // Set to true when blog post exists in /blogs folder
  // ========================================
  
  const blogExists = {
    "fitcheck": true,
    "java-vul": true,
    "moviemod": false,
    "unshorten": false,
    "memory": false,
  };

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
          "all": { bg: "rgb(38, 38, 38)", border: "white" },
          "frontend": { bg: "rgba(236, 72, 153, 0.3)", border: "rgb(236, 72, 153)" },
          "backend": { bg: "rgba(59, 130, 246, 0.3)", border: "rgb(59, 130, 246)" },
          "uiux": { bg: "rgba(132, 204, 22, 0.3)", border: "rgb(132, 204, 22)" },
          "ai": { bg: "rgba(234, 179, 8, 0.3)", border: "rgb(234, 179, 8)" },
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
  // Blog Modal System
  // ========================================
  
  const modal = document.getElementById("blog-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const blogButtons = document.querySelectorAll(".blog-btn:not([disabled])");
  const blogCards = document.querySelectorAll(".blog-card[data-blog]");

  async function openModal(projectId) {
    if (!blogExists[projectId]) return;

    try {
      // Show loading state
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      modalTitle.textContent = "Loading...";
      modalContent.innerHTML = '<p class="text-white/50">Loading blog post...</p>';

      // Fetch blog content
      const response = await fetch(`./blogs/${projectId}.html`);
      
      if (!response.ok) {
        throw new Error("Blog post not found");
      }

      const html = await response.text();
      modalContent.innerHTML = html;
      
      // Get title from the loaded content
      const titleEl = modalContent.querySelector("h1");
      modalTitle.textContent = titleEl ? titleEl.textContent : "Blog Post";

      // Animate modal in
      gsap.fromTo(
        modal.querySelector(".absolute.inset-4"),
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    } catch (error) {
      modalContent.innerHTML = `
        <div class="text-center py-16">
          <p class="text-white/50 text-xl mb-4">Blog post not found</p>
          <p class="text-white/30 font-mono">Make sure the file exists at: blogs/${projectId}.html</p>
        </div>
      `;
      modalTitle.textContent = "Error";
    }
  }

  function closeModal() {
    gsap.to(modal.querySelector(".absolute.inset-4"), {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      },
    });
  }

  // Event listeners
  blogButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.blog));
  });

  blogCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.blog));
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // ========================================
  // Animations
  // ========================================
  
  // Blog card animations
  document.querySelectorAll(".blog-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: index * 0.1,
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