document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const message = document.getElementById("subscribeMessage");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();

        if (email === "") {
            message.textContent = "Please enter your email address.";
            return;
        }

        if (!emailInput.checkValidity()) {
            message.textContent = "Please enter a valid email address.";
            return;
        }

        message.textContent = "Thank you for subscribing! ❤️";

        emailInput.value = "";

    });

});