function manage_spatial_navigation(containerClass, favoriteStatus, vodId) {
    switch (containerClass) {
        case "menu_container":
            set_focus('menuList', 'menu0');

            // When menu foucs
            $('#menuList').on('sn:focused', function (e) {
                var id = e.target.id;
                $(".selected-menu").removeClass("selected-menu");
                $("#" + id).addClass("selected-menu");
                $(".menu_container").addClass("wide_menu_container");
                $(".nav_items").addClass("wide_nav_container");
                $("#menuLogo").attr("src", "");
                $("#menuLogo").attr("src", "../images/logo.png");
                $("#menuLogo").removeClass("menu_img_small");
            });

            $('#menuList').on('sn:enter-down', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX = $("#" + e.target.id).index();
                $("#searchInputText").removeClass("empty");
                hide_left_side_bar();
                if (localStorage.getItem("days_left") == "0" && MENU_INDEX <= 4) {
                    change_screens("");
                    show_left_side_bar();
                    show_hide_popups(true, APP_MESSAGE[0], "empty_modal");
                } else {
                    show_hide_popups(false, APP_MESSAGE[0], "empty_modal");
                    selected_menu_data();
                }
            });

            $('#menuList').on('sn:unfocused', function (e) {
                $(".menu_container").removeClass("wide_menu_container");
                $(".nav_items").removeClass("wide_nav_container");
                $("#menuLogo").addClass("menu_img_small");
                $("#menuLogo").attr("src", "");
                $("#menuLogo").attr("src", "../images/menu_icon.png");
                $(".selected-menu").removeClass("selected-menu");
                $("#menu" + MENU_INDEX).addClass("selected-menu");
            });

            break;

        case "detail_container":
            set_focus('detail_container', 'play_btn');

            $('#detail_container').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = 17;
            });

            $('#buttonList').on('sn:focused', function (e) {
                LAST_FOCUSED_ITEM = id = e.target.id;
                change_button_focus(id);
                $(".rating_div").hide();
            });

            $('#like_dislike_container').on('sn:focused', function (e) {
                LAST_FOCUSED_ITEM = id = e.target.id;
                change_button_focus(id);
            });

            $('#like_btn').on('sn:enter-down', function (e) {
                like();
            });

            $('#dislike_btn').on('sn:enter-down', function (e) {
                dislike();
            });

            $('#play_btn').on('sn:enter-down', function (e) {
                VOD_URL = SELECTED_ITEM_DATA['stream_file'];
                SELECTED_ITEM_DATA['stream_file'];
                change_screens("video_container");
                load_video();
            });

            $('#play_trailer').on('sn:enter-down', function (e) {
                VOD_URL = SELECTED_ITEM_DATA['stream_trailer'];
                SELECTED_ITEM_DATA['stream_trailer'];
                change_screens("video_container");
                load_video();
            });

            $('#add_favorites').on('sn:enter-down', function (e) {
                var id = e.target.id;
                if (SELECTED_ITEM_DATA.isFavourite == "1") {
                    $("#" + id).find("img").attr("src", "./images/add_to_favorite_active.png");
                    removeFavoriteData();
                }
                else {
                    $("#" + id).find("img").attr("src", "./images/remove_active.png");
                    addFavouriteData();
                }
            });

            $('#rate_now').on('sn:enter-down', function (e) {
                $(".rating_div").show();
                SN.focus("ratingList");
            });

            $('#watchLater').on('sn:enter-down', function (e) {
                var id = e.target.id;
                if (SELECTED_ITEM_DATA.isWatchlater == "1") {
                    $("#" + id).find("img").attr("src", "./images/watch_later_plus.png");
                    removeWatchLaterData();
                }
                else {
                    $("#" + id).find("img").attr("src", "./images/watch_later_minus.png");
                    addWatchLaterData();
                }
            });

            break;

        case "search_container":
            set_focus('search_box', 'searchInputText');

            // When menu foucs
            $('#search_box').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                LAST_FOCUSED_ITEM = e.target.id;
            });

            $('#search_box').on('sn:enter-down', function (e) {
                request_search_results();
            });

            break;

        case "rating_container":
            set_focus('ratingList', 'rate_one');

            // When menu foucs
            $('#ratingList').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = 10;
                var i = Number($("#" + e.target.id).index()) + 1;
                $("#ratingList li").find("img").attr("src", "./images/star.png");
                for (var j = 1; j <= i; j++) {
                    $("#ratingList").children("li:nth-child(" + j + ")").find("img").attr("src", "./images/star_focus.png");
                }
            });

            $('#ratingList').on('sn:enter-down', function (e) {
                var i = Number($("#" + e.target.id).index()) + 1, j = 1;
                $("#showRating li").html("");
                for (j = 1; j <= 5; j++) {
                    if (j <= i) $("#showRating li").append('<img class="star-fill" src="./images/star_focus.png" alt="">');
                    else $("#showRating li").append('<img class="star-empty" src="./images/star.png" alt="">');
                }
                ratingApi();
            });

            break;

        case "favorite_container":
            set_focus('favouriteData', 'fav_0');

            // When menu foucs
            $('#favouriteData').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY['My_Favorite'][i];
                set_top_banner();
            });

            $('#favouriteData').on('sn:enter-down', function (e) {
                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY['My_Favorite'][i];
                if (APP_DATA_ARRAY['My_Favorite'][i]["type"] == "M") {
                    $(".banner_back_color").addClass("banner_back_color_full");
                    $(".banner_back_img").addClass("banner_back_img_full");
                    show_detail_page();
                }
                else if (APP_DATA_ARRAY['My_Favorite'][i]["type"] == "S") getEpisodeData();

            });

            break;

        case "content_partner_container":
            set_focus('contentPartner', 'content_0');

            // When menu foucs
            $('#contentPartner').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY["data"][i];
            });

            $('#contentPartner').on('sn:enter-down', function (e) {
                change_screens("content_partner_detail_container");
                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY["data"][i];
                content_partner_details_page();
                $(".navbar_sidebar").hide();

            });

            break;

        case "content_partner_detail_container":
            set_focus('partner_detail_button', 'back_button');

            // When menu foucs
            $('#partner_detail_button').on('sn:focused', function (e) {
                PAGE_INDEX = TAB_INDEX = 11;
            });

            $('#back_button').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                change_screens("content_partner_container");
                $(".navbar_sidebar").show();
                SN.focus("contentPartner");
            });

            break;

        case "redeem_ppv_container":
            set_focus('redeem_code_container', 'redeem_input');

            // When menu foucs
            $('#redeem_code_container').on('sn:focused', function (e) {
                console.log("redeem_code_container focus...");
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
            });

            $('#redeem_button').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                var searchVal = $("#redeem_input").val();
                if (searchVal != "") {
                    getRedeemDetail();
                } else {
                    $("#redeem_error_message").text("Please Enter PPV Code.");
                    $("#redeem_error_message").show("slow");
                    setTimeout(function () {
                        $("#redeem_error_message").hide("slow");
                    }, 5000);
                }
            });

            break;

        case "redeem_ppv_details_container":
            set_focus('redeem_row_details', 'play_now_button');

            // When menu foucs
            $('#redeem_row_details').on('sn:focused', function (e) {
                console.log("redeem_code_container focus...");
                PAGE_INDEX = TAB_INDEX = 12;
            });

            $('#play_now_button').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                VOD_URL = APP_DATA_ARRAY['stream_url'];
                change_screens("video_container");
                load_video();
            });

            break;

        case "modal_subscription":
            set_focus('okModal', 'okButton');

            //When menu foucs
            $('#okModal').on('sn:focused', function (e) {
                console.log(" OK Modal focus...");
            });

            $('#okButton').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                show_hide_popups(false, "", "modal_subscription");
                SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM);
            });

            break;

        case "MSG":
            set_focus('subscription_msg', 'msgButton');
            console.log(" OK subscription_msg...");
            $('#msgButton').on('sn:enter-down', function (e) {
                console.log("contentPartner enter...");
                // $(".subscription_msg").hide();
                // SN.focus("#videoPlayer");
            });

            break;

            case "about_container":
                set_focus('about_inner', 'about_phase_0');
                console.log(" OK about_inner...");
                $('#about_phase_0').on('sn:focused', function (e)  {
                    console.log("about_inner enter...");
                    // $(".subscription_msg").hide();
                    // SN.focus("#videoPlayer");
                });
    
                break;

        case "account_container":
            set_focus('logout_exit_buttons', 'account_logout');

            // When menu foucs
            $('#logout_exit_buttons').on('sn:focused', function (e) {
                console.log("account_logout focus...");
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
            });

            $('#account_logout').on('sn:enter-down', function (e) {
                console.log("account_logout enter...");
                hide_show_modal(true, 'LOGOUT', APP_LOGOUT_MSG);

            });

            $('#account_exit').on('sn:enter-down', function (e) {
                console.log("account_exit enter...");
                hide_show_modal(true, 'EXIT', APP_EXIT_MSG);

            });

            $('#account_buy_subscription').on('sn:enter-down', function (e) {
                show_hide_popups(true, APP_MESSAGE[0], "modal_subscription");
            });

            $('#account_qrcode').on('sn:enter-down', function (e) {
                console.log("account_qrcode enter...");
                AccountQRCode();
            });

            break;

        case "account_qr_container":
            set_focus('account_qr_container', 'account_qrcode_button');

            // When menu foucs
            $('#account_qr_container').on('sn:focused', function (e) {
                console.log("account_qr_container focus...");
                PAGE_INDEX = TAB_INDEX = 13;
            });

            $('#account_qrcode_button').on('sn:enter-down', function (e) {
                console.log("account_qr_container enter...");
                $(".account_qr_container").removeClass("active").hide();
                $(".account_container").addClass("active").show();
                SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM);
            });

            break;

        case "result_box":
            set_focus('searchResult', 'search_0');

            // When menu foucs
            $('#searchResult').on('sn:focused', function (e) {
                console.log("search_0 focus...");
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                FIRST_PAGE_FOCUSED_ITEM = e.target.id;
            });

            $('#searchResult').on('sn:enter-down', function (e) {
                console.log("search_ enter...");
                var searchInputVal = $("#searchInputText").val();

                var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
                SELECTED_ITEM_DATA = APP_DATA_ARRAY["search"][i];
                if (APP_DATA_ARRAY["search"][i]["type"] == "M") {
                    console.log("show_detail_page", APP_DATA_ARRAY["search"][i]["type"]);
                    $(".banner_back_color").addClass("banner_back_color_full");
                    $(".banner_back_img").addClass("banner_back_img_full");
                    show_detail_page();
                }
                else if (APP_DATA_ARRAY["search"][i]["type"] == "S") {
                    console.log("episode_screen_page", APP_DATA_ARRAY["search"][i]["type"]);
                    getEpisodeData();
                }
            });

            break;



        case "EXIT":
            set_focus('exitModal', 'noButton');

            $('#exitModal').on('sn:focused', function (e) {
                console.log("exitModal focus");
            });

            $('#noButton').on('sn:enter-down', function (e) {
                var name = $(".modal_container").attr("data-modal-name");
                console.log("no button enter");
                console.log('hide popup');
                if ($(".modal_container").hasClass("active") && MENU_INDEX !== 10 && name == "EXIT") {
                    if (MENU_INDEX == 0) $(".home_container").addClass("active");
                    else if (MENU_INDEX == 1) $(".search_container").addClass("active");
                    else if (MENU_INDEX == 2) $(".most_watched_container").addClass("active");
                    else if (MENU_INDEX == 3) $(".favorite_container").addClass("active");
                    else if (MENU_INDEX == 4) $(".watch_later_container").addClass("active");
                    else if (MENU_INDEX == 5) $(".content_partner_container").addClass("active");
                    else if (MENU_INDEX == 6) $(".redeem_ppv_container").addClass("active");
                    else if (MENU_INDEX == 7) $(".watch_ppv_container").addClass("active");
                    else if (MENU_INDEX == 8) $(".about_container").addClass("active");
                    else if (MENU_INDEX == 9) $(".contact_container").addClass("active");
                    show_left_side_bar();
                    console.log("menuList focus...");
                    SN.focus("menuList");
                    hide_show_modal(false, 'EXIT');
                } else if ($(".modal_container").hasClass("active") && MENU_INDEX == 10 && name == "EXIT") {
                    $(".account_container").addClass("active");
                    console.log("account_exit focus...");
                    hide_show_modal(false, 'EXIT');
                    SN.focus("logout_exit_buttons");
                } else if (MENU_INDEX == 0 && $(".home_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu0");
                } else if (MENU_INDEX == 1 && $(".search_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu1");
                }
                else if (MENU_INDEX == 2 && $(".most_watched_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu2");
                }
                else if (MENU_INDEX == 3 && $(".favorite_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu3");
                }
                else if (MENU_INDEX == 4 && $(".watch_later_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu4");
                }
                else if (MENU_INDEX == 5 && $(".content_partner_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu5");
                } else if (MENU_INDEX == 6 && $(".redeem_ppv_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu6");
                } else if (MENU_INDEX == 7 && $(".watch_ppv_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu7");
                }else if (MENU_INDEX == 8 && $(".about_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu8");
                }else if (MENU_INDEX == 9 && $(".contact_container").addClass("active")) {
                    $(".menu_container").addClass("wide_menu_container");
                    $(".nav_items").addClass("wide_nav_container");
                    $("#menuLogo").attr("src", "");
                    $("#menuLogo").attr("src", "../images/logo.png");
                    SN.focus("#menu9");
                }
            });

            $('#yesButton').on('sn:enter-down', function (e) {
                console.log('exit app');
                if ($(".modal_container").attr("data-modal-name") === "EXIT") {
                    tizen.application.getCurrentApplication().exit();
                }
            });
            break;

        case "LOGOUT": set_focus('exitModal', 'noButton');
            SN.focus("exitModal");

            $('#noButton').on('sn:enter-down', function (e) {
                var name = $(".modal_container").attr("data-modal-name");
                console.log('hide popup');
                if ($(".modal_container").hasClass("active") && MENU_INDEX == 10 && name == "LOGOUT") {
                    hide_show_modal(false, 'LOGOUT');
                    $(".account_container").addClass("active");
                    SN.focus("#account_logout");
                }
            });

            $('#yesButton').on('sn:enter-down', function (e) {
                console.log('logout app');
                // if(APP_LOGOUT_MSG)logoutApi();
                if ($(".modal_container").attr("data-modal-name") === "LOGOUT") {
                    localStorage.clear();
                    logoutApi();
                }
            });
            break;

        case "RETRY_CANCEL": set_focus('retryModal', 'retryButton');
            SN.focus("retryModal");

            $('#retryModal').off('sn:enter-down');
            $('#retryModal').on('sn:enter-down', function (e) {
                console.log("retryModal sn:enter-down");
                var modalName = "RETRY_CANCEL";
                hide_show_modal(false, modalName);
                if ($("#retryButton").is(":focus")) {
                    setTimeout(function () { load_video(); }, 1000);
                } else if ($("#cancelButton").is(":focus")) {
                    hide_show_modal(false, modalName);

                }
            });

            break;

        case "RETRY_EXIT": set_focus('retryModal', 'retryButton');
            SN.focus("retryModal");

            $('#retryModal').off('sn:enter-down');
            $('#retryModal').on('sn:enter-down', function (e) {
                console.log("retryModal sn:enter-down");
                var modalName = "RETRY_CANCEL";
                hide_show_modal(false, modalName);
                if ($("#retryButton").is(":focus")) {
                    console.log('hide popup');
                    hide_show_modal(false, 'EXIT');

                } else if ($("#cancelButton").is(":focus")) {
                    console.log('exit app');
                    closeVideo();
                    tizen.application.getCurrentApplication().exit();
                    // window.close();
                }
            });
            break;
    }
}

