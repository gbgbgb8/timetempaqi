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
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function fetchAQI() {
    return fetch('/api/getAQI')
        .then(response => response.json())
        .then(data => 'AQI: ' + data.aqi)
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
