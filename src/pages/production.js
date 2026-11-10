const sampleData = {
  today: "12,500",
  flow: "950",
  monthly: "325,000",
  target: "92"
};

export function init(container) {
  const page = container.querySelector(".production-page");
  const button = page.querySelector("#load-data");
  const status = page.querySelector("#data-status");
  const canvas = page.querySelector("#production-chart");
  let chart;

  function loadData() {
    page.querySelectorAll("[data-kpi]").forEach(kpi => {
      kpi.textContent = sampleData[kpi.dataset.kpi];
    });

    if (typeof Chart === "undefined") {
      status.textContent = "Could not load the chart library. Check your internet connection and reload.";
      return;
    }

    const labels = ["06:00", "09:00", "12:00", "15:00", "18:00"];
    const values = [700, 820, 950, 900, 1020];

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    } else {
      chart = new Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Production (Nm³/h)",
            data: values,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.15)",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    status.textContent = "Sample data loaded successfully.";
  }

  button.addEventListener("click", loadData);

  return function cleanup() {
    button.removeEventListener("click", loadData);
    chart?.destroy();
  };
}