/* ============================================================
   THE OMAKASE PASS — script.js
   Three small jobs:
   1. Smooth-scroll every CTA/anchor to its target section.
   2. Play the hero load-in animation once.
   3. Reveal sections (and settle the hanko stamps) as they
      scroll into view, using IntersectionObserver.

   Everything motion-related is skipped when the visitor has
   asked their system to reduce motion.
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- 1. SMOOTH SCROLL for anchor links marked data-scroll ---- */
  document.querySelectorAll("a[data-scroll]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      // Move keyboard focus to the target for accessibility.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- STICKY MOBILE CTA ----
     Show the fixed "Join the Waitlist" button once the hero has scrolled
     out of view, and hide it again as the waitlist form appears. Runs
     regardless of motion preference — it's a control, not decoration. */
  (function () {
    var sticky = document.querySelector(".sticky-cta");
    var hero = document.getElementById("top");
    var waitlist = document.getElementById("waitlist");
    if (!sticky || !hero || !waitlist || !("IntersectionObserver" in window)) return;

    var heroVisible = true;
    var waitlistVisible = false;

    function update() {
      if (!heroVisible && !waitlistVisible) {
        sticky.classList.add("is-visible");
      } else {
        sticky.classList.remove("is-visible");
      }
    }

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      update();
    }).observe(hero);

    new IntersectionObserver(function (entries) {
      waitlistVisible = entries[0].isIntersecting;
      update();
    }).observe(waitlist);
  })();

  /* If reduced motion is on, make sure nothing stays hidden and
     stop here — no animations at all. */
  if (reduceMotion) {
    document
      .querySelectorAll(".reveal, .reveal-step, .reveal-hero")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
    return;
  }

  /* ---- 2. HERO LOAD-IN (runs once on first paint) ---- */
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      document.querySelectorAll(".reveal-hero").forEach(function (el) {
        el.classList.add("is-visible");
      });
    });
  });

  /* ---- 3. SCROLL REVEALS ---- */
  if (!("IntersectionObserver" in window)) {
    // Very old browser: just show everything.
    document
      .querySelectorAll(".reveal, .reveal-step")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // reveal once, then stop watching
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  document
    .querySelectorAll(".reveal, .reveal-step, .pass-card")
    .forEach(function (el) {
      observer.observe(el);
    });
})();
