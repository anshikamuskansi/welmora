// // // // // js/admin.js
// // // // //
// // // // // This script runs on admin.html.
// // // // // It does three things:
// // // // //   1. Shows a preview of the chosen product photo
// // // // //   2. Sends the "Add product" form to the backend (with the image file)
// // // // //   3. Lists existing products with a delete button

// // // // const API_URL = "/api/products";

// // // // const form = document.getElementById("product-form");
// // // // const submitBtn = document.getElementById("submit-btn");
// // // // const statusMsg = document.getElementById("status-msg");

// // // // const imageInput = document.getElementById("image");
// // // // const previewImg = document.getElementById("preview-img");
// // // // const dropText = document.getElementById("drop-text");

// // // // const existingBody = document.getElementById("existing-products-body");

// // // // // ---------- 1. Image preview ----------
// // // // imageInput.addEventListener("change", () => {
// // // //   const file = imageInput.files[0];
// // // //   if (!file) return;
// // // //   const reader = new FileReader();
// // // //   reader.onload = (e) => {
// // // //     previewImg.src = e.target.result;
// // // //     previewImg.style.display = "block";
// // // //     dropText.textContent = file.name;
// // // //   };
// // // //   reader.readAsDataURL(file);
// // // // });

// // // // // ---------- 2. Submit the form to add a product ----------
// // // // form.addEventListener("submit", async (e) => {
// // // //   e.preventDefault();
// // // //   statusMsg.className = "";
// // // //   statusMsg.textContent = "";

// // // //   // FormData automatically bundles the text fields AND the image file
// // // //   // together in the format the backend (multer) expects.
// // // //   const formData = new FormData(form);

// // // //   submitBtn.disabled = true;
// // // //   submitBtn.textContent = "Adding product…";

// // // //   try {
// // // //     const response = await fetch(API_URL, {
// // // //       method: "POST",
// // // //       body: formData,
// // // //     });

// // // //     const result = await response.json();

// // // //     if (!response.ok) {
// // // //       throw new Error(result.message || "Something went wrong");
// // // //     }

// // // //     statusMsg.textContent = `✅ "${result.name}" was added to the catalog.`;
// // // //     statusMsg.className = "success";
// // // //     form.reset();
// // // //     previewImg.style.display = "none";
// // // //     dropText.textContent = "Click to choose a photo";
// // // //     loadExistingProducts();
// // // //   } catch (err) {
// // // //     statusMsg.textContent = "❌ " + err.message;
// // // //     statusMsg.className = "error";
// // // //   } finally {
// // // //     submitBtn.disabled = false;
// // // //     submitBtn.textContent = "Add product";
// // // //   }
// // // // });

// // // // // ---------- 3. List existing products with a delete option ----------
// // // // async function loadExistingProducts() {
// // // //   try {
// // // //     const response = await fetch(API_URL);
// // // //     const products = await response.json();

// // // //     if (products.length === 0) {
// // // //       existingBody.innerHTML = `<tr><td colspan="5">No products yet.</td></tr>`;
// // // //       return;
// // // //     }

// // // //     existingBody.innerHTML = products
// // // //       .map(
// // // //         (p) => `
// // // //       <tr>
// // // //         <td><img src="${p.imageUrl}" alt="${p.name}" /></td>
// // // //         <td>${p.name}</td>
// // // //         <td>${p.category}</td>
// // // //         <td>₹${p.price}</td>
// // // //         <td><button class="link-btn" data-id="${p._id}">Delete</button></td>
// // // //       </tr>
// // // //     `
// // // //       )
// // // //       .join("");

// // // //     // Attach delete handlers
// // // //     document.querySelectorAll(".link-btn[data-id]").forEach((btn) => {
// // // //       btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
// // // //     });
// // // //   } catch (err) {
// // // //     existingBody.innerHTML = `<tr><td colspan="5">Couldn't load products.</td></tr>`;
// // // //   }
// // // // }

