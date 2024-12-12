document.addEventListener("DOMContentLoaded", () => {
    const spacesContainer = document.getElementById("spaces-container");
    const lotNameElement = document.getElementById("lot-name");
    const params = new URLSearchParams(window.location.search);
    const lotName = params.get("lot");

    if (!lotName) {
        spacesContainer.innerHTML = "<p>No lot specified. Please go back and select a lot.</p>";
        return;
    }
    lotNameElement.textContent = `Spaces for ${lotName}`;

    fetch("parking.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const lot = data.parkingLots.find((lot) => lot.name === lotName);

            if (!lot) {
                spacesContainer.innerHTML = `<p>No spaces found for the lot: ${lotName}</p>`;
                return;
            }

            if (!lot.spaces || lot.spaces.length === 0) {
                spacesContainer.innerHTML = `<p>No spaces available for ${lotName}.</p>`;
                return;
            }

            const spacesList = document.createElement("ul");
            lot.spaces.forEach((space) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>Space ID:</strong> ${space.spaceID}<br>
                    <strong>Type:</strong> ${space.type}<br>
                    <strong>Status:</strong> ${space.status}<br>
                    <strong>Last Filled:</strong> ${space.lastFilledDateTime || "N/A"}<br>
                    <strong>Reserved Until:</strong> ${space.reservedDateTime || "N/A"}
                `;
                spacesList.appendChild(listItem);
            });

            spacesContainer.innerHTML = ""; 
            spacesContainer.appendChild(spacesList);
        })
        .catch((error) => {
            console.error("Error fetching parking lot spaces:", error);
            spacesContainer.innerHTML = "<p>Failed to load spaces data.</p>";
        });
});
