/* ==========================================
   Reactor Soft Starters Page JS
   - Reveal animation
   - Mission/Vision/Values tabs
   - LV/MV specs tabs
   - FAQ accordion
========================================== */

(function () {
  // Reveal
  const els = document.querySelectorAll(".bo-reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
  }

  // Mission/Vision/Values tabs
  const mvvTabs = document.querySelectorAll(".bo-mvv-tab");
  const mvvPanels = document.querySelectorAll(".bo-mvv-content");
  if (mvvTabs.length && mvvPanels.length) {
    mvvTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        mvvTabs.forEach((t) => t.classList.toggle("is-active", t === tab));
        mvvPanels.forEach((panel) => {
          const match = panel.dataset.tab === target;
          panel.classList.toggle("is-active", match);
        });
      });
    });
  }

  // Specs tabs (LV/MV)
  const specTabs = document.querySelectorAll(".rbs-spec-tab");
  const specPanels = document.querySelectorAll(".rbs-spec-panel");
  if (specTabs.length && specPanels.length) {
    specTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.spec;

        specTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });

        specPanels.forEach((p) => {
          const isLv = target === "lv" && p.id === "spec-lv";
          const isMv = target === "mv" && p.id === "spec-mv";
          p.classList.toggle("is-active", isLv || isMv);
        });
      });
    });
  }

  // FAQ accordion
  const faqBtns = document.querySelectorAll(".rbs-faq-q");
  faqBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".rbs-faq-item");
      const ans = item.querySelector(".rbs-faq-a");
      const expanded = btn.getAttribute("aria-expanded") === "true";

      // close others (optional)
      faqBtns.forEach((b) => {
        if (b !== btn) {
          b.setAttribute("aria-expanded", "false");
          const i = b.closest(".rbs-faq-item");
          const a = i.querySelector(".rbs-faq-a");
          a.hidden = true;
          i.querySelector(".rbs-faq-ico").textContent = "+";
        }
      });

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      ans.hidden = expanded;
      item.querySelector(".rbs-faq-ico").textContent = expanded ? "+" : "–";
    });
  });
})();