// // // // async function deleteProduct(id) {
// // // //   const password = prompt("Enter admin password to delete this product:");
// // // //   if (!password) return;

// // // //   if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

// // // //   try {
// // // //     const response = await fetch(`${API_URL}/${id}`, {
// // // //       method: "DELETE",
// // // //       headers: { "x-admin-password": password },
// // // //     });
// // // //     const result = await response.json();
// // // //     if (!response.ok) throw new Error(result.message || "Could not delete");
// // // //     loadExistingProducts();
// // // //   } catch (err) {
// // // //     alert("❌ " + err.message);
// // // //   }
// // // // }

// // // // // ---------- Run on page load ----------
// // // // loadExistingProducts();
// // // // js/admin.js
// // // //
// // // // This script runs on admin.html.
// // // // It does three things:
// // // //   1. Shows a preview of the chosen product photo
// // // //   2. Sends the "Add product" form to the backend (with the image file)
// // // //   3. Lists existing products with a delete button

// // // const API_URL = "/api/products";

// // // const form = document.getElementById("product-form");
// // // const submitBtn = document.getElementById("submit-btn");
// // // const statusMsg = document.getElementById("status-msg");

// // // const imageInput = document.getElementById("image");
// // // const previewImg = document.getElementById("preview-img");
// // // const dropText = document.getElementById("drop-text");

// // // const existingBody = document.getElementById("existing-products-body");

// // // // ---------- 1. Image preview ----------
// // // imageInput.addEventListener("change", () => {
// // //   const file = imageInput.files[0];
// // //   if (!file) return;
// // //   const reader = new FileReader();
// // //   reader.onload = (e) => {
// // //     previewImg.src = e.target.result;
// // //     previewImg.style.display = "block";
// // //     dropText.textContent = file.name;
// // //   };
// // //   reader.readAsDataURL(file);
// // // });

// // // // ---------- 2. Submit the form to add a product ----------
// // // form.addEventListener("submit", async (e) => {
// // //   e.preventDefault();
// // //   statusMsg.className = "";
// // //   statusMsg.textContent = "";

// // //   // Price isn't in the form anymore, so ask for it here.
// // //   const price = prompt("Enter price (₹) for this product:");
// // //   if (price === null || price.trim() === "" || isNaN(price)) {
// // //     statusMsg.textContent = "❌ Please enter a valid price to add the product.";
// // //     statusMsg.className = "error";
// // //     return;
// // //   }

// // //   // FormData automatically bundles the text fields AND the image file
// // //   // together in the format the backend (multer) expects.
// // //   const formData = new FormData(form);

// // //   // Manually add fields that aren't present as inputs in the form.
// // //   formData.append("price", price.trim());
// // //   formData.append("unit", "");
// // //   formData.append("minOrderQty", "1");
// // //   formData.append("stock", "0");

// // //   submitBtn.disabled = true;
// // //   submitBtn.textContent = "Adding product…";

// // //   try {
// // //     const response = await fetch(API_URL, {
// // //       method: "POST",
// // //       body: formData,
// // //     });

// // //     const result = await response.json();

// // //     if (!response.ok) {
// // //       throw new Error(result.message || "Something went wrong");
// // //     }

// // //     statusMsg.textContent = `✅ "${result.name}" was added to the catalog.`;
// // //     statusMsg.className = "success";
// // //     form.reset();
// // //     previewImg.style.display = "none";
// // //     dropText.textContent = "Click to choose a photo";
// // //     loadExistingProducts();
// // //   } catch (err) {
// // //     statusMsg.textContent = "❌ " + err.message;
// // //     statusMsg.className = "error";
// // //   } finally {
// // //     submitBtn.disabled = false;
// // //     submitBtn.textContent = "Add product";
// // //   }
// // // });

// // // // ---------- 3. List existing products with a delete option ----------
// // // async function loadExistingProducts() {
// // //   try {
// // //     const response = await fetch(API_URL);
// // //     const products = await response.json();

