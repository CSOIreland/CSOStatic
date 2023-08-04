
/* 
Load an URL into a Container
*/
function csolib_loadContent(pSelectorContainer, pRelativeURL) {
    $.get(pRelativeURL, function(result) {
        if (result != $(pSelectorContainer).html()) {
            $(pSelectorContainer).empty().html(result);
        }
    });
}

/* 
Navigate to an URL by clicking on a Selector
Highlight the menu structure by passing either the Selector and/or the Parent element
*/
function csolib_navContent(pSelector, pRelativeURL) {
    csolib_navContent(pSelector, pRelativeURL, null, null);
}
function csolib_navContent(pSelector, pRelativeURL, pSelectorToHighlight) {
	csolib_navContent(pSelector, pRelativeURL, pSelectorToHighlight, null);
}
function csolib_navContent(pNavSelector, pRelativeURL, pSelectorToHighlight, pParentToHighlight) {
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

/* 
Make a JSON-RPC Ajax call
*/
function csolib_AjaxCall(pAPI_URL, pAPI_Method) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, null, null, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_successFunction) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_successFunction, null, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_successFunction, pAPI_Parameters) {
    csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_successFunction, pAPI_Parameters, null, null, null, null);
}
function csolib_AjaxCall(pAPI_URL, pAPI_Method, pAPI_successFunction, pAPI_Parameters, pAJAX_Method, pAJAX_aSync, pAJAX_Cache, pAJAX_DataType) {
	// Default parameters
    pAPI_successFunction	= pAPI_successFunction		|| null;
    pAPI_Parameters			= pAPI_Parameters			|| '{}';
    pAJAX_Method			= pAJAX_Method				|| 'POST';
    pAJAX_aSync				= pAJAX_aSync				|| false;
    pAJAX_Cache				= pAJAX_Cache				|| true;
    pAJAX_DataType			= pAJAX_DataType			|| 'json';

    try {
        var callId = Math.floor(Math.random() * 123e64) + 1;
        var dataIn = {
            "jsonrpc": '2.0',
            "method": pAPI_Method,
            "params": pAPI_Parameters,
            "id": callId,
        };
 
        return $.ajax({
            type: pAJAX_Method,
            url: pAPI_URL,
            async: pAJAX_aSync,
            cache: pAJAX_Cache,
			xhrFields: {withCredentials: true},
            timeout: 100000,
            dataType: pAJAX_DataType,
            data: JSON.stringify(dataIn),
          
            success: function(response) {
                if (pAPI_successFunction)
                    window[pAPI_successFunction](response);
            },
            
            error: function(err) {
                alert(JSON.stringify(err));
            }
        });
    } catch (err) {
         alert(err);
    }
}
