const fetch = require('node-fetch');

let cachedAQI = null;
let lastFetchTime = 0;

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

async function fetchAQIFromAPI(api_key, sensorId) {
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    const pm25Value = data.sensor.pm2_5_atm;
    return calculateAQI(pm25Value);
}

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const currentTime = Date.now();

    if (!cachedAQI || currentTime - lastFetchTime > 300000) { // 300000 milliseconds = 5 minutes
        try {
            cachedAQI = await fetchAQIFromAPI(api_key, sensorId);
            lastFetchTime = currentTime;
        } catch (error) {
            console.error('Error fetching AQI data:', error);
            return res.status(500).send('Error fetching AQI data');
        }
    }

    res.status(200).json({ aqi: cachedAQI });
}
