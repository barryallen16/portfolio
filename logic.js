const PROJECTS = {
  "tamil-tokenizer": {
    title: "Partha Tamil Tokenizer",
    status: "Live",
    notes: [
      "General tokenizers like mBERT and Llama-3 break agglutinative Tamil words into byte pieces, tripling sequence length and breaking 52% of Latin-1 decodes.",
      "I wrote the BPE trainer and 120k merge table in Rust with character seeding, promotion merges, and bitset-guarded CSR indexing across Rayon threads. Exporting with ByteFallback-only decoding fixes the Latin-1 bug at 100% roundtrip fidelity across 56 Rust CI tests.",
    ],
    receipts: [
      "0.9193 bits/byte on Tamil wiki (+36.7-36.9% vs mBERT) and 54.2% fewer tokens.",
      "+16.5 accuracy points on 6-class Tamil news classification under a 20M-token budget.",
      "0.709 MorphScore recall across 1,195 UD_Tamil-TTB forms; 12-model comparison at partha.isroot.in.",
    ],
    stack: "Rust · Rayon · CSR merge tables · Python · Hugging Face",
    extraLinks: [],
  },
  fitcheck: {
    title: "FitCheck",
    status: "IEEE 2026",
    notes: [
      "Cloud outfit apps stop working offline and require uploading wardrobe photos to third-party servers. I distilled a Qwen3-VL-8B teacher (538K caption-QA pairs across 106K IndoFashion images) plus 2.92K gpt-oss-120b pairing rationales into Qwen3-VL-2B via LoRA.",
      "Peak VRAM dropped 3.14x (7.23 to 2.30 GB) at 39% higher throughput while holding 91.6% of teacher quality. Built with React Native, Expo SDK 52, local AsyncStorage caching, Q4_K_M GGUF weights for LAN LM Studio inference, and a hosted Space fallback.",
    ],
    receipts: [
      "First-author paper published in IEEE TQCEBT 2026.",
      "297 blind human ratings (4.05 teacher vs 3.98 student), correlating with Llama-4 Judge (r = 0.303, p < 0.05).",
    ],
    stack: "React Native · Expo SDK 52 · Unsloth LoRA · Qwen3-VL-2B · GGUF",
    extraLinks: [
      { label: "Paper PDF", href: "./fitcheck-journal-paper.pdf" },
      { label: "Models", href: "https://huggingface.co/collections/barryallen16/fitcheck" },
    ],
  },
  "d1-triage": {
    title: "D1-Triage",
    status: "Live",
    notes: [
      "Semgrep emits unranked Java alerts with over 70% false positives, and raw unnumbered AST snippets misalign what the scanner flagged from what the model sees.",
      "Adding alert line markers via AST statement anchoring raised within-rule AUC from 0.4297 to 0.5986, and contrastive LoRA over 416 real pre/post-fix diffs pushed within-rule AUC to 0.6594. It ships as a CLI running on T4 in 12-14 ms (6.2 GB VRAM) or under a second on CPU via Q8_0 GGUF.",
    ],
    receipts: [
      "0.8372 ground-truth AUC and 0.8000 on Vul4J real CVEs across 174 alerts (68 GHSA advisories, 126 Vul4J repos).",
      "Verified across a 19-test suite.",
    ],
    stack: "Liquid AI d1-3B · PyTorch LoRA · Semgrep · Q8_0 GGUF",
    extraLinks: [
      { label: "Dataset", href: "https://huggingface.co/datasets/barryallen16/d1-triage" },
    ],
  },
  mono: {
    title: "mono",
    status: "v1.2.0",
    notes: [
      "Cloud voice apps send audio off-device, while base local models struggle on Indian accents (19.21% WER on shipped 2-bit Whistle; 20.58% on 1,047 held-out clips) and over-trigger tasks (72.2% false positives on base Needle 3).",
      "Fine-tuning local weights cut 100-clip runtime WER to 14.71% at 156.2 ms latency (17.2% held-out) and lifted Needle 3 task F1 to 0.9444 (0.7872 tag F1, 11.1% non-task FP). On Android, Kotlin MediaExtractor + MediaCodec run Hann-windowed sinc resampling to 16 kHz mono PCM before Cactus 4.1.4 (libcactus.a) runs inference over C++ JNI.",
    ],
    receipts: [
      "30-second sliding audio windows with 1.5s overlap, 6-word boundary dedup, and structural fallback if save_note misses.",
      "It caches SHA-256-verified models (~93 MB total: Whistle 29.35 MB + Needle 3 63.4 MB) into expo-sqlite; 11 passing bun tests.",
    ],
    stack: "Expo SDK 52 · Kotlin MediaCodec · C++ JNI · Cactus 4.1.4 · SQLite",
    extraLinks: [
      { label: "Releases", href: "https://github.com/barryallen16/mono/releases" },
    ],
  },
  "kaggle-automation": {
    title: "Kaggle Runner",
    status: "OSS",
    notes: [
      "Long Kaggle training sweeps silently stall at the 12-hour wall or OOM when buffering multi-gigabyte archives in RAM. I built a Dockerized FastAPI control plane on AWS EC2 that shards sweeps with injected env bounds and streams kernel logs over WebSockets.",
      "ZIP downloads stream directly through temp disk, Telegram pings at the 11-hour warning mark, and session auth uses HMAC-signed HttpOnly cookies.",
    ],
    receipts: [
      "500+ production runs completed; 154 pytest unit tests and ruff CI checks.",
      "Benchmarked Qwen3.8-27B speculative decoding on dual T4s via llama-server (8.11s essay TTFT; 0.5567 avg draft acceptance across round-2 prompts) before keeping standard decoding default.",
    ],
    stack: "Python · FastAPI · AWS EC2 · Docker · WebSockets · SQLite",
    extraLinks: [],
  },
  "sivabharani-comments": {
    title: "Sivabharani",
    status: "Live",
    notes: [
      "Finding viewer shoutouts across 1,400 Tamil tech videos meant scanning 1.18M raw transcript chunks full of mixed Tanglish words that regex and standard NER miss.",
      "I grouped those chunks into 36,818 overlapping 65-second windows and processed them across a 27-key multi-threaded Groq pool (Qwen3.8-27B) with 7.5s per-key pacing, x-ratelimit checks, 429 key retirement, and thread-locked JSONL checkpoints before loading Meilisearch.",
    ],
    receipts: [
      "15,155 unique commenter hits indexed with sub-second typo-tolerant search.",
      "16,131-row transcript-moment dataset published on Hugging Face.",
    ],
    stack: "Python · Multi-threading · Groq API · Qwen3.8-27B · Meilisearch",
    extraLinks: [],
  },
  txt: {
    title: "Txt",
    status: "Live",
    notes: [
      "I built an offline SMS transfer protocol that packs 1.2-2.8 KB grayscale photos, QR codes, GPS coordinates, and raw UPI payment URIs into 153-character GSM-7 frames.",
      "Each frame uses a base36 header, base64 payload, and CRC32 check for out-of-order reassembly. On Android, it pairs with a native Kotlin telephony module (400ms ContentProvider debounce, multi-SIM dispatch), WAL-mode SQLite, TRAI 100 SMS/day quota guards, and an offline PWA.",
    ],
    receipts: [
      "Byte-exact UPI payment passthrough launches installed apps (GPay, PhonePe) directly.",
      "93 passing bun tests in CI.",
    ],
    stack: "React Native · Expo · Kotlin · SQLite WAL · Bun",
    extraLinks: [
      { label: "Releases", href: "https://github.com/barryallen16/txt/releases" },
    ],
  },
  "resume-builder-skill": {
    title: "Resume Skill",
    status: "OSS",
    notes: [
      "Agent resume workflows waste vision tokens just re-checking whether page two overflowed after a build. I wrote a two-step Python CLI (pipeline.py) combining persistent profile loading, TECH_SYNONYMS keyword audits, python-docx + headless LibreOffice PDF builds, and hyphen checks.",
      "Deterministic line-budget math fails closed before a build spills onto page two. Output uses stdlib TOON (v4.4) tables to cut agent response tokens ~40% (25-65% vs JSON) and sync applications to Grey Matter.",
    ],
    receipts: [
      "73 unittest tests passing across OpenClaw, Claude Code, and Hermes Agent integrations.",
    ],
    stack: "Python · python-docx · LibreOffice · TOON v4.4 · uv",
    extraLinks: [],
  },
  "hr-rag-agent": {
    title: "Clerk",
    status: "OSS",
    notes: [
      "I built a local FastAPI HR agent that queries 27 ChromaDB entries (6 CSV policies + 21 handbook chunks) before calling typed SQLite leave tools on offline lfm3-1.7b via LM Studio or Ollama.",
      "It forces policy lookup before answering, checks YYYY-MM-DD dates across turns, keeps 20-message SQLite sessions, and blocks mismatched X-Employee-ID callers with a 403.",
    ],
    receipts: [
      "10/10 policy retrieval, 12/14 tool selection, and 13/14 answer accuracy on a 14-case eval harness.",
      "19-test pytest suite running in GitHub Actions CI.",
    ],
    stack: "Python · FastAPI · ChromaDB · SQLite · lfm3-1.7b",
    extraLinks: [],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  setupFiltering();
  setupProjectNotes();
  setupDemoVideos();
  setupCommandPalette();
  setupGithubHeatmap();
  setupCopyEmail();
});

