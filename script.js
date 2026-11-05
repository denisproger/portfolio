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

// Highlight the nav link of the section currently in view
const sectionLinks = new Map(
  [...navLinks.querySelectorAll('a[href^="#"]')].map((link) => [
    link.getAttribute("href").slice(1),
    link,
  ])
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sectionLinks.forEach((link) => link.classList.remove("active"));
      sectionLinks.get(entry.target.id)?.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sectionLinks.forEach((_, id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

// Automatically update the copyright year
document.querySelector("#year").textContent =
  new Date().getFullYear();