function set_focus(containerId, itemId) {
    console.log("set focus");
    var restrictVal = "self-first";
    if (containerId == "EXIT" || containerId == "RETRY_CANCEL") restrictVal = "self-only";

    SN.remove(containerId);
    SN.add({
        id: containerId,
        selector: '#' + containerId + ' .focusable',
        restrict: restrictVal,
        defaultElement: '#' + itemId,
        enterTo: 'last-focused'
    });
    SN.makeFocusable();
}

function set_category_list_focus(row_num) {
    console.log("set homepage list focus");
    var restrictVal = "self-first";
    var total = _.size(APP_DATA_ARRAY);
    for (i = row_num; i < total; i++) {
        var containerId = "home_list_" + i;
        var itemId = "row_" + i + "_0";
        console.log(itemId);
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
        SN.makeFocusable();
    }

    // When menu foucs
    $('[id^=row_]').on('sn:focused', function (e) {
        //console.log("home_list item focus...");
        PAGE_INDEX = TAB_INDEX = 0;
        FIRST_PAGE_FOCUSED_ITEM = e.target.id;
        var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + FIRST_PAGE_FOCUSED_ITEM).parent().attr("data-index")]["stream"][i];
        set_top_banner();
    });

    $('[id^=row_]').on('sn:enter-down', function (e) {
        //console.log("home_list item enter...");
        var i = $("#" + e.target.id).index(), j = $("#" + e.target.id).parent().attr("data-index");
        PAGE_INDEX = TAB_INDEX = 0;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[j]["stream"][i];
        $(".navbar_sidebar").hide();
        if (APP_DATA_ARRAY[j]["stream"][i]["type"] == "M") {
            $(".detail_banner_back_color").addClass("banner_back_color_full");
            $(".banner_back_img").addClass("banner_back_img_full");
            show_detail_page();
        }
        else if (APP_DATA_ARRAY[j]["stream"][i]["type"] == "S") {
            change_screens("");
            getEpisodeData();
        }
    });
}

