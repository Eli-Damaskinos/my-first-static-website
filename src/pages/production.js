
const sampleData = {
  today: "12,500",
  flow: "950",
  monthly: "325,000",
  target: "92"
};

export function init(container) {
  console.log("Gas Production page initialised");

  const page = container.querySelector(".production-page");
  const button = page.querySelector("#load-data");
  const status = page.querySelector("#data-status");

  function loadData() {
    // Update each KPI with its sample value
    const kpis = page.querySelectorAll("[data-kpi]");

    kpis.forEach(kpi => {
      const key = kpi.dataset.kpi;
      kpi.textContent = sampleData[key];
    });

    status.textContent = "Sample data loaded successfully.";
  }

  button.addEventListener("click", loadData);

  // Cleanup when leaving this page
  return function cleanup() {
    button.removeEventListener("click", loadData);
    console.log("Gas Production page cleaned up");
  };
}
