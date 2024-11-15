// loginScreen.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const sendOtpButton = document.getElementById("send-otp-btn");

    // Add an event listener to handle OTP submission
    sendOtpButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        const email = emailInput.value.trim();
        
        // Validate email.
        if (validateEmail(email)) {
            // Save email to local storage or pass it as a query parameter to the OTP page
            localStorage.setItem("userEmail", email);
            
            // Redirect to the OTP page
            window.location.href = "../OtpScreen/OtpScreen.html";
        } else {
            alert("Please enter a valid email address.");
        }
    });
});

// Function to validate email using a regular expression
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