function set_episode_list_focus() {
    console.log("set homepage list focus");
    var restrictVal = "self-first";
    var total = _.size(APP_EPISODE_DATA_ARRAY['show']['seasonsList']);
    for (i = 0; i < total; i++) {
        var containerId = "season_list_" + i;
        var itemId = "episode_" + i + "_0";
        console.log(itemId, containerId);
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
        SN.makeFocusable();
    }

    // When menu foucs
    $('[id^=episode_]').on('sn:focused', function (e) {
        console.log("episode_list item focus...");
        PAGE_INDEX = TAB_INDEX = 16;
        SECOND_PAGE_FOCUSED_ITEM = e.target.id;
        var i = $("#" + e.target.id).index();
        SELECTED_ITEM_DATA = APP_EPISODE_DATA_ARRAY['show']['seasonsList'][$("#" + e.target.id).parent().attr("data-index")]['episodesList'][i];
        console.log(SECOND_PAGE_FOCUSED_ITEM);
        episode_detail();
    });

    $('[id^=episode_]').on('sn:enter-down', function (e) {
        console.log("episode_list item enter...");
        var i = $("#" + SECOND_PAGE_FOCUSED_ITEM).index();
        SELECTED_ITEM_DATA = APP_EPISODE_DATA_ARRAY['show']['seasonsList'][$("#" + e.target.id).parent().attr("data-index")]['episodesList'][i];
        SELECTED_VIDEO_INDEX = $("#" + e.target.id).index();
        episode_detail();
        show_detail_page();
    });
}


