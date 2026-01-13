// Helpers
const $ = (sel) => document.querySelector(sel);

const navToggle = $("#navToggle");
const nav = $("#nav");
const year = $("#year");
const form = $("#contactForm");
const formNote = $("#formNote");
const progress = $("#progress");
const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");

// Set current year
year.textContent = new Date().getFullYear();

// Mobile nav toggle
navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile nav after click
nav.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Smooth scrolling for internal links
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href");
  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Fake form submit (no backend)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();

  form.reset();
  formNote.textContent = `Thank you${name ? ", " + name : ""}! Your message has been recorded.`;
  setTimeout(() => (formNote.textContent = ""), 4500);
});

// Scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = `${pct}%`;
});

// Theme (Default: Dark)
// - We do NOT set any theme on load unless user saved "light"
const THEME_KEY = "portfolio_theme";

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeIcon.textContent = "☾";
  }
}

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

// Back to top (force scroll to top)
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