// // //     if (products.length === 0) {
// // //       existingBody.innerHTML = `<tr><td colspan="5">No products yet.</td></tr>`;
// // //       return;
// // //     }

// // //     existingBody.innerHTML = products
// // //       .map(
// // //         (p) => `
// // //       <tr>
// // //         <td><img src="${p.imageUrl}" alt="${p.name}" /></td>
// // //         <td>${p.name}</td>
// // //         <td>${p.category}</td>
// // //         <td>₹${p.price}</td>
// // //         <td><button class="link-btn" data-id="${p._id}">Delete</button></td>
// // //       </tr>
// // //     `
// // //       )
// // //       .join("");

// // //     // Attach delete handlers
// // //     document.querySelectorAll(".link-btn[data-id]").forEach((btn) => {
// // //       btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
// // //     });
// // //   } catch (err) {
// // //     existingBody.innerHTML = `<tr><td colspan="5">Couldn't load products.</td></tr>`;
// // //   }
// // // }

// // // async function deleteProduct(id) {
// // //   const password = prompt("Enter admin password to delete this product:");
// // //   if (!password) return;

// // //   if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

// // //   try {
// // //     const response = await fetch(`${API_URL}/${id}`, {
// // //       method: "DELETE",
// // //       headers: { "x-admin-password": password },
// // //     });
// // //     const result = await response.json();
// // //     if (!response.ok) throw new Error(result.message || "Could not delete");
// // //     loadExistingProducts();
// // //   } catch (err) {
// // //     alert("❌ " + err.message);
// // //   }
// // // }

// // // // ---------- Run on page load ----------
// // // loadExistingProducts();
// // // js/admin.js
// // //
// // // This script runs on admin.html.
// // // It does three things:
// // //   1. Shows a preview of the chosen product photo
// // //   2. Sends the "Add product" form to the backend (with the image file)
// // //   3. Lists existing products with a delete button

// // const API_URL = "/api/products";

// // const form = document.getElementById("product-form");
// // const submitBtn = document.getElementById("submit-btn");
// // const statusMsg = document.getElementById("status-msg");

// // const imageInput = document.getElementById("image");
// // const previewImg = document.getElementById("preview-img");
// // const dropText = document.getElementById("drop-text");

// // const existingBody = document.getElementById("existing-products-body");

// // // ---------- 1. Image preview ----------
// // imageInput.addEventListener("change", () => {
// //   const file = imageInput.files[0];
// //   if (!file) return;
// //   const reader = new FileReader();
// //   reader.onload = (e) => {
// //     previewImg.src = e.target.result;
// //     previewImg.style.display = "block";
// //     dropText.textContent = file.name;
// //   };
// //   reader.readAsDataURL(file);
// // });

// // // ---------- 2. Submit the form to add a product ----------
// // form.addEventListener("submit", async (e) => {
// //   e.preventDefault();
// //   statusMsg.className = "";
// //   statusMsg.textContent = "";

// //   // FormData automatically bundles the text fields AND the image file
// //   // together in the format the backend (multer) expects.
// //   const formData = new FormData(form);

// //   // Fill in optional fields the backend may expect, since they aren't
// //   // present as inputs in the form.
// //   formData.append("unit", "");
// //   formData.append("minOrderQty", "1");
// //   formData.append("stock", "0");

// //   submitBtn.disabled = true;
// //   submitBtn.textContent = "Adding product…";

// //   try {
// //     const response = await fetch(API_URL, {
// //       method: "POST",
// //       body: formData,
// //     });

// //     const result = await response.json();

// //     if (!response.ok) {
// //       throw new Error(result.message || "Something went wrong");
// //     }

// //     statusMsg.textContent = `✅ "${result.name}" was added to the catalog.`;
// //     statusMsg.className = "success";
// //     form.reset();
// //     previewImg.style.display = "none";
// //     dropText.textContent = "Click to choose a photo";
// //     loadExistingProducts();
// //   } catch (err) {
// //     statusMsg.textContent = "❌ " + err.message;
// //     statusMsg.className = "error";
// //   } finally {
// //     submitBtn.disabled = false;
// //     submitBtn.textContent = "Add product";
// //   }
// // });

