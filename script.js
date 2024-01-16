const displayElement = document.getElementById('display');

function fetchWeather() {
    return fetch('https://api.weather.gov/gridpoints/MTR/94,128/forecast')
        .then(response => response.json())
        .then(data => {
            const currentPeriod = data.properties.periods[0];
            return `${currentPeriod.temperature}°${currentPeriod.temperatureUnit}`;
        })
        .catch(() => 'Temp: N/A');
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
        .then(data => 'AQI ' + data.aqi)
        .catch(() => 'AQI: N/A');
}

function rotateDisplay() {
    const functions = [getCurrentTime, fetchWeather, fetchAQI];
    let index = 0;

    const updateDisplay = async () => {
        const value = await functions[index]();
        displayElement.textContent = value;
        index = (index + 1) % functions.length;
    };

    updateDisplay();
    setInterval(updateDisplay, 4000);
}

rotateDisplay();
