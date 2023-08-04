/*******************************************************************************
CSO Library 
*******************************************************************************/

/*******************************************************************************
Show the Overlay and start the Spinner
*******************************************************************************/
function csolib_startSpinner() {
    $('#overlay').show();
}

/*******************************************************************************
Hide the Overlay and stop the Spinner
*******************************************************************************/
function csolib_stopSpinner() {
    $('#overlay').fadeOut('slow');
}

/*******************************************************************************
Load an URL into a Container
*******************************************************************************/
function csolib_loadContent(pSelectorContainer, pRelativeURL) {
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

/*******************************************************************************
Navigate to an URL by clicking on a Selector and Highlight the menu structure 
by passing either the Selector and/or the Parent element
*******************************************************************************/
function csolib_navContent(pSelector, pRelativeURL) {
    csolib_navContent(pSelector, pRelativeURL, null, null);
}
function csolib_navContent(pSelector, pRelativeURL, pSelectorToHighlight) {
    csolib_navContent(pSelector, pRelativeURL, pSelectorToHighlight, null);
}
function csolib_navContent(pNavSelector, pRelativeURL, pSelectorToHighlight, pParentToHighlight) {
    // Validate the Relative URL
    var uri = new URI(pRelativeURL);
    if (uri.is("relative") === false)
        return;

    $(pNavSelector).click(function () {

        $(".body-container").empty().load(pRelativeURL, 'html');
        $('[id^=page-]').removeClass("active");

        if (pSelectorToHighlight)
            $(pSelectorToHighlight).addClass("active");

        if (pParentToHighlight)
            $(pParentToHighlight).addClass("active");

        return false;
    });
}

/*******************************************************************************
Execute an AJAX callback function
*******************************************************************************/
function csolib_AjaxCallbackFunction(pCallbackFunction, pAJAXResponse, pExtraCallbackParameters) {
    var callbackFunction = window[pCallbackFunction];
    if (typeof callbackFunction === 'function') {
        if (pExtraCallbackParameters)
            callbackFunction(pAJAXResponse, pExtraCallbackParameters);
        else
            callbackFunction(pAJAXResponse);
    } else
        return pAJAXResponse;
}

/*******************************************************************************
Make a JSON-RPC Ajax call
*******************************************************************************/
function csolib_AjaxCall(pAPI_URL, pAPI_Method) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, null, null, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, null, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError, pAPI_callbackParams_onError) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError, pAPI_callbackParams_onError, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_Params, pAPI_callbackFunction_onSuccess, pAPI_callbackParams_onSuccess, pAPI_callbackFunction_onError, pAPI_callbackParams_onError, pAJAX_Params) {
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

            return csolib_AjaxCallbackFunction(pAPI_callbackFunction_onSuccess, response, pAPI_callbackParams_onSuccess);
        },
        error: function (error) {
            // Silent validate the JSON-RPC Call ID
            if(pAJAX_Params.dataType == 'json' && response.id != callID)
                return false;

            return csolib_AjaxCallbackFunction(pAPI_callbackFunction_onError, response, pAPI_callbackParams_onError);
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
Parse a URL and return the GET parameters as a object
*******************************************************************************/
function csolib_parseURL(pURL) {
    var URI = new URI(pURL);
    return URI.parseQuery(uri.search());
}

/*******************************************************************************
Check if a GET parameter is set in the URL
*******************************************************************************/
function csolib_isURLParamSet(pParam) {
    return csolib_isURLParamSet(pParam, null);
}
function csolib_isURLParamSet(pParam, pURL) {
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

/*******************************************************************************
Return the GET parameter set in the URL
*******************************************************************************/
function csolib_getURLParam(pParam) {
    return csolib_getURLParam(pParam, null);
}
function csolib_getURLParam(pParam, pURL) {
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

/*******************************************************************************
Check if the No Header request exists
*******************************************************************************/
function csolib_getNoHeader() {
    return csolib_isURLParamSet(C_CSOLIB_NOHEADER, null);
}
/*******************************************************************************
Check if the No Navbar request exists
*******************************************************************************/
function csolib_getNoNavbar() {
    return csolib_isURLParamSet(C_CSOLIB_NONAVBAR, null);
}
/*******************************************************************************
Check if the No Footer request exists
*******************************************************************************/
function csolib_getNoFooter() {
    return csolib_isURLParamSet(C_CSOLIB_NOFOOTER, null);
}
/*******************************************************************************
Check if the No Footer request exists
*******************************************************************************/
function csolib_getBody() {
    return csolib_getURLParam(C_CSOLIB_BODY, null);
}