function setupDemoVideos() {
  const videos = document.querySelectorAll("video.project-media");
  if (!videos.length) return;

  videos.forEach((v) => {
    v.addEventListener("click", () => {
      if (v.paused) v.play().catch(() => {});
      else v.pause();
    });
  });

  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    },
    { threshold: 0.15 }
  );
  videos.forEach((v) => io.observe(v));
}

function setupFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const noResults = document.getElementById("no-results");
  const showMoreBtn = document.getElementById("show-more-projects");
  const moreLabel = showMoreBtn?.querySelector("[data-more-label]");
  const extraCards = Array.from(projectCards).filter((c) => c.dataset.extra);

  let activeCategory = "all";
  let expanded = false;

  function matchesFilter(card, category) {
    if (category === "all") return true;
    const cats = (card.dataset.categories || "").split(",");
    return category.split(",").some((t) => cats.includes(t));
  }

  function applyFilter(category) {
    activeCategory = category;
    let visible = 0;

    projectCards.forEach((card) => {
      const show = matchesFilter(card, category) && (!card.dataset.extra || expanded || category !== "all");
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (showMoreBtn) {
      const hasHiddenExtras = category === "all" && extraCards.length > 0;
      showMoreBtn.classList.toggle("hidden", !hasHiddenExtras);
      if (moreLabel) moreLabel.textContent = expanded ? "Show featured only" : "View all 9 projects";
      showMoreBtn.setAttribute("aria-expanded", String(expanded));
    }

    if (noResults) {
      noResults.classList.toggle("hidden", visible > 0);
    }

    filterButtons.forEach((btn) => {
      const active = btn.dataset.filter === category;
      btn.setAttribute("aria-pressed", String(active));
      btn.classList.toggle("border-[#fd91cc]/60", active);
      btn.classList.toggle("bg-zinc-900", active);
      btn.classList.toggle("text-white", active);
      btn.classList.toggle("border-white/[0.08]", !active);
      btn.classList.toggle("bg-transparent", !active);
      btn.classList.toggle("text-zinc-300", !active);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  showMoreBtn?.addEventListener("click", () => {
    expanded = !expanded;
    applyFilter(activeCategory);
  });

  window.revealProjectCard = function (slug) {
    const card = document.querySelector(`.project-card[data-project="${slug}"]`);
    if (!card) return null;
    if (card.dataset.extra) expanded = true;
    if (activeCategory !== "all" && !matchesFilter(card, activeCategory)) {
      applyFilter("all");
    } else if (card.style.display === "none") {
      applyFilter(activeCategory);
    }
    return card;
  };

  applyFilter("all");
}

function setupProjectNotes() {
  function renderNotes(panel, p) {
    if (panel.dataset.rendered === "1") return;
    panel.dataset.rendered = "1";

    p.notes.forEach((text) => {
      const para = document.createElement("p");
      para.className = "max-w-prose";
      para.textContent = text;
      panel.appendChild(para);
    });

    if (Array.isArray(p.receipts) && p.receipts.length) {
      const ul = document.createElement("ul");
      ul.className = "space-y-1 text-zinc-300 pt-0.5 max-w-prose";
      p.receipts.forEach((r) => {
        const li = document.createElement("li");
        li.className = "flex gap-2";
        const dot = document.createElement("span");
        dot.className = "text-zinc-400 font-mono select-none";
        dot.setAttribute("aria-hidden", "true");
        dot.textContent = "•";
        li.append(dot, document.createTextNode(r));
        ul.appendChild(li);
      });
      panel.appendChild(ul);
    }

    const meta = document.createElement("div");
    meta.className = "pt-1 flex flex-wrap items-center justify-between gap-2 text-xs";
    const stack = document.createElement("span");
    stack.className = "font-mono text-zinc-400";
    stack.textContent = p.stack;
    meta.appendChild(stack);

    if (Array.isArray(p.extraLinks) && p.extraLinks.length) {
      const wrap = document.createElement("div");
      wrap.className = "flex flex-wrap items-center gap-4 text-zinc-400";
      p.extraLinks.forEach((l) => {
        const a = document.createElement("a");
        a.href = l.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "group inline-flex items-center gap-1 hover:text-white min-h-[44px]";
        const lbl = document.createElement("span");
        lbl.textContent = l.label;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "w-4 h-4 px-icon text-zinc-400 group-hover:text-[#fd91cc] transition-colors");
        svg.setAttribute("aria-hidden", "true");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttribute("href", "#px-ext");
        svg.appendChild(use);
        a.append(lbl, svg);
        wrap.appendChild(a);
      });
      meta.appendChild(wrap);
    }

    panel.appendChild(meta);
  }

  function setExpanded(slug, open) {
    const btn = document.querySelector(`[data-toggle-project="${slug}"]`);
    const panel = document.querySelector(`[data-project-notes="${slug}"]`);
    const p = PROJECTS[slug];
    if (!btn || !panel || !p) return;

    if (open) renderNotes(panel, p);
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.classList.toggle("text-[#fd91cc]", open);
    btn.querySelector("[data-chevron]")?.classList.toggle("rotate-180", open);
  }

  function openExclusive(slug) {
    const targetCard = document.querySelector(`.project-card[data-project="${slug}"]`);
    const beforeTop = targetCard?.getBoundingClientRect().top ?? 0;

    document.querySelectorAll('[data-toggle-project][aria-expanded="true"]').forEach((otherBtn) => {
      if (otherBtn.dataset.toggleProject !== slug) {
        setExpanded(otherBtn.dataset.toggleProject, false);
      }
    });

    setExpanded(slug, true);

    if (targetCard) {
      const delta = targetCard.getBoundingClientRect().top - beforeTop;
      if (Math.abs(delta) > 1) window.scrollBy(0, delta);
    }
  }

  document.querySelectorAll("[data-toggle-project]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.toggleProject;
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) setExpanded(slug, false);
      else openExclusive(slug);
    });
  });

  window.openProjectNotes = function (slug) {
    const card = window.revealProjectCard ? window.revealProjectCard(slug) : document.querySelector(`.project-card[data-project="${slug}"]`);
    if (!card) return;
    openExclusive(slug);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  };
}

