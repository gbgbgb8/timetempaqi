export function exportSettings(settings) {
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function importSettings(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target.result);
                resolve(settings);
            } catch (error) {
                reject('Error parsing settings file');
            }
        };
        reader.onerror = () => reject('Error reading settings file');
        reader.readAsText(file);
    });
}
