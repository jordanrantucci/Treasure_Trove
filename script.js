$(document).ready(function() {
    //Bing Maps API
    let apiKey = config.key
    let apiKey2 = config2.key
    let ipapiURL = "https://ipapi.co/8.8.8.8/json/"
    let flickrURL = " https://api.flickr.com/services/rest/?method=flickr.photos.getWithGeoData&api_key="+apiKey2+"&per_page=10&format=json&nojsoncallback=1" //nick
    

    $.ajax({
        url: ipapiURL,
        method: "GET"
    }).then(function(response){
        let userLocation = response.latitude+"~"+response.longitude
        $.ajax({
            url: flickrURL="",
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