import { showTime } from './time.js';
import { fetchWeatherData } from './weather.js';
import { fetchAQIData } from './aqi.js';
import { exportSettings, importSettings } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const tempDisplay = document.getElementById('temperature');
    const aqiDisplay = document.getElementById('aqi');
    const exportBtn = document.getElementById('exportSettings');
    const importBtn = document.getElementById('importSettings');
    const applySettingsBtn = document.getElementById('applySettings');
    const importFileInput = document.getElementById('importFile');
    const testWeatherBtn = document.getElementById('testWeather');
    const testAQIBtn = document.getElementById('testAQI');
    const fontSizeSlider = document.getElementById('fontSizeSlider');

    let currentDisplay = 0;
    const displayDuration = 4000;
    const displays = [timeDisplay, tempDisplay, aqiDisplay];

    setInterval(() => {
        displays[currentDisplay].style.display = 'none';
        currentDisplay = (currentDisplay + 1) % displays.length;
        displays[currentDisplay].style.display = 'block';

        if (currentDisplay === 0) {
            timeDisplay.textContent = showTime();
        }
        if (currentDisplay === 1) {
            getCachedDataAndUpdateDisplay('weatherData', tempDisplay, fetchWeatherData, document.getElementById('wundergroundApiKey').value, document.getElementById('wundergroundStationId').value);
        }
        if (currentDisplay === 2) {
            getCachedDataAndUpdateDisplay('aqiData', aqiDisplay, fetchAQIData, document.getElementById('purpleAirApiKey').value, document.getElementById('purpleAirSensorId').value);
        }
    }, displayDuration);

    exportBtn.addEventListener('click', () => {
        const settings = {
            wundergroundApiKey: document.getElementById('wundergroundApiKey').value,
            wundergroundStationId: document.getElementById('wundergroundStationId').value,
            purpleAirApiKey: document.getElementById('purpleAirApiKey').value,
            purpleAirSensorId: document.getElementById('purpleAirSensorId').value,
        };
        exportSettings(settings);
    });

    importBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', (event) => {
        importSettings(event.target.files[0])
            .then(settings => {
                document.getElementById('wundergroundApiKey').value = settings.wundergroundApiKey;
                document.getElementById('wundergroundStationId').value = settings.wundergroundStationId;
                document.getElementById('purpleAirApiKey').value = settings.purpleAirApiKey;
                document.getElementById('purpleAirSensorId').value = settings.purpleAirSensorId;
            })
            .catch(error => console.error(error));
    });

    applySettingsBtn.addEventListener('click', () => {
        localStorage.clear();
        updateDisplays();
    });

    testWeatherBtn.addEventListener('click', () => {
        const weatherApiKey = document.getElementById('wundergroundApiKey').value;
        const weatherStationId = document.getElementById('wundergroundStationId').value;
        fetchWeatherData(weatherApiKey, weatherStationId)
            .then(data => alert('Weather API Test: ' + data))
            .catch(error => alert('Weather API Test Failed: ' + error));
    });

    testAQIBtn.addEventListener('click', () => {
        const aqiApiKey = document.getElementById('purpleAirApiKey').value;
        const aqiSensorId = document.getElementById('purpleAirSensorId').value;
        fetchAQIData(aqiApiKey, aqiSensorId)
            .then(data => alert('AQI API Test: ' + data))
            .catch(error => alert('AQI API Test Failed: ' + error));
    });

    fontSizeSlider.addEventListener('input', () => {
        const displayDivs = document.querySelectorAll('.display');
        displayDivs.forEach(div => {
            div.style.fontSize = fontSizeSlider.value + 'em';
        });
    });

    function getCachedDataAndUpdateDisplay(cacheKey, displayElement, fetchDataFunction, apiKey, id) {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            displayElement.textContent = cachedData;
            return;
        }

        fetchDataFunction(apiKey, id)
            .then(data => {
                displayElement.textContent = data;
                cacheData(cacheKey, data);
            });
    }

    function cacheData(key, data) {
        const cacheEntry = {
            timestamp: new Date().getTime(),
            data: data
        };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    }

    function getCachedData(key) {
        const cacheEntry = JSON.parse(localStorage.getItem(key));
        if (!cacheEntry) return null;

        const age = new Date().getTime() - cacheEntry.timestamp;
        if (age < 600000) { // 10 minutes
            return cacheEntry.data;
        }

        localStorage.removeItem(key);
        return null;
    }

    function updateDisplays() {
        displays.forEach(display => display.textContent = '');
        getCachedDataAndUpdateDisplay('weatherData', tempDisplay, fetchWeatherData, document.getElementById('wundergroundApiKey').value, document.getElementById('wundergroundStationId').value);
        getCachedDataAndUpdateDisplay('aqiData', aqiDisplay, fetchAQIData, document.getElementById('purpleAirApiKey').value, document.getElementById('purpleAirSensorId').value);
    }
});

