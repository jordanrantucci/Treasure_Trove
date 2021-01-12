$(document).ready(function() {
    //Bing Maps API
    let apiKey = config.key
    let ipapiURL = "https://ipapi.co/8.8.8.8/json/"
    let gyazoURL = "" //nick


    $.ajax({
        url: ipapiURL,
        method: "GET"
    }).then(function(response){
        let userLocation = response.latitude+"~"+response.longitude
        $.ajax({
            url: gyazoURL="",
            method: "GET"
        }).then(function(response2){
        let pointLatitude = response2.something //nick
        let pointLongitude = response2.something //nick
        let picTitle = response2.something //nick again
        let refURL = response2.something //and again
        let photoURL = response2.something//last one
        let bingMapURL = "https://bing.com/maps/default.aspx?cp="+userLocation+"&style=h"+"&sp=point."+pointLatitude+"_"+pointLongitude+"_"+picTitle+"_"+refURL+"_"+photoURL
        
            $.ajax({
                url: bingMapURL,
                method= "GET"
            }).then(function(response3){
                let mapDiv = $("<div>")
                
            })
        })
    })
})