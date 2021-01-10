$(document).ready(function() {
    //Bing Maps API
    let apiKey = config.key
    let ipapiURL = "https://ipapi.co/8.8.8.8/json/"


    $.ajax({
        url: ipapiURL,
        method: "GET"
    }).then(function(response){
        let userLocation = response.latitude+"~"+response.longitude
        let pointLatitude = ""
        let pointLongitude = ""
        let picTitle = ""
        let refURL = ""
        let photoURL = ""
        let queryURL = "https://bing.com/maps/default.aspx?cp="+userLocation+"&style=h"+"&sp=point."+pointLatitude+"_"+pointLongitude+"_"+picTitle+"_"+refURL+"_"+photoURL
        
        $.ajax({
            url: queryURL,
            method= "GET"
        }).then(function(response2){
            
        })
    })
})