// // // ---------- 3. List existing products with a delete option ----------
// // async function loadExistingProducts() {
// //   try {
// //     const response = await fetch(API_URL);
// //     const products = await response.json();

// //     if (products.length === 0) {
// //       existingBody.innerHTML = `<tr><td colspan="5">No products yet.</td></tr>`;
// //       return;
// //     }

// //     existingBody.innerHTML = products
// //       .map(
// //         (p) => `
// //       <tr>
// //         <td><img src="${p.imageUrl}" alt="${p.name}" /></td>
// //         <td>${p.name}</td>
// //         <td>${p.category}</td>
// //         <td>₹${p.price}</td>
// //         <td><button class="link-btn" data-id="${p._id}">Delete</button></td>
// //       </tr>
// //     `
// //       )
// //       .join("");

// //     // Attach delete handlers
// //     document.querySelectorAll(".link-btn[data-id]").forEach((btn) => {
// //       btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
// //     });
// //   } catch (err) {
// //     existingBody.innerHTML = `<tr><td colspan="5">Couldn't load products.</td></tr>`;
// //   }
// // }

// // async function deleteProduct(id) {
// //   const password = prompt("Enter admin password to delete this product:");
// //   if (!password) return;

// //   if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

// //   try {
// //     const response = await fetch(`${API_URL}/${id}`, {
// //       method: "DELETE",
// //       headers: { "x-admin-password": password },
// //     });
// //     const result = await response.json();
// //     if (!response.ok) throw new Error(result.message || "Could not delete");
// //     loadExistingProducts();
// //   } catch (err) {
// //     alert("❌ " + err.message);
// //   }
// // }

// // // ---------- Run on page load ----------
// // loadExistingProducts();
// // js/admin.js
// //
// // This script runs on admin.html.
// // It does three things:
// //   1. Shows a preview of the chosen product photo
// //   2. Sends the "Add product" form to the backend (with the image file)
// //   3. Lists existing products with a delete button

// const API_URL = "http://localhost:5000/api/products";

// const form = document.getElementById("product-form");
// const submitBtn = document.getElementById("submit-btn");
// const statusMsg = document.getElementById("status-msg");

// const imageInput = document.getElementById("image");
// const previewImg = document.getElementById("preview-img");
// const dropText = document.getElementById("drop-text");

// const existingBody = document.getElementById("existing-products-body");

// // ---------- 1. Image preview ----------
// imageInput.addEventListener("change", () => {
//   const file = imageInput.files[0];
//   if (!file) return;
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     previewImg.src = e.target.result;
//     previewImg.style.display = "block";
//     dropText.textContent = file.name;
//   };
//   reader.readAsDataURL(file);
// });

// // ---------- 2. Submit the form to add a product ----------
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   statusMsg.className = "";
//   statusMsg.textContent = "";

//   // FormData automatically bundles the text fields AND the image file
//   // together in the format the backend (multer) expects.
//   const formData = new FormData(form);

//   // Fill in optional fields the backend may expect, since they aren't
//   // present as inputs in the form.
//   formData.append("unit", "");
//   formData.append("minOrderQty", "1");
//   formData.append("stock", "0");

//   submitBtn.disabled = true;
//   submitBtn.textContent = "Adding product…";

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || "Something went wrong");
//     }

//     statusMsg.textContent = `✅ "${result.name}" was added to the catalog.`;
//     statusMsg.className = "success";
//     form.reset();
//     previewImg.style.display = "none";
//     dropText.textContent = "Click to choose a photo";
//     loadExistingProducts();
//   } catch (err) {
//     statusMsg.textContent = "❌ " + err.message;
//     statusMsg.className = "error";
//   } finally {
//     submitBtn.disabled = false;
//     submitBtn.textContent = "Add product";
//   }
// });

