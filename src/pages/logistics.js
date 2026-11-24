async function loadTrailerLocations() {

    async function loadTrailerLocations() {

    console.log("Loading trailer locations...");

    // Rest of your existing code
}

    const trailerCodes = [
        "ISO700",
        "ISO701",
        "ISO702",
        "ISO703",
        "ISO704",
        "ISO705",
        "ISO706",
        "ISO707"
    ];

    try {

        const response = await fetch(
            "https://acorn-reporting-api-fsdpe9bxcxhqf2aq.uksouth-01.azurewebsites.net/api/trailer_locations"
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const locationRow = document.getElementById("trailer-locations");
        const statusRow = document.getElementById("trailer-status");

        locationRow.innerHTML = "<th>Location</th>";
        statusRow.innerHTML = "<th>Status</th>";

        trailerCodes.forEach(code => {

            const trailer = data.find(
                item => item.TrailerCode === code
            );

            const locationCell = locationRow.insertCell();
            const statusCell = statusRow.insertCell();

            locationCell.textContent = trailer
                ? trailer.Site
                : "-";

            statusCell.textContent = trailer
                ? (trailer.IsFilling ? "Filling" : "Not filling")
                : "-";

            if (trailer?.IsFilling) {
                statusCell.classList.add("filling");
            }

        });

        document.getElementById("trailer-message").textContent =
            "Last refreshed: " + new Date().toLocaleTimeString();

    } catch (error) {

        console.error(error);

        document.getElementById("trailer-message").textContent =
            "Unable to load trailer data.";

    }
}

export function init(pageContent) {

    loadTrailerLocations();

}