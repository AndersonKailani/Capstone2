// Function to populate the dropdown menu
function populateDropdown() {
    const dropdown = document.getElementById('mountainSelect');
    mountainsArray.forEach((mountain, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = mountain.name;
        dropdown.appendChild(option);
    });
}

// Call the function to populate the dropdown on page load
populateDropdown();

// Function to fetch the sunrise and sunset times
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

// Function to display mountain information
async function displayMountainInfo() {
    const selectedMountainIndex = document.getElementById("mountainSelect").value;
    if (selectedMountainIndex === "") return;  // Exit if no mountain is selected

    const selectedMountain = mountainsArray[selectedMountainIndex];
    console.log('Selected mountain:', selectedMountain);

    try {
        // Fetch sunrise and sunset times
        const data = await getSunsetForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng);
        const { sunrise, sunset } = data.results;
        console.log('Sunrise and sunset data:', data);
        
        // Convert sunrise and sunset times to local time
        const sunriseTime = new Date(`${new Date().toLocaleDateString()} ${sunrise} UTC`);
        const sunsetTime = new Date(`${new Date().toLocaleDateString()} ${sunset} UTC`);
        console.log('Converted Sunrise:', sunriseTime);
        console.log('Converted Sunset:', sunsetTime);

        // Update the mountain card with all details
        const mountainInfoContainer = document.getElementById('mountainInfoContainer');
        mountainInfoContainer.innerHTML = `
            <div class="mountain-card">
                <h2>${selectedMountain.name}</h2>
                <img src="${selectedMountain.img}" alt="${selectedMountain.name}">
                <p><strong>Description:</strong> ${selectedMountain.desc}</p>
                <p><strong>Elevation:</strong> ${selectedMountain.elevation}</p>
                <p><strong>Effort:</strong> ${selectedMountain.effort}</p>
                <p><strong>Latitude:</strong> ${selectedMountain.coords.lat}</p>
                <p><strong>Longitude:</strong> ${selectedMountain.coords.lng}</p>
                <p><strong>Sunrise:</strong> ${sunriseTime.toLocaleTimeString()}</p>
            
                <p><strong>Sunset:</strong> ${sunsetTime.toLocaleTimeString()}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching sunrise and sunset times:', error);
    }
}

// Add event listener to the dropdown menu
document.getElementById("mountainSelect").addEventListener("change", displayMountainInfo);