function setupCommandPalette() {
  const dialog = document.getElementById("cmd-palette");
  const trigger = document.getElementById("cmd-trigger");
  const closeBtn = document.getElementById("cmd-close");
  const input = document.getElementById("cmd-input");
  const list = document.getElementById("cmd-list");
  if (!dialog || !input || !list) return;

  const commands = [
    { label: "Jump to experience", hint: "#experience", action: () => { location.hash = "#experience"; } },
    { label: "Jump to projects", hint: "#projects", action: () => { location.hash = "#projects"; } },
    { label: "Jump to stack", hint: "#stack", action: () => { location.hash = "#stack"; } },
    { label: "Jump to GitHub activity", hint: "#contributions", action: () => { location.hash = "#contributions"; } },
    { label: "Jump to contact", hint: "#contact", action: () => { location.hash = "#contact"; } },
    { label: "Open résumé", hint: "./resume/", action: () => { location.href = "./resume/"; } },
    { label: "Copy email address", hint: "rjayadithya11@gmail.com", action: () => document.getElementById("copy-email-btn")?.click() },
    ...Object.entries(PROJECTS).map(([slug, p]) => ({
      label: p.title,
      hint: p.status,
      action: () => window.openProjectNotes?.(slug),
    })),
  ];

  let selectedIdx = 0;
  let filtered = commands;

  function render() {
    list.innerHTML = "";
    if (!filtered.length) {
      const empty = document.createElement("li");
      empty.className = "px-3 py-4 text-center font-mono text-xs text-zinc-400";
      empty.textContent = "No matching commands.";
      list.appendChild(empty);
      return;
    }

    filtered.forEach((cmd, idx) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(idx === selectedIdx));
      li.className = `flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-lg cursor-pointer ${
        idx === selectedIdx ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-900"
      }`;
      const left = document.createElement("span");
      left.textContent = cmd.label;
      const right = document.createElement("span");
      right.className = "font-mono text-xs text-zinc-400";
      right.textContent = cmd.hint;
      li.append(left, right);
      li.addEventListener("click", () => {
        dialog.close();
        cmd.action();
      });
      list.appendChild(li);
    });

    const activeEl = list.children[selectedIdx];
    activeEl?.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    input.value = "";
    filtered = commands;
    selectedIdx = 0;
    render();
    dialog.showModal();
    input.focus();
  }

  trigger?.addEventListener("click", openPalette);
  closeBtn?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (dialog.open) dialog.close();
      else openPalette();
    }
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    filtered = commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
    selectedIdx = 0;
    render();
  });

  input.addEventListener("keydown", (e) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIdx = (selectedIdx + 1) % filtered.length;
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIdx = (selectedIdx - 1 + filtered.length) % filtered.length;
      render();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = filtered[selectedIdx];
      dialog.close();
      chosen?.action();
    }
  });
}

