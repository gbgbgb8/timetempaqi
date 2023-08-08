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
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
}
