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
function logout() {
  localStorage.removeItem("progresoUser");
  window.location.href = "login.html";
}

document.querySelectorAll(".sidebar button").forEach(btn => {
  btn.onclick = () => pages[btn.dataset.page]();
});

renderDashboard();
let authMode = "login";

function handleProfileClick() {
  const user = localStorage.getItem("progresoUser");

  if (!user) {
    openAuthModal();
  } else {
    showProfileDetails(user);
  }
}

function openAuthModal() {
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.add("hidden");
}

function toggleAuthMode() {
  authMode = authMode === "login" ? "signup" : "login";

  document.getElementById("authTitle").textContent =
    authMode === "login" ? "Login" : "Sign up";

  document.getElementById("switchMode").textContent =
    authMode === "login"
      ? "New here? Sign up"
      : "Already have an account? Login";
}

function submitAuth() {
  const name = document.getElementById("authName").value.trim();
  const pass = document.getElementById("authPassword").value.trim();

  if (!name || !pass) return alert("Fill all fields");

  // Demo auth
  localStorage.setItem("progresoUser", name);

  closeAuthModal();
  alert(`Welcome, ${name}!`);
}

function showProfileDetails(user) {
  app.innerHTML = `
    <div class="card">
      <h3>User Profile</h3>
      <p><strong>Username:</strong> ${user}</p>
      <p><strong>Sessions:</strong> ${state.sessions}</p>
      <p><strong>Total Focus:</strong> ${state.focusMinutes} mins</p>

      <button class="btn-danger" onclick="logout()">Logout</button>
    </div>
  `;
}

function logout() {
  localStorage.removeItem("progresoUser");
  renderDashboard();
}
