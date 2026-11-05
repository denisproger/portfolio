const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(isOpen) {
  navLinks.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!navLinks.classList.contains("open"));
});

// Close menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// Close menu with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

// Close menu when clicking outside of it
document.addEventListener("click", (event) => {
  const clickedInside =
    navLinks.contains(event.target) || menuToggle.contains(event.target);

  if (!clickedInside) {
    setMenuOpen(false);
  }
});

// Automatically update the copyright year
document.querySelector("#year").textContent =
  new Date().getFullYear();
