document.addEventListener("DOMContentLoaded", () => {
    const lotsContainer = document.getElementById("lots-container");

    fetch("parking.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.parkingLots && data.parkingLots.length > 0) {
                data.parkingLots.forEach((lot) => {
                    const lotCard = document.createElement("div");
                    lotCard.classList.add("lot-card");

                    lotCard.innerHTML = `
                        <h2>${lot.name}</h2>
                        <img src="${lot.mapFile}" alt="Map of ${lot.name}" class="lot-map">
                        <p><strong>Total Spaces:</strong> ${lot.totalSpaces}</p>
                        <p><strong>Location:</strong> ${lot.location}</p>
                        <p><strong>Operational Hours:</strong> ${lot.operationalHours}</p>
                        <p><strong>Security:</strong> ${lot.security}</p>
                        <p><strong>Comments:</strong> ${lot.comments}</p>
                        <a href="spaces.html?lot=${encodeURIComponent(lot.name)}" class="view-spaces-link">View Spaces</a>
                    `;
                    
                    lotsContainer.appendChild(lotCard);
                });
            } else {
                lotsContainer.innerHTML = "<p>No parking lot data available.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching parking lots:", error);
            lotsContainer.innerHTML = "<p>Failed to load parking lot data. Please try again later.</p>";
        });
});
