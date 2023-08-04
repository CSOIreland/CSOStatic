/*******************************************************************************
API - Configuration 
*******************************************************************************/

// Preset Ajax calls to be ASynch by default
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.async = originalOptions.async === undefined ? true : originalOptions.async;
});