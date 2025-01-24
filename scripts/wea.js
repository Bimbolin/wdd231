// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Declare the API URL with the appropriate parameters
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.749&lon=6.637&units=metric&appid=890a194e2942db4bee06bd3258c6e7d7';

// Define the async function to fetch data from the API
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For testing only
            displayResults(data); // Call the function to display the results
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display the results in the HTML
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

// Call the apiFetch function to fetch and display the weather data
apiFetch();
