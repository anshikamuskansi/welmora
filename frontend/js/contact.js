// // ==========================================
// // WELMORA CONTACT FORM
// // ==========================================

// const contactForm = document.getElementById("contactForm");
// const contactSubmit = document.getElementById("contactSubmit");
// const contactStatus = document.getElementById("contactStatus");


// // ==========================================
// // SUBMIT CONTACT FORM
// // ==========================================

// if (contactForm) {

//     contactForm.addEventListener("submit", async function (event) {

//         event.preventDefault();


//         // Clear previous message

//         contactStatus.textContent = "";
//         contactStatus.className = "form-status";


//         // Get form values

//         const name =
//             document.getElementById("name").value.trim();

//         const business =
//             document.getElementById("business").value.trim();

//         const email =
//             document.getElementById("email").value.trim();

//         const message =
//             document.getElementById("message").value.trim();


//         // ==========================================
//         // BASIC VALIDATION
//         // ==========================================

//         if (!name) {

//             showError("Please enter your name.");

//             return;
//         }


//         if (!email) {

//             showError("Please enter your email.");

//             return;
//         }


//         if (!isValidEmail(email)) {

//             showError("Please enter a valid email address.");

//             return;
//         }


//         if (!message) {

//             showError("Please enter your message.");

//             return;
//         }


//         // ==========================================
//         // DISABLE BUTTON
//         // ==========================================

//         contactSubmit.disabled = true;

//         contactSubmit.innerHTML =
//             '<i class="fas fa-spinner fa-spin"></i> Sending...';


//         // ==========================================
//         // CREATE REQUEST DATA
//         // ==========================================

//         const formData = {

//             name: name,

//             business: business,

//             email: email,

//             message: message

//         };


//         try {

//             // ==========================================
//             // SEND TO BACKEND
//             // ==========================================

//             const response = await fetch("/api/contact", {

//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json"
//                 },

//                 body: JSON.stringify(formData)

//             });


//             // ==========================================
//             // READ RESPONSE
//             // ==========================================

//             const result = await response.json();


//             if (!response.ok) {

//                 throw new Error(
//                     result.message ||
//                     "Unable to send your message."
//                 );

//             }


//             // ==========================================
//             // SUCCESS
//             // ==========================================

//             contactStatus.textContent =
//                 "✅ Thank you! Your message has been sent successfully. We will contact you soon.";

//             contactStatus.className =
//                 "form-status success";


//             // Clear form

//             contactForm.reset();


//         } catch (error) {

//             console.error(
//                 "Contact form error:",
//                 error
//             );


//             showError(
//                 error.message ||
//                 "Something went wrong. Please try again."
//             );


//         } finally {

//             // ==========================================
//             // ENABLE BUTTON AGAIN
//             // ==========================================

//             contactSubmit.disabled = false;

//             contactSubmit.innerHTML =
//                 '<i class="fas fa-paper-plane"></i> Send Message';

//         }

//     });

// }


// // ==========================================
// // EMAIL VALIDATION
// // ==========================================

// function isValidEmail(email) {

//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// }


// // ==========================================
// // ERROR MESSAGE
// // ==========================================

// function showError(message) {

//     contactStatus.textContent =
//         "❌ " + message;

//     contactStatus.className =
//         "form-status error";

// }

// ==========================================
// WELMORA CONTACT FORM
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById("contactForm");

        const submitButton =
            document.getElementById("contactSubmit");

        const status =
            document.getElementById("contactStatus");


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // ==========================================
                // GET FORM VALUES
                // ==========================================

                const name =
                    document.getElementById("name")
                        ?.value.trim();

                const business =
                    document.getElementById("business")
                        ?.value.trim();

                const email =
                    document.getElementById("email")
                        ?.value.trim();

                const message =
                    document.getElementById("message")
                        ?.value.trim();


                // ==========================================
                // BASIC VALIDATION
                // ==========================================

                if (!name || !email || !message) {

                    status.textContent =
                        "Please fill in all required fields.";

                    status.className =
                        "form-status error";

                    return;

                }


                // ==========================================
                // DISABLE BUTTON
                // ==========================================

                submitButton.disabled = true;

                submitButton.innerHTML =
                    '<i class="fas fa-spinner fa-spin"></i> Sending...';


                status.textContent =
                    "Sending your enquiry...";

                status.className =
                    "form-status";


                try {

                    // ==========================================
                    // SEND TO VERCEL API
                    // ==========================================

                    const response =
                        await fetch(
                            "/api/contact",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name: name,

                                    business: business,

                                    email: email,

                                    message: message

                                })

                            }
                        );


                    // ==========================================
                    // READ RESPONSE
                    // ==========================================

                    const data =
                        await response.json();


                    // ==========================================
                    // SUCCESS
                    // ==========================================

                    if (
                        response.ok &&
                        data.success
                    ) {

                        status.textContent =
                            "✓ Your message has been sent successfully. We will contact you soon.";

                        status.className =
                            "form-status success";


                        // Clear form

                        form.reset();


                    }

                    // ==========================================
                    // ERROR
                    // ==========================================

                    else {

                        status.textContent =
                            data.message ||
                            "Something went wrong. Please try again.";

                        status.className =
                            "form-status error";

                    }

                }

                catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    status.textContent =
                        "Unable to send your message. Please check your internet connection and try again.";

                    status.className =
                        "form-status error";

                }


                // ==========================================
                // ENABLE BUTTON
                // ==========================================

                submitButton.disabled = false;

                submitButton.innerHTML =
                    '<i class="fas fa-paper-plane"></i> Send Message';

            }
        );

    }
);