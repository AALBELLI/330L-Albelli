// lots.js

document.addEventListener("DOMContentLoaded", () => {
    const lotsContainer = document.getElementById("lots-container");

    // Fetch the JSON data
    fetch("parking.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Loop through and display each lot
            data.parkingLots.forEach((lot) => {
                const listItem = document.createElement("li");

                // Build HTML content for the lot
                listItem.innerHTML = `
                    <strong>${lot.name}</strong><br>
                    <img src="${lot.mapFile}" alt="Map of ${lot.name}" style="max-width: 100px; max-height: 100px;"><br>
                    Total Spaces: ${lot.totalSpaces}<br>
                    Location: ${lot.location}<br>
                    Operational Hours: ${lot.operationalHours}<br>
                    Security: ${lot.security}<br>
                    Comments: ${lot.comments}<br>
                    <a href="spaces.html?lot=${encodeURIComponent(lot.name)}">View Spaces</a>
                `;

                // Append the list item to the container
                lotsContainer.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching parking lots:", error);
            lotsContainer.innerHTML = "<p>Failed to load parking lot data.</p>";
        });
});
