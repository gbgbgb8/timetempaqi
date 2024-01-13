const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const weatherApiKey = process.env.WEATHER_UNDERGROUND_API_KEY;
    const airNowApiKey = process.env.AIRNOW_API_KEY;
    // You can add logic to use PURPLEAIR_API_KEY if needed

    const zipCode = '94559'; // Napa, CA ZIP code

    try {
        // Fetching weather data
        const weatherResponse = await fetch(`https://api.weather.com/v3/wx/observations/current?postalKey=${zipCode}:US&units=e&apiKey=${weatherApiKey}`);
        if (!weatherResponse.ok) throw new Error('Weather data fetch failed');
        const weatherData = await weatherResponse.json();

        // Fetching AQI data
        const aqiResponse = await fetch(`http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipCode}&distance=25&API_KEY=${airNowApiKey}`);
        if (!aqiResponse.ok) throw new Error('AQI data fetch failed');
        const aqiData = await aqiResponse.json();

        res.status(200).json({ 
            temperature: weatherData.temperature,
            aqi: aqiData[0].AQI
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
};
