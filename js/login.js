window.onload = function () {
    console.log("login screen");
    window.SN = SpatialNavigation;
    SN.init();
    register_number_keys();
    set_focus('login_container', 'userName');
    set_focus('code_container', 'getNewCode');
    set_focus('qr_code_container', 'getQrBack');

    SN.focus("#signinButton");
    // document.getElementById('userName').value = "testing09k@gmail.com";//"saroj.vijay@fusionitechnologies.com";
    // document.getElementById('password').value = "123456";//"vijay@123";

    // document.getElementById('userName').value = "varsha@fusionitechnologies.com";
    // document.getElementById('password').value = "12345678";
    // document.getElementById('userName').value = "naseem@fusionitechnologies.com";
    // document.getElementById('password').value = "naseem@123";

   



    // SN.focus("#login_container");

    if (localStorage.getItem('haitianflix_user_name') && localStorage.getItem('haitianflix_user_password')) {
        SN.focus("#signinButton");
        loginApi();
    } 
    $('#signinButton').on('sn:enter-down', function (e) {
        console.log("signinButton enter");
        var userName = document.getElementById('userName').value;
        var password = document.getElementById('password').value;

        if (userName == '') {
            show_hide_login_error("Username empty", "Username is required.")
        } else if (password == '') {
            show_hide_login_error("Password empty", "Password is required.")
        } else if (userName != '' && password != '') {
            localStorage.setItem('haitianflix_user_name', userName);
            localStorage.setItem('haitianflix_user_password', password);
            loginApi();
        }
    });

}

// When something press from remote keys
$(window).keydown(function (evt) {
    console.log("key event", evt.keyCode);
    switch (evt.keyCode) {
        case 10009: //Back/Return
            if ($("#login_container").hasClass("active")) {
                console.log("exit app");
                tizen.application.getCurrentApplication().exit();
            } else if ($("#code_container").hasClass("active")) {
                clearInterval(LOGIN_WITH_CODE_TIMER);
                $("#code_container").removeClass("active").hide();
                $("#login_container").addClass("active").show();
                SN.focus("login_container");
            } else if ($("#qr_code_container").hasClass("active")) {
                clearInterval(LOGIN_WITH_CODE_TIMER);
                $("#qr_code_container").removeClass("active").hide();
                $("#login_container").addClass("active").show();
                SN.focus("login_container");
            }
            break;

        case 37: // LEFT arrow
            console.log("left key");
            if ($('.login_container').hasClass('active') && ($("#userName").is(":focus") || $("#password").is(":focus"))) {
                var textEntered = $.trim($(':focus').val());
                if (textEntered) controlLeftArrowKeys();
            }
            break;

        case 39: // RIGHT arrow
            console.log("right key");
            if ($('.login_container').hasClass('active') && ($("#userName").is(":focus") || $("#password").is(":focus"))) {
                var textEntered = $.trim($(':focus').val());
                var input = document.getElementById($(":focus").attr("id"));
                var currentpos = input.selectionStart;
                if (textEntered && input.value.length > currentpos) controlrightArrowKeys();
            }
            break;

        case 65376: // Done from IME keyboard
            console.log("OK from keyboard...");
            if ($(".login_container").hasClass("active")) {
                if ($('#userName').is(":focus")) SN.focus('#password');
                else if ($('#password').is(":focus")) SN.focus('#signinButton');
            }
            break;

        default:
            console.log("Remote keyCode: ", evt.keyCode);
    }
});

function loginApi() {
    console.log("loginApi");
    $("#login_loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/login",
        async: true,
        dataType: 'json',
        data: { "email": localStorage.getItem('haitianflix_user_name'), "password": localStorage.getItem('haitianflix_user_password'), "device_id": webapis.network.getMac() },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            $("#login_loader").hide();
            console.log(data);
            if (data.status == 1 && data.subscription_status == "ACTIVE") {
                $.each(data, function (index, value) {
                    localStorage.setItem(index, value);
                });
                window.location.href = "home.html";
            } else {
                console.log("Something went wrong.")
                show_hide_login_error(data.subscription_status, data.msg);
            }
        },
        error: function (xhr, error) {
            console.log("error", xhr, error);
            ajaxError(xhr);
        }
    });
}

function ajaxError(xhr) {
    $("#login_loader").hide();
    if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
    else msg = NET_CONNECTION_ERR;
    show_hide_login_error("Network Connection", NET_CONNECTION_ERR);
}