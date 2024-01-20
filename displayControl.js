import { showTime } from './time.js';
import { fetchWeatherData } from './weather.js';
import { fetchAQIData } from './aqi.js';
import { getCachedDataAndUpdateDisplay } from './cacheManager.js';

export function initDisplayControl() {
    const timeDisplay = document.getElementById('time');
    const tempDisplay = document.getElementById('temperature');
    const aqiDisplay = document.getElementById('aqi');

    let currentDisplay = 0;
    const displayDuration = 4000;
    const displays = [timeDisplay, tempDisplay, aqiDisplay];

    setInterval(() => {
        displays[currentDisplay].style.display = 'none';
        currentDisplay = (currentDisplay + 1) % displays.length;
        displays[currentDisplay].style.display = 'block';

        if (currentDisplay === 0) {
            timeDisplay.textContent = showTime();
        } else if (currentDisplay === 1) {
            getCachedDataAndUpdateDisplay('weatherData', tempDisplay, fetchWeatherData);
        } else if (currentDisplay === 2) {
            getCachedDataAndUpdateDisplay('aqiData', aqiDisplay, fetchAQIData);
        }
    }, displayDuration);
}
