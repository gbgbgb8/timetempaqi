const content = document.getElementById('content');

async function displayTime() {
    const now = new Date();
    content.innerHTML = now.toLocaleTimeString();
}

async function fetchData() {
    try {
        const response = await fetch('/api/weather');
        if (!response.ok) throw new Error('Data fetch failed');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { temperature: 'Error', aqi: 'Error' };
    }
}

async function displayTemperature() {
    const data = await fetchData();
    content.innerHTML = `Temperature: ${data.temperature}°F`;
}

async function displayAQI() {
    const data = await fetchData();
    content.innerHTML = `AQI: ${data.aqi}`;
}

async function rotateDisplay() {
    let functions = [displayTime, displayTemperature, displayAQI];
    let index = 0;

    await functions[index]();
    setInterval(async () => {
        index = (index + 1) % functions.length;
        await functions[index]();
    }, 4000);
}

document.addEventListener('DOMContentLoaded', rotateDisplay);
