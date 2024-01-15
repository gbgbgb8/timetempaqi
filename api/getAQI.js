const fetch = require('node-fetch');

function calculateAQI(pm25) {
    if (pm25 > 350.5) {
        return 500;
    } else if (pm25 > 250.5) {
        return 400;
    } else if (pm25 > 150.5) {
        return 300;
    } else if (pm25 > 65.5) {
        return 200;
    } else if (pm25 > 40.5) {
        return 150;
    } else if (pm25 > 15.5) {
        return 100;
    } else if (pm25 > 12.1) {
        return 50;
    } else {
        return 0;
    }
}

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract the PM2.5 value and convert it to AQI
        const pm25Value = data.sensor.pm2_5_atm;
        const aqi = calculateAQI(pm25Value);

        res.status(200).json({ aqi });
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).send('Error fetching AQI data');
    }
}
