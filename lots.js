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
            data.lots.forEach((lot) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${lot.name}</strong><br>
                    Spaces: ${lot.spaces}<br>
                    Open Hours: ${lot.hours}<br>
                    Location: ${lot.location}
                `;
                lotsContainer.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching parking lots:", error);
            lotsContainer.innerHTML = "<p>Failed to load parking lot data.</p>";
        });
});
