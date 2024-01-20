export function fetchAQIData(apiKey, sensorId) {
    const purpleAirApiUrl = 'https://api.purpleair.com/v1/sensors/';
    if (!apiKey || !sensorId) return Promise.resolve('Error: Missing API Key or Sensor ID');

    return fetch(`${purpleAirApiUrl}${sensorId}?api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const pm25value = data.sensor.stats['pm2.5_10minute'];
            return 'AQI: ' + aqiFromPM(pm25value);
        })
        .catch(error => {
            console.error('Error fetching AQI data:', error);
            return 'Error fetching AQI';
        });
}

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
    const a = (Ih - Il);
    const b = (BPh - BPl);
    const c = (Cp - BPl);
    return Math.round((a / b) * c + Il);
}
