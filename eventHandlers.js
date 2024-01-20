import { exportSettings, importSettings } from './settings.js';
import { updateDisplays } from './cacheManager.js';
import { fetchWeatherData } from './weather.js';
import { fetchAQIData } from './aqi.js';

export function initEventHandlers() {
    const exportBtn = document.getElementById('exportSettings');
    const importBtn = document.getElementById('importSettings');
    const applySettingsBtn = document.getElementById('applySettings');
    const importFileInput = document.getElementById('importFile');
    const testWeatherBtn = document.getElementById('testWeather');
    const testAQIBtn = document.getElementById('testAQI');
    const fontSizeSlider = document.getElementById('fontSizeSlider');

    exportBtn.addEventListener('click', exportCurrentSettings);
    importBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importSettingsFile);
    applySettingsBtn.addEventListener('click', applySettings);
    testWeatherBtn.addEventListener('click', testWeatherAPI);
    testAQIBtn.addEventListener('click', testAQIAPI);
    fontSizeSlider.addEventListener('input', adjustFontSize);

    function exportCurrentSettings() {
        const settings = {
            wundergroundApiKey: document.getElementById('wundergroundApiKey').value,
            wundergroundStationId: document.getElementById('wundergroundStationId').value,
            purpleAirApiKey: document.getElementById('purpleAirApiKey').value,
            purpleAirSensorId: document.getElementById('purpleAirSensorId').value
        };
        exportSettings(settings);
    }

    function importSettingsFile(event) {
        importSettings(event.target.files[0])
            .then(settings => {
                document.getElementById('wundergroundApiKey').value = settings.wundergroundApiKey;
                document.getElementById('wundergroundStationId').value = settings.wundergroundStationId;
                document.getElementById('purpleAirApiKey').value = settings.purpleAirApiKey;
                document.getElementById('purpleAirSensorId').value = settings.purpleAirSensorId;
            })
            .catch(error => console.error('Error importing settings:', error));
    }

    function applySettings() {
        localStorage.clear();
        updateDisplays();
    }

    function testWeatherAPI() {
        const apiKey = document.getElementById('wundergroundApiKey').value;
        const stationId = document.getElementById('wundergroundStationId').value;
        fetchWeatherData(apiKey, stationId)
            .then(data => alert('Weather API Test: ' + data))
            .catch(error => alert('Weather API Test Failed: ' + error));
    }

    function testAQIAPI() {
        const apiKey = document.getElementById('purpleAirApiKey').value;
        const sensorId = document.getElementById('purpleAirSensorId').value;
        fetchAQIData(apiKey, sensorId)
            .then(data => alert('AQI API Test: ' + data))
            .catch(error => alert('AQI API Test Failed: ' + error));
    }

    function adjustFontSize() {
        const fontSize = fontSizeSlider.value;
        document.getElementById('display').style.fontSize = fontSize + 'em';
    }
}
