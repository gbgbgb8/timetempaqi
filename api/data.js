const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const weatherData = await fetchWeatherData();
    const aqiData = await fetchAQIData();

    res.json({
        time: getCurrentTime(),
        temperature: weatherData,
        aqi: aqiData
    });
};

async function fetchWeatherData() {
    const apiKey = process.env.WEATHER_UNDERGROUND_API_KEY;
    const url = `YOUR_WEATHER_UNDERGROUND_API_ENDPOINT_HERE?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract and return the temperature data from the API response
    // This would vary based on the structure of the Weather Underground API response
    return data.temperature;  // Placeholder
}

async function fetchAQIData() {
    const apiKey = process.env.PURPLEAIR_API_KEY;
    const url = `YOUR_PURPLEAIR_API_ENDPOINT_HERE?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract and return the AQI data from the API response
    // This would vary based on the structure of the PurpleAir API response
    return data.aqi;  // Placeholder
}

function getCurrentTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return `${hour}:${minute}`;
}