// // ---------- 3. List existing products with a delete option ----------
// async function loadExistingProducts() {
//   try {
//     const response = await fetch(API_URL);
//     const products = await response.json();

//     if (products.length === 0) {
//       existingBody.innerHTML = `<tr><td colspan="5">No products yet.</td></tr>`;
//       return;
//     }

//     existingBody.innerHTML = products
//       .map(
//         (p) => `
//       <tr>
//         <td><img src="${p.imageUrl}" alt="${p.name}" /></td>
//         <td>${p.name}</td>
//         <td>${p.category}</td>
//         <td><button class="link-btn" data-id="${p._id}">Delete</button></td>
//       </tr>
//     `
//       )
//       .join("");

//     // Attach delete handlers
//     document.querySelectorAll(".link-btn[data-id]").forEach((btn) => {
//       btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
//     });
//   } catch (err) {
//     existingBody.innerHTML = `<tr><td colspan="5">Couldn't load products.</td></tr>`;
//   }
// }

// async function deleteProduct(id) {
//   const password = prompt("Enter admin password to delete this product:");
//   if (!password) return;

//   if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//       headers: { "x-admin-password": password },
//     });
//     const result = await response.json();
//     if (!response.ok) throw new Error(result.message || "Could not delete");
//     loadExistingProducts();
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// }

// // ---------- Run on page load ----------
// loadExistingProducts();
// ==========================================
// WELMORA ADMIN PRODUCT MANAGEMENT
// Add + Edit + Delete + View Products
// ==========================================

// const API_URL = "http://localhost:5000/api/products";
const API_URL = "/api/products";
const form = document.getElementById("product-form");
const submitBtn = document.getElementById("submit-btn");
const statusMsg = document.getElementById("status-msg");

const imageInput = document.getElementById("image");
const previewImg = document.getElementById("preview-img");
const dropText = document.getElementById("drop-text");

const existingBody = document.getElementById("existing-products-body");

// ==========================================
// IMAGE PREVIEW
// ==========================================

if (imageInput) {
    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.style.display = "block";
            dropText.textContent = file.name;
        };

        reader.readAsDataURL(file);
    });
}


// ==========================================
// ADD PRODUCT
// ==========================================

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        statusMsg.className = "";
        statusMsg.textContent = "";

        const formData = new FormData(form);

        formData.append("unit", "");
        formData.append("minOrderQty", "1");
        formData.append("stock", "0");

        submitBtn.disabled = true;
        submitBtn.textContent = "Adding product...";

        try {

            const response = await fetch(API_URL, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Something went wrong"
                );
            }

            statusMsg.textContent =
                `✅ "${result.name}" was added successfully.`;

            statusMsg.className = "success";

            form.reset();

            if (previewImg) {
                previewImg.style.display = "none";
            }

            if (dropText) {
                dropText.textContent =
                    "Click to choose a photo";
            }

            loadExistingProducts();

        } catch (err) {

            statusMsg.textContent =
                "❌ " + err.message;

            statusMsg.className = "error";

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = "Add product";

        }

    });

}


// ==========================================
// LOAD ALL PRODUCTS
// ==========================================

