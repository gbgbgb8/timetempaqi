const displayElement = document.getElementById('display');

async function fetchWeather() {
    try {
        const response = await fetch('/api/getWunderground');
        if (!response.ok) {
            throw new Error('Response not OK');
        }
        const data = await response.json();
        return `${data.temperature}`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return 'Temp: N/A';
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
