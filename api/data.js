const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        const aqiData = await fetchAirNowAQIData();

        res.json({
            time: getCurrentTime(),
            temperature: weatherData,
            aqi: aqiData
        });
    } catch (error) {
        console.error('Error in serverless function:', error.message);
        res.status(500).json({ error: error.message });
    }
};

async function fetchWeatherData() {
    const apiKey = process.env.WEATHER_UNDERGROUND_API_KEY;
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=KCANAPA281&format=json&units=e&apiKey=${apiKey}`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API responded with ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract temperature from Weather Underground API response
    return data.observations[0].imperial.temp || 'Unknown'; 
}

async function fetchAirNowAQIData() {
    const apiKey = process.env.AIRNOW_API_KEY;
    const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=94559&distance=5&API_KEY=${apiKey}`;
    
    const response = await fetch(url);

    if (!response.ok) {
        console.error(`AirNow API responded with ${response.statusText}`);
        throw new Error(`AirNow API responded with ${response.statusText}`);
    }

    const data = await response.json();

    // Extract AQI and the category name from the response
    if (data && data.length > 0) {
        const { AQI, Category } = data[0];
        return `${AQI} - ${Category.Name}`;
    }
    return 'Unknown';
}

function getCurrentTime() {
    const selectedTimeZone = document.getElementById('timeZone').value;
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: selectedTimeZone // use selected timezone
    };
    let formatted = new Intl.DateTimeFormat('en-US', options).format(now);
    
    // Remove the AM/PM part and leading zero, if any
    formatted = formatted.replace(/ AM| PM/g, '').trim();
    return formatted.startsWith('0') ? formatted.slice(1) : formatted;
}
