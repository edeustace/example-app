function requestAccessToken(clientId, clientSecret, callback, errorCallback) {
    var url = config.host + "/auth/access_token";

    $.ajax({
        type: 'POST',
        url: url,
        data: {
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret,
        },
        success: function (result) {
            if (typeof result=="string") result = JSON.parse(result);
            callback(result.access_token);
        },
        error: function(error) {
            errorCallback(error);

        }
    });
}

function getCollections(accessToken, callback) {
    var url = config.host + "/api/v1/collections";
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result=="string") result = JSON.parse(result);
            console.log(result);
            callback(result);
        }
    });
}

function getItems(accessToken, collId, callback) {
    var url = config.host + "/api/v1/collections/"+collId+"/items";
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result=="string") result = JSON.parse(result);
            console.log(result);
            callback(result);
        }
    });
}

function createItemSession(accessToken, itemId, callback) {
    var url = config.host+'/api/v1/items/'+itemId+'/sessions?'+'access_token='+accessToken;
    $.ajax({
        type: 'POST',
        url: url,
        success: function (result) {
            if (typeof result=="string") result = JSON.parse(result);
            console.log(result);
            callback(result.id);
        }
    });
}

function getSessionData(accessToken, itemId, sessionId, callback) {
    var url = config.host + '/api/v1/items/'+itemId+"/sessions/"+sessionId;
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result=="string") result = JSON.parse(result);
            console.log(result);
            callback(result);
        }
    });
}
