
// shop.js
// const BACKEND_ORIGIN = "http://localhost:5000";
// const API_URL = BACKEND_ORIGIN + "/api/products";
const API_URL = "/api/products";
let allProducts = [];
let activeCategory = "All";

const grid = document.getElementById("shop-grid");
const filterButtons = document.querySelectorAll(".shop-filter-btn");

// Load products from backend
async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        allProducts = await response.json();

        renderProducts();

    } catch (err) {

        console.error(err);

        grid.innerHTML = `
            <div class="shop-empty">
                Couldn't load products.
            </div>
        `;
    }
}

// Render Product Cards
function renderProducts() {

    const filtered =
        activeCategory === "All"
            ? allProducts
            : allProducts.filter(
                  (p) => p.category === activeCategory
              );

    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="shop-empty">
                No products available.
            </div>
        `;

        return;
    }

    grid.innerHTML = filtered
        .map(
            (p, i) => `
<div class="product-card"
     data-aos="zoom-in"
     data-aos-delay="${i * 100}">

    <div class="product-image">

        <img
            src="${BACKEND_ORIGIN}${p.imageUrl}"
            alt="${escapeHtml(p.name)}">

    </div>

    <div class="product-body">

        <span class="badge">
            ${escapeHtml(p.category)}
        </span>

        <h3>
            ${escapeHtml(p.name)}
        </h3>

        <p>
            ${escapeHtml(p.description)}
        </p>

        <div class="product-features">

            <span>🌿 Natural</span>

            <span>♻ Eco Friendly</span>

            <span>✔ Quality Tested</span>

        </div>

        <div class="product-footer">

            <a href="#" class="btn">
                View Details
            </a>

            <a href="contact.html"
               class="quote-btn">
                Request Quote
            </a>

        </div>

    </div>

</div>
`
        )
        .join("");

    if (window.AOS) {
        AOS.refreshHard();
    }
}

// Escape HTML
function escapeHtml(str) {

    const div = document.createElement("div");

    div.textContent = str ?? "";

    return div.innerHTML;
}

// Category Filter
filterButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        activeCategory = btn.dataset.cat;

        filterButtons.forEach((b) =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        renderProducts();

    });

});

// URL category support
const params = new URLSearchParams(window.location.search);

const startingCategory = params.get("cat");

if (startingCategory) {

    activeCategory = startingCategory;

    filterButtons.forEach((b) => {

        b.classList.toggle(
            "active",
            b.dataset.cat === startingCategory
        );

    });

}

// Load products
loadProducts();