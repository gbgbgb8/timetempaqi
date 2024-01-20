export function fetchWeatherData(apiKey, stationId) {
    const weatherApiUrl = 'https://api.weather.com/v2/pws/observations/current';
    if (!apiKey || !stationId) return Promise.resolve('Error: Missing API Key or Station ID');

    return fetch(`${weatherApiUrl}?stationId=${stationId}&format=json&units=e&apiKey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.observations[0].imperial.temp + '°')
        .catch(error => {
            console.error('Error fetching weather data:', error);
            return 'Error fetching temperature';
        });
}
