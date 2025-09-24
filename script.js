(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  // 年表示
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  // モバイルメニュー開閉
  const nav = $(".nav");
  const toggle = $(".nav-toggle");
  const menu = $("#nav-menu");
  if (toggle && nav && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.dataset.open = String(!expanded);
      if (!expanded) menu.focus?.();
    });
    // メニュークリックで閉じる
    $$("#nav-menu a").forEach(a => a.addEventListener("click", () => {
      nav.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

// スクロール出現（双方向）
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("revealed");
    } else {
      e.target.classList.remove("revealed");
    }
  });
}, { threshold: 0.18 });

$$(".reveal-on-scroll").forEach(el => io.observe(el));

  // 詳細ダイアログ
  const dialog = $("#detail-dialog");
  const titleEl = $("#detail-title");
  const subEl = $(".detail-sub");
  const descEl = $(".detail-desc");
  const tagsEl = $(".detail-tags");
  const linkEl = $(".detail-link");

  function openFromCard(card) {
    titleEl.textContent = card.dataset.title || "";
    subEl.textContent = card.dataset.subtitle || "";
    descEl.textContent = card.dataset.desc || "";
    tagsEl.textContent = card.dataset.tags ? `Tags: ${card.dataset.tags}` : "";
    const link = card.dataset.link;
    linkEl.innerHTML = link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">Visit project ↗</a>` : "";
    dialog.showModal();
    setTimeout(() => $(".dialog-close").focus(), 0);
  }
  $$(".card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".open-detail") || e.currentTarget === card) openFromCard(card);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFromCard(card); }
    });
  });
  $(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (e) => {
    const rect = $(".dialog-inner").getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
  });
})();
