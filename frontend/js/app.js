// js/app.js
//
// Shared behaviour for every page:
//   - Header turns solid ("sticky") once you scroll down
//   - Mobile hamburger menu opens/closes the nav links
//   - "Back to top" button appears after scrolling, and scrolls up on click
//   - FAQ accordion (only does something on pages that have .faq-item)
//   - Simple front-end-only handlers for the newsletter/contact forms
//     where a page hasn't already wired up its own submit handler

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Sticky header ----------
  const header = document.getElementById("header");
  if (header) {
    const applyStickyState = () => {
      header.classList.toggle("sticky", window.scrollY > 60);
    };
    applyStickyState();
    window.addEventListener("scroll", applyStickyState);
  }

  // ---------- Mobile menu toggle ----------
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    // Close the menu when a link is tapped (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // ---------- Back to top button ----------
  const backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 400);
    });
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      // Close any other open FAQ items in the same list first
      item.parentElement.querySelectorAll(".faq-item.active").forEach((openItem) => {
        openItem.classList.remove("active");
      });
      if (!isOpen) item.classList.add("active");
    });
  });

  // ---------- Newsletter form (front-end only for now) ----------
  const newsletterForm = document.querySelector(".newsletter form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      alert("Thanks for subscribing! (This form isn't connected to an email list yet.)");
      input.value = "";
    });
  }
});
/* Sticky Navbar */

window.addEventListener("scroll", function () {

    const header = document.getElementById("header");

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});