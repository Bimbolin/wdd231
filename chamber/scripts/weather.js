const apiKey = '890a194e2942db4bee06bd3258c6e7d7'; // Replace with your OpenWeatherMap API key
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;

// Fetch weather data
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currentWeather = data.list[0];
        const forecast = data.list.slice(1, 4); // Get the next 3 days forecast
        const currentTemp = document.querySelector('#current-temp');
        const weatherIcon = document.querySelector('#weather-icon');
        const captionDesc = document.querySelector('figcaption');

        // Display current weather
        document.getElementById('currentTemp').textContent = `${currentWeather.main.temp}°C`;
        document.getElementById('weatherDesc').textContent = currentWeather.weather[0].description;

        // Display forecast
        forecast.forEach((day, index) => {
            const forecastElement = document.createElement('div');
            forecastElement.classList.add('forecast-day');
            forecastElement.textContent = `Day ${index + 1}: ${day.dt_txt} - Temp: ${day.main.temp}°C`;
            document.getElementById('forecast').appendChild(forecastElement);
        });
    })
    .catch(error => console.error('Error fetching weather data:', error));




    

    
