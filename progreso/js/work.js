let running = false;

function renderWork() {
  app.innerHTML = `
    <div class="card">
      <input id="task" placeholder="One task only" ${running ? "disabled" : ""}/>
      <p>25 minute focus session</p>
     <button class="start-timer-btn" onclick="start()">
  Start
</button>

    </div>
  `;
}

function startSession() {
  if (running) return;
  running = true;

  setTimeout(() => {
    state.sessions++;
    state.focusMinutes += 25;
    state.xp += 10;
    saveState();
    running = false;
    alert("Session completed");
    renderDashboard();
  }, 1000);
}
