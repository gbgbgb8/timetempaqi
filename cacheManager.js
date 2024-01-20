export function getCachedDataAndUpdateDisplay(cacheKey, displayElement, fetchDataFunction) {
    const apiKey = document.getElementById(cacheKey + 'ApiKey').value;
    const id = document.getElementById(cacheKey + 'Id').value;

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

export function cacheData(key, data) {
    const cacheEntry = {
        timestamp: new Date().getTime(),
        data: data
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
}

export function getCachedData(key) {
    const cacheEntry = JSON.parse(localStorage.getItem(key));
    if (!cacheEntry) return null;

    const age = new Date().getTime() - cacheEntry.timestamp;
    if (age < 600000) { // 10 minutes
        return cacheEntry.data;
    }

    localStorage.removeItem(key);
    return null;
}

export function updateDisplays() {
    const displayElements = {
        time: document.getElementById('time'),
        temperature: document.getElementById('temperature'),
        aqi: document.getElementById('aqi')
    };

    Object.keys(displayElements).forEach(key => {
        const displayElement = displayElements[key];
        const apiKeyElementId = key + 'ApiKey';
        const idElementId = key + 'Id';

        if (document.getElementById(apiKeyElementId) && document.getElementById(idElementId)) {
            getCachedDataAndUpdateDisplay(key, displayElement, window['fetch' + capitalizeFirstLetter(key) + 'Data']);
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
