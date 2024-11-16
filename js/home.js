function parse_main_feed() {
    console.log("parse_main_feed");
    call_navigation_func();
}

function call_navigation_func() {
    manage_spatial_navigation("menu_container");

    manage_spatial_navigation("detail_container");

    manage_spatial_navigation("show_episode_detail_container");

    manage_spatial_navigation("search_container");

    manage_spatial_navigation("result_box");

    manage_spatial_navigation("content_partner_container");

    manage_spatial_navigation("redeem_ppv_container");

    manage_spatial_navigation("watch_ppv_container");

    manage_spatial_navigation("about_container");

    manage_spatial_navigation("contact_container");

    manage_spatial_navigation("account_container");

    manage_spatial_navigation("favorite_container");

    manage_spatial_navigation("rating_container");

    manage_spatial_navigation("account_qr_container");

    manage_spatial_navigation("modal_subscription");

}

function image_error(image) {
    image.onerror = "";
    return image.src = "../images/default_thumbnail.jpg";
}

function poster_image_error(image) {
    image.onerror = "";
    return image.src = "../images/default_poster.jpg";
}

function selected_menu_data() {
    switch (MENU_INDEX) {
        case 0:
            if (!$(".home_container").hasClass("active")) {
                getHomeData();
            } else SN.focus("home_list_0");
            break;
        case 1:
            if (!$(".search_container").hasClass("active")) {
                $("#searchInputText").val('');
                $("#searchResult").html("");
                change_screens("search_container");
                SN.focus("#searchInputText");
            } else SN.focus("#searchInputText");
            break;
        case 2:
            if (!$(".most_watched_container").hasClass("active")) {
                mostWatchedData();
            } else SN.focus("most_watch_0");
            break;
        case 3:
            if (!$(".favorite_container").hasClass("active")) {
                favouriteData();
            } else SN.focus("#fav_0");
            break;
        case 4:
            if (!$(".watch_later_container").hasClass("active")) {
                watchLaterData();
            } else SN.focus("later_content_0");
            break;
        case 5:
            if (!$(".content_partner_container").hasClass("active")) {
                getContentPartnerData();
            } else SN.focus("#content_0");
            break;
        case 6:
            if (!$(".redeem_ppv_container").hasClass("active")) {
                $(".navbar_sidebar").show();
                $("#redeem_input").val('');
                change_screens("redeem_ppv_container");
                SN.focus("redeem_code_container");
            } else SN.focus("redeem_code_container");
            break;
        case 7:
            if (!$(".watch_ppv_container").hasClass("active")) {
                $(".navbar_sidebar").show();
                getWatchPPVData();
            } else SN.focus("watch_pp_list_0");
            break;
        case 8:
            if (!$(".about_container").hasClass("active")) {
                $(".navbar_sidebar").show();
                getAboutData();
            } else SN.focus("#about_phase_0");
            break;
        case 9:
            if (!$(".contact_container").hasClass("active")) {
                $(".navbar_sidebar").show();
                $(".navbar_sidebar").addClass("wide_nav_container");
                getContactData();
            }
            break;
        case 10:
            if (!$(".account_container").hasClass("active")) {
                account_details();
                if (localStorage.getItem("subscription_status") == "ACTIVE" && localStorage.getItem("days_left") == "0") {
                    $(".show_qr_code").hide();
                    $(".buy_subscription ").show();
                }
            } else SN.focus("#account_logout");
            break;
        default:
            console.log("default case executed.");
            break;
    }
}

