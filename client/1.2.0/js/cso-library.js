/*******************************************************************************
CSO Library 
*******************************************************************************/
var cso = {};

/*******************************************************************************
CSO Library - Spinner
*******************************************************************************/
cso.spinner = {};

//Show the Overlay and start the Spinner
cso.spinner.start = function() {
    $('#overlay').show();
}

//Hide the Overlay and stop the Spinne
cso.spinner.stop = function () {
    $('#overlay').fadeOut('slow');
}

/*******************************************************************************
CSO Library - Content
*******************************************************************************/
cso.content = {};

//Load a Relative URL into a Container
cso.content.load = function (pSelectorContainer, pRelativeURL) {
    // Validate the Relative URL
    var uri = new URI(pRelativeURL);
    if (uri.is("relative") === false)
        return;

    $.get(pRelativeURL, function (result) {
        if (result != $(pSelectorContainer).html()) {
            $(pSelectorContainer).empty().html(result);
        }
    });
}

//Navigate to a Relative URL by Selector
//Highlight either the Selector and/or the Parent on demand
cso.content.navigate = function (pNavSelector, pRelativeURL, pSelectorToHighlight, pParentToHighlight) {
    // Default parameters
    pSelectorToHighlight    = pSelectorToHighlight  || null;
    pParentToHighlight      = pParentToHighlight    || null;

    // Validate the Relative URL
    var uri = new URI(pRelativeURL);
    if (uri.is("relative") === false)
        return;

    $(pNavSelector).click(function () {
        // Navigate to the URL
        $(".body-container").empty().load(pRelativeURL, 'html');

        // Set the highlighters
        $('[id^=page-]').removeClass("active");

        if (pSelectorToHighlight)
            $(pSelectorToHighlight).addClass("active");

        if (pParentToHighlight)
            $(pParentToHighlight).addClass("active");

        return false;
    });
}

/*******************************************************************************
CSO Library - Ajax
*******************************************************************************/
cso.ajax = {};

//Execute an AJAX callback function
cso.ajax.callback = function (pFunction, pResponse, pExtraParams) {
    var callbackFunction = window[pFunction];
    if (typeof callbackFunction === 'function') {
        if (pExtraParams)
            callbackFunction(pResponse, pExtraParams);
        else
            callbackFunction(pResponse);
    } else
        return pResponse;
}

// Make an Ajax request
cso.ajax.request = function (pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError, pAPI_callbackParams_onError, pAJAX_Params) {
    // Default API parameters
    pAPI_Params = pAPI_Params || '{}';

    // Default callback functions
    pAPI_callbackFunction_onSuccess = pAPI_callbackFunction_onSuccess || null;
    pAPI_callbackFunction_onError = pAPI_callbackFunction_onError || null;

    // Default callback parameters
    pAPI_callbackParams_onSuccess = pAPI_callbackParams_onSuccess || null;
    pAPI_callbackParams_onError = pAPI_callbackParams_onError || null;

    // Default AJAX parameters
    pAJAX_Params = pAJAX_Params || {};
    pAJAX_Params.method = pAJAX_Params.method || 'POST';
    pAJAX_Params.dataType = pAJAX_Params.dataType || 'json';
    pAJAX_Params.timeout = pAJAX_Params.timeout || 60000;

    // Set the Call ID
    var callID = Math.floor(Math.random() * 999999999) + 1;

    // Set the Data to pass into the Ajax call
    var data4Ajax = {
        "jsonrpc": '2.0',
        "method": pAPI_Method,
        "params": pAPI_Params,
        "id": callID
    };

    // Extend AJAX Parameters
    var extendedAJAXParams = {
        url: pAPI_URL,
        data: JSON.stringify(data4Ajax),
        xhrFields: { withCredentials: true },
        success: function (response) {
            // Silent validate the JSON-RPC Call ID
            if (pAJAX_Params.dataType == 'json' && response.id != callID)
                return false;

            return cso.ajax.callback(pAPI_callbackFunction_onSuccess, response, pAPI_callbackParams_onSuccess);
        },
        error: function (error) {
            // Silent validate the JSON-RPC Call ID
            if(pAJAX_Params.dataType == 'json' && response.id != callID)
                return false;

            return cso.ajax.callback(pAPI_callbackFunction_onError, response, pAPI_callbackParams_onError);
        }
    }

    // Merge pAJAX_Params into extendedAJAXParams
    $.extend(extendedAJAXParams, pAJAX_Params);

    try {
        // Make the Ajax call
        return $.ajax(extendedAJAXParams);
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

/*******************************************************************************
CSO Library - URI
*******************************************************************************/
cso.uri = {};

//Parse a URL and return the GET parameters as a object
cso.uri.parse = function (pURL) {
    var URI = new URI(pURL);
    return URI.parseQuery(uri.search());
}

//Check if a GET parameter is set in the URL
cso.uri.isParam = function (pParam, pURL) {
    // Default parameters
    pURL = pURL || window.location.href;

    // Parse the URL by using URI.js
    var uri = new URI(pURL);
    // Get the Query Paramenters
    var paramsURL = URI.parseQuery(uri.search());
    if (pParam in paramsURL)
        return true;
    else
        return false;
}

//Return the GET parameter set in the URL
cso.uri.getParam = function (pParam, pURL) {
    // Default parameters
    pURL = pURL || window.location.href;

    // Parse the URL by using URI.js
    var uri = new URI(pURL);
    // Get the Query Paramenters
    var paramsURL = URI.parseQuery(uri.search());
    if (pParam in paramsURL)
        return paramsURL[pParam];
    else
        return false;
}

//Check if the No Header request exists
cso.uri.getNoHeader = function () {
    return cso.uri.isParam(C_CSOLIB_URI_NOHEADER);
}

//Check if the No Navigation Bar request exists
cso.uri.getNoNavbar = function () {
    return cso.uri.isParam(C_CSOLIB_URI_NONAVBAR);
}

//Check if the No Footer request exists
cso.uri.getNoFooter = function () {
    return cso.uri.isParam(C_CSOLIB_URI_NOFOOTER);
}

//Get the Body request
cso.uri.getBody = function () {
    return cso.uri.getParam(C_CSOLIB_URI_BODY);
}