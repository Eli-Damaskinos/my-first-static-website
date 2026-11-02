
const pages = {
  overview: "Overview",
  production: "Gas Production",
  co2: "CO₂ Reporting",
  feedstock: "Feedstock",
  logistics: "Trailer Logistics",
  settings: "Settings"
};

const pageTitle = document.getElementById("page-title");
const navLinks = document.querySelectorAll(".nav-link");

function showPage() {
  // Read the page name from the URL
  const requestedPage = window.location.hash.slice(1);

  // Use Overview if no valid page is specified
  const currentPage =
    Object.hasOwn(pages, requestedPage)
      ? requestedPage
      : "overview";

  // Change the heading
  pageTitle.textContent = pages[currentPage];

  // Update browser tab title
  document.title = pages[currentPage] + " | Operations Portal";

  // Highlight the currently selected sidebar link
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
}

// Run when someone clicks a navigation link
window.addEventListener("hashchange", showPage);

// Run when the website first loads
showPage();
