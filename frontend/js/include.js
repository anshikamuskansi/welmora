// // ========================================
// // WELMORA HEADER & FOOTER LOADER
// // ========================================

// document.addEventListener("DOMContentLoaded", function () {

//     loadHeader();
//     loadFooter();

// });


// // ========================================
// // LOAD HEADER
// // ========================================

// async function loadHeader() {

//     const headerContainer =
//         document.getElementById("header-container");

//     if (!headerContainer) return;

//     try {

//         const response = await fetch("header.html");

//         if (!response.ok) {
//             throw new Error("Header file not found");
//         }

//         const html = await response.text();

//         headerContainer.innerHTML = html;

//         setActiveNavigation();

//         initializeMenu();

//     }

//     catch (error) {

//         console.error(
//             "Unable to load header:",
//             error
//         );

//     }

// }


// // ========================================
// // LOAD FOOTER
// // ========================================

// async function loadFooter() {

//     const footerContainer =
//         document.getElementById("footer-container");

//     if (!footerContainer) return;

//     try {

//         const response = await fetch("footer.html");

//         if (!response.ok) {
//             throw new Error("Footer file not found");
//         }

//         const html = await response.text();

//         footerContainer.innerHTML = html;

//         initializeBackToTop();

//     }

//     catch (error) {

//         console.error(
//             "Unable to load footer:",
//             error
//         );

//     }

// }


// // ========================================
// // ACTIVE NAVIGATION
// // ========================================

// function setActiveNavigation() {

//     const currentPage =
//         window.location.pathname
//         .split("/")
//         .pop()
//         .toLowerCase();


//     const navLinks =
//         document.querySelectorAll(".nav-links a");


//     navLinks.forEach(link => {

//         link.classList.remove("active");

//         const page =
//             link.getAttribute("data-page");


//         if (
//             currentPage === "" &&
//             page === "home"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             currentPage === "index.html" &&
//             page === "home"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             (
//                 currentPage === "shop.html" ||
//                 currentPage === "shop1.html" ||
//                 currentPage === "shopp.html" ||
//                 currentPage === "product.html"
//             ) &&
//             page === "products"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             currentPage === "about.html" &&
//             page === "about"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             currentPage === "faq.html" &&
//             page === "faq"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             currentPage === "contact.html" &&
//             page === "contact"
//         ) {

//             link.classList.add("active");

//         }


//         if (
//             (
//                 currentPage === "admin.html" ||
//                 currentPage === "admin1.html" ||
//                 currentPage === "admin2.html" ||
//                 currentPage === "admin3.html"
//             ) &&
//             page === "admin"
//         ) {

//             link.classList.add("active");

//         }

//     });

// }


// // ========================================
// // MOBILE MENU
// // ========================================

// function initializeMenu() {

//     const menuBtn =
//         document.querySelector(".menu-btn");

//     const navLinks =
//         document.querySelector(".nav-links");


//     if (!menuBtn || !navLinks) return;


//     menuBtn.addEventListener(
//         "click",
//         function () {

//             navLinks.classList.toggle("active");

//         }
//     );


//     const links =
//         navLinks.querySelectorAll("a");


//     links.forEach(link => {

//         link.addEventListener(
//             "click",
//             function () {

//                 navLinks.classList.remove("active");

//             }
//         );

//     });

// }


// // ========================================
// // BACK TO TOP
// // ========================================

// function initializeBackToTop() {

//     const backTop =
//         document.querySelector(".back-top");


//     if (!backTop) return;


//     window.addEventListener(
//         "scroll",
//         function () {

//             if (window.scrollY > 300) {

//                 backTop.classList.add("show");

//             }

//             else {

//                 backTop.classList.remove("show");

//             }

//         }
//     );


//     backTop.addEventListener(
//         "click",
//         function () {

//             window.scrollTo({

//                 top: 0,

//                 behavior: "smooth"

//             });

//         }
//     );

// }

// js/include.js
// Loads header.html and footer.html into every page automatically,
// so you only edit those two files instead of every page.

fetch("header.html")
  .then((res) => res.text())
  .then((html) => {
    const el = document.getElementById("header-placeholder");
    if (el) el.innerHTML = html;
  });

fetch("footer.html")
  .then((res) => res.text())
  .then((html) => {
    const el = document.getElementById("footer-placeholder");
    if (el) el.innerHTML = html;
  });