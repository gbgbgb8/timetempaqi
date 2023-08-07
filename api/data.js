const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        const aqiData = await fetchAQIData();

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

async function fetchAQIData() {
    const apiKey = process.env.PURPLEAIR_API_KEY;
    const url = `https://api.purpleair.com/v1/sensors/69541`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-Key': apiKey
        }
    });

    if (!response.ok) {
        throw new Error(`AQI API responded with ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract PM2.5 value from PurpleAir API response as an AQI approximation
    return data.sensor.stats.pm2_5 || 'Unknown'; 
}

function getCurrentTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
}
