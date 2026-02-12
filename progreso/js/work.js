let running = false;
let remaining = 25 * 60;
let interval;

function renderWork() {
  app.innerHTML = `
    <div class="card ${running ? "locked" : ""}">
      <input id="task" placeholder="One task only" ${running ? "disabled" : ""}/>
      <div class="timer" id="timer">${formatTime(remaining)}</div>
      <p>25 minute focus session</p>

      <div class="button-group">
        <button class="btn-primary start-timer-btn" onclick="startSession()">
          Start
        </button>
        <button class="btn-secondary" onclick="cancelSession()">
          Cancel
        </button>
      </div>
    </div>
  `;
}

function startSession() {
  if (running) return;
  running = true;

  interval = setInterval(() => {
    remaining--;
    document.getElementById("timer").textContent =
      formatTime(remaining);

    if (remaining <= 0) {
      completeSession();
    }
  }, 1000);
}

function cancelSession() {
  clearInterval(interval);
  running = false;
  remaining = 25 * 60;
  renderWork();
}

function completeSession() {
  clearInterval(interval);

  state.sessions++;
  state.focusMinutes += 25;
  state.xp += 10;

  const day = new Date().getDay();
  if (day !== 0) state.weeklyFocus[day - 1] += 25;

  saveState();

  running = false;
  remaining = 25 * 60;

  alert("🎉 Focus session completed!");
  renderDashboard();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
