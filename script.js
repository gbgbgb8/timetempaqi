const displayElement = document.getElementById('display');

async function fetchWeather() {
    const url = 'https://api.weather.gov/gridpoints/MTR/94,128/forecast';
    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Response not OK');
            }
            const data = await response.json();
            const currentPeriod = data.properties.periods[0];
            return `${currentPeriod.temperature}°${currentPeriod.temperatureUnit}`;
        } catch (error) {
            console.error('Error fetching weather:', error);
            attempts++;
            if (attempts >= maxRetries) {
                return 'Temp: N/A';
            }
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}


function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Convert hours from 24-hour to 12-hour format and remove leading zero if any
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zero to minutes if less than 10
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutesFormatted;
}


function fetchAQI() {
    return fetch('/api/getAQI')
        .then(response => response.json())
        .then(data => data.aqi + '<br>AQI')
        .catch(() => 'AQI: <br>N/A');
}

function rotateDisplay() {
    const functions = [getCurrentTime, fetchWeather, fetchAQI];
    let index = 0;

    const updateDisplay = async () => {
        const value = await functions[index]();
        displayElement.innerHTML = value; // Use innerHTML to render HTML correctly
        index = (index + 1) % functions.length;
    };    

    updateDisplay();
    setInterval(updateDisplay, 4000);
}

rotateDisplay();
