// Shared mobile navigation, drag-and-drop menu arrangement and footer year.
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰"; }
  }));

  const arrangeButton = nav.querySelector(".nav-arrange-toggle");
  const storageKey = "asthaLaviMenuOrderV1";
  const getLinks = () => [...nav.querySelectorAll(":scope > a")];
  const applySavedOrder = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(saved) || !saved.length) return;
      const links = getLinks();
      const byHref = new Map(links.map(a => [a.getAttribute("href"), a]));
      saved.forEach(href => { const link = byHref.get(href); if (link) nav.insertBefore(link, arrangeButton); });
    } catch (_) { /* Keep the default menu if browser storage is unavailable. */ }
  };
  const saveOrder = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(getLinks().map(a => a.getAttribute("href")))); } catch (_) {}
  };
  applySavedOrder();

  if (arrangeButton) {
    let dragged = null;
    const setArrangeMode = enabled => {
      nav.classList.toggle("is-arranging", enabled);
      arrangeButton.setAttribute("aria-pressed", String(enabled));
      arrangeButton.textContent = enabled ? "✓ Done arranging" : "↕ Arrange";
      getLinks().forEach(link => { link.draggable = enabled; });
      arrangeButton.title = enabled ? "Menu item ko pakadkar nayi jagah chhodein, phir Done dabayein" : "Menu items ko drag karke arrange karein";
    };
    arrangeButton.addEventListener("click", () => {
      const enabled = arrangeButton.getAttribute("aria-pressed") !== "true";
      setArrangeMode(enabled);
      if (!enabled) saveOrder();
    });
    nav.addEventListener("dragstart", event => {
      const link = event.target.closest("a");
      if (!nav.classList.contains("is-arranging") || !link || link.parentElement !== nav) return;
      dragged = link;
      link.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", link.getAttribute("href") || "menu-item");
    });
    nav.addEventListener("dragover", event => {
      const target = event.target.closest("a");
      if (!dragged || !target || target.parentElement !== nav || target === dragged) return;
      event.preventDefault();
      nav.querySelectorAll(".drop-target").forEach(el => el.classList.remove("drop-target"));
      target.classList.add("drop-target");
      const rect = target.getBoundingClientRect();
      const after = (event.clientX - rect.left) > rect.width / 2;
      nav.insertBefore(dragged, after ? target.nextSibling : target);
    });
    nav.addEventListener("drop", event => { if (dragged) { event.preventDefault(); saveOrder(); } });
    nav.addEventListener("dragend", () => {
      if (dragged) dragged.classList.remove("dragging");
      nav.querySelectorAll(".drop-target").forEach(el => el.classList.remove("drop-target"));
      dragged = null;
      saveOrder();
    });
  }
}
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
