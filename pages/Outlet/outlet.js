function loadScreen(screen) {
    fetch(screen)
        .then(response => response.text())
        .then(data => {
            document.getElementById('outlet').innerHTML = data;
        })
        .catch(error => console.error('Error loading screen:', error));
}

// Load home screen by default
document.addEventListener("DOMContentLoaded", () => {
    loadScreen('home.html');
});