function set_most_watch_list_focus() {
    console.log("set_most_watch_list_focus");
    var restrictVal = "self-first";
    var total = _.size(APP_DATA_ARRAY);
    for (i = 0; i < total; i++) {
        var containerId = "most_watch_" + i;
        var itemId = "watch_" + i + "_0";
        console.log(itemId);
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
        SN.makeFocusable();
    }

    // When menu foucs
    $('[id^=most_watch_]').on('sn:focused', function (e) {
        console.log("watch_item focus...");
        PAGE_INDEX = TAB_INDEX = 2;
        FIRST_PAGE_FOCUSED_ITEM = e.target.id;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][$("#" + FIRST_PAGE_FOCUSED_ITEM).index()];
        set_top_banner();
    });

    $('[id^=most_watch_]').on('sn:enter-down', function (e) {
        console.log("watch_item enter...");
        PAGE_INDEX = TAB_INDEX = 2;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][$("#" + e.target.id).index()];
        if (SELECTED_ITEM_DATA["type"] == "M") {
            $(".detail_banner_back_color").addClass("banner_back_color_full");
            $(".banner_back_img").addClass("banner_back_img_full");
            show_detail_page();
        }
        else if (SELECTED_ITEM_DATA["type"] == "S") getEpisodeData();
    });
}

