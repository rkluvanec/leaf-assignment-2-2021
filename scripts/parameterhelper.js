// Global load of the parameters from the URL
const urlParams = new URLSearchParams(window.location.search);

// This function returns the value of a parameter of a given name
var getParameter = function(name){
    return urlParams.get(name)
}