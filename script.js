(function () {
  "use strict";

  /* ---------- Theme toggle (light / dark, persisted) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var STORAGE_KEY = "dh-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
      toggle.setAttribute("aria-pressed", "true");
    } else {
      root.classList.remove("dark");
      toggle.setAttribute("aria-pressed", "false");
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }

  if (stored) {
    applyTheme(stored);
  } else {
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  toggle.addEventListener("click", function () {
    var next = root.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage unavailable */ }
  });

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var links = document.querySelector(".nav-links");

  if (burger && links) {
    burger.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
