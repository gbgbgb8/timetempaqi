const displayElement = document.getElementById('display');

function fetchWeather() {
    return fetch('https://api.weather.gov/gridpoints/MTR/94,128/forecast')
        .then(response => response.json())
        .then(data => data.properties.periods[0].temperature + '°F')
        .catch(() => 'N/A');
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Placeholder function for AQI, since no API is used
function getAQI() {
    return 'AQI: N/A';
}

function rotateDisplay() {
    const functions = [getCurrentTime, fetchWeather, getAQI];
    let index = 0;

    const updateDisplay = async () => {
        const value = typeof functions[index] === 'function' ? await functions[index]() : functions[index];
        displayElement.textContent = value;
        index = (index + 1) % functions.length;
    };

    updateDisplay();
    setInterval(updateDisplay, 4000);
}

rotateDisplay();
