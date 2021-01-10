$(document).ready(function() {
    //Bing Maps API
    let apiKey = config.key
    let userLocation = ""
    let queryURL = "https://bing.com/maps/default.aspx?cp="+userLocation+"&style=h"+"&sp=point."+latitude+"_"+longitude+"_"+picTitle+"_"+refURL+"_"+photoURL

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
    })
})