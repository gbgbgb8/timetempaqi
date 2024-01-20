document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settingsButton');
    const settingsMenu = document.getElementById('settingsMenu');
    const closeButton = document.querySelector('.close-button');
    const settingsForm = document.getElementById('settingsForm');

    settingsButton.addEventListener('click', () => {
        settingsMenu.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        settingsMenu.style.display = 'none';
    });

    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveSettings();
    });

    loadSettings();
});

function saveSettings() {
    const settings = {
        sensorId: document.getElementById('sensorId').value,
        bgColor: document.getElementById('bgColor').value,
    };

    localStorage.setItem('displaySettings', JSON.stringify(settings));
    applySettings();
    document.getElementById('settingsMenu').style.display = 'none';
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('displaySettings'));
    if (settings) {
        document.getElementById('sensorId').value = settings.sensorId || '';
        document.getElementById('bgColor').value = settings.bgColor || '#000000';
        applySettings();
    }
}

function applySettings() {
    const settings = JSON.parse(localStorage.getItem('displaySettings'));
    if (settings) {
        document.body.style.backgroundColor = settings.bgColor || '#000000';
    }
}