function set_watch_later_list_focus() {
    console.log("set_most_watch_list_focus");
    var restrictVal = "self-first";
    var total = _.size(APP_DATA_ARRAY);
    for (i = 0; i < total; i++) {
        var containerId = "later_content_" + i;
        var itemId = "row_later_" + i + "_0";
        console.log(itemId);
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
        SN.makeFocusable();
    }
    // When menu foucs
    $('[id^=later_content_]').on('sn:focused', function (e) {
        console.log("row_later_ item focus...");
        PAGE_INDEX = TAB_INDEX = 4;
        FIRST_PAGE_FOCUSED_ITEM = e.target.id;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][$("#" + FIRST_PAGE_FOCUSED_ITEM).index()];
        set_top_banner();

    });

    $('[id^=later_content_]').on('sn:enter-down', function (e) {
        console.log("row_later_ item enter...");
        var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
        PAGE_INDEX = TAB_INDEX = 4;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][i];
        if (APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][i]["type"] == "M") {
            $(".detail_banner_back_color").addClass("banner_back_color_full");
            $(".banner_back_img").addClass("banner_back_img_full");
            console.log("show_detail_page", APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][i]["type"]);
            show_detail_page();
        }
        else if (APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][i]["type"] == "S") {
            console.log("episode_screen_page", APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["stream"][i]["type"]);
            getEpisodeData();
        }
    });
}

