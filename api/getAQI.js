const fetch = require('node-fetch');

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extracting AQI data
        // The exact field for AQI might vary based on PurpleAir's response structure
        // Assuming 'pm2.5_atm' is the field for AQI
        const aqi = data.sensor.pm2_5_atm; // Replace with the actual field name as per PurpleAir's API

        res.status(200).json({ aqi });
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).send('Error fetching AQI data');
    }
}
