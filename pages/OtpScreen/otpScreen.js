document.addEventListener('DOMContentLoaded', function () {
  const otpInputs = document.querySelectorAll('.signup-otp-screen-container-input');
  const errorMessage = document.getElementById('error-message'); // Error message container
  let currentInput = 0;
  const correctOtp = '1234'; // Example OTP for validation (replace with your logic)

  // Initially hide error message
  errorMessage.style.display = 'none';

  // Focus on the first input field
  otpInputs[currentInput].focus();

  // Function to handle input on OTP fields (Only numbers allowed)
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function (e) {
      // Allow only numeric input
      if (!/^\d$/.test(e.target.value)) {
        e.target.value = '';  // Clear invalid input
        return;
      }

      // Automatically move to the next input field when a valid digit is entered
      if (e.target.value.length === 1) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      } else if (e.target.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();  // Focus on previous input if backspace is pressed
      }
    });

    input.addEventListener('keydown', function (e) {
      // Handle backspace when input is empty, go to the previous field
      if (e.key === 'Backspace' && input.value === '') {
        if (index > 0) {
          otpInputs[index - 1].focus();
        }
      }
    });

    // Prevent non-numeric characters from being entered
    input.addEventListener('keypress', function (e) {
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  // Handle OTP verification button click
  const verifyButton = document.querySelector('.signup-otp-screen-container-btn-verify');
  verifyButton.addEventListener('click', function () {
    let otp = '';
    otpInputs.forEach(input => {
      otp += input.value;
    });
    window.location.href = "../WelcomeScreen/welcomeScreen.html";

    // Check if OTP is complete and contains exactly 4 digits
//    if (otp.length === 4) {
//      if (otp === correctOtp) {
//        alert('OTP is correct!');  // OTP is correct, replace with your success action
//        errorMessage.style.display = 'none';  // Hide the error message if OTP is correct
//        window.location.href = "../WelcomeScreen/welcomeScreen.html";
//      } else {
//        errorMessage.style.display = 'block';  // Show the error message if OTP is incorrect
//
//        // Hide the error message after 10 seconds
//        setTimeout(function () {
//          errorMessage.style.display = 'none';
//        }, 10000); // 10 seconds = 10000 milliseconds
//      }
//    } else {
//      alert('Please enter the complete OTP');  // Show alert if OTP is incomplete
//      errorMessage.style.display = 'none';  // Hide the error message if OTP is incomplete
//    }
  });

  // OTP Countdown timer
  let countdownTimer = 45;
  const otpSeconds = document.querySelector('.signup-otp-screen-footer-otpseconds');
  
  function startOtpCountdown() {
    const timer = setInterval(function () {
      countdownTimer--;
      otpSeconds.textContent = countdownTimer < 10 ? `0${countdownTimer}` : countdownTimer; // Format countdown
      if (countdownTimer <= 0) {
        clearInterval(timer);
        otpSeconds.textContent = '00'; // Stop countdown at 00
      }
    }, 1000);
  }

  startOtpCountdown();
});
