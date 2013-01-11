var accessToken;
var itemId;
var sessionId;

function goToStep(step) {
    $("#step"+step).fadeIn(500, function () {
        $("#step"+(step-1)).slideUp();
    });
}

function collectionClick(id) {
    goToStep(3);
    getItems(accessToken, id, function (items) {
        var s = "";
        for (var i = 0; i < items.length; i++) {
            s += "<li onclick=\"itemClick('" + items[i].id + "')\"><a href='#'>" + items[i].title + "</a></li>";
        }
        $("#itemsList").html(s);
    });
}

function itemClick(id) {
    goToStep(4);
    itemId = id;

    createItemSession(accessToken, id, function (res) {
        sessionId = res;
        $("#sessionResult").html("Created Session Id: " + res);
        $(".launcherA").attr("href", config.host + "/testplayer/session/" + res + "/run?access_token=" + accessToken);

    });

    $(".ltiLauncherA").attr("href", config.host + "/lti/assignment/" + itemId + "/run?access_token=" + accessToken);
}

function launchItem() {
    goToStep(5);
    refreshSessionData();
}

function refreshSessionData() {
    getSessionData(accessToken, itemId, sessionId, function (data) {

        var highlighted = com.cs.utils.syntaxHighlightJson(data);
        $("#responseBox").html(highlighted);
    })
}

$(function () {
    $("#cid").val(config.clientId);
    $("#csec").val(config.clientSecret);

    $("#s1submit").click(function () {
        requestAccessToken($("#cid").val(), $("#csec").val(),
            function (res) {
                $("#s1error").html("");
                accessToken = res;
                $("#token").html(accessToken);
                goToStep(2);

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