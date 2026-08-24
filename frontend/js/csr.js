document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       AOS ANIMATION
    ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });

    }


    /* ==========================================
       CURRENT YEAR
    ========================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });


        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });

    }


    /* ==========================================
       HEADER SCROLL EFFECT
    ========================================== */

    const header = document.getElementById("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* ==========================================
       NEWSLETTER
    ========================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("newsletterEmail").value.trim();

            if (!email) {
                return;
            }

            alert(
                "Thank you for subscribing to Welmora!"
            );

            newsletterForm.reset();

        });

    }


    /* ==========================================
       CHATBOT
    ========================================== */

    const chatToggle =
        document.getElementById("chatToggle");

    const chatBox =
        document.getElementById("chatBox");

    const chatInput =
        document.getElementById("chatInput");

    const sendChat =
        document.getElementById("sendChat");

    const chatBody =
        document.getElementById("chatBody");


    if (chatToggle && chatBox) {

        chatToggle.addEventListener("click", function () {

            if (
                chatBox.style.display === "none" ||
                chatBox.style.display === ""
            ) {

                chatBox.style.display = "block";

            } else {

                chatBox.style.display = "none";

            }

        });

    }


    /* ==========================================
       CHAT MESSAGE
    ========================================== */

    function sendMessage() {

        if (!chatInput || !chatBody) {
            return;
        }

        const message =
            chatInput.value.trim();

        if (!message) {
            return;
        }


        /* User message */

        const userMessage =
            document.createElement("div");

        userMessage.className =
            "user-message";

        userMessage.textContent =
            message;

        chatBody.appendChild(userMessage);


        chatInput.value = "";


        /* Temporary bot response */

        setTimeout(function () {

            const botMessage =
                document.createElement("div");

            botMessage.className =
                "bot-message";

            botMessage.textContent =
                "Thanks for contacting Welmora! Our wellness team will be happy to assist you.";

            chatBody.appendChild(botMessage);

            chatBody.scrollTop =
                chatBody.scrollHeight;

        }, 700);


        chatBody.scrollTop =
            chatBody.scrollHeight;

    }


    if (sendChat) {

        sendChat.addEventListener(
            "click",
            sendMessage
        );

    }


    if (chatInput) {

        chatInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    sendMessage();

                }

            }
        );

    }

});