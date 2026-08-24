// // // js/home-products.js
// // //
// // // Runs on index.html. Shows a few of the real products from the
// // // catalog (the same ones added through admin.html) in the
// // // "Featured Products" section - no hardcoded example products.

// // document.addEventListener("DOMContentLoaded", function () {
// //   const grid = document.getElementById("home-product-grid");
// //   if (!grid) return;

// //   const FEATURED_COUNT = 4; // how many products to show on the homepage

// //   fetch("/api/products")
// //     .then((res) => res.json())
// //     .then((products) => {
// //       if (!products.length) {
// //         grid.innerHTML = `<p style="text-align:center;color:var(--gray);grid-column:1/-1;">
// //           No products yet. Add your first product from the <a href="admin.html">admin page</a>.
// //         </p>`;
// //         return;
// //       }

// //       const featured = products.slice(0, FEATURED_COUNT);

// //       grid.innerHTML = featured
// //         .map(
// //           (p, i) => `
// //         <div class="product-card" data-aos="fade-up" data-aos-delay="${i * 150}">
// //           <div class="product-image">
// //             <img src="${p.imageUrl}" alt="${escapeHtml(p.name)}">
// //           </div>
// //           <div class="product-body">
// //             <span class="badge">${escapeHtml(p.category)}</span>
// //             <h3>${escapeHtml(p.name)}</h3>
// //             <p>${escapeHtml(p.description)}</p>
// //             <div class="product-footer">
// //               <a href="shop.html" class="btn">View Details</a>
// //             </div>
// //           </div>
// //         </div>
// //       `
// //         )
// //         .join("");

// //       if (window.AOS) AOS.refreshHard();
// //     })
// //     .catch((err) => {
// //       grid.innerHTML = `<p style="text-align:center;color:var(--gray);grid-column:1/-1;">Couldn't load products right now.</p>`;
// //       console.error(err);
// //     });

// //   function escapeHtml(str) {
// //     const div = document.createElement("div");
// //     div.textContent = str ?? "";
// //     return div.innerHTML;
// //   }
// // });
// // js/home-products.js
// //
// // Runs on index.html. Shows a few of the real products from the
// // catalog (the same ones added through admin.html) in the
// // "Featured Products" section - no hardcoded example products.

// document.addEventListener("DOMContentLoaded", function () {
//   const grid = document.getElementById("home-product-grid");
//   if (!grid) return;

//   const FEATURED_COUNT = 4; // how many products to show on the homepage
//   const API_URL = "http://localhost:5000/api/products";

//   fetch(API_URL)
//     .then((res) => res.json())
//     .then((products) => {
//       if (!products.length) {
//         grid.innerHTML = `<p style="text-align:center;color:var(--gray);grid-column:1/-1;">
//           No products yet. Add your first product from the <a href="admin.html">admin page</a>.
//         </p>`;
//         return;
//       }

//       const featured = products.slice(0, FEATURED_COUNT);

//       grid.innerHTML = featured
//         .map(
//           (p, i) => `
//         <div class="product-card" data-aos="fade-up" data-aos-delay="${i * 150}">
//           <div class="product-image">
//             <img src="http://localhost:5000${p.imageUrl}" alt="${escapeHtml(p.name)}">
//           </div>
//           <div class="product-body">
//             <span class="badge">${escapeHtml(p.category)}</span>
//             <h3>${escapeHtml(p.name)}</h3>
//             <p>${escapeHtml(p.description)}</p>
//             <div class="product-footer">
//               <a href="shop.html" class="btn">View Details</a>
//             </div>
//           </div>
//         </div>
//       `
//         )
//         .join("");

//       if (window.AOS) AOS.refreshHard();
//     })
//     .catch((err) => {
//       grid.innerHTML = `<p style="text-align:center;color:var(--gray);grid-column:1/-1;">Couldn't load products right now.</p>`;
//       console.error(err);
//     });

//   function escapeHtml(str) {
//     const div = document.createElement("div");
//     div.textContent = str ?? "";
//     return div.innerHTML;
//   }
// });
const API = "http://localhost:5000/api/products";

async function loadHomeProducts() {

    const grid = document.getElementById("home-product-grid");

    if (!grid) return;

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        if (!products || products.length === 0) {

            grid.innerHTML = `
                <p class="no-products">
                    No products available yet.
                </p>
            `;

            return;
        }


        grid.innerHTML = products.map(product => `

            <div class="product-card">

                <!-- PRODUCT IMAGE -->
                <div class="product-image">

                    <img
                        src="http://localhost:5000${product.imageUrl}"
                        alt="${product.name}"
                        loading="lazy">

                </div>


                <!-- PRODUCT CONTENT -->
                <div class="product-body">

                    <!-- CATEGORY -->
                    <span class="badge">
                        ${product.category}
                    </span>


                    <!-- PRODUCT NAME -->
                    <h3>
                        ${product.name}
                    </h3>


                    <!-- DESCRIPTION -->
                    <p>
                        ${product.description}
                    </p>


                    <!-- FEATURES -->
                    <div class="product-features">

                        <span>
                            🌿 Natural
                        </span>

                        <span>
                            ♻ Eco Friendly
                        </span>

                        <span>
                            ✔ Quality Tested
                        </span>

                    </div>


                    <!-- BUTTONS -->
                    <div class="product-footer">

                        <a
                            href="product.html?id=${product._id}"
                            class="btn">

                            View Details

                        </a>

                        <a
                            href="contact.html"
                            class="btn-outline">

                            Request Quote

                        </a>

                    </div>

                </div>

            </div>

        `).join("");

    }

    catch (error) {

        console.error(
            "Error loading home products:",
            error
        );

        grid.innerHTML = `

            <p class="no-products">

                Unable to load products.
                Please try again later.

            </p>

        `;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    loadHomeProducts
);