async function loadExistingProducts() {

    try {

        const response = await fetch(API_URL);

        const products = await response.json();

        if (!response.ok) {
            throw new Error("Could not load products");
        }

        if (products.length === 0) {

            existingBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No products yet.
                    </td>
                </tr>
            `;

            return;
        }


        existingBody.innerHTML = products.map((p) => {

            const image =
                p.imageUrl
                    ? (
                        p.imageUrl.startsWith("http")
                            ? p.imageUrl
                            : `http://localhost:5000${p.imageUrl}`
                    )
                    : "";


            return `

                <tr>

                    <td>
                        <img
                            src="${image}"
                            alt="${escapeHtml(p.name)}"
                            class="admin-product-image"
                        >
                    </td>

                    <td>
                        ${escapeHtml(p.name)}
                    </td>

                    <td>
                        ${escapeHtml(p.category || "")}
                    </td>

                   

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editProduct('${p._id}')"
                        >
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>

                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteProduct('${p._id}')"
                        >
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }).join("");


    } catch (err) {

        console.error(err);

        existingBody.innerHTML = `
            <tr>
                <td colspan="6">
                    ❌ Couldn't load products.
                </td>
            </tr>
        `;

    }

}


// ==========================================
// EDIT PRODUCT
// ==========================================

// async function editProduct(id) {

//     try {

//         // Get product details

//         const response = await fetch(
//             `${API_URL}/${id}`
//         );

//         const product = await response.json();

//         if (!response.ok) {

//             throw new Error(
//                 product.message || "Could not load product"
//             );

//         }


//         // Ask admin for new values

//         const newName = prompt(
//             "Product Name:",
//             product.name || ""
//         );

//         if (newName === null) return;


//         const newCategory = prompt(
//             "Category:",
//             product.category || ""
//         );

//         if (newCategory === null) return;


//         // const newPrice = prompt(
//         //     "Price:",
//         //     product.price || ""
//         // );

//         // if (newPrice === null) return;


//         const newDescription = prompt(
//             "Description:",
//             product.description || ""
//         );

//         if (newDescription === null) return;


//         // Update product

//         const updateData = {

//             name: newName.trim(),

//             category: newCategory.trim(),

           

//             description: newDescription.trim()

//         };


//         const updateResponse = await fetch(
//             `${API_URL}/${id}`,
//             {
//                 method: "PUT",

//                 headers: {
//                     "Content-Type": "application/json"
//                 },

//                 body: JSON.stringify(updateData)
//             }
//         );


//         const result =
//             await updateResponse.json();


//         if (!updateResponse.ok) {

//             throw new Error(
//                 result.message ||
//                 "Could not update product"
//             );

//         }


//         alert("✅ Product updated successfully!");

//         loadExistingProducts();


//     } catch (err) {

//         console.error(err);

//         alert(
//             "❌ " + err.message
//         );

//     }

// }

async function editProduct(id) {

    // Ask for admin password when Edit is clicked
    const password = prompt("Enter admin password to edit this product:");

    if (!password) {
        return;
    }

    try {

        // First get the existing product
        const getResponse = await fetch(`${API_URL}/${id}`);

        const product = await getResponse.json();

        if (!getResponse.ok) {
            throw new Error(product.message || "Could not load product");
        }

        // Ask for new details
        const name = prompt(
            "Product name:",
            product.name || ""
        );

        if (name === null) return;

        const category = prompt(
            "Category:",
            product.category || ""
        );

        if (category === null) return;

        const description = prompt(
            "Description:",
            product.description || ""
        );

        if (description === null) return;


        // Send updated details
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "x-admin-password": password
            },

            body: JSON.stringify({
                name: name.trim(),
                category: category.trim(),
                description: description.trim()
            })
        });


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.message || "Could not update product"
            );

        }


        alert("✅ Product updated successfully!");

        // Reload product list
        loadExistingProducts();


    } catch (err) {

        console.error("Edit error:", err);

        alert("❌ " + err.message);

    }

}

// ==========================================
// DELETE PRODUCT
// ==========================================

async function deleteProduct(id) {

    const password = prompt(
        "Enter admin password to delete this product:"
    );

    if (!password) return;


    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE",

                headers: {
                    "x-admin-password": password
                }
            }
        );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Could not delete product"
            );

        }


        alert("✅ Product deleted successfully!");

        loadExistingProducts();


    } catch (err) {

        alert(
            "❌ " + err.message
        );

    }

}


// ==========================================
// SECURITY: ESCAPE HTML
// ==========================================

function escapeHtml(str) {

    const div =
        document.createElement("div");

    div.textContent =
        str ?? "";

    return div.innerHTML;

}


// ==========================================
// LOAD PRODUCTS WHEN ADMIN PAGE OPENS
// ==========================================

loadExistingProducts();