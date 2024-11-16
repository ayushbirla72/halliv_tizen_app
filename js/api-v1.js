function getHomeData() {
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/home",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                setHomePageData(0);
            } else {
                hide_show_modal(true, 'RETRY_EXIT', NET_CONNECTION_ERR);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function getEpisodeData() {
    var i = $("#" + FIRST_PAGE_FOCUSED_ITEM).index(), j = $("#" + FIRST_PAGE_FOCUSED_ITEM).parent().attr("data-index");
    var Data = '';
    $("#loader").show();
    if (PAGE_INDEX == 0) { Data = { "user_code": localStorage.getItem('user_code'), "show_code": APP_DATA_ARRAY[j]["stream"][i]["show_code"] }; }
    else if (PAGE_INDEX == 1) { Data = { "user_code": localStorage.getItem('user_code'), "show_code": APP_DATA_ARRAY['search'][i]["show_code"] }; }
    else if (PAGE_INDEX == 2) { Data = { "user_code": localStorage.getItem('user_code'), "show_code": APP_DATA_ARRAY[j]['stream'][i]["show_code"] }; }
    else if (PAGE_INDEX == 3) { Data = { "user_code": localStorage.getItem('user_code'), "show_code": APP_DATA_ARRAY['My_Favorite'][i]["show_code"] }; }
    else if (PAGE_INDEX == 4) { Data = { "user_code": localStorage.getItem('user_code'), "show_code": APP_DATA_ARRAY[j]['stream'][i]["show_code"] }; }
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/SeasonList",
        async: true,
        dataType: 'json',
        data: Data,
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_EPISODE_DATA_ARRAY = data;
                episode_screen_page();
            } else {
                hide_show_modal(true, 'RETRY_EXIT', NET_CONNECTION_ERR);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function getSearchData() {
    var searchText = get_searched_text();
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/search" + "?",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "title": searchText },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                set_search_result(0);
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>No record found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


function getContentPartnerData() {
    $("#loader").show();
    $.ajax({
        type: "GET",
        url: APP_DOMAIN + "/contentProvider",
        async: true,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                content_partner_screen_page();
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>Content not found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function mostWatchedData() {
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/most_watch",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                mostWatchedPageData();
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>Content not found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


function favouriteData() {
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/favorite_data",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                $("#loader").hide();
                APP_DATA_ARRAY = data;
                favouritePageData();
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>Content not found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function addFavouriteData() {
    $("#loader").hide();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/favorite",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            console.log(response);
            if (response.status == 1) {
                $("#loader").hide();
                SELECTED_ITEM_DATA.isFavourite = "1";
                $("#" + FIRST_PAGE_FOCUSED_ITEM).find(".fav_icon").attr("src", "./images/red_heart.png");
                if (MENU_INDEX == 3) favouriteData();
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function removeFavoriteData() {
    $("#loader").hide();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/remove_favorite",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            console.log(response);
            if (response.status == 1) {
                $("#loader").hide();
                SELECTED_ITEM_DATA.isFavourite = "0";
                $("#" + FIRST_PAGE_FOCUSED_ITEM).find(".fav_icon").attr("src", "./images/my-favorites-active.png");
                if (MENU_INDEX == 3) favouriteData();
                $("#fav_msg_box").hide();
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


function watchLaterData() {
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/watch_later",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            console.log(data);
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                setWatchLaterPageData(0);
            } else {
                $("#loader").hide();
                $("#searchResult").hide();
                $("#msg_box").html("<h2 class='no_record_found'>Content not found.</h2>");
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function addWatchLaterData() {
    $("#loader").hide();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/add_watch_later",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            console.log(response);
            if (response.status == 1) {
                SELECTED_ITEM_DATA.isWatchlater = "1";
                if (MENU_INDEX == 4) watchLaterData();
            } else console.log("failed.");
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function removeWatchLaterData() {
    $("#loader").hide();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/remove_watch_later",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            console.log(response);
            if (response.status == 1) {
                SELECTED_ITEM_DATA.isWatchlater = "0";
                if (MENU_INDEX == 4) watchLaterData();
                $("#watch_later_msg_box").hide();
            } else console.log("failed.");
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


// like dislike api

function like() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/like",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            var id = "";
            if ("season_code_RK" in SELECTED_ITEM_DATA) id = SECOND_PAGE_FOCUSED_ITEM;
            else id = FIRST_PAGE_FOCUSED_ITEM;

            if (response.status == 0) {
                if (SELECTED_ITEM_DATA['isLiked'] == "N") {
                    SELECTED_ITEM_DATA['isLiked'] = "0";
                    $("#dislike_btn").find("img").attr("src", "./images/dislike.png");
                    SELECTED_ITEM_DATA['total_dislike'] = (Number(SELECTED_ITEM_DATA['total_dislike']) > 0) ? (Number(SELECTED_ITEM_DATA['total_dislike']) - 1) : Number(SELECTED_ITEM_DATA['total_dislike']);
                    $("#" + id).find(".dislike").text(SELECTED_ITEM_DATA['total_dislike']);
                    like();
                }
                else if (SELECTED_ITEM_DATA['isLiked'] == "Y") {
                    SELECTED_ITEM_DATA['isLiked'] = "0";
                    $("#like_btn").find("img").attr("src", "./images/like.png");
                    $("#" + id).find(".thumbs_up").attr("src", "./images/like.png");

                    SELECTED_ITEM_DATA['total_like'] = Number(SELECTED_ITEM_DATA['total_like']) > 0 ? Number(SELECTED_ITEM_DATA['total_like']) - 1 : Number(SELECTED_ITEM_DATA['total_like']);
                    $("#" + id).find(".like").text(SELECTED_ITEM_DATA['total_like']);

                }
            } else if (response.status == 1) {
                SELECTED_ITEM_DATA['isLiked'] = "Y";
                $("#like_btn").find("img").attr("src", "images/thumbs_up.png");
                $("#" + id).find(".thumbs_up").attr("src", "images/thumbs_up.png");
                $("#" + id).find(".thumbs_down").attr("src", "images/dislike.png");
                SELECTED_ITEM_DATA['total_like'] = Number(SELECTED_ITEM_DATA['total_like']) + 1;
                $("#" + id).find(".like").text(SELECTED_ITEM_DATA['total_like']);
            }

        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
            // show_hide_login_error("Network Connection", NET_CONNECTION_ERR);
        }
    });
}

function dislike() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/dislike",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "type": SELECTED_ITEM_DATA['type'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            var id = "";
            if ("season_code_RK" in SELECTED_ITEM_DATA) id = SECOND_PAGE_FOCUSED_ITEM;
            else id = FIRST_PAGE_FOCUSED_ITEM;

            if (response.status == 0) {
                if (SELECTED_ITEM_DATA['isLiked'] == "Y") {
                    SELECTED_ITEM_DATA['isLiked'] = "0";
                    $("#like_btn").find("img").attr("src", "images/like.png");
                    SELECTED_ITEM_DATA['total_like'] = (Number(SELECTED_ITEM_DATA['total_like']) > 0) ? (Number(SELECTED_ITEM_DATA['total_like']) - 1) : Number(SELECTED_ITEM_DATA['total_like']);
                    $("#" + id).find(".like").text(SELECTED_ITEM_DATA['total_like']);
                    dislike();
                } else if (SELECTED_ITEM_DATA['isLiked'] == "N") {
                    SELECTED_ITEM_DATA['isLiked'] = "0";
                    $("#dislike_btn").find("img").attr("src", "images/dislike.png");
                    $("#" + id).find(".thumbs_down").attr("src", "./images/dislike.png");

                    SELECTED_ITEM_DATA['total_dislike'] = (Number(SELECTED_ITEM_DATA['total_dislike']) > 0) ? (Number(SELECTED_ITEM_DATA['total_dislike']) - 1) : Number(SELECTED_ITEM_DATA['total_dislike']);
                    $("#" + id).find(".dislike").text(SELECTED_ITEM_DATA['total_dislike']);
                }

            } else if (response.status == 1) {
                SELECTED_ITEM_DATA['isLiked'] = "N";
                $("#dislike_btn").find("img").attr("src", "images/thumbs_down.png");
                $("#" + id).find(".thumbs_down").attr("src", "images/thumbs_down.png");
                $("#" + id).find(".thumbs_up").attr("src", "images/like.png");
                SELECTED_ITEM_DATA['total_dislike'] = Number(SELECTED_ITEM_DATA['total_dislike']) + 1;
                $("#" + id).find(".dislike").text(SELECTED_ITEM_DATA['total_dislike']);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
            // show_hide_login_error("Network Connection", NET_CONNECTION_ERR);
        }
    });
}

function ratingApi() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/rate_now",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'], "rate": $("#showRating li").find("img.star-fill").length },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            if (response.status == 1) {
                SELECTED_ITEM_DATA['my_rate'] = $("#showRating li").find("img.star-fill").length;
                $(".rating_div").show();
                SN.focus("#rate_now");
            } else show_user_rating();
        },
        error: function (xhr, error) {
            $("#loader").hide();
            show_user_rating();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


function logoutApi() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/logout",
        async: true,
        dataType: 'json',
        data: { "device_id": webapis.network.getMac() },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            if (response.status == 1) {
                localStorage.clear();
                window.location.href = "login.html";
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function loginStatusApi() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/loginStatus",
        async: true,
        dataType: 'json',
        data: { "device_id": webapis.network.getMac() },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 5000,
        success: function (response) {
            if (response.status == 1) {
                console.log("login status...");
            } else {
                console.log("not loged in ");

            }
        },
        error: function (xhr, error) {
            // $("#loader").hide();
            // if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            // else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function addViewCountApi() {
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/add_view_counter",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "stream_code": SELECTED_ITEM_DATA['stream_code'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (response) {
            if (response.status == 1) {
                SELECTED_ITEM_DATA['total_views'] = Number(SELECTED_ITEM_DATA['total_views']) + 1;
                $("#" + FIRST_PAGE_FOCUSED_ITEM).find(".detail").text(SELECTED_ITEM_DATA['total_views']);
                $("#watched_details").text(SELECTED_ITEM_DATA['total_views']);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function AccountQRCode() {
    $("#login_loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/mobile-qr-code",
        async: true,
        cache: false,
        data: { "user_code": localStorage.getItem('user_code') },
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            $("#login_loader").hide();
            if (data.qrcode) {
                $("#login_loader").hide();
                localStorage.setItem('haitianflix_qr_img', data.qrcode);
                change_screens("account_qr_container");
                $("#account_loginQRCodeImg").attr('src', localStorage.getItem('haitianflix_qr_img'));
                SN.focus("#account_qrcode_button");
            }
        },
        error: function (xhr, error) {
            $("#login_loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'EXIT', msg);
        }
    });
}

function getWatchPPVData() {
    console.log("getWatchPPVData");
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/ppv-purchase",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data;
                setWatchPPVScreen(0);
            } else {
                str += '<span>Content not available.</span>';
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function getPPVContentDetail() {
    console.log("getPPVContentDetail");
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/ppv-details",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "ppv_code": SELECTED_ITEM_DATA['ppv_code'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            if (_.size(data) > 0) {
                VOD_URL = data[0]['stream_url'];
                change_screens("video_container");
                load_video();
            } else {
                show_hide_popups(true, APP_MESSAGE[1], "modal_subscription")
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            show_hide_popups(true, xhr.responseJSON.msg, "modal_subscription")
            // if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            // else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function getRedeemDetail() {
    console.log("getRedeemDetail");
    $("#loader").show();
    // document.getElementById('redeem_input').value = "d3da126e7e231bcb11797f69f2dae174";
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/redeem-ppv",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "gift_code": $("#redeem_input").val() },
        // cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            console.log(data);
            if (_.size(data) > 0) {
                APP_DATA_ARRAY = data[0];
                setRedeemDetailScreen();
            } else {
                str += '<span>Content not available.</span>';
            }
        },
        error: function (xhr, error) {
            console.log(xhr, error);
            $("#loader").hide();
            $("#redeem_error_message").text(xhr.responseJSON.msg);
            $("#redeem_error_message").show("slow");
            setTimeout(function () {
                $("#redeem_error_message").hide("slow");
            }, 5000);
            // if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            // else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_CANCEL', msg);
        }
    });
}


function updateWatchStatus() {
    console.log("updateWatchStatus");
    //$("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/gift-watch-status",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "gift_code": $("#redeem_input").val() },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            console.log(data);

        },
        error: function (xhr, error) {
            // $("#loader").hide();
            // if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            // else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function updatePPVWatchStatus() {
    console.log("updatePPVWatchStatus");
    //$("#loader").show();
    $.ajax({
        type: "POST",
        url: APP_DOMAIN + "/watch-status",
        async: true,
        dataType: 'json',
        data: { "user_code": localStorage.getItem('user_code'), "ppv_code": SELECTED_ITEM_DATA['ppv_code'] },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, error) {
            // $("#loader").hide();
            // if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            // else msg = NET_CONNECTION_ERR;
            // hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}


function getAboutData() {
    $("#loader").show();
    $.ajax({
        type: "GET",
        url: APP_DOMAIN + "/about_us",
        async: true,
        dataType: 'json',
        //data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (res) {
            console.log(res);
            if (_.size(res) > 0) {
                APP_DATA_ARRAY = res;
                setaboutscreenData(0);
            } else {
                hide_show_modal(true, 'RETRY_EXIT', NET_CONNECTION_ERR);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}

function getContactData() {
    $("#loader").show();
    $.ajax({
        type: "GET",
        url: APP_DOMAIN + "/contact_us",
        async: true,
        dataType: 'json',
        //data: { "user_code": localStorage.getItem('user_code') },
        cache: false,
        crossDomain: true,
        timeout: REQUEST_TIMEOUT * 1000,
        success: function (res) {
            console.log(res);
            if (_.size(res) > 0) {
                APP_DATA_ARRAY = res;
                setContactscreenData(0);
            } else {
                hide_show_modal(true, 'RETRY_EXIT', NET_CONNECTION_ERR);
            }
        },
        error: function (xhr, error) {
            $("#loader").hide();
            if (navigator.onLine) msg = SOMETHING_WENT_WRONG;
            else msg = NET_CONNECTION_ERR;
            hide_show_modal(true, 'RETRY_EXIT', msg);
        }
    });
}
