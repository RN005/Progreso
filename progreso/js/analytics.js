function renderAnalytics() {
  app.innerHTML = `<canvas id="chart"></canvas>`;

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Focus Minutes",
        data: state.weeklyFocus,
        borderColor: "#4caf50",
        tension: 0.3
      }]
    }
  });
}
