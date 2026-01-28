function renderDashboard() {
  app.innerHTML = `
    <h2>Good evening!</h2>

    <div class="card">
      <h3>Momentum Streak</h3>
      <p>${state.streak} days</p>
    </div>

    <div class="card">
      <h3>Total Focus Time</h3>
      <p>${state.focusMinutes} minutes</p>
    </div>
    <div> 
<button class="start-focus-btn" onclick="renderWork()">
  ▶ Start Focus Session
</button>
</div>

  `;
}
