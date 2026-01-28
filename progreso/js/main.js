const app = document.getElementById("app");
const themeToggle = document.getElementById("themeToggle");

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "☀️" : "🌙";
};

const pages = {
  dashboard: renderDashboard,
  work: renderWork,
  analytics: renderAnalytics,
  general: renderGeneral
};

document.querySelectorAll(".sidebar button").forEach(btn => {
  btn.onclick = () => pages[btn.dataset.page]();
});

renderDashboard();
