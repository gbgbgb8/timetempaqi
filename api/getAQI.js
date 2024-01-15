const fetch = require('node-fetch');

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extracting the PM2.5 value from the response
        // Using 'pm2.5_atm' as it seems to be the relevant field for AQI
        const pm25Value = data.sensor['pm2.5_atm'];

        // Convert PM2.5 value to AQI - This requires a conversion formula
        // For simplicity, we're returning the PM2.5 value directly
        // You might need to apply a conversion formula here to get the actual AQI
        const aqi = pm25Value;

        res.status(200).json({ aqi });
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).send('Error fetching AQI data');
    }
}
