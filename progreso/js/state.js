// Global application state for Progreso.
// NOTE: This stays localStorage-based on the frontend so the app
// is demo-ready even without a backend. The shape mirrors the
// database models from the spec so a real API can later plug in.

function createDemoHistory() {
  const today = new Date();
  const dailyHistory = [];
  const weeklyFocus = [0, 0, 0, 0, 0, 0, 0]; // Mon–Sun

  let totalFocusMinutes = 0;
  let totalSessions = 0;

  for (let offset = 29; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);

    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const baseSessions = isWeekend ? 2 : 3;
    const jitter = (offset % 3) - 1; // -1, 0, 1
    const sessions = Math.max(1, baseSessions + jitter);

    const baseMinutes = isWeekend ? 35 : 45;
    const minutesPerSession = baseMinutes + (offset % 2 ? 5 : -5);
    const focusMinutes = sessions * minutesPerSession;

    totalFocusMinutes += focusMinutes;
    totalSessions += sessions;

    const durations = { short: 0, medium: 0, long: 0 };
    for (let i = 0; i < sessions; i++) {
      const roll = (i + offset) % 3;
      if (roll === 0) durations.short += 1;
      else if (roll === 1) durations.medium += 1;
      else durations.long += 1;
    }

    const dateStr = d.toISOString().slice(0, 10);
    dailyHistory.push({
      date: dateStr,
      total_focus_minutes: focusMinutes,
      total_sessions: sessions,
      durations
    });

    // Map JS day (0=Sun…6=Sat) to Mon–Sun index
    const monSunIndex = (d.getDay() + 6) % 7;
    weeklyFocus[monSunIndex] += focusMinutes;
  }

  return { dailyHistory, weeklyFocus, totalFocusMinutes, totalSessions };
}

function computeStreakFromHistory(dailyHistory) {
  // Flexible streak: counts consecutive days with any focus,
  // but allows a single gap every 7 days.
  let streak = 0;
  let softGapUsed = false;

  const today = new Date();

  for (let offset = 0; offset < dailyHistory.length; offset++) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = d.toISOString().slice(0, 10);
    const entry = dailyHistory.find(h => h.date === key);

    if (entry && entry.total_focus_minutes > 0) {
      streak += 1;
    } else if (!softGapUsed) {
      softGapUsed = true;
    } else {
      break;
    }
  }

  return streak;
}

function buildDefaultState() {
  const { dailyHistory, weeklyFocus, totalFocusMinutes, totalSessions } =
    createDemoHistory();

  const streak = computeStreakFromHistory(dailyHistory);
  const today = new Date().toDateString();

  // Simple gamification model
  const totalXp = totalFocusMinutes; // 1 XP per minute
  const level = Math.max(1, Math.floor(totalXp / 300) + 1);
  const rank =
    totalXp > 4000 ? "Legend"
    : totalXp > 2500 ? "Diamond"
    : totalXp > 1500 ? "Gold"
    : totalXp > 800 ? "Silver"
    : "Bronze";

  return {
    // User model (mirrors DB shape)
    user: {
      id: "demo-user",
      name: "Demo Student",
      email: "demo@progreso.app",
      preferred_session_length: 25,
      theme_preference: "light"
    },
    total_xp: totalXp,
    level,
    rank,

    // Legacy fields used by existing UI
    focusMinutes: totalFocusMinutes,
    sessions: totalSessions,
    xp: totalXp,
    streak,
    lastSessionDate: today,
    weeklyFocus,

    // AnalyticsSnapshots-like structure
    analyticsSnapshots: dailyHistory.map(d => ({
      user_id: "demo-user",
      date: d.date,
      total_focus_minutes: d.total_focus_minutes,
      total_sessions: d.total_sessions,
      consistency_flag: d.total_focus_minutes >= 60 ? "steady" : "light"
    })),

    // Raw per-session history (for future expansion)
    focusSessions: [],

    // Community demo data for weekly micro-league
    community: [
      {
        user_id: "demo-user",
        name: "You",
        weekly_focus_minutes: weeklyFocus.reduce((a, b) => a + b, 0),
        league_rank: 1
      },
      {
        user_id: "peer-1",
        name: "Aisha",
        weekly_focus_minutes: Math.round(
          weeklyFocus.reduce((a, b) => a + b, 0) * 0.9
        ),
        league_rank: 2
      },
      {
        user_id: "peer-2",
        name: "Ravi",
        weekly_focus_minutes: Math.round(
          weeklyFocus.reduce((a, b) => a + b, 0) * 0.75
        ),
        league_rank: 3
      },
      {
        user_id: "peer-3",
        name: "Lina",
        weekly_focus_minutes: Math.round(
          weeklyFocus.reduce((a, b) => a + b, 0) * 0.6
        ),
        league_rank: 4
      }
    ]
  };
}

const storedState = JSON.parse(localStorage.getItem("progreso"));
const defaultState = buildDefaultState();

// Merge any existing state (from older versions) into the newer shape
const state = storedState ? { ...defaultState, ...storedState } : defaultState;

function saveState() {
  localStorage.setItem("progreso", JSON.stringify(state));
}
