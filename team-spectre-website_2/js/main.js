(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasFinePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var toggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("is-open", !isOpen);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
  }

  /* Header background/shadow once the page has scrolled a bit */
  var header = document.getElementById("site-header");
  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* Highlight the nav link that matches the current page */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var currentPage = location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute("href").split("/").pop();
    link.classList.toggle("is-active", linkPage === currentPage);
  });

  /* Scroll-reveal for content below the fold.
     Content is fully visible either way — see the CSS: .reveal only ever
     nudges a translateY, it never hides anything with opacity. */
  var groupSelectors = [
    ".roster-grid > *",
    ".values-grid > *",
    ".donate-tiers > li",
    ".event-list > li",
    ".gallery-grid > *",
    ".sponsor-tiers > *"
  ];
  var singleSelectors = [
    ".section-head",
    ".about-copy",
    ".robot-specs-card",
    ".sponsors-intro",
    ".donate-copy",
    ".contact-grid > *"
  ];

  var revealTargets = [];

  groupSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 6) * 70 + "ms";
      revealTargets.push(el);
    });
  });
  singleSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("reveal");
      revealTargets.push(el);
    });
  });

  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { reveal.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Cursor-follow glow in the hero (desktop pointer only, purely decorative) */
  var hero = document.querySelector(".hero");
  var glow = document.getElementById("cursor-glow");
  if (hero && glow && hasFinePointer && !prefersReducedMotion) {
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty("--mx", x + "%");
      glow.style.setProperty("--my", y + "%");
      glow.classList.add("is-active");
    });
    hero.addEventListener("mouseleave", function () {
      glow.classList.remove("is-active");
    });
  }

  /* Magnetic buttons: a subtle pull toward the cursor (desktop pointer only) */
  if (hasFinePointer && !prefersReducedMotion) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.25;
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - (rect.left + rect.width / 2);
        var y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = "translate(" + x * strength + "px, " + y * strength + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }
})();
