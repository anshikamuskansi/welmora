
const API_URL = "/api/products";
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