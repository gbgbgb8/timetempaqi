const fetch = require('node-fetch');

const getWundergroundData = async (req, res) => {
    const apiKey = process.env.WEATHER_UNDERGROUND_API_KEY;
    const stationID = 'KCANAPA103';
    const url = `http://api.weather.com/v2/pws/observations/current?stationId=${stationID}&format=json&units=e&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Extract the temperature data from the response
        const temperature = data.observations[0].imperial.temp;

        // Send the temperature data back as a JSON response
        res.status(200).json({ temperature: `${temperature}°F` });
    } catch (error) {
        console.error('Error fetching data from Weather Underground:', error);
        res.status(500).send('Error fetching weather data');
    }
};

module.exports = getWundergroundData;
