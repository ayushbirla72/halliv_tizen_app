// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the Send OTP button, email input, and full name input
  const sendOtpBtn = document.getElementById("send-otp-btn");
  const emailInput = document.getElementById("email");
  const fullNameInput = document.getElementById("full-name");

  // Function to handle the click event for the Send OTP button
  sendOtpBtn.addEventListener("click", function () {
    // Retrieve the values entered in the full name and email input fields
    //        const fullName = fullNameInput.value.trim();
    //        const email = emailInput.value.trim();
    //
    //        // Check that both fields have values before proceeding
    //        if (!fullName || !email) {
    //            alert('Please enter both your full name and email.');
    //            return; // Stop further execution if inputs are empty
    //        }
    //
    //        // Log the full name and email to the console
    //        console.log('Full Name:', fullName);
    //        console.log('Email:', email);
    //
    //        // Example of additional action, like sending an OTP or validation
    //        alert('OTP sent to: ' + email); // Example: Show an alert for feedback
    window.location.href = "../OtpScreen/OtpScreen.html";
  });

  // Optionally, focus the email input when the page loads for better UX
  emailInput.focus();
});
