const state = JSON.parse(localStorage.getItem("progreso")) || {
  focusMinutes: 840,
  sessions: 28,
  xp: 280,
  streak: 7,
  lastSessionDate: new Date().toDateString(),
  weeklyFocus: [60, 90, 120, 80, 100, 140, 150]
};

function saveState() {
  localStorage.setItem("progreso", JSON.stringify(state));
}
