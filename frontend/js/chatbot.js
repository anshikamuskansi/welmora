

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("chatToggle");
  const chatBox = document.querySelector(".chat-box");
  const chatBody = chatBox ? chatBox.querySelector(".chat-body") : null;
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!toggleBtn || !chatBox || !chatBody || !chatInput || !sendBtn) return;

  // ---------- Edit these answers any time ----------
  const responses = [
    {
      keywords: ["cloth pad", "cloth pads", "pad"],
      reply: "Our Reusable Cloth Pads are comfortable, eco-friendly, and machine washable — a sustainable alternative to disposable pads.",
    },
    {
      keywords: ["menstrual cup", "cup"],
      reply: "We supply medical-grade silicone Menstrual Cups. They're reusable for years and a great low-waste option for periods.",
    },
    {
      keywords: ["heating pad", "cramps", "pain"],
      reply: "The Electric Heating Pad and Pain Relief Roll-On both help with menstrual cramps — the heating pad gives instant warmth, the roll-on is great for on-the-go relief.",
    },
    {
      keywords: ["protein", "oats", "sattu", "nutrition"],
      reply: "For nutrition, we carry Protein Oats and Multigrain Sattu Mix — both designed to support everyday energy and wellness.",
    },
    {
      keywords: ["hormone", "tea", "wellbeing", "multivitamin"],
      reply: "For overall wellbeing, our Hormone Balance Herbal Tea and Multivitamins support hormonal balance and daily health.",
    },
    {
      keywords: ["price", "pricing", "cost", "quote"],
      reply: "Pricing varies by product — check the Shop page for current prices, or reach out through our Contact page for bulk/wholesale pricing.",
    },
    {
      keywords: ["delivery", "shipping", "how long"],
      reply: "Delivery timing depends on your location — reach out via our Contact page and we'll confirm shipping details for your order.",
    },
    {
      keywords: ["contact", "call", "phone", "email", "reach"],
      reply: "You can reach us at info@welmora.com, or fill out the form on our Contact page and we'll get back to you soon.",
    },
    {
      keywords: ["hi", "hello", "hey"],
      reply: "Hi there! 👋 Ask me about our menstrual health, nutrition, or wellbeing products — or how to place an order.",
    },
  ];

  const fallbackReply =
    "Thanks for your message! For anything specific, please email info@welmora.com and our team will get back to you soon.";

  // ---------- Open / close the chat window ----------
  toggleBtn.addEventListener("click", () => {
    const isOpen = chatBox.style.display === "block";
    chatBox.style.display = isOpen ? "none" : "block";
  });

  // ---------- Sending a message ----------
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      addMessage(getBotReply(text), "bot");
    }, 500);
  }

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ---------- Match the message to a canned reply ----------
  function getBotReply(userText) {
    const lowerText = userText.toLowerCase();
    for (const item of responses) {
      const isMatch = item.keywords.some((word) => lowerText.includes(word));
      if (isMatch) return item.reply;
    }
    return fallbackReply;
  }

  // ---------- Add a message bubble ----------
  function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.textContent = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
