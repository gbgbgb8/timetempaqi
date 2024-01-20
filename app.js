import { showTime } from './time.js';
import { fetchWeatherData } from './weather.js';
import { fetchAQIData } from './aqi.js';
import { getCachedDataAndUpdateDisplay } from './cacheManager.js';
import { initEventHandlers } from './eventHandlers.js';
import { initDisplayControl } from './displayControl.js';

document.addEventListener('DOMContentLoaded', () => {
    initDisplayControl();
    initEventHandlers();
});

export function updateDisplays() {
    const displayElements = {
        time: document.getElementById('time'),
        temperature: document.getElementById('temperature'),
        aqi: document.getElementById('aqi')
    };

    getCachedDataAndUpdateDisplay('weatherData', displayElements.temperature, fetchWeatherData, 'wundergroundApiKey', 'wundergroundStationId');
    getCachedDataAndUpdateDisplay('aqiData', displayElements.aqi, fetchAQIData, 'purpleAirApiKey', 'purpleAirSensorId');
}
