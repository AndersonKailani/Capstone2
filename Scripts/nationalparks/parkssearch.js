// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the dropdown element by its ID
    var parkTypeDropdown = document.getElementById("parkTypeDropdown");

    // Check if the dropdown element exists
    if (parkTypeDropdown) {
        // Iterate over the park types array and create an option element for each type
        parkTypesArray.forEach(function(parkType) {
            var option = document.createElement("option");
            option.text = parkType;
            parkTypeDropdown.appendChild(option);
        });
    }
});

    // Retrieve the dropdown element by its ID
    var locationDropdown = document.getElementById("locationDropdown");

    // Check if the dropdown element exists
    if (locationDropdown) {
        // Iterate over the location array and create an option element for each location
        locationsArray.forEach(function(location) {
            var option = document.createElement("option");
            option.text = location;
            locationDropdown.appendChild(option);
        });
    }
    document.addEventListener("DOMContentLoaded", function() {
        const parkTypeDropdown = document.getElementById("parkTypeDropdown");
        const locationDropdown = document.getElementById("locationDropdown");
    
        parkTypesArray.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            parkTypeDropdown.appendChild(option);
        });
    
        locationsArray.forEach(location => {
            const option = document.createElement("option");
            option.value = location;
            option.textContent = location;
            locationDropdown.appendChild(option);
        });
    
        const searchButton = document.getElementById("searchButton");
    
        searchButton.addEventListener("click", function() {
            const parkType = parkTypeDropdown.value;
            const location = locationDropdown.value;
    
            const foundPark = nationalParksArray.find(park => {
                return park.LocationName.includes(parkType) && park.State === location;
            });
    
            const parkInfoDiv = document.getElementById("parkInfo");
            if (foundPark) {
                parkInfoDiv.innerHTML = `
                    <h2>${foundPark.LocationName}</h2>
                    <p>Type: ${parkType}</p>
                    <p>Location: ${foundPark.City}, ${foundPark.State}</p>
                    <p>Address: ${foundPark.Address}, ${foundPark.City}, ${foundPark.State} ${foundPark.ZipCode}</p>
                    <p>Phone: ${foundPark.Phone}</p>
                    <p>Fax: ${foundPark.Fax}</p>
                    <p>Coordinates: Latitude ${foundPark.Latitude}, Longitude ${foundPark.Longitude}</p>
                    <p>Visit: <a href="https://www.nps.gov/${foundPark.LocationID.toLowerCase()}/index.htm" target="_blank">${foundPark.LocationName} Website</a></p>
                    ${foundPark.ImageURL ? `<img src="${foundPark.ImageURL}" alt="${foundPark.LocationName}" class="park-image">` : ''}
                `;
            } else {
                parkInfoDiv.innerHTML = `<p>No park found matching the selected criteria.</p>`;
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        // Load park types
        const typeDropdown = document.getElementById('typeDropdown');
        parkTypesArray.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeDropdown.appendChild(option);
        });
    
        // Load locations
        const locationDropdown = document.getElementById('locationDropdown');
        locationsArray.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationDropdown.appendChild(option);
        });
    
        // Add event listeners
        document.getElementById('searchBtn').addEventListener('click', searchParks);
    });
    
    function searchParks() {
        const selectedType = document.getElementById('typeDropdown').value;
        const selectedLocation = document.getElementById('locationDropdown').value;
    
        const filteredParks = nationalParksArray.filter(park => {
            const matchesType = selectedType ? park.LocationName.includes(selectedType) : true;
            const matchesLocation = selectedLocation ? park.State === selectedLocation : true;
            return matchesType && matchesLocation;
        });
    
        displayParks(filteredParks);
    }
    
    function viewAllParks() {
        displayParks(nationalParksArray);
    }
    
    function displayParks(parks) {
        const parkInfoContainer = document.getElementById('parkInfoContainer');
        parkInfoContainer.innerHTML = ''; // Clear previous results
    
        parks.forEach(park => {
            const parkCard = document.createElement('div');
            parkCard.classList.add('park-card');
    
            let parkImage = '';
            if (park.ImageUrl) {
                parkImage = `<img src="${park.ImageUrl}" alt="${park.LocationName}" class="park-image">`;
            }
    
            parkCard.innerHTML = `
                ${parkImage}
                <h3>${park.LocationName}</h3>
                <p>${park.Address}, ${park.City}, ${park.State} ${park.ZipCode}</p>
                <a href="https://www.nps.gov/${park.LocationID.toLowerCase()}/index.htm" target="_blank">Visit</a>
            `;
    
            parkInfoContainer.appendChild(parkCard);
        });
    
        parkInfoContainer.style.display = 'flex'; // Ensure the container is displayed
    }
    