const fetch = require('node-fetch');

let cachedAQI = null;
let lastFetchTime = 0;

function aqiFromPM(pm) {
    if (isNaN(pm)) return "-"; 
    if (pm === undefined) return "-";
    if (pm < 0) return pm; 
    if (pm > 1000) return "-"; 

    if (pm > 350.5) {
        return calcAQI(pm, 500, 401, 500.4, 350.5); // Hazardous
    } else if (pm > 250.5) {
        return calcAQI(pm, 400, 301, 350.4, 250.5); // Hazardous
    } else if (pm > 150.5) {
        return calcAQI(pm, 300, 201, 250.4, 150.5); // Very Unhealthy
    } else if (pm > 55.5) {
        return calcAQI(pm, 200, 151, 150.4, 55.5); // Unhealthy
    } else if (pm > 35.5) {
        return calcAQI(pm, 150, 101, 55.4, 35.5); // Unhealthy for Sensitive Groups
    } else if (pm > 12.1) {
        return calcAQI(pm, 100, 51, 35.4, 12.1); // Moderate
    } else if (pm >= 0) {
        return calcAQI(pm, 50, 0, 12, 0); // Good
    } else {
        return undefined;
    }
}

function calcAQI(Cp, Ih, Il, BPh, BPl) {
    var a = (Ih - Il);
    var b = (BPh - BPl);
    var c = (Cp - BPl);
    return Math.round((a/b) * c + Il);
}

async function fetchAQIFromAPI(api_key, sensorId) {
    const url = `https://api.purpleair.com/v1/sensors/${sensorId}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();

    // Use pm2.5_10minute for AQI calculation
    const pm25Value = data.sensor.stats['pm2.5_10minute'];
    return aqiFromPM(pm25Value);
}

export default async function(req, res) {
    const api_key = process.env.PURPLEAIR_API_KEY;
    const sensorId = 69541; // Sensor ID for Napa, CA
    const currentTime = Date.now();

    if (!cachedAQI || currentTime - lastFetchTime > 300000) {
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