function set_watch_ppv_list_focus(row_num) {
    console.log("set watch ppv list focus");
    var restrictVal = "self-first";
    var total = _.size(APP_DATA_ARRAY);
    for (let i = row_num; i < total; i++) {
        var containerId = "watch_pp_list_" + i;
        var itemId = "watch_ppv_" + i + "_0";
        SN.remove(containerId);
        SN.add({
            id: containerId,
            selector: '#' + containerId + ' .focusable',
            restrict: restrictVal,
            defaultElement: '#' + itemId,
            enterTo: 'last-focused'
        });
        SN.makeFocusable();
    }

    // When menu foucs
    $('[id^=watch_ppv_]').on('sn:focused', function (e) {
        //console.log("watch ppv item focus...");
        PAGE_INDEX = TAB_INDEX = MENU_INDEX;
        FIRST_PAGE_FOCUSED_ITEM = e.target.id;
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + e.target.id).parent().attr("data-index")]["data"][$("#" + e.target.id).index()];
        set_watch_ppv_top_banner();
    });


    $('[id^=watch_ppv_]').on('sn:enter-down', function (e) {
        console.log("watch ppv item enter...");
        if (SELECTED_ITEM_DATA["buy_status"] == 'N') {
            show_hide_popups(true, APP_MESSAGE[0], "modal_subscription");
        } else if (SELECTED_ITEM_DATA["buy_status"] == 'Y') {
            getPPVContentDetail();
        }

    });
}