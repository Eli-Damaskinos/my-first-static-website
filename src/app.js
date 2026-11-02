
const pages = {
  overview: "Overview",
  production: "Gas Production",
  co2: "CO₂ Reporting",
  feedstock: "Feedstock",
  lagoons: "Lagoons",
  clamptracking: "Clamp Tracking",
  logistics: "Trailer Logistics",
  accountsettings: "Account Settings",
  reports: "Reports",
  injections: "Injections",
  energy: "Energy Centre",
  alerts: "Alerts",
};

// Page-specific JavaScript modules
const pageModules = {
  production: () => import("./pages/production.js")
};

const pageContent = document.getElementById("page-content");
const navLinks = document.querySelectorAll(".nav-link");

let navigationId = 0;
let cleanupCurrentPage = null;

async function showPage() {
  const requestId = ++navigationId;

  // Cleanup the previous page
  if (cleanupCurrentPage) {
    cleanupCurrentPage();
    cleanupCurrentPage = null;
  }

  const requestedPage = window.location.hash.slice(1);

  const currentPage = Object.hasOwn(pages, requestedPage)
    ? requestedPage
    : "overview";

  // Update sidebar highlighting
  navLinks.forEach(link => {
    const isActive =
      link.getAttribute("href") === "#" + currentPage;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.title = pages[currentPage] + " | Operations Portal";

  pageContent.textContent = "Loading...";

  try {
    // Load the HTML page
    const response = await fetch(`pages/${currentPage}.html`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    if (requestId !== navigationId) return;

    // Insert the page into the main layout
    pageContent.innerHTML = html;

    // Load page-specific JavaScript if it exists
    const loadModule = pageModules[currentPage];

    if (loadModule) {
      const module = await loadModule();

      if (requestId !== navigationId) return;

      // Initialise the page
      cleanupCurrentPage = module.init(pageContent);
    }

  } catch (error) {
    if (requestId !== navigationId) return;

    console.error("Page loading failed:", error);
    pageContent.textContent = "Could not load this page.";
  }
}

window.addEventListener("hashchange", showPage);

showPage();
