const fetch = require('node-fetch');

const getWundergroundData = async (req, res) => {
    const apiKey = process.env.WEATHER_UNDERGROUND_API_KEY;
    const stationID = 'KCANAPA103'; // Station ID can be dynamic based on req parameters if needed
    const url = `http://api.weather.com/v2/pws/observations/current?stationId=${stationID}&format=json&units=e&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Extract and format the data as needed before sending it back
        // The exact structure will depend on the data provided by Weather Underground
        const formattedData = {
            temperature: data.observations[0].metric.temp,
            humidity: data.observations[0].humidity,
            condition: data.observations[0].condition
        };

        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching data from Weather Underground:', error);
        res.status(500).send('Error fetching weather data');
    }
};

module.exports = getWundergroundData;
