
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
  energy: "Energy Centre"
};

const pageContent = document.getElementById("page-content");
const navLinks = document.querySelectorAll(".nav-link");

let navigationId = 0;

async function showPage() {
  const requestId = ++navigationId;

  // Get page from URL hash
  const requestedPage = window.location.hash.slice(1);

  const currentPage = Object.hasOwn(pages, requestedPage)
    ? requestedPage
    : "overview";

  // Highlight active sidebar link
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
    // Fetch the separate HTML file
    const response = await fetch(
      `pages/${currentPage}.html`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Avoid displaying an outdated navigation response
    if (requestId !== navigationId) return;

    // Display the page
    pageContent.innerHTML = html;

  } catch (error) {
    if (requestId !== navigationId) return;

    console.error("Page loading failed:", error);
    pageContent.textContent = "Could not load this page.";
  }
}

window.addEventListener("hashchange", showPage);

showPage();