async function setupGithubHeatmap() {
  const grid = document.getElementById("gh-grid");
  const monthsEl = document.getElementById("gh-months");
  const totalEl = document.getElementById("gh-total");
  const card = document.getElementById("gh-card");
  const scrollWrap = document.getElementById("gh-scroll");
  const tooltip = document.getElementById("gh-tooltip");
  const tipText = tooltip?.querySelector("[data-tip-text]");
  const tipArrow = tooltip?.querySelector("[data-tip-arrow]");
  const fallback = document.getElementById("gh-fallback");
  if (!grid || !totalEl) return;

  const levelClasses = [
    "bg-zinc-800/90",
    "bg-[#fd91cc]/25",
    "bg-[#fd91cc]/45",
    "bg-[#fd91cc]/70",
    "bg-[#fd91cc]",
  ];
  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const cacheKey = "gh_heatmap_barryallen16_v2";
  const ttlMs = 6 * 60 * 60 * 1000;

  let tipOpen = false;
  let tipPinned = false;
  let lastIdx = -1;

  function formatDayLabel(day) {
    const count = Number(day.count) || 0;
    const noun = count === 1 ? "contribution" : "contributions";
    const prettyDate = dateFmt.format(new Date(`${day.date}T00:00:00Z`));
    return `${prettyDate}: ${count} ${noun}`;
  }

  function showTip(btn, pin) {
    if (!tooltip || !tipText || !card) return;
    const label = btn.dataset.label;
    if (!label) return;

    const alreadyOpen = tipOpen;
    tipOpen = true;
    if (pin !== undefined) tipPinned = pin;

    tipText.textContent = label;
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.classList.toggle("transition-[transform,opacity]", alreadyOpen);
    tooltip.classList.toggle("duration-150", alreadyOpen);
    tooltip.classList.toggle("ease-out", alreadyOpen);

    const cardRect = card.getBoundingClientRect();
    const cellRect = btn.getBoundingClientRect();
    const tipWidth = tooltip.offsetWidth;
    const tipHeight = tooltip.offsetHeight;

    const centerX = cellRect.left - cardRect.left + cellRect.width / 2;
    const maxLeft = Math.max(4, card.clientWidth - tipWidth - 4);
    const left = Math.max(4, Math.min(centerX - tipWidth / 2, maxLeft));
    const placeBottom = cellRect.top < 96;
    const top = placeBottom
      ? cellRect.bottom - cardRect.top + 6
      : cellRect.top - cardRect.top - tipHeight - 6;

    tooltip.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
    tooltip.style.opacity = "1";

    if (tipArrow) {
      const arrowLeft = Math.max(8, Math.min(centerX - left - 3, tipWidth - 14));
      tipArrow.style.left = `${Math.round(arrowLeft)}px`;
      tipArrow.style.top = placeBottom ? "-3px" : "";
      tipArrow.style.bottom = placeBottom ? "" : "-3px";
    }
  }

  function hideTip(force = false) {
    if (!tooltip) return;
    if (!force && tipPinned) return;
    tipOpen = false;
    tipPinned = false;
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.classList.remove("transition-[transform,opacity]", "duration-150", "ease-out");
    tooltip.style.opacity = "0";
  }

  if (grid.dataset.tipBound !== "1") {
    grid.dataset.tipBound = "1";

    grid.addEventListener("pointerover", (e) => {
      if (e.pointerType === "touch") return;
      const btn = e.target.closest("button[data-index]");
      if (btn) showTip(btn, false);
    });

    card?.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "touch") hideTip(false);
    });

    grid.addEventListener("focusin", (e) => {
      const btn = e.target.closest("button[data-index]");
      if (btn) showTip(btn, false);
    });

    grid.addEventListener("focusout", (e) => {
      if (!grid.contains(e.relatedTarget)) hideTip(true);
    });

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-index]");
      if (!btn) return;
      e.preventDefault();
      showTip(btn, true);
    });

    grid.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideTip(true);
        return;
      }
      const btn = e.target.closest("button[data-index]");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      let nextIdx;
      const row = idx % 7;
      switch (e.key) {
        case "ArrowLeft":
          nextIdx = idx - 7;
          break;
        case "ArrowRight":
          nextIdx = idx + 7;
          break;
        case "ArrowUp":
          nextIdx = row > 0 ? idx - 1 : idx;
          break;
        case "ArrowDown":
          nextIdx = row < 6 ? idx + 1 : idx;
          break;
        case "Home":
          nextIdx = 0;
          break;
        case "End":
          nextIdx = lastIdx;
          break;
        default:
          return;
      }
      const next = grid.querySelector(`button[data-index="${nextIdx}"]`);
      if (!next) return;
      e.preventDefault();
      btn.tabIndex = -1;
      next.tabIndex = 0;
      next.focus({ preventScroll: true });
      next.scrollIntoView({ inline: "nearest", block: "nearest" });
      showTip(next, false);
    });

    scrollWrap?.addEventListener("scroll", () => hideTip(true), { passive: true });
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (tipOpen && tipPinned && !grid.contains(e.target)) hideTip(true);
      },
      true
    );
  }

  function getSig(data) {
    const list = Array.isArray(data?.contributions) ? data.contributions : [];
    const last = list[list.length - 1];
    return `${data?.total?.lastYear ?? ""}|${last?.date ?? ""}|${last?.count ?? ""}`;
  }

  function renderHeatmap(data) {
    const contributions = Array.isArray(data?.contributions) ? data.contributions : [];
    if (!contributions.length) return false;

    const firstDay = new Date(`${contributions[0].date}T00:00:00Z`).getUTCDay();
    lastIdx = contributions.length - 1;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < firstDay; i++) {
      const pad = document.createElement("div");
      pad.className = "aspect-square";
      pad.setAttribute("aria-hidden", "true");
      frag.appendChild(pad);
    }

    contributions.forEach((day, idx) => {
      const cell = document.createElement("button");
      const lvl = Math.min(4, Math.max(0, Number(day.level) || 0));
      const label = formatDayLabel(day);
      cell.type = "button";
      cell.tabIndex = idx === lastIdx ? 0 : -1;
      cell.dataset.index = String(idx);
      cell.dataset.label = label;
      cell.setAttribute("aria-label", label);
      cell.className = `aspect-square w-full rounded-[2px] ${levelClasses[lvl]} cursor-pointer outline-none hover:z-10 hover:ring-1 hover:ring-white/80 focus-visible:z-10 focus-visible:ring-1 focus-visible:ring-white`;
      frag.appendChild(cell);
    });

    grid.innerHTML = "";
    grid.appendChild(frag);

    if (monthsEl) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const lastDate = new Date(`${contributions[contributions.length - 1].date}T00:00:00Z`);
      const labels = Array.from({ length: 12 }, (_, idx) => {
        const m = (lastDate.getUTCMonth() + 1 + idx) % 12;
        return monthNames[m];
      });
      monthsEl.innerHTML = "";
      labels.forEach((name) => {
        const s = document.createElement("span");
        s.textContent = name;
        monthsEl.appendChild(s);
      });
    }

    const total = Number(data?.total?.lastYear) || contributions.reduce((acc, d) => acc + (Number(d.count) || 0), 0);
    totalEl.textContent = `${total.toLocaleString()} contributions in the last year`;
    return true;
  }

  let rendered = false;
  let currentSig = "";
  let isStale = true;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (renderHeatmap(parsed?.data)) {
        rendered = true;
        currentSig = getSig(parsed.data);
        isStale = Date.now() - (Number(parsed.fetchedAt) || 0) > ttlMs;
      }
    }
  } catch {}

  if (!rendered) {
    try {
      const snapRes = await fetch("./gh-contributions.json");
      if (snapRes.ok) {
        const snap = await snapRes.json();
        if (renderHeatmap(snap)) {
          rendered = true;
          currentSig = getSig(snap);
        }
      }
    } catch {}
  }

  if (!rendered) {
    grid.innerHTML = "";
    for (let i = 0; i < 371; i++) {
      const skel = document.createElement("div");
      skel.className = "aspect-square rounded-[2px] bg-zinc-900";
      grid.appendChild(skel);
    }
  }

  if (!isStale && rendered) return;

  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/barryallen16?y=last", {
      signal: AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const fresh = await res.json();
    const freshSig = getSig(fresh);
    if (!Array.isArray(fresh?.contributions) || !fresh.contributions.length) {
      throw new Error("Empty contributions");
    }

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), data: fresh }));
    } catch {}

    if (!rendered || freshSig !== currentSig) {
      rendered = renderHeatmap(fresh);
    }
  } catch {
    if (!rendered) {
      card?.classList.add("hidden");
      fallback?.classList.remove("hidden");
    }
  }
}

function setupCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const labelEl = copyBtn?.querySelector("[data-copy-label]");
  const statusEl = document.getElementById("copy-status");
  if (!copyBtn || !labelEl) return;

  const email = "rjayadithya11@gmail.com";
  const defaultLabel = "Copy email";
  let resetTimer = null;

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }

      if (resetTimer) clearTimeout(resetTimer);
      labelEl.textContent = "Copied";
      labelEl.classList.add("text-[#fd91cc]", "font-mono");
      copyBtn.setAttribute("aria-label", "Email copied to clipboard");
      if (statusEl) statusEl.textContent = "Email address copied to clipboard.";

      resetTimer = setTimeout(() => {
        labelEl.textContent = defaultLabel;
        labelEl.classList.remove("text-[#fd91cc]", "font-mono");
        copyBtn.setAttribute("aria-label", "Copy email address");
        if (statusEl) statusEl.textContent = "";
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}
