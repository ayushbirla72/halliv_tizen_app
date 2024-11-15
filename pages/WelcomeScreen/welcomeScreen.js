// welcomeScreen.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Select the "Start watching" button
  const startButton = document.querySelector(".welcome-screen-footer-btn");

  // Add a click event listener to the button
  startButton.addEventListener("click", function () {
    // Navigate to the home screen
    window.location.href = "../HomeScreen/homeScreen.html"; // Replace "home.html" with your actual home screen file path
  });
});
