const fetch = require('node-fetch');

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Correctly extracting the PM2.5 value from the response
        const pm25Value = data.sensor.pm2_5_atm;

        // Convert PM2.5 value to AQI
        // For simplicity, we're returning the PM2.5 value directly
        // Apply a conversion formula here to get the actual AQI if necessary
        const aqi = pm25Value;

        res.status(200).json({ aqi });
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).send('Error fetching AQI data');
    }
}
