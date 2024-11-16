document.addEventListener("DOMContentLoaded", function() {
  // Get the button elements
  const signinBtn = document.getElementById('signinBtn');
  const signupBtn = document.getElementById('signupBtn');
  const helpBtn = document.getElementById('helpBtn');

  // Navigation for Sign In
  signinBtn.addEventListener('click', function() {
    window.location.href = 'pages/LoginScreen/loginScreen.html'; // Navigate to the login page
  });

  // Navigation for Sign Up
  signupBtn.addEventListener('click', function() {
    window.location.href = 'pages/SignUpScreen/signupScreen.html'; // Navigate to the signup page
  });

  // Navigation for Help
  helpBtn.addEventListener('click', function() {
    window.location.href = 'help.html'; // Navigate to the help page
  });

  // Focus management for remote control
  function manageFocusOnButton(buttonElement) {
    // Remove focus-visible class from all buttons
    [signinBtn, signupBtn, helpBtn].forEach((btn) => {
      btn.classList.remove('focus-visible');
    });

    // Add focus-visible class to the focused button
    buttonElement.classList.add('focus-visible');
  }

  // Event listener for focus on the buttons
  signinBtn.addEventListener('focus', function() {
    manageFocusOnButton(signinBtn);
  });

  signupBtn.addEventListener('focus', function() {
    manageFocusOnButton(signupBtn);
  });

  helpBtn.addEventListener('focus', function() {
    manageFocusOnButton(helpBtn);
  });

  // Initially focus on the first button when the page loads
  signinBtn.focus();
  manageFocusOnButton(signinBtn);
});


var checkTime;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
    setTimeout(startTime, 10);
}

function checkTime(i) {
    if (i < 10) {
        i='0' + i;
    }
    return i;
}