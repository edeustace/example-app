var accessToken;
var itemId;
var sessionId;

function collectionClick(id) {
    $("#step3").fadeIn(500, function () {
        $("#step2").slideUp();
    });
    getItems(accessToken, id, function (items) {
        var s = "";
        for (var i = 0; i < items.length; i++) {
            s += "<li onclick=\"itemClick('" + items[i].id + "')\"><a href='#'>" + items[i].title + "</a></li>";
        }
        $("#itemsList").html(s);
    })
}

function itemClick(id) {
    $("#step4").fadeIn(500, function () {
        $("#step3").slideUp();
    });

    itemId = id;

    createItemSession(accessToken, id, function (res) {
        sessionId = res;
        $("#sessionResult").html("Created Session Id: " + res);
        $(".launcherA").attr("href", config.host + "/testplayer/session/" + res + "/run?access_token=" + accessToken);

    });

    $(".ltiLauncherA").attr("href", config.host + "/lti/assignment/" + itemId + "/run?access_token=" + accessToken);
}

function launchItem() {
    $("#step5").fadeIn(500, function () {
        $("#step4").slideUp();
    });
    refreshSessionData();
}

function launchLtiItem() {
    $("#step5").fadeIn(500, function () {
        $("#step4").slideUp();
    });
    refreshSessionData();
}

function refreshSessionData() {
    getSessionData(accessToken, itemId, sessionId, function (data) {
        $("#responseBox").html(JSON.stringify(data, undefined, 2));
    })
}


$(function () {
    $("#s1submit").click(function () {
        requestAccessToken($("#cid").val(), $("#csec").val(),
            function (res) {
                $("#s1error").html("");
                accessToken = res;
                $("#token").html(accessToken);
                $("#step2").fadeIn(500, function () {
                    $("#step1").slideUp();
                });

                getCollections(accessToken, function (items) {
                    var s = "";
                    for (var i = 0; i < items.length; i++) {
                        s += "<li onclick=\"collectionClick('" + items[i].id + "')\"><a href='#'>" + items[i].name + "</a></li>";
                    }
                    $("#collsList").html(s);
                });
            },
            function (err) {
                console.log(err);
                $("#s1error").html("Error: " + err.responseText);
                alert(err);
            }
        )
    });

});