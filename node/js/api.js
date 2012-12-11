/**
 * Requests an access token for a given ClientId and ClientSecret
 * This is the first step you usually need to do in order to be able to find
 * items and create / query assessments
 *
 * @param {string} clientId The ClientID you received
 * @param {string} clientSecret The ClientSecret you received
 * @param {Function} callback Success callback
 * @param {Function} errorCallback Error callback
 */
function requestAccessToken(clientId, clientSecret, callback, errorCallback) {
    var url = config.host + "/auth/access_token";

    $.ajax({
        type: 'POST',
        url: url,
        data: {
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret
        },
        success: function (result) {
            // In Firefox this comes back as a string so we need to convert it to object
            if (typeof result == "string") result = JSON.parse(result);
            callback(result.access_token);
        },
        error: function (error) {
            errorCallback(error);
        }
    });
}

/**
 * Retrieves the collections that belong to your registered organization
 *
 * @param {string} accessToken The access token you generated using requestAccessToken
 * @param {Function} callback Success callback
 */
function getCollections(accessToken, callback) {
    var url = config.host + "/api/v1/collections";
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result == "string") result = JSON.parse(result);
            callback(result);
        },
        error: function (err) {
            alert("Error getting collections: " + err);
        }
    });
}

/**
 * Retrieves the items that belong to a particular collection
 *
 * @param {string} accessToken The access token you generated using requestAccessToken
 * @param {string} collId The id of the collection
 * @param {Function} callback Success callback
 */
function getItems(accessToken, collId, callback) {
    var url = config.host + "/api/v1/collections/" + collId + "/items";
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result == "string") result = JSON.parse(result);
            console.log(result);
            callback(result);
        },
        error: function (err) {
            alert("Error getting items: " + err);
        }
    });
}

/**
 * This method creates a session that is associated with an item. The created session
 * will hold the entire lifecycle of the assessment from creation to retrieving the result.
 *
 * @param {string} accessToken The access token you generated using requestAccessToken
 * @param {string} itemId The id of the item
 * @param {Function} callback Success callback. The created session Id will be passed to the callback function
 */
function createItemSession(accessToken, itemId, callback) {
    var url = config.host + '/api/v1/items/' + itemId + '/sessions?' + 'access_token=' + accessToken;
    $.ajax({
        type: 'POST',
        url: url,
        success: function (result) {
            if (typeof result == "string") result = JSON.parse(result);
            callback(result.id);
        }
    });
}

/**
 * This method creates a session that is associated with an item. The created session
 * will hold the entire lifecycle of the assessment from creation to retrieving the result.
 *
 * @param {string} accessToken The access token you generated using requestAccessToken
 * @param {string} itemId The Item ID
 * @param {string} sessionId The Session ID
 * @param {Function} callback Success callback. The Session Data Object will be passed to the callback function
 */
function getSessionData(accessToken, itemId, sessionId, callback) {
    var url = config.host + '/api/v1/items/' + itemId + "/sessions/" + sessionId;
    $.ajax({
        type: 'GET',
        data: "access_token=" + accessToken,
        url: url,
        success: function (result) {
            if (typeof result == "string") result = JSON.parse(result);
            callback(result);
        }
    });
}