function setHomePageData(index) {
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalItem = _.size(APP_DATA_ARRAY[index]['stream']);

    if (index == 0) $("#homeList").html("");

    str += '<div class="list_row">';
    str += '<h2 class="list_heading">' + APP_DATA_ARRAY[index]['cat_name'] + '</h2>';
    str += '<div class="video_listing">';
    str += '<ul class="listing_inner" id="home_list_' + index + '" data-index="' + index + '" >';

    for (var i = 0; i < totalItem; i++) {
        var upThumb = "images/like.png",
            downThumb = "images/dislike.png",
            heartImg = "images/empty_heart.png";
        id = ' id = "row_' + index + '_' + i + '"';

        upFocus = ' data-sn-up="null" ';
        downFocus = ' data-sn-down="null" ';

        if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
        else rightFocus = ' data-sn-right="#row_' + index + '_' + (i + 1) + '" ';

        if (i == 0) leftFocus = ' data-sn-left="#menu0"';
        else leftFocus = ' data-sn-left="#row_' + index + '_' + (i - 1) + '" ';


        if (APP_DATA_ARRAY[index]['stream'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
        if (APP_DATA_ARRAY[index]['stream'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
        if (APP_DATA_ARRAY[index]['stream'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";


        str += '<li class="thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
        if (APP_DATA_ARRAY[index]['stream'][i]["type"] == "M") str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[index]['stream'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[index]['stream'][i]["stream_title"] + '">';
        else if (APP_DATA_ARRAY[index]['stream'][i]["type"] == "S") str += '<img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[index]['stream'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[index]['stream'][i]["show_name"] + '">';
        str += '<div class="thumb_icon">';
        str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[index]['stream'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[index]['stream'][i]["total_dislike"]) + '</p></div>';
        str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
        str += '</div>';
        str += '</li>';

    }
    NAVIGATION_INDEX++;

    str += '</div>';
    str += '</div>';
    str += '</ul>';


    if (index == 3) {
        $(".navbar_sidebar").show();
        $(".main_container").show();
        change_screens("home_container");
        $("#loader").hide();
        $("#homeList").append(str);
        set_category_list_focus(0);
        SN.focus("home_list_0");
        var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index();
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[$("#" + FIRST_PAGE_FOCUSED_ITEM).parent().attr("data-index")]["stream"][i];
        set_top_banner();

    }
    else $("#homeList").append(str);
    // if (index == 0) set_category_list_focus(0);
    index = index + 1;
    if (index < _.size(APP_DATA_ARRAY)) setHomePageData(index);

}


function show_detail_page() {
    console.log("show_detail_page");
    rating_star();
    banner_details_page();
    if (SELECTED_ITEM_DATA["isLiked"] == "Y") {
        console.log("like btn...");
        $("#like_btn_img").attr("src", "images/thumbs_up.png");
        $("#dislike_btn_img").attr("src", "images/dislike.png");
    }
    else if (SELECTED_ITEM_DATA["isLiked"] == "N") {
        console.log("dislike btn...");
        $("#dislike_btn_img").attr("src", "images/thumbs_down.png");
        $("#like_btn_img").attr("src", "images/like.png");
    }
    else {
        $("#dislike_btn_img").attr("src", "images/dislike.png");
        $("#like_btn_img").attr("src", "images/like.png");
    }

    if (SELECTED_ITEM_DATA["my_rate"] > "0") {
        var str = '';
        console.log("like btn...");
        if (SELECTED_ITEM_DATA["my_rate"] == "1") {
            str += '<li><img src="./images/star_focus.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""></li>'
        } else if (SELECTED_ITEM_DATA["my_rate"] == "2") {
            str += '<li><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""></li>'
        } else if (SELECTED_ITEM_DATA["my_rate"] == "3") {
            str += '<li><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""></li>'
        } else if (SELECTED_ITEM_DATA["my_rate"] == "4") {
            str += '<li><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star.png" alt=""></li>'
        } else if (SELECTED_ITEM_DATA["my_rate"] == "5") {
            str += '<li><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""><img src="./images/star_focus.png" alt=""></li>'
        }

        $("#showRating").html('');
        $("#showRating").html(str);
    } else $("#showRating").html('<li><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""><img src="./images/star.png" alt=""></li>');

    $(".banner_back_color").addClass("banner_back_color_full");
    $(".banner_back_img").addClass("banner_back_img_full");
    setTimeout(function () {
        change_screens("detail_container");
        SN.focus("#play_btn");
    }, 100);
}

function rating_star() {
    console.log("rating star...");
    var finalInt, str = "", converted;

    if (PAGE_INDEX == 17) converted = parseFloat(SELECTED_ITEM_DATA["user_ratings"]); // Make sure we have a number
    else converted = parseFloat(SELECTED_ITEM_DATA["total_ratings"]), console.log("total_ratings");
    var decimal = (converted - parseInt(converted, 10));
    decimal = Math.round(decimal * 10);
    console.log(decimal);

    if (decimal == 5) { finalInt = (parseInt(converted, 10) + 0.5); }
    else if ((decimal < 3) || (decimal > 7)) finalInt = Math.round(converted);
    else finalInt = (parseInt(converted, 10) + 0.5);

    var rem = finalInt % 1;
    finalInt = Math.trunc(finalInt);

    for (var j = 0; j < finalInt; j++) {
        str += '<li value="1"><img src="./images/star_red_fill.png" alt=""></li>'
    }
    if (rem) str += '<li value="1"><img src="./images/star_red_half.png" alt=""></li>';

    $("#totalRatingList").html("");
    $("#totalRatingList").html(str);

    var starCount = $("#totalRatingList li").length;
    if (starCount < 5) {
        for (var i = 0; i < (5 - starCount); i++) {
            $("#totalRatingList").append('<li value="1"><img src="./images/star_red.png" alt=""></li>');
        }
    }
    if (SELECTED_ITEM_DATA["total_ratings"] || SELECTED_ITEM_DATA["user_ratings"]) $(".rating_star_div").show();
    else if (SELECTED_ITEM_DATA["total_ratings"] == "undefined") $(".rating_star_div").hide();
}


function episode_screen_page() {
    console.log("show_container");

    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalSeason = _.size(APP_EPISODE_DATA_ARRAY['show']['seasonsList']);

    for (var j = 0; j < totalSeason; j++) {
        str += '<div class="list_row">';
        str += '<h2 class="tvshow_heading">' + APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['season_name'] + '</h2>';
        str += '<div class="tvshow_video_listing">';
        str += '<ul class="tvshow_listing_inner" id="season_list_' + j + '" data-index="' + j + '" >';

        var totalEpisode = _.size(APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList']);
        for (var i = 0; i < totalEpisode; i++) {
            upThumb = "images/like.png";
            downThumb = "images/dislike.png";
            heartImg = "images/empty_heart.png";
            id = ' id = "episode_' + j + '_' + i + '"';

            upFocus = ' data-sn-up="null"';
            downFocus = ' data-sn-down="null"';

            if (i == (totalEpisode - 1)) rightFocus = ' data-sn-right="null"';
            else rightFocus = ' data-sn-right="#episode_' + j + '_' + (i + 1) + '" ';

            if (i == 0) leftFocus = ' data-sn-left="null"';
            else leftFocus = ' data-sn-left="#episode_' + j + '_' + (i - 1) + '" ';

            if (APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
            if (APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
            if (APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";


            str += '<li class="thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
            str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["stream_thumbnail_1"] + '" alt="' + APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["show_name"] + '">';
            str += '<div class="thumb_icon">';
            str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_EPISODE_DATA_ARRAY['show']['seasonsList'][j]['episodesList'][i]["total_dislike"]) + '</p></div>';
            str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
            str += '</div>';
            str += '</li>';

        }
        NAVIGATION_INDEX++;
        str += '</ul>';
        str += '</div>';
        str += '</div>';
    }

    $("#loader").hide();
    change_screens("show_container");
    $("#episodeList").html("");
    $("#episodeList").html(str);
    set_episode_list_focus();
    SN.focus("season_list_0");
    episode_detail();

}

function request_search_results() {
    console.log('search results request...');
    searchText = get_searched_text();
    if (searchText != "") {
        getSearchData();
    } else {
        console.log('input text enter');
        $(".result_not_found").hide();
        $("#searchInputText").attr("placeholder", "Please enter text here.").addClass("empty");
        SN.focus('search_bar');
    }
}

function get_searched_text() {
    return $.trim($('#searchInputText').val());
}

function set_search_result() {
    console.log("set_search_result");
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalItem = _.size(APP_DATA_ARRAY['search']);


    if (_.size(APP_DATA_ARRAY['search']) > 0) {
        str += '<h2 class="search_heading search_result">Search Result</h2>';
        str += '<div class="result_box">';
        str += '<ul class="result_box_inner">';


        for (var i = 0; i < totalItem; i++) {
            upThumb = "images/like.png";
            downThumb = "images/dislike.png";
            heartImg = "images/empty_heart.png";
            id = ' id = "search_' + i + '"';
            if (i < 7) upFocus = 'data-sn-up="#searchInputText"';
            else upFocus = ' data-sn-up="#search_' + (i - 7) + '"';

            if (i == totalItem) downFocus = ' data-sn-down="null"';
            else downFocus = ' data-sn-down="#search_' + (i + 7) + '"';

            if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
            else rightFocus = ' data-sn-right="#search_' + (i + 1) + '" ';

            if (i % 7 == 0) leftFocus = ' data-sn-left="#menu1"';
            else leftFocus = ' data-sn-left="#search_' + (i - 1) + '" ';

            if (APP_DATA_ARRAY['search'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";

            if (APP_DATA_ARRAY['search'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";

            if (APP_DATA_ARRAY['search'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";

            str += '<li class="search_thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
            if (APP_DATA_ARRAY['search'][i]["type"] == "M") str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="search_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY['search'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY['search'][i]["stream_title"] + '">';
            else if (APP_DATA_ARRAY['search'][i]["type"] == "S") str += '<img class="search_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY['search'][i]["show_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY['search'][i]["show_name"] + '">';
            str += '<div class="thumb_icon">';
            str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY['search'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY['search'][i]["total_dislike"]) + '</p></div>';
            str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
            str += '</div>';
            str += '</li>';

        }
        NAVIGATION_INDEX++;

        str += '</div>';
        str += '</div>';
        str += '</ul>';

        $(".search_container").show();
        $("#msg_box").empty();
        $("#searchResult").show();
        $("#loader").hide();
        $("#searchResult").html(str);
        SN.focus("searchResult");
    } else {
        console.log("Result not found");
        $("#loader").hide();
        $("#searchResult").hide();
        $("#msg_box").css("display", "block");
        $("#msg_box").html("<h2 class='no_record_found'>No record found.</h2>");
    }

}

function content_partner_screen_page() {
    console.log("content_partner_screen_page");

    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    str += '<h2 class="content_heading">Content Partners</h2>';
    str += '<div class="content_partners_box">';
    str += '<ul class="partners_list" id="content_list' + '" >';

    var totalContent = _.size(APP_DATA_ARRAY['data']);
    for (var i = 0; i < totalContent; i++) {
        id = ' id = "content_' + i + '"';

        if (i == 0) upFocus = ' data-sn-up="null"';
        else upFocus = ' data-sn-up="#content_' + (i - 6) + '" ';

        downFocus = ' data-sn-down="#content_' + (i + 6) + '" ';


        if (i == (totalContent - 1)) rightFocus = ' data-sn-right="null"';
        else rightFocus = ' data-sn-right="#content_' + (i + 1) + '" ';

        if (i % 6 == 0) leftFocus = ' data-sn-left="#menu5"';
        else leftFocus = ' data-sn-left="#content_' + (i - 1) + '" ';

        str += '<li class="partners_logo_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + '>';
        str += '<div class="partnerImgBox"><img class="partner_logo_image" src="' + APP_DATA_ARRAY['data'][i]['image_url'] + '"  onerror="this.onerror=null;this.src=`/images/app_logo.jpg`"  alt=""></div>';
        str += '<div class="logo_text_box">';
        str += '<div class="logo_title">' + APP_DATA_ARRAY['data'][i]['User_name'] + '</div>';
        str += '<div class="logo_count">' + APP_DATA_ARRAY['data'][i]['totstream'] + '</div>';
        str += '</div>';
        str += '</li>';

    }
    NAVIGATION_INDEX++;
    str += '</ul>';
    str += '</div>';
    if (MENU_INDEX == 5) {
        change_screens("content_partner_container");
        $("#loader").hide();
        $("#contentPartner").html("");
        $("#contentPartner").html(str);
        SN.focus("#content_0");
    }

}

function account_details() {
    console.log("account_details");
    $("#account_name").text(localStorage.getItem('full_name'));
    $("#account_mail").text(localStorage.getItem('email'));
    $("#account_sub").text(localStorage.getItem('plan_name'));
    if (localStorage.getItem("subscription_status") == "ACTIVE" && localStorage.getItem("days_left") != "0") {
        $("#subscription_period").html('<span class="about account_exp" id="account_pre">' + localStorage.getItem('previous_payment') + '</span><span class="account_to">&nbsp;&nbsp;to&nbsp;</span><span class="about account_exp" id="account_exp">' + localStorage.getItem('next_payment') + '</span>');
    } else $("#subscription_period").html('<span class="about account_exp" id="account_pre">NOT SUBSCRIBED</span>');
    if (MENU_INDEX == 10) change_screens("account_container"); SN.focus("#account_logout");
}

function mostWatchedPageData() {
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalContent = _.size(APP_DATA_ARRAY);
    console.log(totalContent);

    for (var j = 0; j < totalContent; j++) {
        str += '<div class="list_row">';
        str += '<h2 class="list_heading">' + APP_DATA_ARRAY[j]['cat_name'] + '</h2>';
        str += '<div class="video_listing">';
        str += '<ul class="listing_inner" id="most_watch_' + j + '" data-index="' + j + '" >';

        var totalItem = _.size(APP_DATA_ARRAY[j]['stream']);
        for (var i = 0; i < totalItem; i++) {
            upThumb = "images/like.png";
            downThumb = "images/dislike.png";
            heartImg = "images/empty_heart.png";
            id = ' id = "watch_' + j + '_' + i + '"';

            upFocus = ' data-sn-up="null" ';
            downFocus = ' data-sn-down="null" ';

            if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
            else rightFocus = ' data-sn-right="#watch_' + j + '_' + (i + 1) + '" ';

            if (i == 0) leftFocus = ' data-sn-left="#menu2"';
            else leftFocus = ' data-sn-left="#watch_' + j + '_' + (i - 1) + '" ';

            if (APP_DATA_ARRAY[j]['stream'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
            if (APP_DATA_ARRAY[j]['stream'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
            if (APP_DATA_ARRAY[j]['stream'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";


            str += '<li class="thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
            if (APP_DATA_ARRAY[j]['stream'][i]["type"] == "M") str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[j]['stream'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[j]['stream'][i]["stream_title"] + '">';
            else if (APP_DATA_ARRAY[j]['stream'][i]["type"] == "S") str += '<img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[j]['stream'][i]["show_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[j]['stream'][i]["show_name"] + '">';
            str += '<div class="thumb_icon">';
            str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[j]['stream'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[j]['stream'][i]["total_dislike"]) + '</p></div>';
            str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
            str += '</div>';
            str += '</li>';

        }
        NAVIGATION_INDEX++;

        str += '</div>';
        str += '</div>';
        str += '</ul>';

        $("#loader").hide();
        $(".main_container").show();
        change_screens("most_watched_container");
        $("#mostwatchlater").html(str);
        SELECTED_ITEM_DATA = APP_DATA_ARRAY[0]["stream"][0];
        set_top_banner();
        set_most_watch_list_focus(0);
        SN.focus("most_watch_0");
    }
}

function favouritePageData() {
    console.log("favouritePageData");
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalItem = _.size(APP_DATA_ARRAY['My_Favorite']);

    if (_.size(APP_DATA_ARRAY['My_Favorite']) > 0) {
        str += '<div class="list_row">';
        str += '<h2 class="list_heading">My Favourites</h2>';
        str += '<div class="video_listing">';
        str += '<ul class="favourite_listing_inner" id="favourite_list_">';

        for (var i = 0; i < totalItem; i++) {
            upThumb = "images/like.png";
            downThumb = "images/dislike.png";
            heartImg = "images/empty_heart.png";
            id = ' id = "fav_' + i + '"';

            if (i < 7) upFocus = 'data-sn-up="null"';
            else upFocus = ' data-sn-up="#fav_' + (i - 7) + '"';

            if (i == totalItem) downFocus = ' data-sn-down="null"';
            else downFocus = ' data-sn-down="#fav_' + (i + 7) + '"';

            if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
            else rightFocus = ' data-sn-right="#fav_' + (i + 1) + '" ';

            if (i % 7 == 0) leftFocus = ' data-sn-left="#menu3"';
            else leftFocus = ' data-sn-left="#fav_' + (i - 1) + '" ';


            if (APP_DATA_ARRAY['My_Favorite'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
            if (APP_DATA_ARRAY['My_Favorite'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
            if (APP_DATA_ARRAY['My_Favorite'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";

            str += '<li class="favourite_thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
            if (APP_DATA_ARRAY['My_Favorite'][i]["type"] == "M") str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY['My_Favorite'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY['My_Favorite'][i]["stream_title"] + '">';
            else if (APP_DATA_ARRAY['My_Favorite'][i]["type"] == "S") str += '<img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY['My_Favorite'][i]["show_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY['My_Favorite'][i]["show_name"] + '">';
            str += '<div class="thumb_icon">';
            str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY['My_Favorite'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY['My_Favorite'][i]["total_dislike"]) + '</p></div>';
            str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
            str += '</div>';
            str += '</li>';

        }
        NAVIGATION_INDEX++;

        str += '</div>';
        str += '</div>';
        str += '</ul>';

        $(".main_container").show();
        if (MENU_INDEX == 3) {
            $("#favouriteData").html(str);
            change_screens("favorite_container");
            $(".navbar_sidebar").show();
            SELECTED_ITEM_DATA = APP_DATA_ARRAY['My_Favorite'][0];
            set_top_banner();
            SN.focus("#fav_0");
        }
    } else {
        $("#favorite_detail_row").html("");
        $("#favouriteData").html("");
        $("#favorite_detail_row").html('<span class="content_not_found">Content not found.</span>');
        if (MENU_INDEX == 3) {
            PAGE_INDEX = TAB_INDEX = MENU_INDEX;
            change_screens("favorite_container");
            $(".navbar_sidebar").show();
            SN.focus("menuList");
        }
    }
}

function set_top_banner() {
    //console.log("set_top_banner.....");
    var str = '';
    streamGenre = SELECTED_ITEM_DATA["genre"],
        streamDuration = SELECTED_ITEM_DATA["stream_duration"],
        streamQuality = SELECTED_ITEM_DATA["quality"],
        streamTitle = SELECTED_ITEM_DATA["stream_title"],
        streamDescription = SELECTED_ITEM_DATA["stream_long_description"],
        streamshortDescription = SELECTED_ITEM_DATA["stream_short_description"],
        showTitle = SELECTED_ITEM_DATA["show_name"],
        showDescription = SELECTED_ITEM_DATA["show_short_description"],
        streamDirector = SELECTED_ITEM_DATA["director_name"],
        streamActor = SELECTED_ITEM_DATA["actor_name"],
        streamLanguage = SELECTED_ITEM_DATA["language"],
        streamYear = SELECTED_ITEM_DATA["stream_production_year"],
        showYear = SELECTED_ITEM_DATA["show_production_year"],
        totalViews = SELECTED_ITEM_DATA["total_views"],
        streamPoster = SELECTED_ITEM_DATA["stream_thumbnail_2"],
        showPoster = SELECTED_ITEM_DATA["show_thumbnail_2"];

    if (SELECTED_ITEM_DATA["type"] == "M") {
        var totalhours = (Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) > 0 ? Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " : "") + ((SELECTED_ITEM_DATA["stream_duration"] % 60) > 0 ? (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min " : "");
    }
    str += '<div class="banner_detail_box">';
    str += '<ul class="movie_detail_row" id="movie_detail_row">';

    if (typeof streamGenre != "undefined") str += '<li class="movie_detail movie_category">' + streamGenre + '</li>';
    if (typeof totalhours != "undefined") str += '<li class="movie_detail movie_time">' + totalhours + '</li>';
    if (typeof streamQuality != "undefined") str += '<li class="movie_detail movie_quality"><div class="hd">' + streamQuality + '</div></li>';
    str += '</ul>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamTitle != "undefined") str += '<div class="movie_div"><p class="movie_name">' + streamTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof streamshortDescription != "undefined") str += '<div class="main_bxx"><div class="movie_disc">' + streamshortDescription + '</div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showTitle != "undefined") str += '<div class="movie_div"><p class="movie_name">' + showTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof showDescription != "undefined") str += '<div class="main_bxx"><div class="movie_disc">' + showDescription + '</div>';
    }

    if (typeof streamDirector != "undefined") str += '<div class="director"><span class="title">Directed by:</span><span class="detail" id="streamDirector">' + streamDirector + '</span></div>';
    if (typeof streamActor != "undefined") str += '<div class="cast"><span class="title">Cast:</span><span class="detail">' + streamActor + '</span></div>';
    if (typeof streamLanguage != "undefined") str += '<div class="Language"><span class="title">Language:</span><span class="detail">' + streamLanguage + '</span></div>';
    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamYear != "undefined") str += '<div class="releas"><span class="title">Initial release:</span><span class="detail">' + streamYear + '</span></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showYear != "undefined") str += '<div class="releas"><span class="title">Initial release:</span><span class="detail">' + showYear + '</span></div>';
    }

    if (typeof totalViews != "undefined") str += '<div class="Watched"><span class="title">Watched:</span><span class="detail whached">' + totalViews + '</span></div>';
    str += '<div class="Subscription"><span class="title">Subscription:</span><span class="plan_name">' + localStorage.getItem('plan_name') + '</span></div></div></div>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S" && !PAGE_INDEX == 0) {
        str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + showPoster + '" alt="poster"></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S" && PAGE_INDEX == 0) {
        str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    }

    if (MENU_INDEX == 0) {
        $("#banner_detail").html("");
        $("#banner_detail").html(str);
    }
    else if (MENU_INDEX == 3) {
        $("#favorite_detail_row").html("");
        $("#favorite_detail_row").html(str);
    }
    else if (MENU_INDEX == 2) {
        $("#mw_detail_row").html("");
        $("#mw_detail_row").html(str);
    }
    else if (MENU_INDEX == 4) {
        $("#watch_later_detail_row").html("");
        $("#watch_later_detail_row").html(str);
    }
}

function set_watch_ppv_top_banner() {
    //console.log("set_watch_ppv_top_banner.....");
    var str = '';
    streamGenre = SELECTED_ITEM_DATA["genre"],
        streamDuration = SELECTED_ITEM_DATA["stream_duration"],
        streamTitle = SELECTED_ITEM_DATA["stream_title"],
        streamDescription = SELECTED_ITEM_DATA["stream_long_description"],
        streamDirector = SELECTED_ITEM_DATA["director"],
        streamActor = SELECTED_ITEM_DATA["actor"],
        streamLanguage = SELECTED_ITEM_DATA["LANGUAGE"],
        streamYear = SELECTED_ITEM_DATA["stream_production_year"],
        showYear = SELECTED_ITEM_DATA["show_production_year"],
        streamPoster = SELECTED_ITEM_DATA["stream_poster"],
        showPoster = SELECTED_ITEM_DATA["stream_poster"];
    var totalhours = (Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) > 0 ? Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " : "") + ((SELECTED_ITEM_DATA["stream_duration"] % 60) > 0 ? (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min " : "");
    // var totalhours = Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " + (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min ";
    str += '<div class="banner_detail_box">';
    str += '<ul class="movie_detail_row" id="movie_detail_row">';

    str += '<li class="movie_detail movie_category">' + streamGenre + '</li>';
    str += '<li class="movie_detail movie_time">' + totalhours + '</li>';
    str += '</ul>';
    str += '<div class="movie_div"><p class="movie_name">' + streamTitle + '</p><span class="home_reddot"></span></div>';
    str += '<div class="main_bxx"><div class="movie_disc">' + streamDescription + '</div>';

    str += '<div class="director"><span class="title">Directed by:</span><span class="detail" id="streamDirector">' + streamDirector + '</span></div>';
    str += '<div class="cast"><span class="title">Cast:</span><span class="detail">' + streamActor + '</span></div>';
    str += '<div class="Language"><span class="title">Language:</span><span class="detail">' + streamLanguage + '</span></div>';
    str += '<div class="releas"><span class="title">Initial release:</span><span class="detail">' + streamYear + '</span></div>';
    str += '<div class="Subscription"><span class="title">Subscription:</span><span class="plan_name">' + localStorage.getItem('plan_name') + '</span></div></div></div>';
    str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';


    if (MENU_INDEX == 7) {
        $("#watch_banner_detail").html("");
        $("#watch_banner_detail").html(str);
    }

}


function banner_details_page() {
    //console.log("set_top_banner.....");
    var str = '';
    streamGenre = SELECTED_ITEM_DATA["genre"],
        streamDuration = SELECTED_ITEM_DATA["stream_duration"],
        streamQuality = SELECTED_ITEM_DATA["quality"],
        streamTitle = SELECTED_ITEM_DATA["stream_title"],
        streamDescription = SELECTED_ITEM_DATA["stream_long_description"],
        showTitle = SELECTED_ITEM_DATA["show_name"],
        showDescription = SELECTED_ITEM_DATA["show_short_description"],
        streamDirector = SELECTED_ITEM_DATA["director_name"],
        streamActor = SELECTED_ITEM_DATA["actor_name"],
        streamLanguage = SELECTED_ITEM_DATA["language"],
        streamYear = SELECTED_ITEM_DATA["stream_production_year"],
        showYear = SELECTED_ITEM_DATA["show_production_year"],
        totalViews = SELECTED_ITEM_DATA["total_views"],
        streamPoster = SELECTED_ITEM_DATA["stream_thumbnail_2"],
        showPoster = SELECTED_ITEM_DATA["show_thumbnail_2"];

    str += '<div class="top_detail_box">';
    str += '<ul class="banner_detail_row" id="movie_detail_row">';
    if (SELECTED_ITEM_DATA["type"] == "M") {
        var totalhours = (Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) > 0 ? Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " : "") + ((SELECTED_ITEM_DATA["stream_duration"] % 60) > 0 ? (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min " : "");
    }
    // var totalhours = Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " + (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min ";
    if (typeof streamGenre != "undefined") str += '<li class="movie_detail movie_category">' + streamGenre + '</li>';
    if (typeof totalhours != "undefined") str += '<li class="movie_detail movie_time">' + totalhours + '</li>';
    if (typeof streamQuality != "undefined") str += '<li class="movie_detail movie_quality"><div class="hd">' + streamQuality + '</div></li>';
    str += '</ul>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamTitle != "undefined") str += '<div class="details_movie_div"><p class="movie_name">' + streamTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof streamDescription != "undefined") str += '<div class="details_main_bxx"><div class="details_movie_disc">' + streamDescription + '</div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showTitle != "undefined") str += '<div class="details_movie_div"><p class="movie_name">' + showTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof showDescription != "undefined") str += '<div class="details_main_bxx"><div class="details_movie_disc">' + showDescription + '</div>';
    }

    if (typeof streamDirector != "undefined") str += '<div class="details_director"><span class="details_title">Directed by:&nbsp;</span><span class="detail" id="streamDirector">' + streamDirector + '</span></div>';
    if (typeof streamActor != "undefined") str += '<div class="details_cast"><span class="details_title">Cast:&nbsp;</span><span class="detail">' + streamActor + '</span></div>';
    if (typeof streamLanguage != "undefined") str += '<div class="details_Language"><span class="details_title">Language:&nbsp;</span><span class="detail">' + streamLanguage + '</span></div>';
    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamYear != "undefined") str += '<div class="details_releas"><span class="details_title">Initial release:&nbsp;</span><span class="detail">' + streamYear + '</span></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showYear != "undefined") str += '<div class="details_releas"><span class="details_title">Initial release:&nbsp;</span><span class="detail">' + showYear + '</span></div>';
    }

    if (typeof totalViews != "undefined") str += '<div class="details_Watched"><span class="details_title">Watched:&nbsp;</span><span class="detail whached" id="watched_details">' + totalViews + '</span></div>';
    str += '<div class="details_Subscription"><span class="details_title">Subscription:&nbsp;</span><span class="plan_name">' + localStorage.getItem('plan_name') + '</span></div></div></div>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        str += '<div class="top_banner_background"><img class="detail_banner_back_color" src="images/detail_background_color.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S" && !PAGE_INDEX == 0) {
        str += '<div class="top_banner_background"><img class="detail_banner_back_color" src="images/detail_background_color.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + showPoster + '" alt="poster"></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S" && PAGE_INDEX == 0) {
        str += '<div class="top_banner_background"><img class="detail_banner_back_color" src="images/detail_background_color.png" alt=""><img class="banner_back_img" id="streamPoster" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    }

    $("#details_banner_detail").html("");
    $("#details_banner_detail").html(str);

}

function hide_left_side_bar() {
    // $(".menu_container").removeClass("wide_menu_container");
    // $(".nav_items").removeClass("wide_nav_container");
    // $("#menuLogo").addClass("menu_img_small");
    // $("#menuLogo").attr("src", "");
    // $("#menuLogo").attr("src", "../images/menu_icon.png");
    // $(".selected-menu").removeClass("selected-menu");
    // $("#menu" + MENU_INDEX).addClass("selected-menu");
}

function show_left_side_bar() {
    console.log("show_left_side_bar");
    $("#menuLogo").removeClass("menu_img_small");
    $(".menu_container").addClass("wide_menu_container");
    $(".nav_items").addClass("wide_nav_container");
    $("#menuLogo").attr("src", "");
    $("#menuLogo").attr("src", "../images/logo.png");
    SN.focus("menuList");
}

function setWatchLaterPageData() {
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalContent = _.size(APP_DATA_ARRAY);
    console.log(totalContent);

    for (var j = 0; j < totalContent; j++) {
        if (_.size(APP_DATA_ARRAY[j]) > 0 && APP_DATA_ARRAY[j]["count"] !== 0) {
            str += '<div class="list_row">';
            str += '<h2 class="list_heading">' + APP_DATA_ARRAY[j]['cat_name'] + '</h2>';
            str += '<div class="video_listing">';
            str += '<ul class="listing_inner" id="later_content_' + j + '" data-index="' + j + '" >';

            var totalItem = _.size(APP_DATA_ARRAY[j]['stream']);
            for (var i = 0; i < totalItem; i++) {
                upThumb = "images/like.png";
                downThumb = "images/dislike.png";
                heartImg = "images/empty_heart.png";
                id = ' id = "row_later_' + j + '_' + i + '"';

                upFocus = ' data-sn-up="null" ';
                downFocus = ' data-sn-down="null" ';

                if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
                else rightFocus = ' data-sn-right="#row_later_' + j + '_' + (i + 1) + '" ';

                if (i == 0) leftFocus = ' data-sn-left="#menu4"';
                else leftFocus = ' data-sn-left="#row_later_' + j + '_' + (i - 1) + '" ';

                if (APP_DATA_ARRAY[j]['stream'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
                if (APP_DATA_ARRAY[j]['stream'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
                if (APP_DATA_ARRAY[j]['stream'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";

                str += '<li class="thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
                if (APP_DATA_ARRAY[j]['stream'][i]["type"] == "M") str += '<img class="fav_icon" src="' + heartImg + '" alt="heart_icon"><img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[j]['stream'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[j]['stream'][i]["stream_title"] + '">';
                else if (APP_DATA_ARRAY[j]['stream'][i]["type"] == "S") str += '<img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[j]['stream'][i]["show_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[j]['stream'][i]["show_name"] + '">';
                str += '<div class="thumb_icon">';
                str += '<div class="like_dislike_icon_box"><p class="like like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[j]['stream'][i]["total_like"]) + '</p><p class="dislike like_dislike_count">' + likeDislikeCount(APP_DATA_ARRAY[j]['stream'][i]["total_like"]) + '</p></div>';
                str += '<div class="thumb_icon_box"><img class="thumbs_up" src="' + upThumb + '" alt="Thumbs up"><img class="thumbs_down" src="' + downThumb + '" alt="Thumbs down"></div>';
                str += '</div>';
                str += '</li>';

            }
            NAVIGATION_INDEX++;

            str += '</div>';
            str += '</div>';
            str += '</ul>';

            $("#loader").hide();
            $("#watch_later_msg_box").hide();
            $(".main_container").show();
            if (MENU_INDEX == 4) {
                SELECTED_ITEM_DATA = APP_DATA_ARRAY[0]["stream"][0];
                if (PAGE_INDEX == 4) set_top_banner();
                change_screens("watch_later_container");
                $(".navbar_sidebar").show();
                $("#WatchLaterData").html(str);
                set_watch_later_list_focus();
                SN.focus("later_content_0");
            }
        } else {
            $("#watch_later_detail_row").html("");
            $("#WatchLaterData").html("");
            $("#watch_later_detail_row").html('<span class="content_not_found">Content not found.</span>');
            if (MENU_INDEX == 4) {
                PAGE_INDEX = TAB_INDEX = MENU_INDEX;
                change_screens("watch_later_container");
                $(".navbar_sidebar").show();
                SN.focus("menuList");
            }
        }
    }
}

function change_button_focus(id) {
    console.log("change_button_focus");
    if (id == 'play_btn') $("#" + id).find("img").attr("src", "./images/play_active.png");
    else $("#play_btn").find("img").attr("src", "images/play_icon.png");

    if (id == 'play_trailer') $("#" + id).find("img").attr("src", "./images/trailer_active.png");
    else $("#play_trailer").find("img").attr("src", "images/trailer_icon.png");

    if (id == 'add_favorites') {
        if (SELECTED_ITEM_DATA.isFavourite == "1") $("#" + id).find("img").attr("src", "./images/remove_favorite.png");
        else $("#" + id).find("img").attr("src", "./images/add_to_favorite_active.png");
    }
    else {
        if (SELECTED_ITEM_DATA.isFavourite == "1") $("#add_favorites").find("img").attr("src", "./images/remove_active.png");
        else $("#add_favorites").find("img").attr("src", "./images/add_to_favorite.png");
    }

    if (id == 'rate_now') $("#" + id).find("img").attr("src", "./images/rate_now_active.png");
    else $("#rate_now").find("img").attr("src", "images/rate_now.png");

    if (id == 'watchLater') {
        if (SELECTED_ITEM_DATA.isWatchlater == "1") $("#" + id).find("img").attr("src", "./images/watch_later_minus.png");
        else $("#" + id).find("img").attr("src", "./images/watch_later_plus.png");
    }
    else {
        if (SELECTED_ITEM_DATA.isWatchlater == "1") $("#watchLater").find("img").attr("src", "./images/watch_later_minus_active.png");
        else $("#watchLater").find("img").attr("src", "./images/watch_later_plus_active.png");
    }

}

function episode_detail() {
    console.log("episode_detail..........");

    var str = '';
    streamGenre = SELECTED_ITEM_DATA["genre"],
        streamDuration = SELECTED_ITEM_DATA["stream_duration"],
        streamQuality = SELECTED_ITEM_DATA["quality"],
        streamTitle = SELECTED_ITEM_DATA["stream_title"],
        streamDescription = SELECTED_ITEM_DATA["stream_long_description"],
        showTitle = SELECTED_ITEM_DATA["show_name"],
        showDescription = SELECTED_ITEM_DATA["show_short_description"],
        streamDirector = SELECTED_ITEM_DATA["director_name"],
        streamActor = SELECTED_ITEM_DATA["actor_name"],
        streamLanguage = SELECTED_ITEM_DATA["language"],
        streamYear = SELECTED_ITEM_DATA["stream_production_year"],
        showYear = SELECTED_ITEM_DATA["show_production_year"],
        totalViews = SELECTED_ITEM_DATA["total_views"],
        streamPoster = SELECTED_ITEM_DATA["stream_thumbnail_2"],
        showPoster = SELECTED_ITEM_DATA["show_thumbnail_2"];
    if (SELECTED_ITEM_DATA["type"] == "M") {
        var totalhours = (Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) > 0 ? Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " : "") + ((SELECTED_ITEM_DATA["stream_duration"] % 60) > 0 ? (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min " : "");
    }
    // var totalhours = Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " + (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min ";
    str += '<div class="banner_detail_box">';
    str += '<ul class="movie_detail_row" id="movie_detail_row">';
    if (typeof streamGenre != "undefined") str += '<li class="movie_detail movie_category">' + streamGenre + '</li>';
    if (typeof totalhours != "undefined") str += '<li class="movie_detail movie_time">' + totalhours + '</li>';
    if (typeof streamQuality != "undefined") str += '<li class="movie_detail movie_quality"><div class="hd">' + streamQuality + '</div></li>';
    str += '</ul>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamTitle != "undefined") str += '<div class="movie_div"><p class="movie_name">' + streamTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof streamDescription != "undefined") str += '<div class="main_bxx"><div class="movie_disc">' + streamDescription + '</div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showTitle != "undefined") str += '<div class="movie_div"><p class="movie_name">' + showTitle + '</p><span class="home_reddot"></span></div>';
        if (typeof showDescription != "undefined") str += '<div class="main_bxx"><div class="movie_disc">' + showDescription + '</div>';
    }

    if (typeof streamDirector != "undefined") str += '<div class="director"><span class="title">Directed by:</span><span class="detail">' + streamDirector + '</span></div>';
    if (typeof streamActor != "undefined") str += '<div class="cast"><span class="title">Cast:</span><span class="detail">' + streamActor + '</span></div>';
    if (typeof streamLanguage != "undefined") str += '<div class="Language"><span class="title">Language:</span><span class="detail">' + streamLanguage + '</span></div>';
    if (SELECTED_ITEM_DATA["type"] == "M") {
        if (typeof streamYear != "undefined") str += '<div class="releas"><span class="title">Initial release:</span><span class="detail">' + streamYear + '</span></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        if (typeof showYear != "undefined") str += '<div class="releas"><span class="title">Initial release:</span><span class="detail">' + showYear + '</span></div>';
    }

    if (typeof totalViews != "undefined") str += '<div class="Watched"><span class="title">Watched:</span><span class="detail whached">' + totalViews + '</span></div>';
    str += '<div class="Subscription"><span class="title">Subscription:</span><span class="plan_name">' + localStorage.getItem('plan_name') + '</span></div></div></div>';

    if (SELECTED_ITEM_DATA["type"] == "M") {
        str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" onerror="poster_image_error(this);" src="' + streamPoster + '" alt="poster"></div>';
    } else if (SELECTED_ITEM_DATA["type"] == "S") {
        str += '<div class="banner_background"><img class="banner_back_color" src="images/banner_shadow.png" alt=""><img class="banner_back_img" onerror="poster_image_error(this);" src="' + showPoster + '" alt="poster"></div>';
    }

    $("#show_banner_detail").html("");
    $("#show_banner_detail").html(str);
}

function setWatchPPVScreen(index) {
    var id = "",
        str = "",
        leftFocus = '',
        rightFocus = '',
        downFocus = '',
        upFocus = '';
    var totalItem = _.size(APP_DATA_ARRAY[index]['data']);

    str += '<div class="list_row">';
    str += '<h2 class="list_heading">' + APP_DATA_ARRAY[index]['month'] + '</h2>';
    str += '<div class="video_listing">';
    str += '<ul class="listing_inner" id="watch_pp_list_' + index + '" data-index="' + index + '" >';

    for (var i = 0; i < totalItem; i++) {
        upThumb = "images/like.png";
        downThumb = "images/dislike.png";
        heartImg = "images/empty_heart.png";
        id = ' id = "watch_ppv_' + index + '_' + i + '"';

        upFocus = ' data-sn-up="null" ';
        downFocus = ' data-sn-down="null" ';

        if (i == (totalItem - 1)) rightFocus = ' data-sn-right="null"';
        else rightFocus = ' data-sn-right="#watch_ppv_' + index + '_' + (i + 1) + '" ';

        if (i == 0) leftFocus = ' data-sn-left="#menu7"';
        else leftFocus = ' data-sn-left="#watch_ppv_' + index + '_' + (i - 1) + '" ';

        if (APP_DATA_ARRAY[index]['data'][i]["isFavourite"] == "1") heartImg = "images/red_heart.png";
        if (APP_DATA_ARRAY[index]['data'][i]["isLiked"] == "Y") upThumb = "images/thumbs_up.png";
        if (APP_DATA_ARRAY[index]['data'][i]["isLiked"] == "N") downThumb = "images/thumbs_down.png";

        str += '<li class="thumbnail_box focusable" tabindex="' + NAVIGATION_INDEX + '" ' + id + rightFocus + leftFocus + upFocus + downFocus + ' >';
        if (APP_DATA_ARRAY[index]['data'][i]["buy_status"] == "Y") str += '<img class="bought_icon" src="images/bought-icon.png" alt="watchppv_icon">';
        str += '<img class="home_thumbnail_image" onerror="image_error(this);" src="' + APP_DATA_ARRAY[index]['data'][i]["stream_thumbnail_1"] + '" alt="' + APP_DATA_ARRAY[index]['data'][i]["stream_title"] + '">';
        str += '</li>';

    }
    NAVIGATION_INDEX++;

    str += '</div>';
    str += '</div>';
    str += '</ul>';


    if (index == 0) {
        $(".main_container").show();
        change_screens("watch_ppv_container");
        $("#loader").hide();
        $("#watch_ppv_List").html(str);
        set_watch_ppv_list_focus(0);
        if (SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM)) SN.focus("#" + FIRST_PAGE_FOCUSED_ITEM)
        else SN.focus("watch_pp_list_0");
        set_watch_ppv_top_banner();
    }
    else $("#watch_ppv_List").append(str);
    index = index + 1;
    if (index < _.size(APP_DATA_ARRAY)) setWatchPPVScreen(index);

}


function content_partner_details_page() {
    console.log("content_partner_details_page.....");
    var str = "";
    str += '<div class="left_container">';
    str += '<div class="detail-contant"><span class="contant-detail">GENRE:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["genre"] + ' </span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">NAME:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["User_name"] + '</span></div>';
    // str += '<div class="detail-contant"><span class="contant-detail">EMAIL:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["email"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">COUNTRY:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["country"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">LANGUAGE:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["native_lang"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">FEATURE FILMS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_feature_film"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">SHORT FILMS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_short_film"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">DOCUMENTARIES:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_documentary"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">TV SHOWS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_tvshow"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">PLAYS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_plays"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">REALITY TV SHOWS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA["tot_realityshow"] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">WEB SERIES:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA['tot_webseries'] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">MUSIC CONCERTS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA['tot_concerts'] + '</span></div>';
    str += '<div class="detail-contant"><span class="contant-detail">OTHER CONTANTS:&nbsp&nbsp;</span><span class="details_content">' + SELECTED_ITEM_DATA['tot_other_content'] + '</span></div>';
    str += '</div>';
    str += '<div class="right_container"><img src="' + SELECTED_ITEM_DATA['image_url'] + '" onerror="this.onerror=null;this.src=`/images/app_logo.jpg`"  alt="" style="width: 600px; height: 500px;"></div>';
    $("#content_main_container").html("");
    $("#content_main_container").html(str);
    manage_spatial_navigation("content_partner_detail_container");
    SN.focus("#back_button");

}
function setRedeemDetailScreen() {
    console.log("redeem_details_page.....");
    var str = "";
    str += '<div class="banner_background"><img class="redeem_banner_back_color" src="' + APP_DATA_ARRAY["stream_thumbnail_1"] + '"alt="">';
    str += '<div class="redeem-row-details" id="redeem_row_details">';
    str += '<div class="info_details_heading"><span>' + APP_DATA_ARRAY["genre"] + '</span>|<span>' + (Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) > 0 ? Math.floor(SELECTED_ITEM_DATA["stream_duration"] / 60) + "hr " : "") + ((SELECTED_ITEM_DATA["stream_duration"] % 60) > 0 ? (SELECTED_ITEM_DATA["stream_duration"] % 60) + "Min " : "") + '</span>';//|<span>' + APP_DATA_ARRAY["genre"] + '</span></div>';
    str += '<div class="heading_ppv_redeem">' + APP_DATA_ARRAY["stream_title"] + '</div>';
    str += '<div class="description_redeem">' + (APP_DATA_ARRAY["stream_long_description"] ? APP_DATA_ARRAY["stream_long_description"] : APP_DATA_ARRAY["stream_short_description"]) + '</div>';
    str += '<div class="heading_redeem"><span class="contant-detail">Directed By:&nbsp; </span><span class="details_content">' + APP_DATA_ARRAY["director"] + '</span></div>';
    str += '<div class="heading_redeem"><span class="contant-detail">Language:&nbsp;</span><span class="details_content">' + APP_DATA_ARRAY["LANGUAGE"] + '</span></div>';
    str += '<div class="heading_redeem"><span class="contant-detail">Initial Release:&nbsp;</span><span class="details_content">' + APP_DATA_ARRAY["stream_production_year"] + '</span></div>';
    str += '<div class="heading_redeem"><span class="contant-detail">subscription:&nbsp; </span><span class="plan_name_redeem">' + localStorage.getItem('plan_name') + '</span></div>';
    str += '<div class="play-now-button focusable" tabindex="5" id="play_now_button"><img src="./images/play_active.png" class="redeem_pay_button" alt="">&nbsp;Play Now</div>';
    str += '</div>';
    str += '</div>';
    $("#redeem_ppv_details_container").html("");
    $("#redeem_ppv_details_container").html(str);
    $(".navbar_sidebar ").hide();
    change_screens("redeem_ppv_details_container");
    manage_spatial_navigation("redeem_ppv_details_container");
    SN.focus("#play_now_button");

}


function setaboutscreenData() {
    console.log("setaboutscreenData.....");
    var str = "";
    //var totalItem = _.size(APP_DATA_ARRAY);
    var totalItem = _.size(APP_DATA_ARRAY['Haitianflix']['Phases']);
    console.log(totalItem);
    str += '<div class="aboutset_container">';
    str += '<ul class="about-inner" id="about_inner">';
    str += '<div class="long-description" >'+APP_DATA_ARRAY['Haitianflix']["Description"]+'</div>';
    for (var i = 0; i < totalItem; i++) {  
        id = ' id = "about_phase_' + i +'"';
        if (i == (totalItem - 1)) downFocus = ' data-sn-down="null"';
        else downFocus = ' data-sn-down="#about_phase_'+ (i + 1) + '" ';
        if (i == 0) upFocus = ' data-sn-up="null"';
        else upFocus = ' data-sn-up="#about_phase_' + (i - 1) + '" ';
        rightFocus = 'data-sn-right ="null" ';
        leftFocus = ' data-sn-left ="#menu8" ';
        str += '<li class="about-item focusable" tabindex="' + NAVIGATION_INDEX + '" '  + id + rightFocus + leftFocus + upFocus + downFocus +' >';
        str += '<div class="phase-title-heading">'+APP_DATA_ARRAY['Haitianflix']['Phases'][i]["Phase"]+'</div>';
        str += '<div class="short-description">'+APP_DATA_ARRAY['Haitianflix']['Phases'][i]["Description"]+'</div>';
        str += '</li>';
    }
    NAVIGATION_INDEX++;
    str += '</ul>';
    str += '</div>';
    $("#about_container").html("");
    $("#about_container").html(str);
    change_screens("about_container");
    manage_spatial_navigation("about_container");
    SN.focus("about_inner");

}


function setContactscreenData() {
    console.log("setContactscreenData.....");
    var str = "";
    str += '<div class="first_contact_container">';
    str += '<div class="detail-contact"><span class="contact-heading">CONTACT US</span></div>';
    str += '<div class="contact-second-heading">Contact Information</div>';
    str += '<div class="contant-description">'+ APP_DATA_ARRAY['Haitianflix']["Description"] + '</div>';
    str += '<div class="secondphase-contact">';
    str += '<div class="detailcontact">' + APP_DATA_ARRAY['Haitianflix']['Contact Information']["Address"] + '</div>';
    str += '<div class="detailcontact">' + APP_DATA_ARRAY['Haitianflix']['Contact Information']["Company"] + '</div>';
    str += '<div class="detailcontact"><span>Phone: </span><span class="contant-detail">' + APP_DATA_ARRAY['Haitianflix']['Contact Information']["Phone"] + '</span></div>';
    str += '<div class="detailcontact"><span>Email: </span><span class="contant-detail">' + APP_DATA_ARRAY['Haitianflix']['Contact Information']["Email"] + '</span></div>';
    str += '</div>';
    str += '</div>';
    $("#contact_container").html("");
    $("#contact_container").html(str);
    change_screens("contact_container");
    manage_spatial_navigation("contact_container");
    // SN.focus("#back_button");

}