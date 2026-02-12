function renderDashboard() {
  app.innerHTML = `
    <h2>Good evening!</h2>

    <div class="grid">
      <div class="card">
        <h3>Momentum Streak</h3>
        <p>${state.streak} days</p>
      </div>

      <div class="card">
        <h3>Total Focus Time</h3>
        <p>${state.focusMinutes} minutes</p>
      </div>

      <div class="card">
        <h3>Sessions</h3>
        <p>${state.sessions}</p>
      </div>

      <div class="card">
        <h3>XP Earned</h3>
        <p>${state.xp}</p>
      </div>
    </div>

    <button class="start-focus-btn" onclick="renderWork()">
      ▶ Start Focus Session
    </button>
  `;
}
