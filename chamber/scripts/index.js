// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const spotlightContent = document.getElementById('spotlightContent');
const forecastList = document.getElementById('forecast');

// Declare the API URL with the appropriate parameters
const apiKey ='890a194e2942db4bee06bd3258c6e7d7'; // Replace with your OpenWeatherMap API key
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=4.7519&lon=7.0204&units=metric&appid=${apiKey}`;

// Function to fetch weather data
async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather results in the HTML
function displayWeather(data) {
    const currentWeather = data.list[0];
    const forecast = data.list.slice(1, 4); // Get the next 3 days forecast

    // Display current weather
    currentTemp.textContent = `${currentWeather.main.temp}°C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', currentWeather.weather[0].description);
    captionDesc.textContent = currentWeather.weather[0].description;

    // Display forecast
    forecast.forEach((day, index) => {
        const forecastElement = document.createElement('li');
        forecastElement.innerHTML = `<strong>Day ${index + 1}:</strong> ${day.dt_txt} - Temp: ${day.main.temp}°C`;
        forecastList.appendChild(forecastElement);
    });
}

// Function to fetch spotlight members data
async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }
}

// Function to display spotlight members in the HTML
function displaySpotlights(members) {
    spotlightContent.innerHTML = '';

    // Filter gold and silver members
    const goldSilverMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // Randomly select up to three members
    const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Display selected members
    randomMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight');
        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name}">
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;
        spotlightContent.appendChild(spotlightCard);
    });
}

// Fetch and display weather and spotlight data when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchSpotlights();
});
