/* Red Pen & Pixel · small touches. The page works without this file. */
(() => {
  const root = document.documentElement;
  root.classList.remove("no-js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Theme: remembered per visitor, "t" toggles ---- */
  try {
    const saved = localStorage.getItem("rpp-theme");
    if (saved) root.dataset.theme = saved;
  } catch (_) {}
  const toggleTheme = () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("rpp-theme", root.dataset.theme); } catch (_) {}
  };

  /* ---- Keyboard: 1 work, 2 order, t theme ---- */
  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)) return;
    const jump = { "1": "#work", "2": "#order" }[e.key];
    if (jump) { document.querySelector(jump)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    if (e.key === "t") toggleTheme();
  });

  /* ---- Sticky bar border once you scroll ---- */
  const bar = document.querySelector(".bar");
  const onScroll = () => bar.classList.toggle("is-stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Stagger indexes for the order list ---- */
  document.querySelectorAll(".menu li").forEach((li, i) => li.style.setProperty("--i", i));

  /* ---- Count-up ---- */
  const countUp = (el) => {
    const end = +el.dataset.count;
    if (reduce) { el.textContent = end; return; }
    const t0 = performance.now(), dur = 1100;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("is-in");
      target.querySelectorAll?.("[data-count]").forEach(countUp);
      io.unobserve(target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  document.querySelectorAll(".reveal, .plot, .menu li, .compare, .promise .ink").forEach((el) => io.observe(el));

  /* ---- Videos: load when near, play only while on screen ---- */
  const vio = new IntersectionObserver((entries) => {
    for (const { target: v, isIntersecting } of entries) {
      const plot = v.closest(".plot");
      if (isIntersecting) {
        if (!v.src && v.dataset.src) {
          v.addEventListener("loadeddata", () => v.closest(".device").classList.add("has-video"), { once: true });
          v.src = v.dataset.src; // missing file = skeleton stays
        }
        if (!reduce) { v.play?.().catch(() => {}); plot?.classList.add("is-playing"); }
      } else {
        v.pause?.();
        plot?.classList.remove("is-playing");
      }
    }
  }, { threshold: 0.35 });
  document.querySelectorAll("video.clip").forEach((v) => vio.observe(v));

  /* ---- Before/after slider ---- */
  document.querySelectorAll(".compare__stage").forEach((stage) => {
    const range = stage.querySelector(".compare__range");
    const set = () => stage.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", set);
    set();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
