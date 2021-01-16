// function loadMapScenario() {
//     var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
//     var map = new Microsoft.Maps.Map('#myMap', {
//         credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
//         center: new Microsoft.Maps.Location(51.50632, -0.12714),
//         mapTypeId: Microsoft.Maps.MapTypeId.aerial,
//         zoom: 10
        
//     });            
// }
function locateTreasure(){

    function GetMap()
    {
        let latitude = $("#latitude").val()
        let longitude = $("#longitude").val()

        let map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
            center: new Microsoft.Maps.Location(longitude, latitude)
        });

        let center = map.getCenter();

        //Create custom Pushpin
        let pin = new Microsoft.Maps.Pushpin(center, {
            title: 'Old Quarter',
            subTitle: 'Found old quarter made of silver',
            
        });

        //Add the pushpin to the map
        map.entities.push(pin);
    }

    GetMap()
}

$("#locateTreasure").on("click", locateTreasure)


$("#treasure-btn").on("click", function() {
    var unsplashURL = "https://api.unsplash.com/search/photos?query=treasure&per_page=50&client_id=R2a__tWdYYp-v6teauC_XnmRvIFWApfcH2KipS4BRY8";

    $.ajax({
        url: unsplashURL,
        method: "GET"
    })

    .then(function(response) {
        
        var randomNumber = Math.floor(Math.random() * 30) + 1;
    console.log(randomNumber);
        $("#treasure").remove()
        // for( i=0; i < response.results.length; i++){
        var imageUrl = response.results[randomNumber].urls.small;
        var treasureImage = $("<img>");
        treasureImage.attr("id", "treasure")
        treasureImage.attr("src", imageUrl);
        treasureImage.attr("alt", "treasure image");
        $("#images").prepend(treasureImage);

     
    });
    
})

// $(document).ready(function() {
    
//     let apiKey = config.key
//     let apiKey2 = config2.key
//     let ipapiURL = "https://ipapi.co/8.8.8.8/json/"
//     let unsplashURL = " https://api.flickr.com/services/rest/?method=flickr.photos.getWithGeoData&api_key="+apiKey2+"&per_page=10&format=json&nojsoncallback=1"
    

    // $.ajax({
    //     url: ipapiURL,
    //     method: "GET"
    // }).then(function(response){
    //     let userLocation = response.latitude+"~"+response.longitude
    //     $.ajax({
    //         url: unsplashURL,
    //         method: "GET"
    //     }).then(function(response2){
    //         //variables from Flickr
    //         let pointLatitude = //response2.something //nick
    //         let pointLongitude = //response2.something //nick
    //         let picTitle = "Treasure" //response2.something //nick again
    //         //let refURL = response2.something //and again
    //         let photoURL = //response2.something//last one
            
    //         // Copyright 2018 Google LLC.
    //         // SPDX-License-Identifier: Apache-2.0

    //         const express = require('express');
    //         const app = express();

            // // No CORS Headder set
            // app.get('/', function(request, response) {
            // response.sendFile(__dirname + '/message.json');
            // });

            // // CORS header `Access-Control-Allow-Origin` set to accept all
            // app.get('/allow-cors', function(request, response) {
            // response.set('Access-Control-Allow-Origin', '*');
            // response.sendFile(__dirname + '/message.json');
            // });

            // // listen for requests :)
            // const listener = app.listen(process.env.PORT, function() {
            // console.log('Your app is listening on port ' + listener.address().port);
            // });
            
            // let bingMapURL = "https://bing.com/maps/default.aspx?cp="+userLocation+"&style=h"+"&sp=point."+pointLatitude+"_"+pointLongitude+"_"+picTitle+"_"+photoURL
            //Bing Maps API call
            // $.ajax({
            //     url: bingMapURL,
            //     method: "GET"
            // }).then(function(response3){
                // let mapDiv = $("#myMap")

                // function GetMap() {
                //     var map = new Microsoft.Maps.Map('#myMap', {
                //         credentials: apiKey,
                //         center: new Microsoft.Maps.Location(pointLatitude, pointLongitude)
                //     });
            
                //     var center = map.getCenter();
            
                //     //Create custom Pushpin
                //     var pin = new Microsoft.Maps.Pushpin(center, {
                //         title: picTitle,
                //         subTitle: 'City Center',
                //         text: '1'
                //     });
                                        
                //     //Add the pushpin to the map
                //     map.entities.push(pin)

                //     $("#myMap").append(map)
                // var map = new Microsoft.Maps.Map('#myMap', {
                //     credentials: 'Ak7rhv8TWx72_u6d8FHAVdPA01BfBGAr_JYJux65cv8uHVpMCUSGhlLsce-tKdnd',
                //     center: new Microsoft.Maps.Location(51.50632, -0.12714),
                //     mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                //     zoom: 10
                // });
                
            // })
        // })
    // })
//})