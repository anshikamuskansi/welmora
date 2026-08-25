
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