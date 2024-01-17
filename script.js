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
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    
    hours = hours % 12;
    hours = hours ? hours : 12;

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
        displayElement.innerHTML = value;
        index = (index + 1) % functions.length;
    };

    updateDisplay();
    setInterval(updateDisplay, 4000);
}

rotateDisplay();

// Settings Button and Modal
document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('settingsMenu').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('settingsMenu').style.display = 'none';
});

document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const settings = {
        sensorId: document.getElementById('sensorId').value,
        bgColor: document.getElementById('bgColor').value,
        // Other settings can be added here
    };

    localStorage.setItem('displaySettings', JSON.stringify(settings));
    applySettings();
    document.getElementById('settingsMenu').style.display = 'none';
});

function loadSettings() {
    const
settings = JSON.parse(localStorage.getItem('displaySettings'));
if (settings) {
document.getElementById('sensorId').value = settings.sensorId || '';
document.getElementById('bgColor').value = settings.bgColor || '#000000';
applySettings();
}
}

function applySettings() {
const settings = JSON.parse(localStorage.getItem('displaySettings'));
if (settings) {
document.body.style.backgroundColor = settings.bgColor || '#000000';
// Apply other settings as needed
}
}

// Call loadSettings on page load
loadSettings();